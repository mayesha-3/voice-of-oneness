import React, { useState } from "react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "This Year", href: "/this-year" },
    { name: "Contestants", href: "/contestants" },
    { name: "Hall of Fame", href: "/hall-of-fame" },
    { name: "Gallery", href: "/gallery" },
    { name: "Team", href: "/team" },
    { name: "Organizers", href: "/organizers" },
    { name: "Sponsors", href: "/sponsors" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Area */}
          <div className="flex items-center space-x-3">
            <img
              className="w-24 sm:w-32 md:w-40 lg:w-48 h-auto max-w-full"
              src="src/assets/pictures/TV-One-Logo-with-Sky.png"
              alt="TV One Logo"
            />

            <span className="hidden sm:inline-block text-xs font-semibold pl-3 border-l border-slate-300 text-slate-500">
              The Voice of Oneness
            </span>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-700 hover:text-blue-600 transition-colors duration-200">
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          {/* <div className="hidden lg:flex items-center space-x-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-md bg-[#1877F2] text-white flex items-center justify-center font-bold text-xs hover:opacity-90 transition-transform active:scale-95 shadow-xs">
              f
            </a>
            <a
              href="https://youtube.com/@tvoneuk"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 rounded-md bg-[#FF0000] text-white flex items-center justify-center font-bold text-xs hover:opacity-90 transition-transform active:scale-95 shadow-xs">
              ▶
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter / X"
              className="w-8 h-8 rounded-md bg-[#1DA1F2] text-white flex items-center justify-center font-bold text-xs hover:opacity-90 transition-transform active:scale-95 shadow-xs">
              t
            </a>
          </div> */}

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors focus:outline-hidden"
              aria-label="Toggle Navigation">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden py-4 px-2 border-t border-slate-200/80 space-y-1 bg-white/95 backdrop-blur-lg rounded-b-2xl shadow-xl">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-semibold rounded-lg text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors">
                {link.name}
              </a>
            ))}

            {/* Mobile Socials */}
            {/* <div className="flex items-center space-x-3 pt-3 px-3 border-t border-slate-200/80">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-[#1877F2] text-white flex items-center justify-center font-bold text-xs">
                f
              </a>
              <a
                href="https://youtube.com/@tvoneuk"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-[#FF0000] text-white flex items-center justify-center font-bold text-xs">
                ▶
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded bg-[#1DA1F2] text-white flex items-center justify-center font-bold text-xs">
                t
              </a>
            </div> */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
