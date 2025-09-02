import { Video, Channel, Comment, HistoryItem, Analytics } from '../types';

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Como Criar uma Aplicação React Moderna',
    description: 'Aprenda a criar aplicações React do zero com as melhores práticas',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '15:42',
    views: 125000,
    likes: 5200,
    dislikes: 120,
    uploadDate: new Date('2024-12-15'),
    creator: {
      id: 'creator1',
      name: 'Tech Master',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=80',
      subscribers: 45000
    },
    category: 'Technology',
    tags: ['React', 'JavaScript', 'Web Development']
  },
  {
    id: '2',
    title: 'Tendências de Design UI/UX para 2025',
    description: 'Descubra as principais tendências de design que dominarão 2025',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '22:18',
    views: 89000,
    likes: 3800,
    dislikes: 95,
    uploadDate: new Date('2024-12-20'),
    creator: {
      id: 'creator2',
      name: 'Design Pro',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=80',
      subscribers: 67000
    },
    category: 'Design',
    tags: ['UI', 'UX', 'Design Trends']
  },
  {
    id: '3',
    title: 'Inteligência Artificial na Prática',
    description: 'Como implementar IA em projetos reais com exemplos práticos',
    thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '31:25',
    views: 203000,
    likes: 8900,
    dislikes: 245,
    uploadDate: new Date('2024-12-18'),
    creator: {
      id: 'creator3',
      name: 'AI Academy',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=80',
      subscribers: 128000
    },
    category: 'Technology',
    tags: ['AI', 'Machine Learning', 'Python']
  }
];

export const mockChannels: Channel[] = [
  {
    id: 'creator1',
    name: 'Tech Master',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    banner: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Canal dedicado ao ensino de tecnologia e programação moderna',
    subscribers: 45000,
    videos: 127,
    isSubscribed: true
  },
  {
    id: 'creator2',
    name: 'Design Pro',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    banner: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Explorando o mundo do design UI/UX com dicas profissionais',
    subscribers: 67000,
    videos: 89,
    isSubscribed: false
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'João Silva',
    userAvatar: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=80',
    content: 'Excelente tutorial! Muito bem explicado.',
    timestamp: new Date('2024-12-21T10:30:00'),
    likes: 24
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Maria Santos',
    userAvatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=80',
    content: 'Finalmente entendi como implementar essas funcionalidades. Obrigada!',
    timestamp: new Date('2024-12-21T14:15:00'),
    likes: 18
  }
];

export const mockHistory: HistoryItem[] = [
  {
    id: '1',
    video: mockVideos[0],
    watchedAt: new Date('2024-12-21T09:00:00'),
    watchTime: 940, // seconds
    completed: true
  },
  {
    id: '2',
    video: mockVideos[1],
    watchedAt: new Date('2024-12-20T18:30:00'),
    watchTime: 620,
    completed: false
  }
];

export const mockAnalytics: Analytics = {
  views: 1250000,
  watchTime: 450000,
  subscribers: 45000,
  revenue: 2840.50,
  topVideos: mockVideos.slice(0, 3),
  demographics: {
    age: [
      { range: '18-24', percentage: 35 },
      { range: '25-34', percentage: 40 },
      { range: '35-44', percentage: 20 },
      { range: '45+', percentage: 5 }
    ],
    gender: [
      { type: 'Masculino', percentage: 65 },
      { type: 'Feminino', percentage: 32 },
      { type: 'Outros', percentage: 3 }
    ],
    geography: [
      { country: 'Brasil', percentage: 45 },
      { country: 'Portugal', percentage: 25 },
      { country: 'Estados Unidos', percentage: 15 },
      { country: 'Outros', percentage: 15 }
    ]
  }
};