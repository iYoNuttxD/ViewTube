import React, { useState } from 'react';
import { TrendingUp, Users, Eye, DollarSign, Globe, BarChart3, PieChart } from 'lucide-react';
import { mockAnalytics } from '../../data/mockData';

export const AnalyticsViewer: React.FC = () => {
  const [timeRange, setTimeRange] = useState('28days');
  const [activeChart, setActiveChart] = useState('overview');

  const timeRanges = [
    { value: '7days', label: 'Últimos 7 dias' },
    { value: '28days', label: 'Últimos 28 dias' },
    { value: '90days', label: 'Últimos 90 dias' },
    { value: '365days', label: 'Último ano' }
  ];

  const overviewStats = [
    {
      label: 'Visualizações',
      value: mockAnalytics.views.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      color: 'blue'
    },
    {
      label: 'Tempo de exibição',
      value: `${Math.floor(mockAnalytics.watchTime / 3600)}h`,
      change: '+8.3%',
      trend: 'up',
      icon: BarChart3,
      color: 'green'
    },
    {
      label: 'Inscritos',
      value: mockAnalytics.subscribers.toLocaleString(),
      change: '+256',
      trend: 'up',
      icon: Users,
      color: 'purple'
    },
    {
      label: 'Receita estimada',
      value: `R$ ${mockAnalytics.revenue.toFixed(2)}`,
      change: '+15.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'yellow'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Analytics do Canal</h2>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600',
            yellow: 'bg-yellow-50 text-yellow-600'
          };
          
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart Navigation */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'overview', label: 'Visão geral', icon: BarChart3 },
            { id: 'demographics', label: 'Demografia', icon: Users },
            { id: 'geography', label: 'Geografia', icon: Globe },
            { id: 'revenue', label: 'Receita', icon: DollarSign }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveChart(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeChart === tab.id
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Chart Content */}
        {activeChart === 'demographics' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Demografia da audiência</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Faixa etária</h4>
                <div className="space-y-2">
                  {mockAnalytics.demographics.age.map((age, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{age.range}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${age.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{age.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Gênero</h4>
                <div className="space-y-2">
                  {mockAnalytics.demographics.gender.map((gender, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{gender.type}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${gender.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{gender.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeChart === 'geography' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Distribuição geográfica</h3>
            <div className="space-y-3">
              {mockAnalytics.demographics.geography.map((country, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{country.country}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{country.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeChart === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Desempenho dos vídeos</h3>
            <div className="space-y-4">
              {mockAnalytics.topVideos.map((video, index) => (
                <div key={video.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-20 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{video.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{video.views.toLocaleString()} visualizações</span>
                      <span>{video.likes.toLocaleString()} curtidas</span>
                    </div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};