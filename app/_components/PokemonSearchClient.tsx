'use client';

import { useState } from 'react';
import PokemonItem from './PokemonItem';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonSearchClientProps {
  pokemonList: Pokemon[];
}

export default function PokemonSearchClient({ pokemonList }: PokemonSearchClientProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPokemon = pokemonList.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    poke.name.replace(/-/g, ' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-full px-4 sm:px-8 mb-6 max-w-6xl mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search pokemon by name..."
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none transition-colors bg-white text-black text-sm sm:text-base"
        />
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 px-4 sm:px-8 pb-8 max-w-7xl mx-auto w-full">
        {filteredPokemon.map((poke, index) => (
          <PokemonItem
            key={poke.name}
            pokemon={poke}
            showSprite
            showIndex
            variant="grid"
          />
        ))}
      </ul>
    </>
  );
}
