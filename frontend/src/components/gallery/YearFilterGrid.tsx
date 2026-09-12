import React, { useState } from 'react';

export interface GalleryItem {
  id: string;
  year: number;
  title: string;
  category: string;
  imageUrl: string;
  caption?: string;
}

export interface YearFilterGridProps {
  items?: GalleryItem[];
}

const defaultItems: GalleryItem[] = [
  { id: 'g1', year: 2025, title: 'Season 5 Grand Finale Stage', category: 'Finale', imageUrl: '/placeholders/gallery-2025-1.jpg', caption: 'Live performance in front of TV One UK judges.' },
  { id: 'g2', year: 2025, title: 'Winner Trophy Presentation', category: 'Awards', imageUrl: '/placeholders/gallery-2025-2.jpg', caption: 'Moyeen Uddin Ahmed Chowdhury presenting the trophy.' },
  { id: 'g3', year: 2024, title: 'Season 4 Semi-Final Reciters', category: 'Semi-Finals', imageUrl: '/placeholders/gallery-2024-1.jpg', caption: 'Top 40 contestants in studio.' },
  { id: 'g4', year: 2023, title: 'Season 3 European Auditions', category: 'Auditions', imageUrl: '/placeholders/gallery-2023-1.jpg', caption: 'Reciters gathered at TV One UK studio.' },
  { id: 'g5', year: 2022, title: 'Season 2 TV Broadcast Debut', category: 'Broadcast', imageUrl: '/placeholders/gallery-2022-1.jpg', caption: 'First live television broadcast setup.' },
  { id: 'g6', year: 2021, title: 'Season 1 Virtual Zoom Launch', category: 'Launch', imageUrl: '/placeholders/gallery-2021-1.jpg', caption: 'Inaugural online recitation competition.' },
];

export const YearFilterGrid: React.FC<YearFilterGridProps> = ({ items = defaultItems }) => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

  const years = [2026, 2025, 2024, 2023, 2022, 2021];

  const filteredItems = selectedYear === 'all' 
    ? items 
    : items.filter(item => item.year === selectedYear);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center bg-slate-50 p-3 rounded-lg border border-slate-200">
        <button
          onClick={() => setSelectedYear('all')}
          className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            selectedYear === 'all' ? 'bg-tvone-orange text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          All Years (2021–Present)
        </button>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              selectedYear === year ? 'bg-tvone-orange text-white shadow-sm' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden group hover:shadow-md transition-shadow">
            <div className="aspect-video bg-slate-100 relative flex items-center justify-center text-slate-500 text-sm font-medium border-b border-slate-200">
              <span>{item.title} Photo</span>
              <span className="absolute top-2 right-2 bg-tvone-maroon text-white text-xs px-2.5 py-0.5 rounded font-bold shadow-sm">
                {item.year}
              </span>
            </div>
            <div className="p-4">
              <span className="text-xs font-bold text-tvone-orange uppercase">{item.category}</span>
              <h4 className="text-base font-bold text-slate-900 mt-1">{item.title}</h4>
              {item.caption && <p className="text-xs text-slate-600 mt-2">{item.caption}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearFilterGrid;
