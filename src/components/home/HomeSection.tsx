import React from 'react';
import { VideoCard } from '../video/VideoCard';
import { TrendingBar } from './TrendingBar';
import { CategoriesMenu } from './CategoriesMenu';
import { mockVideos } from '../../data/mockData';
import { Video } from '../../types';

interface HomeSectionProps {
  onVideoSelect: (video: Video) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onVideoSelect }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'technology', label: 'Tecnologia' },
    { id: 'design', label: 'Design' },
    { id: 'programming', label: 'Programação' },
    { id: 'tutorial', label: 'Tutorial' },
    { id: 'review', label: 'Review' },
  ];

  const trendingTopics = [
    'React 18',
    'TypeScript',
    'Web3',
    'AI/ML',
    'Next.js',
    'Tailwind CSS'
  ];

  return (
    <div className="space-y-6">
      {/* Categories Menu */}
      <CategoriesMenu
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      {/* Trending Bar */}
      <TrendingBar topics={trendingTopics} />

      {/* Main Feed */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Recomendados para você</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={onVideoSelect}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Em alta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockVideos.slice().reverse().map((video) => (
              <VideoCard
                key={`trending-${video.id}`}
                video={video}
                onClick={onVideoSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};