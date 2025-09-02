import React, { useState } from 'react';
import { Upload, File, X, Check, AlertCircle, Video as VideoIcon } from 'lucide-react';

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  thumbnail?: string;
  title: string;
  description: string;
}

export const UploadManager: React.FC = () => {
  const [uploads, setUploads] = useState<UploadFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const videoFiles = files.filter(file => file.type.startsWith('video/'));
    
    videoFiles.forEach(file => {
      const newUpload: UploadFile = {
        id: Math.random().toString(36),
        file,
        progress: 0,
        status: 'uploading',
        title: file.name.replace(/\.[^/.]+$/, ''),
        description: ''
      };
      
      setUploads(prev => [...prev, newUpload]);
      simulateUpload(newUpload.id);
    });
  };

  const simulateUpload = (uploadId: string) => {
    const interval = setInterval(() => {
      setUploads(prev => prev.map(upload => {
        if (upload.id === uploadId) {
          const newProgress = Math.min(upload.progress + Math.random() * 10, 100);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            return { ...upload, progress: 100, status: 'processing' };
          }
          
          return { ...upload, progress: newProgress };
        }
        return upload;
      }));
    }, 200);

    // Simulate processing completion
    setTimeout(() => {
      setUploads(prev => prev.map(upload => {
        if (upload.id === uploadId && upload.status === 'processing') {
          return { ...upload, status: 'completed' };
        }
        return upload;
      }));
    }, 5000);
  };

  const removeUpload = (uploadId: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== uploadId));
  };

  const updateUploadInfo = (uploadId: string, field: 'title' | 'description', value: string) => {
    setUploads(prev => prev.map(upload => {
      if (upload.id === uploadId) {
        return { ...upload, [field]: value };
      }
      return upload;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragActive 
              ? 'border-red-500 bg-red-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
        >
          <VideoIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Faça upload dos seus vídeos
          </h3>
          <p className="text-gray-600 mb-4">
            Arraste e solte os arquivos de vídeo aqui ou clique para selecionar
          </p>
          <input
            type="file"
            multiple
            accept="video/*"
            className="hidden"
            id="video-upload"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              files.forEach(file => {
                const newUpload: UploadFile = {
                  id: Math.random().toString(36),
                  file,
                  progress: 0,
                  status: 'uploading',
                  title: file.name.replace(/\.[^/.]+$/, ''),
                  description: ''
                };
                
                setUploads(prev => [...prev, newUpload]);
                simulateUpload(newUpload.id);
              });
            }}
          />
          <label
            htmlFor="video-upload"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-colors"
          >
            <Upload className="w-5 h-5" />
            <span>Selecionar arquivos</span>
          </label>
        </div>
      </div>

      {/* Upload Queue */}
      {uploads.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Uploads em andamento</h3>
          <div className="space-y-4">
            {uploads.map((upload) => (
              <div key={upload.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <File className="w-8 h-8 text-gray-400" />
                    <div>
                      <h4 className="font-medium text-gray-900">{upload.file.name}</h4>
                      <p className="text-sm text-gray-600">
                        {(upload.file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeUpload(upload.id)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {upload.status === 'uploading' && 'Fazendo upload...'}
                      {upload.status === 'processing' && 'Processando...'}
                      {upload.status === 'completed' && 'Concluído'}
                      {upload.status === 'error' && 'Erro no upload'}
                    </span>
                    <span className="text-sm text-gray-500">{Math.round(upload.progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        upload.status === 'error' ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${upload.progress}%` }}
                    />
                  </div>
                </div>

                {/* Status Icon */}
                <div className="flex items-center space-x-2 mb-4">
                  {upload.status === 'completed' && <Check className="w-5 h-5 text-green-600" />}
                  {upload.status === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
                  <span className={`text-sm ${
                    upload.status === 'completed' ? 'text-green-600' : 
                    upload.status === 'error' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {upload.status === 'completed' && 'Upload concluído com sucesso'}
                    {upload.status === 'processing' && 'Processando vídeo...'}
                    {upload.status === 'uploading' && 'Enviando arquivo...'}
                    {upload.status === 'error' && 'Erro ao fazer upload'}
                  </span>
                </div>

                {/* Video Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título
                    </label>
                    <input
                      type="text"
                      value={upload.title}
                      onChange={(e) => updateUploadInfo(upload.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Título do vídeo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descrição
                    </label>
                    <textarea
                      value={upload.description}
                      onChange={(e) => updateUploadInfo(upload.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Descrição do vídeo"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Guidelines */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Diretrizes de upload</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Formatos suportados: MP4, MOV, AVI, WMV, FLV, WebM</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Tamanho máximo: 256GB ou 12 horas de duração</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Resolução recomendada: 1080p (1920x1080) ou superior</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Use títulos descritivos e tags relevantes para melhor descoberta</span>
          </li>
        </ul>
      </div>
    </div>
  );
};