import { fetchGenerationByName } from '@/utils/pokemon-api';
import BackButton from '@/app/_components/BackButton';
import PokemonItem from '@/app/_components/PokemonItem';

interface GenerationDetailPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function GenerationDetailPage({ params }: GenerationDetailPageProps) {
  const { name } = await params;
  const generation = await fetchGenerationByName(name);

  const regionName = generation.main_region?.name || 'Unknown';
  const pokemon = generation.pokemon_species || [];

  return (
    <div className="flex flex-col items-center py-6 sm:py-8 px-4 sm:px-6 bg-gray-950 min-h-screen">
      <div className="w-full max-w-4xl">
        <BackButton href="/generations" label="Back to Generations" />

        <h1 className="text-3xl sm:text-4xl font-bold mb-2 capitalize text-center">
          {generation.name.replace(/-/g, ' ')}
        </h1>

        <p className="text-center text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
          Region: <span className="text-gray-200 capitalize font-semibold">{regionName.replace(/-/g, ' ')}</span>
        </p>

        {/* Pokemon in this generation */}
        {pokemon.length > 0 ? (
          <div className="w-full">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Pokemon in This Generation</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
              {pokemon.map((poke: any) => (
                <PokemonItem
                            key={poke.name}
                            pokemon={poke}
                            showSprite
                            variant="grid"
                          />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center text-sm sm:text-base">No Pokemon found in this generation</p>
        )}
      </div>
    </div>
  );
}
