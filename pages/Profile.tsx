
import React from 'react';
import { User } from '../types';
import GlassCard from '../components/GlassCard';

interface ProfileProps {
  user: User | null;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="px-6 pt-12 pb-24">
      <div className="flex flex-col items-center mb-10">
        <div className="w-24 h-24 rounded-full border-4 border-[#00ff88]/30 p-1 mb-4 relative">
          <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center text-4xl overflow-hidden">
             👤
          </div>
          <div className="absolute bottom-0 right-0 bg-[#00ff88] text-[#0a0a0a] text-[8px] font-black px-2 py-1 rounded-full uppercase">
            Elite
          </div>
        </div>
        <h1 className="text-2xl font-black text-white">{user?.name}</h1>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{user?.email}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2">Security & Identity</h3>
        <GlassCard className="flex items-center justify-between py-5">
          <span className="text-white font-bold text-sm">Update Password</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </GlassCard>
        <GlassCard className="flex items-center justify-between py-5">
          <span className="text-white font-bold text-sm">Linked Accounts</span>
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px]">G</div>
            <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px]">A</div>
          </div>
        </GlassCard>

        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mt-8 mb-2">Protocol Settings</h3>
        <GlassCard className="flex items-center justify-between py-5">
          <span className="text-white font-bold text-sm">Push Notifications</span>
          <div className="w-10 h-5 bg-[#00ff88] rounded-full relative">
            <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
          </div>
        </GlassCard>
        <GlassCard className="flex items-center justify-between py-5">
          <span className="text-white font-bold text-sm">Bio-Metrics Access</span>
           <div className="w-10 h-5 bg-white/10 rounded-full relative">
            <div className="absolute left-1 top-1 w-3 h-3 bg-white/40 rounded-full"></div>
          </div>
        </GlassCard>
      </div>

      <button
        onClick={onLogout}
        className="w-full mt-12 py-4 border border-red-500/20 text-red-500 font-black uppercase tracking-widest text-xs rounded-xl hover:bg-red-500/5 transition-all"
      >
        Terminate Session
      </button>

      <p className="text-center text-[10px] text-gray-700 mt-8 font-bold uppercase tracking-tighter">
        Yugal AI End User License v4.0.1
      </p>
    </div>
  );
};

export default Profile;
