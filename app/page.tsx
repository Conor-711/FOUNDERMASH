import Image from "next/image";
import Link from "next/link";
import { loadFounders } from "@/data/load-founders";
import Matchup from "@/components/Matchup";

export default async function Home({ searchParams }: { searchParams?: Promise<{ track?: string }> }) {
  const params = (await searchParams) || {};
  const active = (params.track || 'ALL').toUpperCase();
  const all = loadFounders();
  const filtered = active === 'ALL' ? all : all.filter(f => f.rank.track.toUpperCase() === active);
  const categories = ['ALL','DEFI','EXCHANGE','L1/L2','AI','NFT','STABLECOIN','OTHER'];

  return (
    <div className="text-center">
      <p className="text-sm mb-4 text-[#111]">Were we let in for our looks? No. Will we be judged on them? Yes.</p>
      <p className="text-[28px] font-extrabold mb-7">Who&apos;s Hotter? Click to Choose.</p>

      <Matchup founders={filtered} />

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
        <a href="#" className="hover:underline">About</a>
        <a href="#" className="hover:underline">Submit</a>
        <Link href="/ranking" className="hover:underline">Rankings</Link>
        <a href="#" className="hover:underline">Previous</a>
      </nav>
    </div>
  );
}
