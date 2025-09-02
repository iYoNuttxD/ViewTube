import React, { useState } from 'react';
import { Settings, Video as VideoIcon, Users, Shield, Bell } from 'lucide-react';

export const VideoSettingsEditor: React.FC = () => {
  const [channelSettings, setChannelSettings] = useState({
    name: 'Tech Master',
    description: 'Canal dedicado ao ensino de tecnologia e programação moderna',
    keywords: 'tecnologia, programação, web development, react, javascript',
    defaultLanguage: 'pt-BR',
    country: 'BR',
    privacy: 'public',
    monetization: true,
    comments: 'all',
    notifications: {
      uploads: true,
      comments: true,
      subscribers: true
    }
  });

  const handleSettingChange = (field: string, value: any) => {
    setChannelSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setChannelSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Channel Info */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-6">
          <VideoIcon className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-semibold">Informações do canal</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome do canal
            </label>
            <input
              type="text"
              value={channelSettings.name}
              onChange={(e) => handleSettingChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              País/região
            </label>
            <select
              value={channelSettings.country}
              onChange={(e) => handleSettingChange('country', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="BR">Brasil</option>
              <option value="US">Estados Unidos</option>
              <option value="PT">Portugal</option>
              <option value="ES">Espanha</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição do canal
            </label>
            <textarea
              value={channelSettings.description}
              onChange={(e) => handleSettingChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              rows={4}
            />
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Palavras-chave
            </label>
            <input
              type="text"
              value={channelSettings.keywords}
              onChange={(e) => handleSettingChange('keywords', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Separe as palavras-chave por vírgulas"
            />
          </div>
        </div>
      </div>

      {/* Privacy & Permissions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Privacidade e permissões</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Configuração padrão de privacidade
            </label>
            <div className="space-y-2">
              {[
                { value: 'public', label: 'Público', desc: 'Qualquer pessoa pode pesquisar e visualizar' },
                { value: 'unlisted', label: 'Não listado', desc: 'Qualquer pessoa com o link pode visualizar' },
                { value: 'private', label: 'Privado', desc: 'Apenas você pode visualizar' }
              ].map((option) => (
                <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="privacy"
                    value={option.value}
                    checked={channelSettings.privacy === option.value}
                    onChange={(e) => handleSettingChange('privacy', e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Comentários
            </label>
            <select
              value={channelSettings.comments}
              onChange={(e) => handleSettingChange('comments', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">Permitir todos os comentários</option>
              <option value="subscribers">Apenas inscritos</option>
              <option value="approval">Aprovar antes de publicar</option>
              <option value="disabled">Desabilitar comentários</option>
            </select>
          </div>
        </div>
      </div>

      {/* Monetization */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-6">
          <DollarSign className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-semibold">Monetização</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Monetização do canal</h3>
              <p className="text-sm text-gray-600">Permitir anúncios nos seus vídeos</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={channelSettings.monetization}
                onChange={(e) => handleSettingChange('monetization', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          {channelSettings.monetization && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">Monetização ativa</h4>
              <p className="text-sm text-green-700">
                Seu canal está habilitado para monetização. Os anúncios serão exibidos automaticamente nos vídeos elegíveis.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Bell className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold">Notificações</h2>
        </div>

        <div className="space-y-4">
          {[
            { key: 'uploads', label: 'Novos uploads', desc: 'Notificar sobre novos vídeos do canal' },
            { key: 'comments', label: 'Comentários', desc: 'Notificar sobre novos comentários' },
            { key: 'subscribers', label: 'Novos inscritos', desc: 'Notificar sobre novos inscritos' }
          ].map((setting) => (
            <div key={setting.key} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{setting.label}</h3>
                <p className="text-sm text-gray-600">{setting.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={channelSettings.notifications[setting.key as keyof typeof channelSettings.notifications]}
                  onChange={(e) => handleNotificationChange(setting.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
          Salvar configurações
        </button>
      </div>
    </div>
  );
};