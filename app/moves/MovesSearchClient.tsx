'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Move {
  name: string;
  url: string;
}

interface MovesSearchClientProps {
  movesList: Move[];
}

export default function MovesSearchClient({ movesList }: MovesSearchClientProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMoves = movesList.filter((move) =>
    move.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-full px-4 sm:px-8 mb-6 max-w-6xl mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search moves by name..."
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none transition-colors bg-white text-black text-sm sm:text-base"
        />
      </div>
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-4 sm:px-8 pb-8 max-w-6xl mx-auto w-full'>
        {filteredMoves.map((move) => (
          <Link key={move.name} href={`/moves/${move.name}`}>
            <li className='bg-gray-900 rounded-lg p-4 sm:p-6 hover:bg-gray-700 transition-all duration-200 hover:scale-105 cursor-pointer border-l-4 border-yellow-500'>
              <h3 className="text-sm sm:text-base font-semibold capitalize truncate">
                {move.name.replace(/-/g, ' ')}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">Click to view details</p>
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}
