import React, { useState } from 'react';
import { VideoCard } from '../video/VideoCard';
import { SearchBox } from './SearchBox';
import { SearchFilters } from './SearchFilters';
import { mockVideos } from '../../data/mockData';
import { Video } from '../../types';

interface SearchSectionProps {
  initialQuery?: string;
  onVideoSelect: (video: Video) => void;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ initialQuery = '', onVideoSelect }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState('relevance');
  const [uploadDate, setUploadDate] = useState('any');
  const [duration, setDuration] = useState('any');

  const filteredVideos = mockVideos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.creator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <SearchBox
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onSearch={setSearchQuery}
      />

      <SearchFilters
        sortBy={sortBy}
        uploadDate={uploadDate}
        duration={duration}
        onSortChange={setSortBy}
        onUploadDateChange={setUploadDate}
        onDurationChange={setDuration}
      />

      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Cerca de {filteredVideos.length} resultados para "{searchQuery}"
        </p>
      </div>

      <div className="space-y-4">
        {filteredVideos.map((video) => (
          <div key={video.id} className="flex space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex-shrink-0">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-48 h-28 object-cover rounded-lg cursor-pointer"
                onClick={() => onVideoSelect(video)}
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-sm px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            <div className="flex-1">
              <h3
                className="text-lg font-medium text-gray-900 hover:text-red-600 cursor-pointer line-clamp-2"
                onClick={() => onVideoSelect(video)}
              >
                {video.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                <span>{video.views.toLocaleString()} visualizações</span>
                <span>•</span>
                <span>há {Math.floor(Math.random() * 30) + 1} dias</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <img
                  src={video.creator.avatar}
                  alt={video.creator.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600">{video.creator.name}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};