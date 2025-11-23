import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { GlassCard, CardHeader } from './GlassCard';
import { parseDateAny } from '../utils/helpers';
import { User, Cake, CalendarDays, Megaphone } from 'lucide-react';

interface Props {
  type: 'DUTY' | 'BIRTHDAY' | 'EVENTS' | 'ANNOUNCEMENTS';
  url: string;
}

export const ListWidget: React.FC<Props> = ({ type, url }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const text = await res.text();
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const rows = results.data;
            const today = new Date();
            let filtered: any[] = [];

            if (type === 'DUTY') {
                // Find row by date
                const row = rows.find((r: any) => {
                    const d = parseDateAny(r["TARİH"]);
                    return d && d.getDate() === today.getDate() && d.getMonth() === today.getMonth();
                });
                if (row) {
                    // Convert row object to array of key-values, excluding date
                    Object.keys(row).forEach(k => {
                        if (k !== "TARİH" && row[k]) {
                            filtered.push({ title: k, value: row[k] });
                        }
                    });
                }
            } else if (type === 'BIRTHDAY') {
                 filtered = rows.filter((r: any) => {
                    const d = parseDateAny(r["DOĞUM TARİHİ"]);
                    return d && d.getDate() === today.getDate() && d.getMonth() === today.getMonth();
                 });
            } else if (type === 'EVENTS') {
                 // Events this week
                 const start = new Date(today);
                 start.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1)); // Monday
                 const end = new Date(start);
                 end.setDate(start.getDate() + 6); // Sunday

                 filtered = rows.filter((r: any) => {
                     const d = parseDateAny(r["TARİH"]);
                     return d && d >= start && d <= end;
                 });
            } else if (type === 'ANNOUNCEMENTS') {
                // For announcements, we just look for a valid 'DUYURU' or similar column.
                // Assuming the generic sheet might contain 'DUYURU' or just reusing 'ÖZEL GÜN ADI' as text if 'DUYURU' missing
                filtered = rows.filter((r: any) => r["DUYURU"] || r["AÇIKLAMA"]).map((r: any) => ({
                    text: r["DUYURU"] || r["AÇIKLAMA"]
                }));
                
                // Fallback demo if using the Events sheet and no DUYURU column exists
                if (filtered.length === 0 && rows.length > 0) {
                     // Just a demo fallback to show the widget working if the CSV doesn't have the column
                     // filtered = [{ text: "Okulumuzda yıl sonu sergisi yapılacaktır." }, { text: "Kütüphane haftası etkinlikleri başladı." }];
                }
            }

            setData(filtered);
            setLoading(false);
          }
        });
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    };
    fetchData();
  }, [type, url]);

  const getIcon = () => {
      if (type === 'DUTY') return <User size={16}/>;
      if (type === 'BIRTHDAY') return <Cake size={16}/>;
      if (type === 'ANNOUNCEMENTS') return <Megaphone size={16}/>;
      return <CalendarDays size={16}/>;
  };

  const getTitle = () => {
      if (type === 'DUTY') return "NÖBETÇİ ÖĞRETMENLER";
      if (type === 'BIRTHDAY') return "BUGÜN DOĞANLAR";
      if (type === 'ANNOUNCEMENTS') return "DUYURULAR";
      return "BU HAFTA ÖZEL GÜNLER";
  };

  return (
    <GlassCard className="p-4 flex flex-col h-full">
      <CardHeader title={getTitle()} icon={getIcon()} />
      
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        {loading ? (
            <div className="text-center text-slate-500 text-xs py-4">Yükleniyor...</div>
        ) : data.length === 0 ? (
            <div className="text-center text-slate-600 text-xs py-4 italic">Kayıt bulunamadı.</div>
        ) : (
            <div className="space-y-2">
                {data.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-800/40 border border-slate-700/50">
                        {type === 'DUTY' && (
                            <>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">{item.title}</span>
                                <span className="text-xs font-bold text-amber-400">{item.value}</span>
                            </>
                        )}
                        {type === 'BIRTHDAY' && (
                             <div className="flex items-center gap-2 w-full">
                                <span className="text-rose-500">🎂</span>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-slate-200">{item["AD SOYAD"]}</span>
                                    <span className="text-[10px] text-slate-500">{item["SINIF"]}</span>
                                </div>
                             </div>
                        )}
                        {type === 'EVENTS' && (
                             <div className="flex flex-col w-full">
                                <span className="text-xs font-bold text-emerald-300">{item["ÖZEL GÜN ADI"]}</span>
                                <span className="text-[10px] text-slate-500 text-right">{item["TARİH"]}</span>
                             </div>
                        )}
                        {type === 'ANNOUNCEMENTS' && (
                            <div className="flex items-start gap-2 w-full">
                                <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></div>
                                <span className="text-xs font-medium text-slate-200 leading-snug">{item.text}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )}
      </div>
    </GlassCard>
  );
};