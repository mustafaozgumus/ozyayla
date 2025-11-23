import React from 'react';

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  noPadding?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", id, noPadding = false }) => {
  return (
    <div 
      id={id}
      className={`relative rounded-[20px] border border-slate-700/30 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-red-400/50 hover:shadow-[0_26px_60px_rgba(15,23,42,1)] shadow-[0_18px_45px_rgba(15,23,42,0.98)] group ${className}`}
      style={{
        background: `
          radial-gradient(circle at top left, rgba(248,250,252,0.10), transparent 55%),
          radial-gradient(circle at bottom right, rgba(15,23,42,0.85), rgba(15,23,42,0.9))
        `,
        backdropFilter: 'blur(22px) saturate(1.6)',
        padding: noPadding ? '0' : '12px'
      }}
    >
      {/* Hover Glow Effect */}
      <div className="absolute -inset-[40%] bg-[radial-gradient(circle_at_0_0,rgba(239,68,68,0.24),transparent_50%)] opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100 z-0" />
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export const CardHeader: React.FC<{ title: string; icon?: React.ReactNode }> = ({ title, icon }) => (
  <div className="mb-2">
    <div className="flex items-center gap-2">
      {icon && <div className="text-red-400/80">{icon}</div>}
      <h3 className="text-[13px] font-extrabold uppercase tracking-widest text-slate-200 m-0">
        {title}
      </h3>
    </div>
    <div className="mt-1 w-10 h-0.5 rounded-full bg-gradient-to-r from-red-600 to-transparent"></div>
  </div>
);