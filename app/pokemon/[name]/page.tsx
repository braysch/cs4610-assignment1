import { fetchPokemonByName, fetchMoves, fetchLocations } from '@/utils/pokemon-api';
import Link from 'next/link';
import BackButton from '@/app/_components/BackButton';
import PokemonSpriteImage from '@/app/_components/PokemonSpriteImage';

interface PokemonDetailPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  const { name } = await params;
  const pokemon = await fetchPokemonByName(name);

  // Fetch all moves to get their proper names
  const movesData = await fetchMoves(10000);
  const locationsData = await fetchLocations(10000);

  // Extract move names from pokemon.moves
  const pokemonMoveNames = pokemon.moves?.map((m: any) => m.move.name) || [];

  // Note: location_area_encounters is just a URL string, not an array
  // Would require additional API call to fetch. Skipping for now.
  const pokemonLocationNames: string[] = [];

  const stats = pokemon.stats || [];
  const sprites = pokemon.sprites || {};

  return (
    <div className="flex flex-col items-center py-6 sm:py-8 px-4 sm:px-6 bg-gray-950 min-h-screen">
      <div className="w-full max-w-4xl">
        <BackButton href="/pokemon" label="Back to Pokemon" />

        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 capitalize text-center">
          {pokemon.name}
        </h1>

        {/* Sprites */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-8 justify-center flex-wrap">
          <div className="flex flex-col items-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Normal</h3>
            {sprites.front_default ? (
              <img
                src={sprites.front_default}
                alt={`${pokemon.name} normal`}
                className="w-28 h-28 sm:w-32 sm:h-32"
              />
            ) : (
              <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center text-xs sm:text-sm">
                No image
              </div>
            )}
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Shiny</h3>
            {sprites.front_shiny ? (
              <img
                src={sprites.front_shiny}
                alt={`${pokemon.name} shiny`}
                className="w-28 h-28 sm:w-32 sm:h-32"
              />
            ) : (
              <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center text-xs sm:text-sm">
                No image
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="w-full mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {stats.map((stat: any) => (
              <div key={stat.stat.name} className="bg-gray-900 rounded-lg p-3 sm:p-4">
                <div className="flex justify-between mb-2 text-xs sm:text-sm">
                  <span className="font-semibold capitalize truncate">{stat.stat.name}</span>
                  <span className="font-bold ml-2">{stat.base_stat}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: `${Math.min((stat.base_stat / 150) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="w-full mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Locations</h2>
          {pokemonLocationNames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {pokemonLocationNames.map((locationName: string) => (
                <Link
                  key={locationName}
                  href={`/locations/${locationName}`}
                  className="bg-gray-900 rounded-lg p-3 sm:p-4 hover:bg-gray-700 transition-colors hover:text-yellow-300 text-sm sm:text-base break-words"
                >
                  <span className="capitalize">{locationName.replace(/-/g, ' ')}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm sm:text-base">No location data available</p>
          )}
        </div>

        {/* Moves */}
        <div className="w-full mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Moves</h2>
          {pokemonMoveNames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {pokemonMoveNames.slice(0, 20).map((moveName: string) => (
                <Link
                  key={moveName}
                  href={`/moves/${moveName}`}
                  className="bg-gray-900 rounded-lg p-3 sm:p-4 hover:bg-gray-700 transition-colors hover:text-yellow-300 text-sm sm:text-base break-words"
                >
                  <span className="capitalize">{moveName.replace(/-/g, ' ')}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm sm:text-base">No moves available</p>
          )}
          {pokemonMoveNames.length > 20 && (
            <p className="text-gray-400 mt-4 text-xs sm:text-sm">
              Showing 20 of {pokemonMoveNames.length} moves
            </p>
          )}
        </div>
      </div>
    </div>
  );
}