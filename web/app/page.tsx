
import Link from "next/link";
import { loadFounders } from "@/data/load-founders";
import Matchup from "@/components/Matchup";

export default async function Home({ searchParams }: { searchParams?: Promise<{ track?: string }> }) {
  const params = (await searchParams) || {};
  const active = (params.track || 'ALL').toUpperCase();
  const all = loadFounders();
  const filtered = active === 'ALL' ? all : all.filter(f => f.rank.track.toUpperCase() === active);
  const categories = ['ALL','DEFI','EXCHANGE','L1/L2','OTHER'];

  return (
    <div className="text-center">
      <p className="text-sm mb-4 text-[#111]">Were we let in for our looks? No. Will we be judged on them? Yes.</p>
      <p className="text-[28px] font-extrabold mb-7">Who&apos;s Hotter? Click to Choose.</p>

      <Matchup founders={filtered} track={active} />

      <nav className="flex flex-wrap justify-center gap-4 text-[#0b88b6] mt-9 mb-1">
        {categories.map(cat => {
          const href = cat === 'ALL' ? '/' : `/?track=${encodeURIComponent(cat)}`;
          const isActive = active === cat.toUpperCase();
          return (
            <Link key={cat} href={href} className={`${isActive ? 'font-extrabold underline' : 'font-bold'} hover:underline`}>
              {cat}
            </Link>
          );
        })}
      </nav>
      <nav className="flex justify-center gap-4 font-extrabold">
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/submit" className="hover:underline">Submit</Link>
        <Link href="/ranking" className="hover:underline">Rankings</Link>
        <Link href="/profile" className="hover:underline">Profile</Link>
      </nav>

      <p className="mt-12 text-lg font-bold text-gray-800">
        Thanks <a href="https://www.thecrimson.com/article/2003/11/4/hot-or-not-website-briefly-judges/" target="_blank" rel="noopener noreferrer" className="text-[#0b88b6] underline">Mark Zuckerberg</a> for sharing the idea.
      </p>
    </div>
  );
}
