import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonSearchClient from '@/app/_components/PokemonSearchClient';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  );
});

// Mock PokemonSpriteImage component
jest.mock('@/app/_components/PokemonSpriteImage', () => {
  return function DummyComponent() {
    return <div data-testid="sprite-image">Sprite</div>;
  };
});

// Mock PokemonItem component
jest.mock('@/app/_components/PokemonItem', () => {
  return function DummyComponent({ pokemon }: any) {
    return <li><a href={`/pokemon/${pokemon.name}`}>{pokemon.name}</a></li>;
  };
});

describe('PokemonSearchClient Component', () => {
  const mockPokemon = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
  ];

  it('should render all pokemon initially', () => {
    render(<PokemonSearchClient pokemonList={mockPokemon} />);
    
    mockPokemon.forEach((poke) => {
      expect(screen.getByText(new RegExp(poke.name, 'i'))).toBeInTheDocument();
    });
  });

  it('should have a search input field', () => {
    render(<PokemonSearchClient pokemonList={mockPokemon} />);
    
    const input = screen.getByPlaceholderText(/search pokemon by name/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should filter pokemon when searching by name', () => {
    render(<PokemonSearchClient pokemonList={mockPokemon} />);
    
    const input = screen.getByPlaceholderText(/search pokemon by name/i);
    
    // Search for "bulba"
    fireEvent.change(input, { target: { value: 'bulba' } });
    
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.queryByText(/charmander/i)).not.toBeInTheDocument();
  });

  it('should filter case-insensitively', () => {
    render(<PokemonSearchClient pokemonList={mockPokemon} />);
    
    const input = screen.getByPlaceholderText(/search pokemon by name/i);
    
    // Search with uppercase
    fireEvent.change(input, { target: { value: 'CHAR' } });
    
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    expect(screen.getByText(/charmeleon/i)).toBeInTheDocument();
    expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
  });

  it('should show all pokemon when search is cleared', () => {
    render(<PokemonSearchClient pokemonList={mockPokemon} />);
    
    const input = screen.getByPlaceholderText(/search pokemon by name/i);
    
    // Search for something
    fireEvent.change(input, { target: { value: 'bulba' } });
    expect(screen.queryByText(/charmander/i)).not.toBeInTheDocument();
    
    // Clear search
    fireEvent.change(input, { target: { value: '' } });
    
    mockPokemon.forEach((poke) => {
      expect(screen.getByText(new RegExp(poke.name, 'i'))).toBeInTheDocument();
    });
  });

  it('should show no results when searching for non-existent pokemon', () => {
    render(<PokemonSearchClient pokemonList={mockPokemon} />);
    
    const input = screen.getByPlaceholderText(/search pokemon by name/i);
    fireEvent.change(input, { target: { value: 'nonexistentpokemon' } });
    
    // All pokemon should be filtered out
    mockPokemon.forEach((poke) => {
      expect(screen.queryByText(new RegExp(poke.name, 'i'))).not.toBeInTheDocument();
    });
  });

  it('should have correct links to pokemon detail pages', () => {
    render(<PokemonSearchClient pokemonList={mockPokemon} />);
    
    const bulbasaurLink = screen.getAllByRole('link').find(
      (link) => link.getAttribute('href') === '/pokemon/bulbasaur'
    );
    
    expect(bulbasaurLink).toBeInTheDocument();
  });

  it('should display pokemon count correctly', () => {
    render(<PokemonSearchClient pokemonList={mockPokemon} />);
    
    // Should have 5 pokemon items rendered
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(5);
  });

  it('should handle partial matches', () => {
    render(<PokemonSearchClient pokemonList={mockPokemon} />);
    
    const input = screen.getByPlaceholderText(/search pokemon by name/i);
    
    // Search for "saur" should match bulbasaur, ivysaur, venusaur
    fireEvent.change(input, { target: { value: 'saur' } });
    
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
    expect(screen.getByText(/venusaur/i)).toBeInTheDocument();
    expect(screen.queryByText(/charmander/i)).not.toBeInTheDocument();
  });

  it('should handle empty pokemon list', () => {
    render(<PokemonSearchClient pokemonList={[]} />);
    
    const input = screen.getByPlaceholderText(/search pokemon by name/i);
    expect(input).toBeInTheDocument();
    
    // Should not render any list items
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });
});
