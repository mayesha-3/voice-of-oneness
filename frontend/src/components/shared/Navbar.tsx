import React, { useState, useEffect } from "react";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

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

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(href);
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full bg-white opacity-100 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="flex items-center justify-between h-16 bg-white">
          {/* Logo Area */}
          <div className="flex items-center space-x-3">
            <img
              className="w-20 sm:w-28 md:w-36 lg:w-44 h-auto max-w-full"
              src="/pictures/TV-One-Logo-with-Sky.png"
              alt="TV One Logo"
            />
            <span className="hidden sm:inline-block text-xs font-semibold pl-3 border-l border-slate-300 text-slate-500">
              The Voice of Oneness
            </span>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`transition-colors duration-200 ${
                    active
                      ? "text-tvone-orange font-black underline underline-offset-8 decoration-2"
                      : "text-slate-700 hover:text-blue-600"
                  }`}>
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="p-2 rounded-lg text-slate-700 bg-white hover:bg-slate-100 transition-colors focus:outline-none"
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
          <div className="md:hidden py-4 px-2 border-t border-slate-200 space-y-1 bg-white opacity-100 rounded-b-2xl shadow-xl">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`block px-3 py-2 text-base font-semibold rounded-lg transition-colors ${
                    active
                      ? "bg-tvone-orange text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-blue-600"
                  }`}>
                  {link.name}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
