
import React, { useState } from 'react';
import Header from './components/Header';
import VideoUpload from './components/VideoUpload';
import AnalysisResultView from './components/AnalysisResult';
import LoginModal from './components/LoginModal';
import { analyzeGameplayVideo } from './services/gemini';
import { AnalysisResult, AnalysisStatus, User } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<AnalysisStatus>(AnalysisStatus.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileSelect = async (file: File) => {
    try {
      setStatus(AnalysisStatus.LOADING);
      setError(null);
      
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      
      const objectUrl = URL.createObjectURL(file);
      setVideoUrl(objectUrl);

      const base64 = await fileToBase64(file);
      const analysis = await analyzeGameplayVideo(base64, file.type);
      
      setResult(analysis);
      setStatus(AnalysisStatus.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while analyzing the video.');
      setStatus(AnalysisStatus.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(AnalysisStatus.IDLE);
    setResult(null);
    setVideoUrl(null);
    setError(null);
  };

  const handleLogin = (name: string) => {
    setUser({ id: Math.random().toString(36), name });
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <Header 
        user={user} 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        onLogout={handleLogout}
      />
      
      <main className="flex-1 flex flex-col items-center px-4 py-12 md:px-8">
        {status === AnalysisStatus.IDLE && (
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-gaming font-black text-white uppercase tracking-tighter leading-none">
                Get Scouted by <span className="text-blue-500">AI</span>
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-light">
                {user ? `Welcome back, ${user.name}. Ready for a professional scouting report?` : 'Upload your best goals and skill moves. Our AI analyst evaluates your performance and gives you a professional score.'}
              </p>
            </div>
            
            <VideoUpload onFileSelect={handleFileSelect} isLoading={false} />

            <div className="flex flex-wrap justify-center gap-6 pt-8 opacity-50">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-xs font-bold uppercase tracking-widest">Finishing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-xs font-bold uppercase tracking-widest">Skill Moves</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span className="text-xs font-bold uppercase tracking-widest">Tactics</span>
              </div>
            </div>
          </div>
        )}

        {status === AnalysisStatus.LOADING && (
          <div className="flex flex-col items-center justify-center space-y-8 py-20">
            <VideoUpload onFileSelect={() => {}} isLoading={true} />
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-gaming font-bold text-white uppercase animate-pulse">Analyzing Frames...</h3>
              <p className="text-slate-500 text-sm italic">Reviewing build-up play, distance, and finishing technique...</p>
            </div>
          </div>
        )}

        {status === AnalysisStatus.SUCCESS && result && videoUrl && (
          <div className="w-full flex flex-col items-center space-y-8">
            <button 
              onClick={handleReset}
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest self-start max-w-5xl mx-auto"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Upload Another
            </button>
            <AnalysisResultView data={result} videoUrl={videoUrl} />
          </div>
        )}

        {status === AnalysisStatus.ERROR && (
          <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-3xl text-center space-y-6 max-w-md">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto text-red-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Analysis Failed</h3>
              <p className="text-slate-400 text-sm">{error}</p>
            </div>
            <button 
              onClick={handleReset}
              className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all"
            >
              TRY AGAIN
            </button>
          </div>
        )}
      </main>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin} 
      />

      <footer className="py-8 px-8 border-t border-white/5 text-center text-slate-600 text-xs">
        <p>© 2025 GoalScan AI. Powered by Gemini 3 Flash. Built for the PES 2026 community.</p>
      </footer>
    </div>
  );
};

export default App;
