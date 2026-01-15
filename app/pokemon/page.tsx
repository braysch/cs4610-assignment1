import { fetchPokemon } from "@/utils/pokemon-api";
import Link from "next/link";
import Image from 'next/image';
import PokemonSpriteImage from "../_components/PokemonSpriteImage";
import SearchBar from "../_components/SearchBar";
import PokemonSearchClient from "../_components/PokemonSearchClient";

export default async function PokemonPage() {

    const pokemon = await fetchPokemon();

    return (
    <div className='flex flex-col items-center py-8'>
      <h1 className="text-2xl font-bold pb-8">Pokemon</h1>
      <PokemonSearchClient pokemonList={pokemon.results} />
    </div>
  )
}