import React, { useState } from 'react';
import { VideoCard } from '../video/VideoCard';
import { HistoryFilter } from './HistoryFilter';
import { mockHistory } from '../../data/mockData';
import { Video } from '../../types';
import { Trash2, Calendar } from 'lucide-react';

interface HistorySectionProps {
  onVideoSelect: (video: Video) => void;
}

export const HistorySection: React.FC<HistorySectionProps> = ({ onVideoSelect }) => {
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = mockHistory.filter(item => {
    const matchesSearch = item.video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || 
      (filterType === 'completed' && item.completed) ||
      (filterType === 'incomplete' && !item.completed);
    
    return matchesSearch && matchesFilter;
  });

  const handleClearHistory = () => {
    if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
      // Implementation would clear history
      console.log('Clearing history...');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-red-600" />
            <h1 className="text-2xl font-bold">Histórico de visualizações</h1>
          </div>
          <button
            onClick={handleClearHistory}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Limpar histórico</span>
          </button>
        </div>

        <HistoryFilter
          filterType={filterType}
          searchQuery={searchQuery}
          onFilterChange={setFilterType}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex space-x-4">
              <div className="flex-shrink-0 relative">
                <img
                  src={item.video.thumbnail}
                  alt={item.video.title}
                  className="w-48 h-28 object-cover rounded-lg cursor-pointer"
                  onClick={() => onVideoSelect(item.video)}
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-sm px-2 py-1 rounded">
                  {item.video.duration}
                </div>
                {!item.completed && (
                  <div className="absolute bottom-0 left-0 right-0 bg-red-600 h-1 rounded-b-lg" 
                       style={{ width: `${(item.watchTime / 940) * 100}%` }} />
                )}
              </div>
              <div className="flex-1">
                <h3
                  className="text-lg font-medium text-gray-900 hover:text-red-600 cursor-pointer line-clamp-2 mb-2"
                  onClick={() => onVideoSelect(item.video)}
                >
                  {item.video.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                  <span>{item.video.creator.name}</span>
                  <span>•</span>
                  <span>{item.video.views.toLocaleString()} visualizações</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {item.video.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Assistido em {item.watchedAt.toLocaleDateString('pt-BR')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.completed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.completed ? 'Completo' : 'Parcial'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};