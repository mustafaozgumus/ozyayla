import React from 'react';
import { Header } from './components/Header';
import { WeatherWidget } from './components/WeatherWidget';
import { ClockWidget } from './components/ClockWidget';
import { NewsSlider } from './components/NewsSlider';
import { ScheduleTable } from './components/ScheduleTable';
import { ListWidget } from './components/ListWidget';
import { URLS } from './constants';

const App: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col relative overflow-hidden">
      {/* Top Bar */}
      <Header />

      {/* Main Grid Wrapper */}
      <div className="flex-1 relative w-full overflow-hidden">
        <div 
          className="absolute top-[30px] bottom-[18px] left-1/2 -translate-x-1/2 w-[1120px] grid gap-x-[22px] gap-y-[16px]"
          style={{
            gridTemplateColumns: "220px 680px 220px",
            gridTemplateRows: "auto auto 1fr",
            gridTemplateAreas: `
              "hava orta nobet"
              "saat orta duyuru"
              "dogum orta etkinlik"
            `
          }}
        >
            {/* LEFT COLUMN */}
            <div style={{ gridArea: "hava" }}>
               <WeatherWidget />
            </div>
            
            <div style={{ gridArea: "saat" }}>
               <ClockWidget />
            </div>

            <div style={{ gridArea: "dogum" }} className="h-full">
               <ListWidget type="BIRTHDAY" url={URLS.BIRTHDAY} />
            </div>

            {/* CENTER COLUMN */}
            <div style={{ gridArea: "orta" }} className="flex flex-col gap-[14px]">
                {/* News Slider (Hero) - 16:9 Aspect Ratio */}
                <div className="w-full aspect-video">
                    <NewsSlider />
                </div>
                
                {/* Schedule - Fills remaining space */}
                <div className="flex-1">
                    <ScheduleTable />
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div style={{ gridArea: "nobet" }} className="h-full min-h-[140px]">
                <ListWidget type="DUTY" url={URLS.DUTY} />
            </div>

            <div style={{ gridArea: "duyuru" }} className="h-full min-h-[140px]">
                <ListWidget type="ANNOUNCEMENTS" url={URLS.ANNOUNCEMENTS} />
            </div>

            <div style={{ gridArea: "etkinlik" }} className="h-full">
                <ListWidget type="EVENTS" url={URLS.EVENTS} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default App;