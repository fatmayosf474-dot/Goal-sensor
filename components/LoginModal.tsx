
import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (name: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-[#121214] border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(37,99,235,0.2)] animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-600/20">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-2-2m0 0l2-2m-2 2h8m-9 3h1a2 2 0 012 2v0a2 2 0 01-2 2h-10a2 2 0 01-2-2v-10a2 2 0 012-2h2m6 6V4a2 2 0 012-2h5a2 2 0 012 2v11a2 2 0 01-2 2h-4" />
            </svg>
          </div>
          <h2 className="text-3xl font-gaming font-bold text-white uppercase tracking-tight">Access Command Center</h2>
          <p className="text-slate-400 text-sm">Join the elite scouting network</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-blue-500 tracking-widest ml-1">Agent Name</label>
            <input 
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. PlayerOne"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="space-y-3">
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all transform active:scale-[0.98]"
            >
              INITIALIZE LOGIN
            </button>
            
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-600"><span className="bg-[#121214] px-2 tracking-widest">Or connect via</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-colors">
                <span className="text-xs font-bold text-white">STEAM</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-colors">
                <span className="text-xs font-bold text-white">KONAMI</span>
              </button>
            </div>
          </div>
        </form>

        <p className="mt-8 text-center text-[10px] text-slate-500 leading-relaxed">
          By logging in, you agree to the GOALSCAN AI Protocol and data processing terms.
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
