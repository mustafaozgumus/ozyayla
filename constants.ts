// Google Sheet CSV URLs
export const URLS = {
  SCHEDULE: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTClYVMj0KftN0xG1N16kd6kIBfH00J2KPNSFX525oBhjB0_koUX43Gy9lSKTy_u62H6D2MLRwD5_w8/pub?output=csv",
  DUTY: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTAmcyAXX1e6VgI1_1248w5lFiyLuwzuDJt0KAUBtWKSsRqH4Tb1ozXhyOB45vuAsWWWQ5voh_hMVNC/pub?output=csv",
  BIRTHDAY: "https://docs.google.com/spreadsheets/d/e/2PACX-1vS9aSaP3f-bpi1IDIVVm89AM-dmkubGaePESh-c9tLHxIqoQtz1c-8c6apD2-IpfW9vhFk5sfDlK7dY/pub?output=csv",
  EVENTS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxyVVv11bjcWu4mF9_cLqpS7tSr3B4KsdsotZnsVcxYH_DS2gNbAvnZt8nlWz7s5TwHGd7TxtB0ofp/pub?output=csv",
  // Placeholder for Announcements - utilizing the same sheet structure for now or a specific one if available
  ANNOUNCEMENTS: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQxyVVv11bjcWu4mF9_cLqpS7tSr3B4KsdsotZnsVcxYH_DS2gNbAvnZt8nlWz7s5TwHGd7TxtB0ofp/pub?output=csv", 
  NEWS_BASE: "https://ozyaylaoo.meb.k12.tr"
};

// Weather API
export const WEATHER_API = "https://api.open-meteo.com/v1/forecast?latitude=38.764&longitude=34.658&current_weather=true&hourly=temperature_2m,weathercode,windspeed_10m&timezone=auto";

// Weather Icons Map
export const WEATHER_ICONS: Record<number, string> = {
  0: "https://cdn-icons-png.flaticon.com/512/3222/3222800.png", // Clear
  1: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png", // Partly cloudy
  2: "https://cdn-icons-png.flaticon.com/512/3222/3222807.png", // Cloudy
  3: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png", // Overcast
  45: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png", // Fog
  48: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png", // Fog
  51: "https://cdn-icons-png.flaticon.com/512/3313/3313998.png", // Drizzle
  61: "https://cdn-icons-png.flaticon.com/512/3313/3313998.png", // Rain
  63: "https://cdn-icons-png.flaticon.com/512/3313/3313998.png", // Rain
  71: "https://cdn-icons-png.flaticon.com/512/2315/2315309.png", // Snow
  95: "https://cdn-icons-png.flaticon.com/512/1146/1146869.png"  // Thunderstorm
};

// Bell Schedules
export const WEEKDAY_BELLS = [
  "08:50", "09:30", // 1
  "09:45", "10:25", // 2
  "10:45", "11:25", // 3
  "11:40", "12:20", // 4
  "13:05", "13:45", // 5
  "14:00", "14:40", // 6
  "14:55", "15:35"  // 7
];

export const FRIDAY_BELLS = [
  "08:50", "09:30", // 1
  "09:45", "10:25", // 2
  "10:45", "11:25", // 3
  "11:40", "12:20", // 4
  "13:15", "13:55", // 5 (Friday Prayer shift)
  "14:05", "14:45", // 6
  "14:55", "15:35"  // 7
];