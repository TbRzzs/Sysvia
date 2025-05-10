
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ placeholder = "Buscar...", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch?.('');
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1 max-w-lg">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-envio-gray-400" />
        </div>
        <input
          type="search"
          className="block w-full p-2 pl-10 pr-10 bg-white border border-envio-gray-200 rounded-lg focus:ring-2 focus:ring-envio-red/20 focus:border-envio-red text-sm outline-none"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={handleClear}
          >
            <X className="w-4 h-4 text-envio-gray-400 hover:text-envio-gray-600" />
          </button>
        )}
      </div>
    </form>
  );
}
