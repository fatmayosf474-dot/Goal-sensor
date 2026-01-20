
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onLogout }) => {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-white/10 flex items-center justify-between sticky top-0 bg-black/50 backdrop-blur-md z-50">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-gaming font-bold tracking-tighter text-white">
          GOAL<span className="text-blue-500">SCAN</span> <span className="text-xs uppercase bg-blue-500/20 px-1 py-0.5 rounded text-blue-400 border border-blue-500/30">AI Scout</span>
        </h1>
      </div>
      
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
        <a href="#" className="hover:text-white transition-colors">Analyzer</a>
        <a href="#" className="hover:text-white transition-colors">Ranking</a>
        <a href="#" className="hover:text-white transition-colors">Support</a>
      </nav>

      {user ? (
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-white tracking-tight uppercase">{user.name}</p>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">PRO SCOUT</p>
          </div>
          <button 
            onClick={onLogout}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group relative"
            title="Logout"
          >
            <svg className="w-5 h-5 text-slate-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      ) : (
        <button 
          onClick={onLoginClick}
          className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-500 hover:text-white transition-all transform active:scale-95 shadow-lg shadow-white/5"
        >
          LOGIN
        </button>
      )}
    </header>
  );
};

export default Header;
