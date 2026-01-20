
import React from 'react';
import { AnalysisResult } from '../types';

interface AnalysisResultProps {
  data: AnalysisResult;
  videoUrl: string;
}

const AnalysisResultView: React.FC<AnalysisResultProps> = ({ data, videoUrl }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-blue-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Video and Core Score */}
      <div className="lg:col-span-7 space-y-6">
        <div className="rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video border border-white/10">
          <video src={videoUrl} controls className="w-full h-full object-contain" />
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-gaming font-bold text-white uppercase tracking-wider">{data.title}</h2>
            <div className={`text-5xl font-gaming font-black ${getScoreColor(data.score)}`}>
              {data.score}<span className="text-xl text-white/40">/100</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(data.breakdown).map(([key, value]) => (
              <div key={key} className="bg-black/40 p-3 rounded-xl border border-white/5 text-center">
                <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">{key}</p>
                <div className="relative h-1 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-500" 
                    style={{ width: `${value}%` }}
                  />
                </div>
                <p className="font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6">
          <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Verdict (التقييم)
          </h3>
          <p className="text-lg text-slate-200 leading-relaxed text-right" dir="rtl">
            {data.verdict}
          </p>
        </div>
      </div>

      {/* Evidence and Tips */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Scouting Proof (الدلائل)
          </h3>
          <ul className="space-y-4" dir="rtl">
            {data.evidence.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-slate-300 text-sm">
                <span className="w-6 h-6 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-blue-400 border border-white/10">
                  {idx + 1}
                </span>
                <p className="flex-1">{item}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6">
          <h3 className="text-yellow-500 font-bold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Pro Tips
          </h3>
          <ul className="space-y-3">
            {data.tips.map((tip, idx) => (
              <li key={idx} className="text-slate-400 text-xs italic flex gap-2">
                <span>•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultView;
