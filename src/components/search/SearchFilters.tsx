import React from 'react';
import { Filter } from 'lucide-react';

interface SearchFiltersProps {
  sortBy: string;
  uploadDate: string;
  duration: string;
  onSortChange: (value: string) => void;
  onUploadDateChange: (value: string) => void;
  onDurationChange: (value: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  sortBy,
  uploadDate,
  duration,
  onSortChange,
  onUploadDateChange,
  onDurationChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="font-medium text-gray-900">Filtros</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ordenar por
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="relevance">Relevância</option>
            <option value="upload_date">Data de upload</option>
            <option value="view_count">Número de visualizações</option>
            <option value="rating">Classificação</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data de upload
          </label>
          <select
            value={uploadDate}
            onChange={(e) => onUploadDateChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="any">Qualquer momento</option>
            <option value="hour">Última hora</option>
            <option value="today">Hoje</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mês</option>
            <option value="year">Este ano</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duração
          </label>
          <select
            value={duration}
            onChange={(e) => onDurationChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="any">Qualquer duração</option>
            <option value="short">Menos de 4 minutos</option>
            <option value="medium">4-20 minutos</option>
            <option value="long">Mais de 20 minutos</option>
          </select>
        </div>
      </div>
    </div>
  );
};