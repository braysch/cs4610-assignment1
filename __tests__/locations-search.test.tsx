import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LocationsSearchClient from '@/app/locations/LocationsSearchClient';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: any) => (
    <a href={href}>{children}</a>
  );
});

describe('LocationsSearchClient Component', () => {
  const mockLocations = [
    { name: 'viridian-forest', url: 'https://pokeapi.co/api/v2/location/1/' },
    { name: 'route-1', url: 'https://pokeapi.co/api/v2/location/2/' },
    { name: 'route-2', url: 'https://pokeapi.co/api/v2/location/3/' },
    { name: 'pewter-city', url: 'https://pokeapi.co/api/v2/location/4/' },
  ];

  it('should render all locations initially', () => {
    render(<LocationsSearchClient locationsList={mockLocations} />);
    
    mockLocations.forEach((location) => {
      expect(screen.getByText(new RegExp(location.name.replace(/-/g, ' '), 'i'))).toBeInTheDocument();
    });
  });

  it('should have a search input field', () => {
    render(<LocationsSearchClient locationsList={mockLocations} />);
    
    const input = screen.getByPlaceholderText(/search locations by name/i);
    expect(input).toBeInTheDocument();
  });

  it('should filter locations when searching', () => {
    render(<LocationsSearchClient locationsList={mockLocations} />);
    
    const input = screen.getByPlaceholderText(/search locations by name/i);
    fireEvent.change(input, { target: { value: 'route' } });
    
    expect(screen.getByText(/route 1/i)).toBeInTheDocument();
    expect(screen.getByText(/route 2/i)).toBeInTheDocument();
    expect(screen.queryByText(/viridian/i)).not.toBeInTheDocument();
  });

  it('should be case-insensitive', () => {
    render(<LocationsSearchClient locationsList={mockLocations} />);
    
    const input = screen.getByPlaceholderText(/search locations by name/i);
    fireEvent.change(input, { target: { value: 'VIRIDIAN' } });
    
    expect(screen.getByText(/viridian/i)).toBeInTheDocument();
  });

  it('should have correct links to location detail pages', () => {
    render(<LocationsSearchClient locationsList={mockLocations} />);
    
    const link = screen.getAllByRole('link').find(
      (link) => link.getAttribute('href') === '/locations/viridian-forest'
    );
    
    expect(link).toBeInTheDocument();
  });
});
