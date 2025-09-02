import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Video } from '../../types';
import { Eye, ThumbsUp } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onClick: (video: Video) => void;
  size?: 'small' | 'medium' | 'large';
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick, size = 'medium' }) => {
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const sizeClasses = {
    small: 'max-w-xs',
    medium: 'max-w-sm',
    large: 'max-w-md'
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group ${sizeClasses[size]}`}
      onClick={() => onClick(video)}
    >
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-sm px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex space-x-3">
          <img
            src={video.creator.avatar}
            alt={video.creator.name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
              {video.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{video.creator.name}</p>
            <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{formatViews(video.views)} visualizações</span>
              </div>
              <span>•</span>
              <span>{formatDistanceToNow(video.uploadDate, { addSuffix: true, locale: ptBR })}</span>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <ThumbsUp className="w-4 h-4" />
                <span>{formatViews(video.likes)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};