import React from 'react'
import Link from 'next/link'

const NavBar = () => {
  return (
    <nav className="bg-red-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          The Ultimate Pokédex
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/pokemon" className="hover:text-yellow-300 transition-colors">
              Pokémon
            </Link>
          </li>
          <li>
            <Link href="/moves" className="hover:text-yellow-300 transition-colors">
              Moves
            </Link>
          </li>
          <li>
            <Link href="/generations" className="hover:text-yellow-300 transition-colors">
              Generations
            </Link>
          </li>
          <li>
            <Link href="/locations" className="hover:text-yellow-300 transition-colors">
              Locations
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar