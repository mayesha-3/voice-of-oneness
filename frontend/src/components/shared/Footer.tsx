import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-slate-900 text-lg font-bold mb-2">The Voice of Oneness</h3>
          <p className="text-sm text-slate-600 mb-4">
            National Qur'an Recitation Competition organized by TV One UK. Running since 2021 (Season 6).
          </p>
          <blockquote className="text-xs italic border-l-2 border-tvone-orange pl-3 text-slate-700">
            "When we invest in our children’s relationship with the Qur’an, we invest in the future of our Ummah."
            <footer className="mt-1 font-normal text-slate-500">— Moyeen Uddin Ahmed Chowdhury, Chairman, TV One</footer>
          </blockquote>
        </div>

        <div>
          <h4 className="text-slate-900 text-sm font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/this-year" className="hover:text-tvone-orange">Season 6 Overview</a></li>
            <li><a href="/contestants" className="hover:text-tvone-orange">Contestants List</a></li>
            <li><a href="/hall-of-fame" className="hover:text-tvone-orange">Hall of Fame</a></li>
            <li><a href="/gallery" className="hover:text-tvone-orange">Gallery & Highlights</a></li>
            <li><a href="/organizers" className="hover:text-tvone-orange">Organizers</a></li>
            <li><a href="/sponsors" className="hover:text-tvone-orange">Sponsors</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-900 text-sm font-semibold mb-3">TV One UK Broadcast</h4>
          <p className="text-sm text-slate-600 mb-2">
            Watch live streams on Sky Channel 781 & YouTube during Monday, Tuesday, and Thursday showtimes.
          </p>
          <div className="text-xs text-slate-500 mt-4">
            &copy; {new Date().getFullYear()} TV One UK. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
