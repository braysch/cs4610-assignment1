import { fetchMoveByName } from '@/utils/pokemon-api';
import BackButton from '@/app/_components/BackButton';
import PokemonItem from '@/app/_components/PokemonItem';

interface MoveDetailPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function MoveDetailPage({ params }: MoveDetailPageProps) {
  const { name } = await params;
  const move = await fetchMoveByName(name);

  const accuracy = move.accuracy || 'N/A';
  const power = move.power || 'N/A';
  const pp = move.pp || 'N/A';
  const flavorTexts = move.flavor_text_entries || [];
  const pokemon = move.learned_by_pokemon || [];

  // Get unique flavor texts (one per language)
  const uniqueFlavorTexts: { [key: string]: string } = {};
  flavorTexts.forEach((entry: any) => {
    const language = entry.language.name;
    if (!uniqueFlavorTexts[language] && language === 'en') {
      uniqueFlavorTexts[language] = entry.flavor_text.replace(/\n/g, ' ');
    }
  });

  const englishFlavorText = uniqueFlavorTexts['en'] || 'No description available.';

  return (
    <div className="flex flex-col items-center py-6 sm:py-8 px-4 sm:px-6 bg-gray-950 min-h-screen">
      <div className="w-full max-w-4xl">
        <BackButton href="/moves" label="Back to Moves" />

        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 capitalize text-center">
          {move.name.replace(/-/g, ' ')}
        </h1>

        {/* Move Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-gray-900 rounded-lg p-3 sm:p-4">
            <div className="text-xs sm:text-sm text-gray-400 mb-1">Accuracy</div>
            <div className="text-lg sm:text-2xl font-bold">
              {accuracy === 'N/A' ? 'N/A' : `${accuracy}%`}
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3 sm:p-4">
            <div className="text-xs sm:text-sm text-gray-400 mb-1">Power</div>
            <div className="text-lg sm:text-2xl font-bold">{power}</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3 sm:p-4">
            <div className="text-xs sm:text-sm text-gray-400 mb-1">PP</div>
            <div className="text-lg sm:text-2xl font-bold">{pp}</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3 sm:p-4">
            <div className="text-xs sm:text-sm text-gray-400 mb-1">Type</div>
            <div className="text-sm sm:text-base font-bold capitalize">
              {move.type?.name || 'N/A'}
            </div>
          </div>
        </div>

        {/* Flavor Text */}
        <div className="bg-gray-900 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Description</h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {englishFlavorText}
          </p>
        </div>

        {/* Pokemon that learn this move */}
        <div className="w-full">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Pokemon that Learn This Move</h2>
          {pokemon.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {pokemon.map((poke: any) => (
                <PokemonItem
                            key={poke.name}
                            pokemon={poke}
                            showSprite
                            showIndex
                            variant="grid"
                          />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm sm:text-base">No Pokemon found</p>
          )}
        </div>
      </div>
    </div>
  );
}