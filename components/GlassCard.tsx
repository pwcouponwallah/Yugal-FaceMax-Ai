
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'green' | 'purple' | 'default';
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick, variant = 'default' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'green': return 'hover:shadow-[0_0_20px_rgba(0,255,136,0.1)] border-[#00ff88]/10';
      case 'purple': return 'hover:shadow-[0_0_20px_rgba(157,78,221,0.1)] border-[#9d4edd]/10';
      default: return 'border-white/5';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`glass rounded-2xl p-4 transition-all duration-300 ${getVariantStyles()} ${onClick ? 'cursor-pointer active:scale-95' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
