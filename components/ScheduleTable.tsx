import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { GlassCard } from './GlassCard';
import { URLS } from '../constants';
import { trNorm } from '../utils/helpers';
import { ScheduleRow } from '../types';

export const ScheduleTable: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleRow[]>([]);
  const [dayName, setDayName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const today = new Date().toLocaleDateString("tr-TR", { weekday: "long" });
        setDayName(today);
        const todayKey = trNorm(today);

        const response = await fetch(URLS.SCHEDULE);
        const csvText = await response.text();

        Papa.parse<ScheduleRow>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const rows = results.data;
            const daily = rows.filter(r => r.GÜN && trNorm(r.GÜN) === todayKey);
            setSchedule(daily);
            setLoading(false);
          }
        });
      } catch (e) {
        console.error("Schedule Error", e);
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <GlassCard className="h-full flex flex-col p-[16px]">
      <div className="flex items-center text-[16px] font-extrabold uppercase tracking-widest mb-3 text-slate-200">
        <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#e50914] to-[#fb7185] mr-2 shadow-[0_0_20px_rgba(248,113,113,0.9)]"></div>
        Bugünkü Ders Programı
        <span className="ml-3 bg-slate-900/85 border border-slate-700/50 rounded-full px-3 py-1 text-[11px] tracking-wide">
            {dayName.toUpperCase()}
        </span>
      </div>

      <div className="flex-1 w-full">
          <table className="w-full border-separate" style={{ borderSpacing: "0 6px" }}>
            <thead>
                <tr>
                    <th className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.5px] pb-1">SINIF</th>
                    {[1,2,3,4,5,6,7].map(i => (
                        <th key={i} className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.5px] pb-1">
                            {i}.DERS
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {loading ? (
                     <tr><td colSpan={8} className="text-center py-4 text-slate-500 text-xs">Yükleniyor...</td></tr>
                ) : schedule.length === 0 ? (
                    <tr><td colSpan={8} className="text-center py-4 text-slate-500 text-xs">Bugün ders yok.</td></tr>
                ) : (
                    schedule.map((row, idx) => (
                        <tr key={idx} className="group transition-all duration-200 hover:-translate-y-[1px] hover:shadow-lg">
                            <td className="bg-gradient-to-br from-[#e50914] to-[#fb7185] text-white font-bold text-center text-xs py-1.5 px-2 rounded-l-lg min-w-[50px]">
                                {row.SINIF}
                            </td>
                            {["1","2","3","4","5","6","7"].map((key, i) => {
                                // @ts-ignore
                                const lesson = row[key];
                                return (
                                    <td key={i} className={`bg-slate-900/90 border border-blue-800/50 text-slate-200 text-[12px] font-semibold text-center py-1.5 px-2 ${i === 6 ? 'rounded-r-lg' : ''}`}>
                                        <div className="truncate max-w-[80px] mx-auto">{lesson}</div>
                                    </td>
                                )
                            })}
                        </tr>
                    ))
                )}
            </tbody>
          </table>
      </div>
    </GlassCard>
  );
};