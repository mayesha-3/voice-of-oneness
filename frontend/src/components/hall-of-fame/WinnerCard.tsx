// WinnerCard.tsx
import React, { useEffect, useRef } from "react";

// ==========================================
// 1. Types
// ==========================================
export interface WinnerData {
  year: number;
  position: number;
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

// ==========================================
// 2. Position-based theme config
// ==========================================
const positionThemes = {
  1: {
    label: "1st Place",
    ringGradient:
      "bg-[conic-gradient(from_180deg,#fde68a,#f59e0b,#fbbf24,#fde68a,#f59e0b,#fde68a)]",
    ringShadow: "shadow-[0_0_0_5px_rgba(251,191,36,0.10)]",
    ringGlow: "group-hover:shadow-[0_0_32px_rgba(251,191,36,0.30)]",
    accentVia: "via-amber-400",
    ambientColor: "bg-amber-300/10",
    ribbonGradient: "from-amber-500 to-yellow-400",
    hoverShadow:
      "hover:shadow-[0_16px_48px_rgba(245,158,11,0.14),0_4px_16px_rgba(0,0,0,0.04)]",
    hoverText: "group-hover:text-amber-900",
    linkColor: "text-amber-600 hover:text-amber-800",
    btnHoverBg: "hover:bg-amber-50",
    btnHoverText: "hover:text-amber-700",
    btnHoverBorder: "hover:border-amber-300",
    quoteBorder: "border-amber-300",
    quoteBg: "from-amber-50/60",
  },
  2: {
    label: "2nd Place",
    ringGradient:
      "bg-[conic-gradient(from_180deg,#e2e8f0,#94a3b8,#cbd5e1,#e2e8f0,#94a3b8,#e2e8f0)]",
    ringShadow: "shadow-[0_0_0_5px_rgba(148,163,184,0.10)]",
    ringGlow: "group-hover:shadow-[0_0_28px_rgba(148,163,184,0.30)]",
    accentVia: "via-slate-400",
    ambientColor: "bg-slate-300/10",
    ribbonGradient: "from-slate-400 to-slate-300",
    hoverShadow:
      "hover:shadow-[0_16px_48px_rgba(148,163,184,0.14),0_4px_16px_rgba(0,0,0,0.04)]",
    hoverText: "group-hover:text-slate-700",
    linkColor: "text-slate-500 hover:text-slate-700",
    btnHoverBg: "hover:bg-slate-50",
    btnHoverText: "hover:text-slate-700",
    btnHoverBorder: "hover:border-slate-300",
    quoteBorder: "border-slate-300",
    quoteBg: "from-slate-50/60",
  },
  3: {
    label: "3rd Place",
    ringGradient:
      "bg-[conic-gradient(from_180deg,#fde2b3,#cd7f32,#daa06d,#fde2b3,#cd7f32,#fde2b3)]",
    ringShadow: "shadow-[0_0_0_5px_rgba(205,127,50,0.10)]",
    ringGlow: "group-hover:shadow-[0_0_28px_rgba(205,127,50,0.28)]",
    accentVia: "via-orange-400",
    ambientColor: "bg-orange-300/10",
    ribbonGradient: "from-orange-600 to-amber-600",
    hoverShadow:
      "hover:shadow-[0_16px_48px_rgba(205,127,50,0.14),0_4px_16px_rgba(0,0,0,0.04)]",
    hoverText: "group-hover:text-orange-900",
    linkColor: "text-orange-600 hover:text-orange-800",
    btnHoverBg: "hover:bg-orange-50",
    btnHoverText: "hover:text-orange-700",
    btnHoverBorder: "hover:border-orange-300",
    quoteBorder: "border-orange-300",
    quoteBg: "from-orange-50/60",
  },
} as const;

function getTheme(position: number) {
  if (position === 1) return positionThemes[1];
  if (position === 2) return positionThemes[2];
  return positionThemes[3];
}

// ==========================================
// 3. Gold Confetti Canvas Component
// ==========================================
interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  tilt: number;
  tiltAngle: number;
  tiltAngleSpeed: number;
  velocityX: number;
  velocityY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export const GoldConfettiBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const firedRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 85;

