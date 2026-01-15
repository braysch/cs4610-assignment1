import {
  fetchPokemon,
  fetchPokemonByName,
  fetchMoves,
  fetchMoveByName,
  fetchLocations,
  fetchLocationByName,
  fetchGenerations,
  fetchGenerationByName,
} from '@/utils/pokemon-api';

// Mock fetch globally
global.fetch = jest.fn();

describe('Pokemon API Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchPokemon', () => {
    it('should fetch all pokemon with default limit', async () => {
      const mockData = {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchPokemon();
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=1500');
    });

    it('should fetch pokemon with custom limit', async () => {
      const mockData = { results: [] };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      await fetchPokemon(100);
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=100');
    });

    it('should throw error when fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchPokemon()).rejects.toThrow('Failed to fetch pokemon list');
    });
  });

  describe('fetchPokemonByName', () => {
    it('should fetch a specific pokemon by name', async () => {
      const mockData = {
        name: 'bulbasaur',
        id: 1,
        stats: [
          { base_stat: 45, stat: { name: 'hp' } },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchPokemonByName('bulbasaur');
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/bulbasaur');
    });

    it('should handle pokemon names with uppercase letters', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await fetchPokemonByName('Bulbasaur');
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/bulbasaur');
    });

    it('should throw error when pokemon not found', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchPokemonByName('invalid')).rejects.toThrow('Failed to fetch pokemon: invalid');
    });
  });

  describe('fetchMoves', () => {
    it('should fetch all moves with default limit', async () => {
      const mockData = {
        results: [
          { name: 'pound', url: 'https://pokeapi.co/api/v2/move/1/' },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchMoves();
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/move?limit=1000');
    });

    it('should throw error when fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchMoves()).rejects.toThrow('Failed to fetch moves list');
    });
  });

  describe('fetchMoveByName', () => {
    it('should fetch a specific move by name', async () => {
      const mockData = {
        name: 'pound',
        accuracy: 100,
        power: 40,
        pp: 35,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchMoveByName('pound');
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/move/pound');
    });

    it('should handle move names with spaces by replacing with hyphens', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      await fetchMoveByName('High Jump Kick');
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/move/high-jump-kick');
    });

    it('should throw error when move not found', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchMoveByName('invalid')).rejects.toThrow('Failed to fetch move: invalid');
    });
  });

  describe('fetchLocations', () => {
    it('should fetch all locations with default limit', async () => {
      const mockData = {
        results: [
          { name: 'kanto', url: 'https://pokeapi.co/api/v2/location/1/' },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchLocations();
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/location?limit=1000');
    });

    it('should throw error when fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchLocations()).rejects.toThrow('Failed to fetch locations list');
    });
  });

  describe('fetchLocationByName', () => {
    it('should fetch a specific location by name', async () => {
      const mockData = {
        name: 'kanto',
        region: { name: 'kanto' },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchLocationByName('kanto');
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/location/kanto');
    });

    it('should throw error when location not found', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchLocationByName('invalid')).rejects.toThrow('Failed to fetch location: invalid');
    });
  });

  describe('fetchGenerations', () => {
    it('should fetch all generations', async () => {
      const mockData = {
        results: [
          { name: 'generation-i', url: 'https://pokeapi.co/api/v2/generation/1/' },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchGenerations();
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/generation?limit=9');
    });

    it('should throw error when fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchGenerations()).rejects.toThrow('Failed to fetch generations list');
    });
  });

  describe('fetchGenerationByName', () => {
    it('should fetch a specific generation by name', async () => {
      const mockData = {
        name: 'generation-i',
        main_region: { name: 'kanto' },
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fetchGenerationByName('generation-i');
      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/generation/generation-i');
    });

    it('should throw error when generation not found', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchGenerationByName('invalid')).rejects.toThrow('Failed to fetch generation: invalid');
    });
  });
});
