import React, { useState } from 'react';
import { Search, Bell, User, Menu, Youtube } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  onMenuToggle: () => void;
  onSearchSubmit: (query: string) => void;
  onAuthClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, onSearchSubmit, onAuthClick }) => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <Youtube className="w-8 h-8 text-red-600" />
            <span className="text-xl font-semibold text-gray-900">ViewTube</span>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="flex">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar vídeos..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg py-2 w-48 border z-10">
                  <div className="px-4 py-2 border-b">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50">
                    Seu canal
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-50">
                    Configurações
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={onAuthClick}
              className="flex items-center space-x-2 px-4 py-2 border border-red-600 text-red-600 rounded-full hover:bg-red-50 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Entrar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};