    const goldPalette = [
      "#D4AF37", // Metallic Gold
      "#FFD700", // Pure Gold
      "#F59E0B", // Warm Amber
      "#FDE68A", // Pale Shimmer Gold
      "#B45309", // Deep Bronze
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height * 0.8,
          size: Math.random() * 8 + 6,
          color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
          tilt: Math.random() * 10 - 10,
          tiltAngle: Math.random() * Math.PI * 2,
          tiltAngleSpeed: Math.random() * 0.07 + 0.03,
          velocityX: Math.random() * 2 - 1,
          velocityY: Math.random() * 2.2 + 1.8,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 3 - 1.5,
          opacity: 1,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeParticles = 0;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.tiltAngle += p.tiltAngleSpeed;
        p.y += p.velocityY;
        p.x += Math.sin(p.tiltAngle) * 1.5 + p.velocityX + 0.3;
        p.rotation += p.rotationSpeed;
        p.tilt = Math.sin(p.tiltAngle) * 12;

        if (p.y > canvas.height * 0.75) {
          p.opacity = Math.max(0, p.opacity - 0.015);
        }

        if (p.opacity > 0 && p.y < canvas.height + 20) {
          activeParticles++;

          ctx.save();
          ctx.beginPath();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;

          const ribbonWidth = p.tilt;
          const ribbonHeight = p.size * 1.4;
          ctx.fillRect(
            -ribbonWidth / 2,
            -ribbonHeight / 2,
            ribbonWidth,
            ribbonHeight,
          );

          if (p.color === "#FFD700" || p.color === "#FDE68A") {
            ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
            ctx.fillRect(
              -ribbonWidth / 2,
              -ribbonHeight / 2,
              ribbonWidth * 0.3,
              ribbonHeight,
            );
          }

          ctx.restore();
        }
      }

      if (activeParticles > 0) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const triggerBurst = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      initParticles();
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(render);
    };

    // Primary: Trigger instantly on load/mount
    triggerBurst();

    // Fallback: Trigger on first scroll or touch
    const handleFirstInteraction = () => {
      if (!firedRef.current) {
        triggerBurst();
      }
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("scroll", handleFirstInteraction, {
      passive: true,
    });
    window.addEventListener("touchstart", handleFirstInteraction, {
      passive: true,
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 h-full w-full"
    />
  );
};

// ==========================================
// 4. WinnerCard Component (position-aware)
// ==========================================
export const WinnerCard: React.FC<WinnerCardProps> = ({ winner }) => {
  const theme = getTheme(winner.position);

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const shareUrl = `${window.location.origin}/hall-of-fame/${winner.slug}`;
    const shareData = {
      title: `${winner.name} - ${theme.label} of The Voice of Oneness (${winner.year})`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err);
        }
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Profile link copied to clipboard!");
    }
  };

  return (
    <article
      className={`group relative bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] ${theme.hoverShadow} hover:scale-[1.02] transition-all duration-500 ease-out flex flex-col items-center text-center px-5 pt-10 pb-5 overflow-hidden`}
    >
      {/* ---- Hover accent: metallic top edge ---- */}
      <div
        className={`absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-transparent ${theme.accentVia} to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center`}
      />

      {/* ---- Ambient wash on hover ---- */}
      <div
        className={`absolute -top-20 left-1/2 -translate-x-1/2 w-56 h-56 ${theme.ambientColor} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
      />

      {/* ---- Circular framed portrait ---- */}
      <div className="relative mb-5 z-10">
        {/* Metallic ring — glows on hover */}
        <div
          className={`w-36 h-36 rounded-full p-[3px] ${theme.ringGradient} ${theme.ringShadow} ${theme.ringGlow} transition-shadow duration-500`}
        >
          <div className="w-full h-full rounded-full p-[3px] bg-white">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
              {winner.photo ? (
                <img
                  src={winner.photo}
                  alt={winner.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="text-slate-400 text-xs font-medium px-2">
                  {winner.name}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Position ribbon */}
        <div
          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r ${theme.ribbonGradient} text-white text-[11px] font-extrabold tracking-wide px-4 py-1 rounded-full shadow-md whitespace-nowrap`}
        >
          {theme.label}
        </div>
      </div>

      {/* ---- Info block ---- */}
      <div className="relative z-10 mt-2 space-y-1">
        <h3
          className={`text-base font-bold text-slate-900 ${theme.hoverText} transition-colors duration-300`}
        >
          {winner.name}
        </h3>
        {winner.location && (
          <span className="text-[11px] text-slate-500 block tracking-wide">
            📍 {winner.location}
          </span>
        )}
      </div>

      <blockquote
        className={`relative z-10 text-[13px] italic text-slate-600 border-l-2 ${theme.quoteBorder} pl-3 py-2 my-4 bg-gradient-to-r ${theme.quoteBg} to-transparent rounded-r text-left w-full`}
      >
        &ldquo;{winner.quote}&rdquo;
      </blockquote>

      {/* ---- Action block ---- */}
      <div className="relative z-10 w-full pt-3 border-t border-slate-100/80 flex items-center justify-between mt-auto">
        <a
          href={`/hall-of-fame/${winner.slug}`}
          className={`text-xs font-bold ${theme.linkColor} transition-colors duration-200`}
        >
          View Profile &rarr;
        </a>
        <button
          type="button"
          onClick={handleShare}
          className={`text-xs bg-slate-50 ${theme.btnHoverBg} text-slate-600 ${theme.btnHoverText} border border-slate-200 ${theme.btnHoverBorder} px-2.5 py-1.5 rounded-lg transition-all duration-200 font-medium shadow-sm active:scale-95`}
        >
          Share 🔗
        </button>
      </div>
    </article>
  );
};

