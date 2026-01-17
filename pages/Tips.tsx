
import React from 'react';
import GlassCard from '../components/GlassCard';

const Tips: React.FC = () => {
  const tips = [
    { title: 'Facial Exercises', icon: '⚡', desc: 'Focus on mandibular exercises twice daily to sharpen your profile.', color: '#00ff88' },
    { title: 'Hydration Protocol', icon: '💧', desc: 'Drink 4L of water with electrolytes to reduce facial inflammation.', color: '#00ccff' },
    { title: 'Sleep Optimization', icon: '🌙', desc: 'Sleep on your back with an elevated pillow to prevent fluid buildup.', color: '#9d4edd' },
    { title: 'Micro-Nutrients', icon: '🌿', desc: 'Increase Vitamin K2 intake to support bone density and facial structure.', color: '#ffcc00' },
  ];

  return (
    <div className="px-6 pt-12 pb-24">
      <header className="mb-8">
        <h2 className="text-gray-500 text-xs font-black uppercase tracking-widest">Growth Intelligence</h2>
        <h1 className="text-3xl font-black text-white">Daily Tips</h1>
      </header>

      <div className="space-y-4">
        {tips.map((tip) => (
          <GlassCard key={tip.title} className="flex gap-4 p-5 hover:translate-x-1 transition-transform">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${tip.color}20`, border: `1px solid ${tip.color}30` }}
            >
              {tip.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-1">{tip.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{tip.desc}</p>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="mt-8">
        <GlassCard variant="purple" className="p-6">
          <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-3">Premium Unlock</h3>
          <p className="text-gray-400 text-sm mb-4">Access the 12-week intensive bone smashing and soft-tissue optimization guide.</p>
          <button className="w-full bg-white text-[#0a0a0a] font-black uppercase tracking-widest py-3 rounded-lg text-xs shadow-xl">
            Upgrade to Pro
          </button>
        </GlassCard>
      </div>
    </div>
  );
};

export default Tips;
