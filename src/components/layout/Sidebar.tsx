import React from 'react';
import { Home, Search, Bookmark, Youtube, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeSection, onSectionChange }) => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'search', label: 'Explorar', icon: Search },
    { id: 'subscriptions', label: 'Inscrições', icon: Bookmark, requiresAuth: true },
  ];

  return (
    <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-16'
    } min-h-screen overflow-y-auto`}>
      <nav className="p-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            // Hide auth-required items when user is not logged in
            if (item.requiresAuth && !user) return null;
            
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-red-50 text-red-600 border-r-4 border-red-600 shadow-sm' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Icon className="w-6 h-6 flex-shrink-0" />
                {isOpen && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Section */}
        {!user && (
          <>
            <hr className="my-4" />
            <div className="px-3">
              {isOpen ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Faça login para curtir vídeos, comentar e se inscrever.
                  </p>
                  <button 
                    onClick={() => onSectionChange('auth')}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span className="font-medium">Fazer login</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => onSectionChange('auth')}
                  className="w-full p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Fazer login"
                >
                  <UserIcon className="w-6 h-6 text-gray-600" />
                </button>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 px-3">
          {isOpen && (
            <div className="text-xs text-gray-500 space-y-1">
              <p>© 2025 ViewTube</p>
              <p>Plataforma de vídeos</p>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};