'use client';

import React, { useState } from 'react'
import Link from 'next/link'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-red-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          The Ultimate Pokédex
        </Link>
        
        {/* Hamburger Menu Button - visible on small screens */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col space-y-1 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        {/* Desktop Menu - visible on medium screens and up */}
        <ul className="hidden md:flex space-x-6">
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

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-red-700 mt-4 rounded-lg overflow-hidden">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <Link
                href="/pokemon"
                className="block hover:text-yellow-300 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Pokémon
              </Link>
            </li>
            <li>
              <Link
                href="/moves"
                className="block hover:text-yellow-300 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Moves
              </Link>
            </li>
            <li>
              <Link
                href="/generations"
                className="block hover:text-yellow-300 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Generations
              </Link>
            </li>
            <li>
              <Link
                href="/locations"
                className="block hover:text-yellow-300 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Locations
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default NavBar