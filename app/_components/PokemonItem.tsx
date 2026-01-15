'use client';

import Link from 'next/link';
import PokemonSpriteImage from './PokemonSpriteImage';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonItemProps {
  pokemon: Pokemon;
  totalCount?: number;
  showSprite?: boolean;
  showIndex?: boolean;
  variant?: 'grid' | 'list';
}

export default function PokemonItem({
  pokemon,
  totalCount,
  showSprite = false,
  variant = 'list',
}: PokemonItemProps) {
  if (variant === 'grid' && showSprite) {
    // Grid variant with sprite (used in PokemonSearchClient)
    return (
      <Link href={`/pokemon/${pokemon.name}`}>
        <li className="flex items-center justify-center bg-gray-900 rounded-xl hover:scale-105 sm:hover:scale-110 transition-all duration-100 hover:bg-gray-700 group cursor-pointer">
          <div className="relative w-full h-full flex justify-center">
            <div className="flex flex-col gap-1 sm:gap-2 p-1 sm:p-2 justify-center items-center text-center">
              <div className="group-hover:rotate-[10deg] transition-all duration-300 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                <PokemonSpriteImage poke={pokemon} />
              </div>
              <div className="text-xs sm:text-sm font-semibold truncate">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </div>
            </div>
          </div>
        </li>
      </Link>
    );
  }

  // List variant (used in locations, moves, generations)
  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="bg-gray-900 rounded-lg p-2 sm:p-3 hover:bg-gray-700 transition-colors hover:text-yellow-300 text-xs sm:text-sm font-semibold capitalize truncate text-center hover:scale-105 transition-transform"
    >
      {pokemon.name.replace(/-/g, ' ')}
    </Link>
  );
}
