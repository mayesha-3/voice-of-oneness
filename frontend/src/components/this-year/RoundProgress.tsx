import React, { useState, useEffect, useRef } from "react";

export type StageId = "elimination" | "semi-final" | "final" | "winners";

export interface StageStep {
  id: StageId;
  label: string;
  count: string;
  description: string;
}

export interface RoundProgressProps {
  currentStage?: StageId;
}

const stages: StageStep[] = [
  {
    id: "elimination",
    label: "Elimination Round",
    count: "5 Weeks",
    description: "Monday to Thursdays @ 8:00 PM",
  },
  {
    id: "semi-final",
    label: "Semi-Final",
    count: "Top 40",
    description: "Live TV round performances",
  },
  {
    id: "final",
    label: "Grand Finale",
    count: "Top 10",
    description: "Championship stage recitation",
  },
  {
    id: "winners",
    label: "Winners Showcase",
    count: "Top 3",
    description: "National Qari champions crowned",
  },
];

export const RoundProgress: React.FC<RoundProgressProps> = ({
  currentStage = "semi-final",
}) => {
  const currentIndex = stages.findIndex((s) => s.id === currentStage);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [highlightActive, setHighlightActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          const timer = setTimeout(() => {
            setHighlightActive(true);
          }, 1100);
          observer.disconnect();
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.25 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-slate-50 border border-slate-200 shadow-sm rounded-xl p-6 my-6 overflow-hidden">
      <h3 className="text-lg font-bold text-slate-900 mb-8 text-center">
        Competition Progression Pipeline
      </h3>

      <div className="relative">
        {/* Connecting Line Through Middle (Behind Cards) */}
        <div className="hidden md:block absolute top-1/2 left-6 right-6 h-0.5 bg-slate-200 -translate-y-1/2 z-0">
          <div
            className={`h-full bg-gradient-to-r from-orange-200 via-orange-400 to-slate-200 transition-all duration-1000 ease-out ${
              isVisible ? "w-full" : "w-0"
            }`}
          />
        </div>

        {/* 4 Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div
                key={stage.id}
                style={{
                  transitionDelay: isVisible ? `${idx * 150}ms` : "0ms",
                }}
                className={`p-4 rounded-lg border transition-all duration-500 ease-out transform ${
                  /* Scroll-in entrance: pop up one by one */
                  isVisible
                    ? "opacity-100 translate-x-0 scale-100"
                    : "opacity-0 translate-x-8 scale-95"
                } ${
                  isCurrent
                    ? highlightActive
                      ? "bg-orange-50 border-orange-400 text-slate-900 shadow-xl shadow-orange-500/20 ring-2 ring-orange-500 scale-[1.02]"
                      : "bg-orange-50 border-orange-400 text-slate-900 shadow-md ring-1 ring-orange-400"
                    : isCompleted
                      ? "bg-white border-slate-300 text-slate-700"
                      : "bg-white/90 border-slate-200 text-slate-500"
                }`}>
                {/* Header row */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded transition-all duration-300 ${
                      isCurrent
                        ? highlightActive
                          ? "bg-orange-500 text-white shadow-sm shadow-orange-500/50"
                          : "bg-orange-400 text-white"
                        : isCompleted
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-200 text-slate-600"
                    }`}>
                    {isCompleted
                      ? "Completed"
                      : isCurrent
                        ? "Active Stage"
                        : "Upcoming"}
                  </span>
                  <span
                    className={`text-sm font-extrabold ${
                      isCurrent ? "text-orange-600" : "text-blue-900"
                    }`}>
                    {stage.count}
                  </span>
                </div>

                {/* Details */}
                <h4 className="font-bold text-base mb-1">{stage.label}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoundProgress;
