import { WEEKDAY_BELLS, FRIDAY_BELLS } from '../constants';
import { BellStatus } from '../types';

export const trNorm = (t: string) => t
  .toString()
  .trim()
  .toLocaleLowerCase("tr-TR")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g,"");

export const parseDateAny = (v: any): Date | null => {
  if (!v) return null;
  if (v instanceof Date) return v;
  
  const s = String(v).trim();
  if (!s) return null;

  // Try direct date string
  const direct = new Date(s);
  if (!isNaN(direct.getTime())) return direct;

  // Try DD.MM.YYYY or DD/MM/YYYY
  const parts = s.split(/[\.\-\/]/);
  if (parts.length === 3) {
    let d, m, y;
    if (parts[0].length === 4) {
      y = Number(parts[0]); m = Number(parts[1]); d = Number(parts[2]);
    } else {
      d = Number(parts[0]); m = Number(parts[1]); y = Number(parts[2]);
    }
    if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
      return new Date(y, m - 1, d);
    }
  }
  return null;
};

export const getBellScheduleForDate = (date: Date): string[] => {
  const day = date.getDay(); // 0 Sun, 1 Mon...
  return day === 5 ? FRIDAY_BELLS : WEEKDAY_BELLS;
};

export const getBellStatus = (now: Date): BellStatus => {
  const bellTimes = getBellScheduleForDate(now);
  
  // Convert time strings to Date objects for today
  const times = bellTimes.map(t => {
    const [h, m] = t.split(":").map(Number);
    const d = new Date(now);
    d.setHours(h, m, 0, 0);
    return d;
  });

  let lastIndex = -1;
  times.forEach((t, i) => {
    if (t <= now) lastIndex = i;
  });

  // Before school
  if (lastIndex === -1) {
    return { label: "Okul Henüz Başlamadı", type: 'before', nextBell: times[0] };
  }

  // After school
  if (lastIndex === times.length - 1 && now > times[times.length - 1]) {
    return { label: "Okul Bitti", type: 'after', nextBell: null };
  }

  // Determine if Class or Break
  // Even index in array = Start of lesson (index 0 is start of Lesson 1)
  // Odd index in array = End of lesson (index 1 is end of Lesson 1)
  
  const isLesson = lastIndex % 2 === 0;
  const nextBell = times[lastIndex + 1];
  
  if (isLesson) {
    const lessonNo = (lastIndex / 2) + 1;
    return { 
      label: `${lessonNo}. DERS`, 
      type: 'class', 
      nextBell: nextBell,
      lessonNo 
    };
  } else {
    return { 
      label: "TENEFFÜS", 
      type: 'break', 
      nextBell: nextBell 
    };
  }
};