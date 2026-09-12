import React, { useState } from 'react';

export interface Contestant {
  id: string;
  name: string;
  stage: 'top40' | 'top10' | 'winners';
  photo?: string;
  institution: string;
  broadcastDay?: string;
  city?: string;
}

export interface ContestantStageListProps {
  contestants: Contestant[];
}

export const ContestantStageList: React.FC<ContestantStageListProps> = ({ contestants }) => {
  const [selectedStage, setSelectedStage] = useState<'all' | 'top40' | 'top10' | 'winners'>('top40');

  const filteredContestants = selectedStage === 'all'
    ? contestants
    : contestants.filter((c) => c.stage === selectedStage);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 justify-center bg-slate-50 p-2 rounded-xl border border-slate-200 max-w-md mx-auto">
        <button
          onClick={() => setSelectedStage('top40')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            selectedStage === 'top40' ? 'bg-tvone-orange text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Top 40 Semi-Finalists
        </button>
        <button
          onClick={() => setSelectedStage('top10')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            selectedStage === 'top10' ? 'bg-tvone-orange text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Top 10 Finalists
        </button>
        <button
          onClick={() => setSelectedStage('winners')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
            selectedStage === 'winners' ? 'bg-tvone-orange text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Winners (Top 3)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContestants.map((c) => (
          <div key={c.id} className="bg-white border border-slate-200 rounded-lg p-4 flex items-center space-x-4 shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-xs text-slate-500 font-medium shrink-0 border border-slate-200">
              {c.name.split(' ')[0]}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-tvone-blue mb-1 inline-block border border-slate-200">
                {c.stage.toUpperCase()}
              </span>
              <h4 className="text-base font-bold text-slate-900">{c.name}</h4>
              <p className="text-xs text-slate-500">{c.institution}</p>
              {c.city && <p className="text-xs text-slate-400 mt-0.5">📍 {c.city}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContestantStageList;
