import React from 'react';

export interface StreamPlayerProps {
  embedUrl?: string;
  title?: string;
}

export const StreamPlayer: React.FC<StreamPlayerProps> = ({

    // paste the live link here
  embedUrl = "https://www.youtube.com/embed/OVpGtQgoHOk?si=kbzeEtRMmPoxdjE7", 
  title = "The Voice of Oneness Live Stream",
}) => {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-md">
      <div className="relative w-full aspect-video bg-slate-950">
        <iframe
          className="absolute top-0 left-0 w-full h-full border-0"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-800">{title}</span>
        <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded font-medium border border-slate-200">
          HD 1080p Stream
        </span>
      </div>
    </div>
  );
};

export default StreamPlayer;
