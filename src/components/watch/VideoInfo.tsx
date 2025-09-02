import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Share, Download, Flag, Eye } from 'lucide-react';
import { Video } from '../../types';

interface VideoInfoProps {
  video: Video;
}

export const VideoInfo: React.FC<VideoInfoProps> = ({ video }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const formatViews = (views: number) => {
    return views.toLocaleString('pt-BR');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{video.title}</h1>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 text-gray-600">
          <Eye className="w-5 h-5" />
          <span>{formatViews(video.views)} visualizações</span>
          <span>•</span>
          <span>{video.uploadDate.toLocaleDateString('pt-BR')}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setIsLiked(!isLiked);
              if (isDisliked) setIsDisliked(false);
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
              isLiked ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <ThumbsUp className="w-5 h-5" />
            <span>{video.likes + (isLiked ? 1 : 0)}</span>
          </button>
          
          <button
            onClick={() => {
              setIsDisliked(!isDisliked);
              if (isLiked) setIsLiked(false);
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
              isDisliked ? 'bg-red-50 text-red-600' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <ThumbsDown className="w-5 h-5" />
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
            <Share className="w-5 h-5" />
            <span>Compartilhar</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
            <Download className="w-5 h-5" />
            <span>Download</span>
          </button>
          
          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
            <Flag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Channel Info */}
      <div className="flex items-center justify-between border-t pt-6">
        <div className="flex items-center space-x-4">
          <img
            src={video.creator.avatar}
            alt={video.creator.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{video.creator.name}</h3>
            <p className="text-sm text-gray-600">{video.creator.subscribers.toLocaleString()} inscritos</p>
          </div>
        </div>
        
        <button className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-colors">
          Inscrever-se
        </button>
      </div>

      {/* Description */}
      <div className="mt-6">
        <div className={`text-gray-700 ${showFullDescription ? '' : 'line-clamp-3'}`}>
          {video.description}
        </div>
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-gray-600 hover:text-gray-800 font-medium mt-2"
        >
          {showFullDescription ? 'Mostrar menos' : 'Mostrar mais'}
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {video.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};