import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovesSearchClient from '@/app/moves/MovesSearchClient';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  );
});

describe('MovesSearchClient Component', () => {
  const mockMoves = [
    { name: 'pound', url: 'https://pokeapi.co/api/v2/move/1/' },
    { name: 'karate-chop', url: 'https://pokeapi.co/api/v2/move/2/' },
    { name: 'double-slap', url: 'https://pokeapi.co/api/v2/move/3/' },
    { name: 'comet-punch', url: 'https://pokeapi.co/api/v2/move/4/' },
  ];

  it('should render all moves initially', () => {
    render(<MovesSearchClient movesList={mockMoves} />);
    
    mockMoves.forEach((move) => {
      expect(screen.getByText(new RegExp(move.name.replace(/-/g, ' '), 'i'))).toBeInTheDocument();
    });
  });

  it('should have a search input field', () => {
    render(<MovesSearchClient movesList={mockMoves} />);
    
    const input = screen.getByPlaceholderText(/search moves by name/i);
    expect(input).toBeInTheDocument();
  });

  it('should filter moves when searching', () => {
    render(<MovesSearchClient movesList={mockMoves} />);
    
    const input = screen.getByPlaceholderText(/search moves by name/i);
    fireEvent.change(input, { target: { value: 'karate' } });
    
    expect(screen.getByText(/karate chop/i)).toBeInTheDocument();
    expect(screen.queryByText(/comet punch/i)).not.toBeInTheDocument();
  });

  it('should be case-insensitive', () => {
    render(<MovesSearchClient movesList={mockMoves} />);
    
    const input = screen.getByPlaceholderText(/search moves by name/i);
    fireEvent.change(input, { target: { value: 'POUND' } });
    
    expect(screen.getByText(/pound/i)).toBeInTheDocument();
  });

  it('should have correct links to move detail pages', () => {
    render(<MovesSearchClient movesList={mockMoves} />);
    
    const link = screen.getAllByRole('link').find(
      (link) => link.getAttribute('href') === '/moves/pound'
    );
    
    expect(link).toBeInTheDocument();
  });
});
