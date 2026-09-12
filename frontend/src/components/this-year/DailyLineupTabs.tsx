import React, { useState } from 'react';

export interface LineupSlot {
  time: string;
  reciterName: string;
  institution: string;
  surah: string;
}

export interface DaySchedule {
  day: 'Monday' | 'Tuesday' | 'Thursday';
  theme: string;
  slots: LineupSlot[];
}

export interface DailyLineupTabsProps {
  schedules?: DaySchedule[];
}

const defaultSchedules: DaySchedule[] = [
  {
    day: 'Monday',
    theme: 'Elimination Round Group A',
    slots: [
      { time: '19:00 GMT', reciterName: 'Ibrahim Hussain', institution: 'Darul Uloom London', surah: 'Surah Maryam (1-15)' },
      { time: '19:30 GMT', reciterName: 'Yusuf Rahman', institution: 'Madani Academy Luton', surah: 'Surah Fatir (1-14)' },
    ]
  },
  {
    day: 'Tuesday',
    theme: 'Elimination Round Group B',
    slots: [
      { time: '19:00 GMT', reciterName: 'Bilal Ahmed', institution: 'Al-Kawthar Institute', surah: 'Surah Yaseen (1-20)' },
      { time: '19:30 GMT', reciterName: 'Hamza Farooq', institution: 'Leicester Islamic Academy', surah: 'Surah Ar-Rahman (1-30)' },
    ]
  },
  {
    day: 'Thursday',
    theme: 'Elimination Round Group C & Weekly Review',
    slots: [
      { time: '19:00 GMT', reciterName: 'Omar Farooq', institution: 'Tayyibah School', surah: 'Surah Al-Mulk (1-18)' },
      { time: '19:45 GMT', reciterName: 'Judges Commentary & Scores', institution: 'TV One UK Panel', surah: 'Evaluation Stage' },
    ]
  }
];

export const DailyLineupTabs: React.FC<DailyLineupTabsProps> = ({ schedules = defaultSchedules }) => {
  const [activeDay, setActiveDay] = useState<'Monday' | 'Tuesday' | 'Thursday'>('Monday');

  const activeSchedule = schedules.find((s) => s.day === activeDay) || schedules[0];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex border-b border-slate-200 space-x-2 mb-6">
        {schedules.map((item) => (
          <button
            key={item.day}
            onClick={() => setActiveDay(item.day)}
            className={`px-4 py-2 font-semibold text-sm rounded-t-lg transition-colors ${
              activeDay === item.day
                ? 'bg-tvone-orange text-white border-b-2 border-tvone-orange'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            {item.day} Lineup
          </button>
        ))}
      </div>

      <div className="mb-4">
        <h4 className="text-md font-bold text-slate-900">{activeSchedule.day} Broadcast Schedule</h4>
        <p className="text-xs text-slate-500">{activeSchedule.theme}</p>
      </div>

      <div className="space-y-3">
        {activeSchedule.slots.map((slot, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
            <div>
              <span className="text-xs font-semibold text-tvone-orange block">{slot.time}</span>
              <span className="text-base font-bold text-slate-900">{slot.reciterName}</span>
              <span className="text-xs text-slate-500 block">{slot.institution}</span>
            </div>
            <div className="mt-2 sm:mt-0 text-left sm:text-right">
              <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded inline-block font-medium border border-slate-200">
                {slot.surah}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyLineupTabs;
