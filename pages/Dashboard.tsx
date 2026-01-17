
import React from 'react';
import { Page, User } from '../types';
import GlassCard from '../components/GlassCard';

interface DashboardProps {
  user: User | null;
  onNavigate: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const lastAnalysis = user?.lastAnalysis;

  return (
    <div className="px-6 pt-12 pb-24">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-gray-500 text-xs font-bold uppercase tracking-widest">Operator Status: Active</h2>
          <h1 className="text-2xl font-black text-white">Hello, {user?.name || 'Protocol User'}</h1>
        </div>
        <div className="w-10 h-10 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/10 flex items-center justify-center text-[#00ff88]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </header>

      {/* Main Analysis Card */}
      <GlassCard 
        variant="green" 
        className="mb-8 p-6 relative overflow-hidden"
        onClick={() => onNavigate(Page.SCAN)}
      >
        <div className="relative z-10">
          <h3 className="text-[#00ff88] text-[10px] font-black uppercase tracking-[0.2em] mb-1">Current Metric</h3>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-5xl font-black">{lastAnalysis?.overallRating || '--'}</span>
            <span className="text-gray-500 text-sm font-bold uppercase">Overall Score</span>
          </div>
          <button className="bg-white/10 text-white text-xs font-black px-4 py-2 rounded-lg uppercase tracking-wider hover:bg-white/20 transition-all">
            {lastAnalysis ? 'Re-Scan Face' : 'Start First Scan'}
          </button>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-10">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </GlassCard>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-2 gap-4">
        <GlassCard 
          variant="purple"
          className="flex flex-col justify-between aspect-square"
          onClick={() => onNavigate(Page.TIPS)}
        >
          <span className="text-[10px] font-black uppercase text-[#9d4edd] tracking-widest">Roadmap</span>
          <p className="text-white text-sm font-bold mt-2">30-Day Glow Up Protocol</p>
          <div className="mt-auto flex items-center justify-between text-[10px] text-gray-500 font-bold">
            <span>Progress</span>
            <span className="text-[#9d4edd]">12%</span>
          </div>
        </GlassCard>

        <GlassCard 
          className="flex flex-col justify-between aspect-square"
          onClick={() => onNavigate(Page.TIPS)}
        >
          <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Face Lab</span>
          <p className="text-white text-sm font-bold mt-2">Ideal Proportion Matching</p>
          <div className="mt-auto h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#00ff88]" style={{ width: '45%' }}></div>
          </div>
        </GlassCard>

        <GlassCard 
          className="flex flex-col justify-between aspect-square"
          onClick={() => onNavigate(Page.TIPS)}
        >
          <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Grooming</span>
          <p className="text-white text-sm font-bold mt-2">Hair & Beard Optimization</p>
          <div className="mt-auto flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full bg-white/10 border border-[#0a0a0a]"></div>
            ))}
          </div>
        </GlassCard>

        <GlassCard 
          className="flex flex-col justify-between aspect-square"
          onClick={() => onNavigate(Page.TIPS)}
        >
          <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">Nutrition</span>
          <p className="text-white text-sm font-bold mt-2">Debloat & Lean Maxx</p>
          <div className="mt-auto flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></div>
            <span className="text-[10px] text-gray-500 uppercase font-bold">Daily Goal</span>
          </div>
        </GlassCard>
      </div>

      {lastAnalysis && (
        <div className="mt-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Detailed Metrics</h3>
          <div className="space-y-4">
             {[
               { label: 'Jawline Definition', score: lastAnalysis.jawlineScore, color: '#00ff88' },
               { label: 'Skin Texture', score: lastAnalysis.skinQuality, color: '#9d4edd' },
               { label: 'Aesthetic Potential', score: lastAnalysis.potential, color: '#00ccff' }
             ].map((metric) => (
               <div key={metric.label}>
                 <div className="flex justify-between text-[11px] font-bold uppercase mb-1">
                   <span className="text-gray-400">{metric.label}</span>
                   <span style={{ color: metric.color }}>{metric.score}/100</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <div 
                    className="h-full transition-all duration-1000 ease-out" 
                    style={{ width: `${metric.score}%`, backgroundColor: metric.color }}
                   ></div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
