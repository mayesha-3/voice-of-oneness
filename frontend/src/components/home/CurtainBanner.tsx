import React, { useEffect, useRef } from "react";
import bannerImg from "../../assets/pictures/banner_competition.jpg";

export interface CurtainBannerProps {
  bgImage?: string;
}

export const CurtainBanner: React.FC<CurtainBannerProps> = ({ bgImage }) => {
  const resolvedImg =
    typeof bannerImg === "object" && bannerImg !== null && "src" in bannerImg
      ? (bannerImg as { src: string }).src
      : (bannerImg as string);

  const finalImage = bgImage || resolvedImg;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;

      // Don't run parallax scroll logic on phone viewports (< 768px)
      if (window.innerWidth < 768) return;

      const wrapper = wrapperRef.current;
      const curtain = curtainRef.current;
      if (!wrapper || !curtain) return;

      const rect = wrapper.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const scrollable = wrapper.offsetHeight - viewportH;
      if (scrollable <= 0) return;

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      curtain.style.transform = `translateY(${(1 - progress) * 100}%)`;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. MOBILE VIEW ONLY (hidden on md: and up)                               */}
      {/* No sticky scroll traps: Normal, full-width responsive banner image       */}
      {/* ========================================================================= */}
      <div className="block md:hidden w-full bg-slate-50">
        {/* Full-width uncropped banner image */}
        <div className="w-[100vw] bg-[#4a0e17] overflow-hidden shadow-xs">
          <img
            src={finalImage}
            alt="National Quran Competition 2026 - TV One UK"
            className="w-full h-[auto] object-contain block"
          />
        </div>

        {/* Clean text block directly underneath */}
        <div className="px-4 py-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-500/30 px-3.5 py-1 rounded-full text-amber-700 text-xs font-bold uppercase tracking-wider shadow-xs">
            <span>National Quran Competition 2026</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 leading-tight">
              THE VOICE <span className="text-amber-500">OF</span> ONENESS 2026
            </h1>
          </div>

          <p className="text-xs sm:text-sm font-bold text-slate-600 tracking-wide uppercase max-w-sm mx-auto">
            Age: 7–13 (Boys &amp; Girls) &bull; Registration Deadline: 31 August
            2026
          </p>

          <div className="pt-2">
            <a
              href="/this-year"
              className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm px-7 py-3 rounded-full shadow-md transform active:scale-95 transition-all">
              Event Updates
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP VIEW ONLY (hidden on mobile, visible on md: and up)            */}
      {/* Pinned 250vh interactive curtain scroll animation                         */}
      {/* ========================================================================= */}
      <div
        ref={wrapperRef}
        className="hidden md:block relative w-full h-[250vh]">
        <section className="sticky top-0 h-[80vh] w-full overflow-hidden">
          {/* Text content sits underneath */}
          <div className="absolute inset-0 z-0 flex items-center justify-center bg-slate-100">
            <div className="relative max-w-5xl mx-auto px-4 text-center space-y-6 sm:space-y-8">
              <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-500/30 px-5 py-1.5 rounded-full text-amber-700 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-xs">
                <span>National Quran Competition 2026</span>
              </div>

              <div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-800 drop-shadow-xs leading-none">
                  THE VOICE <span className="text-amber-500">OF</span> ONENESS
                  2026
                </h1>
              </div>

              <p className="text-sm sm:text-base md:text-lg font-bold text-slate-600 tracking-wider uppercase drop-shadow-xs max-w-3xl mx-auto">
                Age: 7–13 (Boys &amp; Girls) &bull; Registration Deadline: 31
                August 2026
              </p>

              <div className="pt-2">
                <a
                  href="/this-year"
                  className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base sm:text-lg px-9 py-4 rounded-full shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-orange-500/25 active:translate-y-0">
                  Event Updates
                </a>
              </div>
            </div>

            {/* Scroll cue */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-500 animate-bounce pointer-events-none">
              
              <svg
                className="w-5 h-5 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Curtain image glides upward */}
          <div
            ref={curtainRef}
            className="absolute inset-0 z-10 w-full h-full bg-cover bg-no-repeat bg-center will-change-transform"
            style={{
              backgroundImage: `url('${finalImage}')`,
              transform: "translateY(100%)",
            }}
          />
        </section>
      </div>
    </>
  );
};

export default CurtainBanner;
