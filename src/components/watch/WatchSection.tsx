import React, { useState } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { CommentsSection } from './CommentsSection';
import { RecommendationsSidebar } from './RecommendationsSidebar';
import { VideoInfo } from './VideoInfo';
import { Video } from '../../types';
import { mockVideos, mockComments } from '../../data/mockData';

interface WatchSectionProps {
  video: Video;
  onVideoSelect: (video: Video) => void;
}

export const WatchSection: React.FC<WatchSectionProps> = ({ video, onVideoSelect }) => {
  const [showComments, setShowComments] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Video Area */}
      <div className="lg:col-span-2 space-y-6">
        <VideoPlayer video={video} />
        <VideoInfo video={video} />
        {showComments && (
          <CommentsSection 
            comments={mockComments}
            onToggle={() => setShowComments(!showComments)}
          />
        )}
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        <RecommendationsSidebar
          videos={mockVideos.filter(v => v.id !== video.id)}
          onVideoSelect={onVideoSelect}
        />
      </div>
    </div>
  );
};