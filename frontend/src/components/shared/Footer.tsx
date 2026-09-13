import React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#40454a] text-slate-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-700/60">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Col 1: About & Chairman Quote */}
        <div>
          <h3 className="text-white text-lg font-bold mb-2">
            The Voice of Oneness
          </h3>
          <p className="text-sm text-slate-300 mb-4 leading-relaxed">
            National Qur'an Recitation Competition organized by TV One UK.
            Running since 2021 (Season 6).
          </p>
          <blockquote className="text-xs italic border-l-2 border-amber-400 pl-3 text-slate-200">
            &ldquo;When we invest in our children&rsquo;s relationship with the
            Qur&rsquo;an, we invest in the future of our Ummah.&rdquo;
            <footer className="mt-1 font-normal text-slate-400">
              — Moyeen Uddin Ahmed Chowdhury, Chairman, TV One
            </footer>
          </blockquote>
        </div>

        {/* Col 2: Quick Links */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3 tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/this-year"
                className="hover:text-amber-400 transition-colors">
                Season 6 Overview
              </a>
            </li>
            <li>
              <a
                href="/contestants"
                className="hover:text-amber-400 transition-colors">
                Contestants List
              </a>
            </li>
            <li>
              <a
                href="/hall-of-fame"
                className="hover:text-amber-400 transition-colors">
                Hall of Fame
              </a>
            </li>
            <li>
              <a
                href="/gallery"
                className="hover:text-amber-400 transition-colors">
                Gallery & Highlights
              </a>
            </li>
            <li>
              <a
                href="/organizers"
                className="hover:text-amber-400 transition-colors">
                Organizers
              </a>
            </li>
            <li>
              <a
                href="/sponsors"
                className="hover:text-amber-400 transition-colors">
                Sponsors
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Broadcast, Website & Both Social Groups */}
        <div className="space-y-5">
          <div>
            <h4 className="text-white text-sm font-semibold mb-2 tracking-wide">
              TV One UK Broadcast
            </h4>
            <p className="text-sm text-slate-300 mb-2 leading-relaxed">
              Watch live streams on Sky Channel 781 & YouTube during Monday,
              Tuesday, and Thursday showtimes.
            </p>
            <a
              href="https://tvoneuk.tv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-400 hover:text-amber-300 hover:underline inline-flex items-center gap-1 font-medium transition-colors">
              Visit Official TV One UK Website &rarr;
            </a>
          </div>

          {/* Social Links Container */}
          <div className="pt-2 border-t border-slate-600/50 space-y-4">
            {/* TV One Official Socials */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                TV One Official
              </span>
              <div className="flex items-center space-x-4 text-white">
                {/* Facebook */}
                <a
                  href="https://facebook.com/tvoneuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TV One UK Facebook"
                  className="hover:text-amber-400 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="https://youtube.com/@tvoneuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TV One UK YouTube"
                  className="hover:text-amber-400 transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                {/* Twitter / X */}
                <a
                  href="https://twitter.com/tvoneuk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TV One UK Twitter"
                  className="hover:text-amber-400 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Dedicated Event Socials */}
            <div>
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-2">
                Event Socials
              </span>
              <div className="flex items-center space-x-4 text-white">
                {/* Event Facebook */}
                <a
                  href="https://facebook.com/thevoiceofoneness"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="The Voice of Oneness Facebook"
                  className="hover:text-amber-400 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
                {/* Event YouTube */}
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="The Voice of Oneness YouTube"
                  className="hover:text-amber-400 transition-colors">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                {/* Event Twitter / X */}
                <a
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="The Voice of Oneness Twitter"
                  className="hover:text-amber-400 transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.936 9.936 0 0024 4.59z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Sky Bar */}
      <div className="max-w-7xl mx-auto border-t border-slate-600/50 mt-10 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
        <div>&copy; {currentYear} TV One UK. All Rights Reserved.</div>
        <div className="mt-2 sm:mt-0 font-medium text-slate-300">
          Sky Channel 781
        </div>
      </div>
    </footer>
  );
};

export default Footer;
