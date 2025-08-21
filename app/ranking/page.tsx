import Image from 'next/image';
import Link from 'next/link';
import { loadFounders } from '@/data/load-founders';
import { prisma } from '@/lib/db';

const CATEGORIES = ['ALL','DEFI','EXCHANGE','L1/L2','OTHER'];

export default async function RankingPage({ searchParams }: { searchParams?: Promise<{ track?: string }> }) {
  const params = (await searchParams) || {};
  const data = loadFounders();
  const active = (params.track || 'ALL').toUpperCase();
  const filtered = active === 'ALL' ? data : data.filter((d) => d.rank.track.toUpperCase() === active);

  // 当为 ALL 时按 Elo 排序；否则仍按静态 score（后续可扩展为分赛道 Elo）
  const isAll = active === 'ALL';
  const sorted = [...filtered];
  let ratingMap = new Map<string, number>();
  
  try {
    if (isAll) {
      const elos = (await prisma.elo.findMany()) as { slug: string; rating: number }[];
      ratingMap = new Map(elos.map((e) => [e.slug, e.rating] as const));
      sorted.sort((a, b) => {
        const rb = ratingMap.get(b.slug) ?? 1000;
        const ra = ratingMap.get(a.slug) ?? 1000;
        return rb - ra || (b.score - a.score);
      });
    } else {
      const elosT = (await prisma.eloTrack.findMany({ where: { track: active } })) as { slug: string; track: string; rating: number }[];
      ratingMap = new Map(elosT.map((e) => [e.slug, e.rating] as const));
      sorted.sort((a, b) => {
        const rb = ratingMap.get(b.slug) ?? 1000;
        const ra = ratingMap.get(a.slug) ?? 1000;
        return rb - ra || (b.score - a.score);
      });
    }
  } catch (error) {
    console.error('Database error in ranking page:', error);
    // Fallback to static score sorting if database fails
    sorted.sort((a, b) => b.score - a.score);
  }

  return (
    <div className="mx-auto max-w-[720px] w-full">
      <div className="text-2xl font-extrabold mb-4">Rankings</div>

      <nav className="flex flex-wrap gap-3 mb-4">
        {CATEGORIES.map((cat) => {
          const href = cat === 'ALL' ? '/ranking' : `/ranking?track=${encodeURIComponent(cat)}`;
          const isActive = active === cat.toUpperCase();
          return (
            <Link
              key={cat}
              href={href}
              className={`px-3 py-1 rounded border ${isActive ? 'bg-[#0b88b6] text-white border-[#0b88b6]' : 'text-[#0b88b6] border-[#0b88b6] hover:bg-[#e6f4fa]'}`}
            >
              {cat}
            </Link>
          );
        })}
      </nav>

      <div className="divide-y border rounded-md">
        {sorted.map((f, idx) => (
          <div key={f.slug} className="flex items-center gap-4 p-4">
            <div className="w-10 text-center font-bold">{idx + 1}</div>
            <Image src={f.avatar} alt={f.name} width={48} height={48} className="rounded border" />
            <div className="flex-1">
              <Link href={`/founder/${encodeURIComponent(f.slug)}`} className="text-[#00a0a0] font-bold hover:underline">
                {f.name}
              </Link>
            </div>
            <div className="flex items-center gap-3 w-56 justify-end">
              <div className="text-right font-bold min-w-[48px]">{ratingMap.get(f.slug) ?? 1000}</div>
              <Link href={`/founder/${encodeURIComponent(f.slug)}`} className="flex flex-col items-center gap-1 w-[80px] hover:underline" aria-label={`View ${f.name} bio`}>
                <Image src={f.project.logo} alt={`${f.project.name} logo`} width={32} height={32} />
                <span className="text-xs text-center leading-tight break-words hyphens-auto max-w-full overflow-hidden">{f.project.name}</span>
              </Link>
            </div>
          </div>
        ))}
        {sorted.length === 0 && (
          <div className="p-6 text-center text-sm text-gray-500">No results in this category.</div>
        )}
      </div>
    </div>
  );
}


