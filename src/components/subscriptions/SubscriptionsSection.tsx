import React from 'react';
import { VideoCard } from '../video/VideoCard';
import { ChannelsList } from './ChannelsList';
import { mockVideos, mockChannels } from '../../data/mockData';
import { Video } from '../../types';
import { Bell } from 'lucide-react';

interface SubscriptionsSectionProps {
  onVideoSelect: (video: Video) => void;
}

export const SubscriptionsSection: React.FC<SubscriptionsSectionProps> = ({ onVideoSelect }) => {
  const [showAllChannels, setShowAllChannels] = React.useState(false);

  return (
    <div className="space-y-6">
      {/* Channels List */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Seus canais inscritos</h2>
          <button
            onClick={() => setShowAllChannels(!showAllChannels)}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            {showAllChannels ? 'Mostrar menos' : 'Ver todos'}
          </button>
        </div>
        <ChannelsList 
          channels={mockChannels} 
          showAll={showAllChannels}
        />
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bell className="w-5 h-5 text-gray-600" />
          <h3 className="font-medium text-gray-900">Configurações de notificação</h3>
        </div>
        <div className="space-y-3">
          {mockChannels.map((channel) => (
            <div key={channel.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium">{channel.name}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Videos from Subscriptions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Novos vídeos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockVideos.map((video) => (
            <VideoCard
              key={`sub-${video.id}`}
              video={video}
              onClick={onVideoSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};