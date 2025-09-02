export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  subscribers: number;
  isCreator: boolean;
  joinDate: Date;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  dislikes: number;
  uploadDate: Date;
  creator: {
    id: string;
    name: string;
    avatar: string;
    subscribers: number;
  };
  category: string;
  tags: string[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  description: string;
  subscribers: number;
  videos: number;
  isSubscribed: boolean;
}

export interface Subscription {
  id: string;
  channelId: string;
  channelName: string;
  channelAvatar: string;
  subscribedAt: Date;
  notifications: boolean;
}

export interface HistoryItem {
  id: string;
  video: Video;
  watchedAt: Date;
  watchTime: number;
  completed: boolean;
}

export interface Analytics {
  views: number;
  watchTime: number;
  subscribers: number;
  revenue: number;
  topVideos: Video[];
  demographics: {
    age: { range: string; percentage: number }[];
    gender: { type: string; percentage: number }[];
    geography: { country: string; percentage: number }[];
  };
}