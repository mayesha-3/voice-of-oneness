import React from 'react';

export interface WinnerData {
  year: number;
  name: string;
  slug: string;
  photo?: string;
  quote: string;
  category?: string;
  location?: string;
  score?: string;
}

export interface WinnerCardProps {
  winner: WinnerData;
}

export const WinnerCard: React.FC<WinnerCardProps> = ({ winner }) => {
  return (
    <article className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-tvone-orange/50 transition-all flex flex-col justify-between">
      <div>
        <div className="aspect-square bg-slate-100 relative overflow-hidden border-b border-slate-200">
          {winner.photo ? (
            <img src={winner.photo} alt={winner.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-slate-500 text-sm font-medium">{winner.name} Portrait</span>
          )}
          <div className="absolute top-3 left-3 bg-tvone-orange text-white text-xs font-extrabold px-3 py-1 rounded-full shadow">
            Champion {winner.year}
          </div>
          {winner.score && (
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur border border-slate-200 text-tvone-blue text-xs font-bold px-2.5 py-1 rounded shadow-sm">
              Score: {winner.score}
            </div>
          )}
        </div>

        <div className="p-6">
          {winner.category && (
            <span className="text-xs font-bold text-tvone-blue uppercase block mb-1">
              {winner.category}
            </span>
          )}
          <h3 className="text-xl font-bold text-slate-900 mb-2">{winner.name}</h3>
          {winner.location && (
            <span className="text-xs text-slate-500 block mb-4">📍 {winner.location}</span>
          )}

          <blockquote className="text-sm italic text-slate-700 border-l-2 border-tvone-orange pl-3 py-1 my-3 bg-slate-50 rounded-r">
            "{winner.quote}"
          </blockquote>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <a
          href={`/hall-of-fame/${winner.slug}`}
          className="text-xs font-bold text-tvone-orange hover:text-tvone-blue transition-colors"
        >
          View Champion Profile &rarr;
        </a>
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              if (navigator.share) {
                navigator.share({
                  title: `${winner.name} - Winner of The Voice of Oneness (${winner.year})`,
                  url: window.location.origin + `/hall-of-fame/${winner.slug}`
                });
              } else {
                navigator.clipboard.writeText(window.location.origin + `/hall-of-fame/${winner.slug}`);
                alert('Profile link copied to clipboard!');
              }
            }
          }}
          className="text-xs bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1.5 rounded transition-colors font-medium shadow-sm"
        >
          Share Card 🔗
        </button>
      </div>
    </article>
  );
};

export default WinnerCard;
