import { fetchLocationByName, fetchRegionByName } from '@/utils/pokemon-api';
import BackButton from '@/app/_components/BackButton';
import PokemonItem from '@/app/_components/PokemonItem';

interface LocationDetailPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function LocationDetailPage({ params }: LocationDetailPageProps) {
  const { name } = await params;
  const location = await fetchLocationByName(name);

  // Fetch each area to get pokemon encounters
  const areas = location.areas || [];
  const areaPokemon = await Promise.all(
    areas.map(async (area: any) => {
      try {
        const areaResponse = await fetch(area.url);
        if (!areaResponse.ok) throw new Error(`Failed to fetch area: ${area.name}`);
        const areaData = await areaResponse.json();
        
        const pokemon = areaData.pokemon_encounters?.map((enc: any) => ({
          name: enc.pokemon.name,
          url: enc.pokemon.url,
        })) || [];
        
        return {
          areaName: area.name,
          pokemon,
        };
      } catch (error) {
        console.error(`Error fetching area ${area.name}:`, error);
        return {
          areaName: area.name,
          pokemon: [],
        };
      }
    })
  );

  let regionName = location.region?.name || 'Unknown';
  let displayRegionName = regionName;
  
  // Check if the location's region is a subregion and get the main region
  if (location.region?.name) {
    try {
      const region = await fetchRegionByName(location.region.name);
      // If the region has a main_region field, it's a subregion
      if (region.main_region?.name) {
        displayRegionName = region.main_region.name;
      }
    } catch (error) {
      console.error('Error fetching region:', error);
    }
  }

  return (
    <div className="flex flex-col items-center py-6 sm:py-8 px-4 sm:px-6 bg-gray-950 min-h-screen">
      <div className="w-full max-w-4xl">
        <BackButton href="/locations" label="Back to Locations" />

        <h1 className="text-3xl sm:text-4xl font-bold mb-2 capitalize text-center">
          {location.name.replace(/-/g, ' ')}
        </h1>

        <p className="text-center text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
          Region: <span className="text-gray-200 capitalize font-semibold">{displayRegionName.replace(/-/g, ' ')}</span>
        </p>

        {/* Areas */}
        {areaPokemon.length > 0 ? (
          <div className="space-y-6 sm:space-y-8">
            {areaPokemon.map((area) => (
              <div key={area.areaName} className="bg-gray-900 rounded-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4 capitalize border-b border-gray-700 pb-3">
                  {area.areaName.replace(/-/g, ' ')}
                </h2>

                {area.pokemon.length > 0 ? (
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
                    {area.pokemon.map((poke: any, index: number) => (
                      <PokemonItem
                        key={poke.name}
                        pokemon={poke}
                        index={index}
                        showSprite
                        variant="grid"
                      />
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm">No Pokemon found in this area</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center text-sm sm:text-base">No sub-areas found for this location</p>
        )}
      </div>
    </div>
  );
}