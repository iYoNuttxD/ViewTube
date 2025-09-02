import React from 'react';
import { Video } from '../../types';
import { Eye } from 'lucide-react';

interface RecommendationsSidebarProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

export const RecommendationsSidebar: React.FC<RecommendationsSidebarProps> = ({ videos, onVideoSelect }) => {
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Próximos vídeos</h3>
      
      {videos.map((video) => (
        <div
          key={video.id}
          onClick={() => onVideoSelect(video)}
          className="flex space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
        >
          <div className="relative flex-shrink-0">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-32 h-18 object-cover rounded-lg group-hover:scale-105 transition-transform"
            />
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
              {video.duration}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors mb-1">
              {video.title}
            </h4>
            <p className="text-sm text-gray-600 mb-1">{video.creator.name}</p>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Eye className="w-3 h-3" />
              <span>{formatViews(video.views)} visualizações</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};