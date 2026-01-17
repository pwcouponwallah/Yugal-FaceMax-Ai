
import React, { useState } from 'react';
import { User } from '../types';
import GlassCard from '../components/GlassCard';

interface LandingProps {
  onLogin: (user: User) => void;
}

const Landing: React.FC<LandingProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation of Auth
    onLogin({
      id: '123',
      name: email.split('@')[0],
      email: email,
      isLoggedIn: true
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-black tracking-tighter italic text-white mb-2">
          YUGAL <span className="text-[#00ff88]">AI</span>
        </h1>
        <p className="text-gray-400 font-medium uppercase tracking-[0.2em] text-xs">Self-Improvement Protocol</p>
      </div>

      <GlassCard className="w-full mb-6">
        <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Welcome Back' : 'Join the Elite'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1 ml-1">Email</label>
            <input
              type="email"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00ff88]/50 transition-all"
              placeholder="operator@yugal.ai"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1 ml-1">Password</label>
            <input
              type="password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00ff88]/50 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#00ff88] text-[#0a0a0a] font-black uppercase tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(0,255,136,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
          >
            {isLogin ? 'Access Dashboard' : 'Initiate Scan'}
          </button>
        </form>
      </GlassCard>

      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-gray-500 text-sm font-semibold hover:text-white transition-colors"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already in the protocol? Log In"}
        </button>
        
        <div className="flex items-center gap-2 w-full mt-4">
          <div className="h-[1px] bg-white/10 flex-1"></div>
          <span className="text-gray-600 text-[10px] uppercase font-bold">Secure Access</span>
          <div className="h-[1px] bg-white/10 flex-1"></div>
        </div>
      </div>

      <div className="mt-auto text-center text-[10px] text-gray-700 font-bold uppercase tracking-widest">
        Proprietary AI Algorithm v2.5.4
      </div>
    </div>
  );
};

export default Landing;
