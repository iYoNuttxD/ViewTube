import React from 'react';
import { TrendingUp } from 'lucide-react';

interface TrendingBarProps {
  topics: string[];
}

export const TrendingBar: React.FC<TrendingBarProps> = ({ topics }) => {
  return (
    <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 border">
      <div className="flex items-center space-x-2 mb-3">
        <TrendingUp className="w-5 h-5 text-red-600" />
        <h3 className="font-medium text-gray-900">Assuntos em alta</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors border"
          >
            #{topic}
          </span>
        ))}
      </div>
    </div>
  );
};