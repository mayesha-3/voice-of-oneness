import React from 'react';

export interface UpdateItem {
  id?: string;
  date: string;
  title: string;
  body: string;
  link?: string;
}

export interface UpdatesFeedProps {
  updates: UpdateItem[];
}

export const UpdatesFeed: React.FC<UpdatesFeedProps> = ({ updates }) => {
  return (
    <div className="space-y-4">
      {updates.map((item, index) => (
        <article key={item.id || index} className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow">
          <div className="text-xs font-semibold text-tvone-orange uppercase mb-1">{item.date}</div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
          <p className="text-sm text-slate-600 mb-3">{item.body}</p>
          {item.link && (
            <a href={item.link} className="inline-flex items-center text-xs font-semibold text-tvone-blue hover:text-tvone-orange transition-colors">
              <span>Read announcement</span>
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          )}
        </article>
      ))}
    </div>
  );
};

export default UpdatesFeed;
