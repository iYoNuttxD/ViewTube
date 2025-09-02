import React, { useState, createContext } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { HomeSection } from './components/home/HomeSection';
import { SearchSection } from './components/search/SearchSection';
import { WatchSection } from './components/watch/WatchSection';
import { SubscriptionsSection } from './components/subscriptions/SubscriptionsSection';
import { AuthModal } from './components/auth/AuthModal';
import { useAuthProvider, AuthContext } from './hooks/useAuth';
import { Video } from './types';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const authContext = useAuthProvider();

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setActiveSection('watch');
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setActiveSection('search');
  };

  const handleSectionChange = (section: string) => {
    if (section === 'auth') {
      setShowAuthModal(true);
      return;
    }
    
    setActiveSection(section);
    if (section !== 'watch') {
      setSelectedVideo(null);
    }
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection onVideoSelect={handleVideoSelect} />;
      case 'search':
        return (
          <SearchSection 
            initialQuery={searchQuery} 
            onVideoSelect={handleVideoSelect} 
          />
        );
      case 'watch':
        return selectedVideo ? (
          <WatchSection 
            video={selectedVideo} 
            onVideoSelect={handleVideoSelect} 
          />
        ) : (
          <HomeSection onVideoSelect={handleVideoSelect} />
        );
      case 'subscriptions':
        return <SubscriptionsSection onVideoSelect={handleVideoSelect} />;
      default:
        return <HomeSection onVideoSelect={handleVideoSelect} />;
    }
  };

  return (
    <AuthContext.Provider value={authContext}>
      <div className="min-h-screen bg-gray-50">
        <Header 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onSearchSubmit={handleSearchSubmit}
          onAuthClick={() => setShowAuthModal(true)}
        />
        
        <div className="flex">
          <Sidebar
            isOpen={sidebarOpen}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
          
          <main className="flex-1 p-6 overflow-y-auto">
            {renderMainContent()}
          </main>
        </div>

        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} />
        )}
      </div>
    </AuthContext.Provider>
  );
}

export default App;