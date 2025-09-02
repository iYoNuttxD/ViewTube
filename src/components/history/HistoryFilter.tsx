import React from 'react';
import { Search } from 'lucide-react';

interface HistoryFilterProps {
  filterType: string;
  searchQuery: string;
  onFilterChange: (type: string) => void;
  onSearchChange: (query: string) => void;
}

export const HistoryFilter: React.FC<HistoryFilterProps> = ({
  filterType,
  searchQuery,
  onFilterChange,
  onSearchChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        {[
          { id: 'all', label: 'Todos' },
          { id: 'completed', label: 'Assistidos' },
          { id: 'incomplete', label: 'Parciais' }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              filterType === filter.id
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Pesquisar no histórico..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
    </div>
  );
};