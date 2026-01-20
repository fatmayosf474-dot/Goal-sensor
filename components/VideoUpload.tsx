
import React, { useRef, useState } from 'react';

interface VideoUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onFileSelect, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if (files[0].type.startsWith('video/')) {
        onFileSelect(files[0]);
      } else {
        alert('Please upload a valid video file.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative group w-full max-w-2xl aspect-video rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8 text-center cursor-pointer overflow-hidden ${
        isDragging 
          ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' 
          : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
      }`}
      onClick={() => !isLoading && fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        accept="video/*"
        onChange={handleChange}
        disabled={isLoading}
      />
      
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-blue-400 font-medium">Scouting your performance...</p>
        </div>
      ) : (
        <>
          <div className="mb-4 p-4 rounded-full bg-blue-600/10 text-blue-500 group-hover:scale-110 transition-transform">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">Upload Your Highlight</h3>
          <p className="text-slate-400 text-sm max-w-xs mx-auto">
            Drag and drop your PES 2026 or eFootball goal clips here to get an AI score.
          </p>
          <div className="mt-6 px-6 py-2 bg-white text-black rounded-full font-bold text-sm shadow-xl hover:bg-blue-500 hover:text-white transition-colors">
            SELECT VIDEO
          </div>
        </>
      )}
    </div>
  );
};

export default VideoUpload;
