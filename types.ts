export interface WeatherData {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
  };
}

export interface NewsItem {
  id: number;
  title: string;
  imageUrl: string;
  source?: string;
}

export interface ScheduleRow {
  SINIF: string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
  GÜN?: string;
}

export interface DutyTeacher {
  role: string;
  name: string;
}

export interface BirthdayPerson {
  name: string;
  class: string;
}

export interface SpecialEvent {
  name: string;
  date: string;
}

export interface BellStatus {
  label: string;
  type: 'class' | 'break' | 'before' | 'after';
  nextBell: Date | null;
  lessonNo?: number;
}