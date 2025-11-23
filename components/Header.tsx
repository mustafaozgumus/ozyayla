import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="relative z-50 flex items-center justify-between px-10 py-3 border-b border-slate-400/30"
         style={{
           background: `linear-gradient(to bottom, rgba(15,23,42,0.92), rgba(15,23,42,0.7), rgba(15,23,42,0))`,
           backdropFilter: 'blur(18px) saturate(1.4)',
           boxShadow: '0 18px 40px rgba(15,23,42,0.95)'
         }}>
      
      {/* Light Strip Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-70" 
           style={{
             background: `linear-gradient(90deg, rgba(248,250,252,0.06), transparent, rgba(248,250,252,0.06))`,
             mixBlendMode: 'soft-light'
           }}
      />

      <div className="flex items-center gap-3">
        {/* Custom Logo CSS Implementation */}
        <div className="relative w-[26px] h-[34px] rounded-md overflow-hidden shadow-[0_0_35px_rgba(248,113,113,0.9)]"
             style={{
               background: `radial-gradient(circle at 0 0, #ffe4e6 0, #fecaca 10%, transparent 45%), linear-gradient(150deg, #e50914 0%, #fb7185 40%, #b91c1c 100%)`
             }}>
           <div className="absolute top-[-6px] bottom-[-6px] left-[8px] w-[5px] bg-slate-900/95 -skew-x-[9deg]"></div>
           <div className="absolute top-[-6px] bottom-[-6px] right-[8px] w-[5px] bg-slate-900/95 skew-x-[9deg]"></div>
        </div>

        <div className="text-[18px] font-bold text-slate-50 uppercase tracking-[2px]">
          Özyayla İlk-Ortaokulu <span className="text-slate-400 text-sm">Bilgi Ekranı</span>
        </div>
      </div>

      <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 opacity-90">
        Güncel Duyurular • Ders Programı • Hava Durumu
      </div>
    </div>
  );
};