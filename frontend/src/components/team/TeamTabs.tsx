import React, { useState } from 'react';

export interface TeamMember {
  id: string;
  name: string;
  role: 'presenter' | 'judge';
  title: string;
  photo?: string;
  bio: string;
  credentials?: string;
}

const defaultTeam: TeamMember[] = [
  {
    id: 't1',
    name: 'Sheikh Qari Abu Nu’man',
    role: 'judge',
    title: 'Senior Qur’an Specialist & Head Judge',
    bio: 'Renowned international Qari and scholar with Ijazah in the 10 Qira’at.',
    credentials: 'Head of Tajweed Faculty'
  },
  {
    id: 't2',
    name: 'Ustadh Muhammad Ali',
    role: 'judge',
    title: 'Vocal Performance & Tajweed Evaluator',
    bio: 'Judge for over 5 seasons, specializing in Maqamat and vocal control.',
    credentials: 'TV One UK Religious Advisor'
  },
  {
    id: 't3',
    name: 'Moyeen Uddin Ahmed Chowdhury',
    role: 'presenter',
    title: 'Chairman & Executive Host',
    bio: 'Chairman of TV One UK and visionary behind The Voice of Oneness national competition.',
    credentials: 'TV One Founder'
  },
  {
    id: 't4',
    name: 'Tariq Hassan',
    role: 'presenter',
    title: 'Studio Presenter',
    bio: 'Lead anchor guiding viewers through elimination highlights and contestant interviews.',
    credentials: 'Broadcast Journalist'
  }
];

export const TeamTabs: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'presenter' | 'judge'>('judge');

  const filteredTeam = defaultTeam.filter((m) => m.role === activeRole);

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-3 bg-slate-50 p-2 rounded-xl border border-slate-200 max-w-xs mx-auto">
        <button
          onClick={() => setActiveRole('judge')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeRole === 'judge' ? 'bg-tvone-orange text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Judges Panel
        </button>
        <button
          onClick={() => setActiveRole('presenter')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
            activeRole === 'presenter' ? 'bg-tvone-orange text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Presenters & Hosts
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTeam.map((member) => (
          <div key={member.id} className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row gap-4 items-start shadow-sm">
            <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-500 font-medium shrink-0 border border-slate-200">
              {member.name.split(' ')[0]} Photo
            </div>
            <div>
              <span className="text-xs font-bold text-tvone-orange uppercase block mb-1">
                {member.credentials}
              </span>
              <h4 className="text-lg font-bold text-slate-900">{member.name}</h4>
              <h5 className="text-xs font-semibold text-slate-500 mb-2">{member.title}</h5>
              <p className="text-xs text-slate-600 leading-relaxed">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamTabs;
