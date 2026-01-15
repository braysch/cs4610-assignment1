const BASE_URL = 'https://pokeapi.co/api/v2';

// ============ POKEMON API FUNCTIONS ============

export async function fetchPokemon(limit: number = 1500) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch pokemon list');
  return response.json();
}

export async function fetchPokemonByName(name: string) {
  const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
  if (!response.ok) throw new Error(`Failed to fetch pokemon: ${name}`);
  return response.json();
}

// ============ MOVES API FUNCTIONS ============

export async function fetchMoves(limit: number = 1000) {
  const response = await fetch(`${BASE_URL}/move?limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch moves list');
  return response.json();
}

export async function fetchMoveByName(name: string) {
  const response = await fetch(`${BASE_URL}/move/${name.toLowerCase().replace(/ /g, '-')}`);
  if (!response.ok) throw new Error(`Failed to fetch move: ${name}`);
  return response.json();
}

// ============ LOCATIONS API FUNCTIONS ============

export async function fetchLocations(limit: number = 1000) {
  const response = await fetch(`${BASE_URL}/location?limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch locations list');
  return response.json();
}

export async function fetchLocationByName(name: string) {
  const response = await fetch(`${BASE_URL}/location/${name.toLowerCase().replace(/ /g, '-')}`);
  if (!response.ok) throw new Error(`Failed to fetch location: ${name}`);
  return response.json();
}

// ============ GENERATION API FUNCTIONS ============

export async function fetchGenerations() {
  const response = await fetch(`${BASE_URL}/generation?limit=9`);
  if (!response.ok) throw new Error('Failed to fetch generations list');
  return response.json();
}

export async function fetchGenerationByName(name: string) {
  const response = await fetch(`${BASE_URL}/generation/${name.toLowerCase().replace(/ /g, '-')}`);
  if (!response.ok) throw new Error(`Failed to fetch generation: ${name}`);
  return response.json();
}