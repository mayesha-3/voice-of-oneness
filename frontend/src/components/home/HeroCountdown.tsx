import React, { useState, useEffect } from 'react';

export interface CountdownConfig {
  targetDate: string;
  eventTitle?: string;
  subtitle?: string;
}

export interface HeroCountdownProps {
  config: CountdownConfig;
}

const getCountdownParts = (targetDate: string) => {
  const difference = new Date(targetDate).getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export const HeroCountdown: React.FC<HeroCountdownProps> = ({ config }) => {
  const [timeLeft, setTimeLeft] = useState(() => getCountdownParts(config.targetDate));

  useEffect(() => {
    const calculateTimeLeft = () => {
      setTimeLeft(getCountdownParts(config.targetDate));
    };

    calculateTimeLeft();
    const timer = window.setInterval(calculateTimeLeft, 1000);
    return () => window.clearInterval(timer);
  }, [config.targetDate]);

  return (
    <div className="bg-slate-50 border border-slate-200 shadow-sm rounded-xl p-6 md:p-8 text-center my-6">
      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
        {config.eventTitle || "Next Broadcast Countdown"}
      </h2>
      {config.subtitle && (
        <p className="text-sm text-slate-600 mb-6">{config.subtitle}</p>
      )}

      <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-2xl md:text-4xl font-extrabold text-tvone-orange block">{timeLeft.days}</span>
          <span className="text-xs uppercase font-semibold text-slate-500">Days</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-2xl md:text-4xl font-extrabold text-tvone-orange block">{timeLeft.hours}</span>
          <span className="text-xs uppercase font-semibold text-slate-500">Hours</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-2xl md:text-4xl font-extrabold text-tvone-orange block">{timeLeft.minutes}</span>
          <span className="text-xs uppercase font-semibold text-slate-500">Mins</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <span className="text-2xl md:text-4xl font-extrabold text-tvone-orange block">{timeLeft.seconds}</span>
          <span className="text-xs uppercase font-semibold text-slate-500">Secs</span>
        </div>
      </div>
    </div>
  );
};

export default HeroCountdown;
