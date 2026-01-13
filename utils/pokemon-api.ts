type Pokemon = {
    name: string[];
    url: string[];
};

export async function fetchPokemon() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1500');
  const pokemon = await response.json();
  return pokemon;
}