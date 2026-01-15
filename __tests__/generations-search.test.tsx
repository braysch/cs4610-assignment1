import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GenerationsSearchClient from '@/app/generations/GenerationsSearchClient';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  );
});

describe('GenerationsSearchClient Component', () => {
  const mockGenerations = [
    { name: 'generation-i', url: 'https://pokeapi.co/api/v2/generation/1/' },
    { name: 'generation-ii', url: 'https://pokeapi.co/api/v2/generation/2/' },
    { name: 'generation-iii', url: 'https://pokeapi.co/api/v2/generation/3/' },
    { name: 'generation-iv', url: 'https://pokeapi.co/api/v2/generation/4/' },
  ];

  it('should render all generations initially', () => {
    render(<GenerationsSearchClient generationsList={mockGenerations} />);
    
    expect(screen.getByText(/^generation i$/i)).toBeInTheDocument();
    expect(screen.getByText(/^generation ii$/i)).toBeInTheDocument();
    expect(screen.getByText(/^generation iii$/i)).toBeInTheDocument();
    expect(screen.getByText(/^generation iv$/i)).toBeInTheDocument();
  });

  it('should have a search input field', () => {
    render(<GenerationsSearchClient generationsList={mockGenerations} />);
    
    const input = screen.getByPlaceholderText(/search generations by name/i);
    expect(input).toBeInTheDocument();
  });

  it('should filter generations when searching', () => {
    render(<GenerationsSearchClient generationsList={mockGenerations} />);
    
    const input = screen.getByPlaceholderText(/search generations by name/i);
    fireEvent.change(input, { target: { value: 'generation-iv' } });
    
    expect(screen.getByText(/^generation iv$/i)).toBeInTheDocument();
    expect(screen.queryByText(/^generation i$/i)).not.toBeInTheDocument();
  });

  it('should be case-insensitive', () => {
    render(<GenerationsSearchClient generationsList={mockGenerations} />);
    
    const input = screen.getByPlaceholderText(/search generations by name/i);
    fireEvent.change(input, { target: { value: 'GENERATION-III' } });
    
    expect(screen.getByText(/^generation iii$/i)).toBeInTheDocument();
  });

  it('should have correct links to generation detail pages', () => {
    render(<GenerationsSearchClient generationsList={mockGenerations} />);
    
    const link = screen.getAllByRole('link').find(
      (link) => link.getAttribute('href') === '/generations/generation-i'
    );
    
    expect(link).toBeInTheDocument();
  });
});
