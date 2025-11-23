import React, { useEffect, useState } from 'react';
import { GlassCard } from './GlassCard';
import { WEATHER_API, WEATHER_ICONS } from '../constants';
import { WeatherData } from '../types';
import { CloudSun } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(WEATHER_API);
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Weather fetch failed", e);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // 10 mins
    return () => clearInterval(interval);
  }, []);

  if (!data) return <GlassCard className="p-4 h-48 animate-pulse bg-slate-800/50" />;

  const { current_weather, hourly } = data;
  const currentIcon = WEATHER_ICONS[current_weather.weathercode] || WEATHER_ICONS[0];
  
  // Find next 4 hours
  const now = new Date();
  const currentHourIndex = hourly.time.findIndex(t => new Date(t).getHours() === now.getHours());
  const nextHours = hourly.time.slice(currentHourIndex + 1, currentHourIndex + 5);

  return (
    <GlassCard className="p-5 flex flex-col justify-between relative overflow-hidden h-[260px]">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[60px] rounded-full pointer-events-none"></div>

        <div className="flex items-start justify-between z-10">
            <div>
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-1">
                    <CloudSun size={14}/> Hava Durumu
                </h3>
                <div className="text-5xl font-black text-white mt-2">
                    {Math.round(current_weather.temperature)}°
                </div>
                <div className="text-slate-400 text-xs font-medium mt-1">
                    Rüzgar: {current_weather.windspeed} km/s
                </div>
            </div>
            <img src={currentIcon} alt="Weather" className="w-20 h-20 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
        </div>

        {/* Hourly Forecast */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
            {nextHours.map((time, i) => {
                const idx = currentHourIndex + 1 + i;
                const temp = Math.round(hourly.temperature_2m[idx]);
                const code = hourly.weathercode[idx];
                const hourStr = new Date(time).getHours().toString().padStart(2, '0') + ":00";
                
                return (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <span className="text-[10px] text-slate-500 font-bold">{hourStr}</span>
                        <img src={WEATHER_ICONS[code] || WEATHER_ICONS[0]} className="w-8 h-8 opacity-90" alt="" />
                        <span className="text-xs font-bold text-slate-300">{temp}°</span>
                    </div>
                );
            })}
        </div>
    </GlassCard>
  );
};