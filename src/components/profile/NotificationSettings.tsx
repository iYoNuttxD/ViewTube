import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Monitor } from 'lucide-react';

export const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    subscriptions: {
      email: true,
      desktop: true,
      mobile: true
    },
    activity: {
      email: false,
      desktop: true,
      mobile: true
    },
    recommendations: {
      email: true,
      desktop: false,
      mobile: false
    }
  });

  const handleChange = (category: string, type: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [type]: value
      }
    }));
  };

  const notificationCategories = [
    {
      id: 'subscriptions',
      title: 'Inscrições',
      description: 'Novos vídeos dos canais que você segue',
      icon: Bell
    },
    {
      id: 'activity',
      title: 'Atividade na sua conta',
      description: 'Curtidas, comentários e menções',
      icon: Bell
    },
    {
      id: 'recommendations',
      title: 'Recomendações',
      description: 'Vídeos sugeridos para você',
      icon: Bell
    }
  ];

  const notificationTypes = [
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'desktop', label: 'Desktop', icon: Monitor },
    { id: 'mobile', label: 'Mobile', icon: Smartphone }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-6">Preferências de notificação</h2>
        
        <div className="space-y-6">
          {notificationCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 text-red-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                
                <div className="ml-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {notificationTypes.map((type) => {
                    const TypeIcon = type.icon;
                    const isEnabled = settings[category.id as keyof typeof settings][type.id as keyof typeof settings.subscriptions];
                    
                    return (
                      <div key={type.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <TypeIcon className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium">{type.label}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={(e) => handleChange(category.id, type.id, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t">
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
            Salvar preferências
          </button>
        </div>
      </div>
    </div>
  );
};