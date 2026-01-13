import { fetchPokemon } from "@/utils/pokemon-api";
import Link from "next/link";
import Image from 'next/image';
import PokemonSpriteImage from "../_components/PokemonSpriteImage";

export default async function PokemonPage() {

    const pokemon = await fetchPokemon();

    return (
    <div className='flex flex-col items-center py-8'>
      <h1 className="text-2xl font-bold pb-8">Pokemon</h1>
      <ul className='grid grid-cols-5 gap-y-4 p-8'>
        {pokemon.results.map((poke, index) => (
          <Link key={poke.name} href={`/pokemon/${poke.name}`}><li className='flex items-center justify-center m-2 bg-gray-900 rounded-xl hover:scale-[110%] transition-all duration-100 hover:bg-gray-700 h-full group' key={poke.name}>
            <div className="relative w-full h-full flex justify-center">
            <div className="flex gap-x-2 p-2 justify-center items-center text-center">
                {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
                <div className="group-hover:rotate-[10deg] transition-all duration-300"><PokemonSpriteImage poke={poke} /></div>
                </div>
                <div className="absolute left-2 top-0 z-10 opacity-30 text-[12px]">{index + 1}</div>
                </div>
            </li></Link>
        ))}
      </ul>
    </div>
  )
}