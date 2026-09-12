import React from 'react';

export interface LiveBannerConfig {
  isLive: boolean;
  nextBroadcastTime?: string;
  youtubeLiveUrl?: string;
  channelInfo?: string;
}

export interface LiveBannerProps {
  config: LiveBannerConfig;
}

export const LiveBanner: React.FC<LiveBannerProps> = ({ config }) => {
  const { isLive, nextBroadcastTime, youtubeLiveUrl = "https://youtube.com/@tvoneuk", channelInfo = "Sky Channel 781" } = config;

  return (
    <div className={`w-full p-4 rounded-lg border transition-all ${
      isLive ? 'bg-red-50 border-red-300 text-red-900' : 'bg-slate-50 border-slate-200 text-slate-700'
    }`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          {isLive ? (
            <span className="flex items-center space-x-2 bg-red-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span>LIVE NOW</span>
            </span>
          ) : (
            <span className="bg-tvone-blue text-white text-xs font-semibold uppercase px-3 py-1 rounded-full">
              UPCOMING BROADCAST
            </span>
          )}
          <div className="text-sm">
            {isLive ? (
              <span className="font-semibold text-slate-900">Season 6 Broadcast is currently streaming live on TV One UK!</span>
            ) : (
              <span>Next broadcast: <strong className="text-slate-900">{nextBroadcastTime || "Monday 7:00 PM GMT"}</strong> ({channelInfo})</span>
            )}
          </div>
        </div>

        <div>
          <a
            href={youtubeLiveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-2 text-sm font-semibold px-4 py-2 rounded-md transition-colors ${
              isLive 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-tvone-orange hover:bg-tvone-orange-dark text-white'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
            <span>{isLive ? 'Watch Live Stream' : 'TV One YouTube Channel'}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LiveBanner;
