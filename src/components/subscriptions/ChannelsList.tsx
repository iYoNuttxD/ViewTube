import React from 'react';
import { Channel } from '../../types';
import { Users, Video } from 'lucide-react';

interface ChannelsListProps {
  channels: Channel[];
  showAll: boolean;
}

export const ChannelsList: React.FC<ChannelsListProps> = ({ channels, showAll }) => {
  const displayChannels = showAll ? channels : channels.slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {displayChannels.map((channel) => (
        <div key={channel.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="flex items-center space-x-3 mb-3">
            <img
              src={channel.avatar}
              alt={channel.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900">{channel.name}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{channel.subscribers.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Video className="w-4 h-4" />
                  <span>{channel.videos}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
              channel.isSubscribed
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {channel.isSubscribed ? 'Inscrito' : 'Inscrever-se'}
          </button>
        </div>
      ))}
    </div>
  );
};