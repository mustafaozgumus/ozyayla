import React, { useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { getBellStatus } from '../utils/helpers';
import { BellStatus } from '../types';

export const ClockWidget: React.FC = () => {
  const [now, setNow] = useState(new Date());
  const [status, setStatus] = useState<BellStatus | null>(null);
  const [countdown, setCountdown] = useState<string>("");
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const current = new Date();
      setNow(current);
      
      const s = getBellStatus(current);
      setStatus(s);

      if (s.nextBell) {
        const diff = s.nextBell.getTime() - current.getTime();
        if (diff > 0) {
          const m = Math.floor(diff / 60000);
          const secs = Math.floor((diff % 60000) / 1000);
          setCountdown(`${m} DK ${secs.toString().padStart(2, '0')} SN`);
          setIsAlert(diff < 60000);
        } else {
            setCountdown("0 DK 00 SN");
        }
      } else {
        setCountdown("--");
        setIsAlert(false);
      }

    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!status) return null;

  return (
    <GlassCard className={`flex flex-col items-center justify-center p-[14px] transition-all duration-300 ${isAlert ? 'border-yellow-400 shadow-[0_0_45px_rgba(250,204,21,0.5)] scale-[1.02]' : ''}`}>
      
      <div className="text-[30px] font-extrabold tracking-[1px] text-white">
        {now.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </div>

      <div className="text-[12px] text-slate-400 uppercase tracking-[0.8px] mb-3 font-medium">
        {now.toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
      </div>

      <div className="text-center mt-1">
        <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-[13px] font-extrabold tracking-wide border shadow-lg ${
            isAlert 
            ? 'bg-slate-900 border-yellow-400 text-yellow-400 animate-pulse shadow-[0_0_30px_rgba(250,204,21,0.6)]' 
            : 'bg-slate-900/96 border-slate-400/30 text-slate-100'
        }`}>
            {status.label}
        </span>
        
        {status.nextBell && (
            <div className="mt-2">
                <span className="block text-[14px] font-extrabold tracking-[1px] text-slate-300">SONRAKİ ZİLE KALAN</span>
                <span className="block mt-1 text-[24px] font-extrabold text-white tracking-[1px]">{countdown}</span>
            </div>
        )}
      </div>
    </GlassCard>
  );
};