// ==========================================
// 5. Year Podium Section
// ==========================================
export interface YearPodiumProps {
  year: number;
  winners: WinnerData[];
}

export const YearPodium: React.FC<YearPodiumProps> = ({ year, winners }) => {
  // Sort into podium slots: 2nd, 1st, 3rd
  const firstPlace = winners.filter((w) => w.position === 1);
  const secondPlace = winners.filter((w) => w.position === 2);
  const thirdPlace = winners.filter((w) => w.position === 3);

  const hasPodium = secondPlace.length > 0 || thirdPlace.length > 0;

  // For years with only 1st place (e.g. 2022), show a centred single card
  if (!hasPodium) {
    return (
      <section className="mb-16">
        {/* Year header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Season {year}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xs">
            {firstPlace.map((w) => (
              <WinnerCard key={w.slug} winner={w} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Full podium: 2nd | 1st (elevated) | 3rd
  return (
    <section className="mb-16">
      {/* Year header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          Season {year}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
      </div>

      {/* Podium grid — 2nd | 1st | 3rd */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto">
        {/* 2nd Place column (side-by-side when multiple) */}
        <div
          className={`md:pt-10 ${
            secondPlace.length > 1
              ? "grid grid-cols-2 gap-3 items-end"
              : "flex flex-col items-center gap-6"
          }`}
        >
          {secondPlace.map((w) => (
            <div
              key={w.slug}
              className={secondPlace.length > 1 ? "w-full" : "w-full max-w-xs"}
            >
              <WinnerCard winner={w} />
            </div>
          ))}
        </div>

        {/* 1st Place column — elevated */}
        <div className="flex flex-col items-center gap-6 md:pb-6">
          {firstPlace.map((w) => (
            <div key={w.slug} className="w-full max-w-xs">
              <WinnerCard winner={w} />
            </div>
          ))}
        </div>

        {/* 3rd Place column */}
        <div className="flex flex-col items-center gap-6 md:pt-14">
          {thirdPlace.map((w) => (
            <div key={w.slug} className="w-full max-w-xs">
              <WinnerCard winner={w} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 6. Hall of Fame Full Section
// ==========================================
export interface HallOfFameProps {
  winners: WinnerData[];
}

export const HallOfFame: React.FC<HallOfFameProps> = ({ winners }) => {
  // Group by year and sort descending (newest first)
  const yearMap = new Map<number, WinnerData[]>();
  for (const w of winners) {
    const arr = yearMap.get(w.year) || [];
    arr.push(w);
    yearMap.set(w.year, arr);
  }

  const sortedYears = Array.from(yearMap.keys()).sort((a, b) => b - a);

  return (
    <div>
      <GoldConfettiBackground />
      {sortedYears.map((year) => (
        <YearPodium key={year} year={year} winners={yearMap.get(year)!} />
      ))}
    </div>
  );
};

export default WinnerCard;
