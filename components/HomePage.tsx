'use client';

import Link from "next/link";
import Matchup from "@/components/Matchup";
import { analytics } from '@/components/Analytics';

interface Founder {
  slug: string;
  name: string;
  avatar: string;
  rank: {
    track: string;
  };
}

interface HomePageProps {
  filtered: Founder[];
  active: string;
}

export default function HomePage({ filtered, active }: HomePageProps) {
  const categories = ['ALL','DEFI','L1/L2','EXCHANGE','OTHER'];

  const handleCategoryClick = (category: string) => {
    analytics.trackCategoryChange(category, active);
  };

  const handleNavClick = (destination: string) => {
    analytics.trackNavigation(destination, 'home');
  };

  return (
    <div className="text-center">
      <p className="text-xl font-bold mb-4 text-[#111]">Were we let in for being based? No. Will we be judged on it? Yes.</p>
      <p className="text-[28px] font-extrabold mb-7">Who&apos;s more Based? Click to Choose.</p>

      <Matchup founders={filtered} track={active} />

      <nav className="flex flex-wrap justify-center gap-4 text-[#0b88b6] mt-9 mb-1">
        {categories.map(cat => {
          const href = cat === 'ALL' ? '/' : `/?track=${encodeURIComponent(cat)}`;
          const isActive = active === cat.toUpperCase();
          return (
            <Link 
              key={cat} 
              href={href} 
              className={`${isActive ? 'font-extrabold underline' : 'font-bold'} hover:underline`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </Link>
          );
        })}
      </nav>
      <nav className="flex justify-center gap-4 font-extrabold">
        <Link href="/about" className="hover:underline" onClick={() => handleNavClick('about')}>About</Link>
        <Link href="/submit" className="hover:underline" onClick={() => handleNavClick('submit')}>Share</Link>
        <Link href="/ranking" className="hover:underline" onClick={() => handleNavClick('ranking')}>Ranking</Link>
        <Link href="/profile" className="hover:underline" onClick={() => handleNavClick('profile')}>Profile</Link>
      </nav>

      <div className="mt-25 p-4">
        <p className="text-lg font-bold text-gray-800">
          Thanks <a href="https://www.thecrimson.com/article/2003/11/4/hot-or-not-website-briefly-judges/" target="_blank" rel="noopener noreferrer" className="text-[#0b88b6] underline">Mark Zuckerberg</a> for sharing the idea.
        </p>
      </div>
    </div>
  );
}
