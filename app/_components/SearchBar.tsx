'use client';

import { useState, useCallback, useMemo } from 'react';

interface SearchBarProps {
  items: any[];
  searchKey: string;
  onSearch: (filtered: any[]) => void;
  placeholder?: string;
}

export default function SearchBar({
  items,
  searchKey,
  onSearch,
  placeholder = 'Search...',
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;

    return items.filter((item) =>
      item[searchKey]
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [items, searchKey, searchTerm]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      onSearch(value.trim() === '' ? items : filteredItems);
    },
    [items, filteredItems, onSearch]
  );

  return (
    <div className="w-full mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none transition-colors bg-white text-black"
      />
    </div>
  );
}
