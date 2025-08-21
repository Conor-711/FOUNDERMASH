import Image from 'next/image';
import Link from 'next/link';
import AvatarCarousel from '@/components/AvatarCarousel';
import { loadFounders } from '@/data/load-founders';
import { prisma } from '@/lib/db';

export async function generateStaticParams() {
  return loadFounders().map((f) => ({ slug: encodeURIComponent(f.slug) }));
}

export default async function FounderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await params;
  // URL decode the slug to handle special characters like ü
  const slug = decodeURIComponent(rawSlug);
  const all = loadFounders();
  const founder = all.find((f) => f.slug === slug) ?? all[0];
  
  // Calculate real-time rankings based on ELO ratings
  let allRank = founder.rank.all; // fallback to static rank
  let trackRank = founder.rank.trackRank; // fallback to static rank
  
  try {
    // Get ALL ranking based on ELO
    const allElos = await prisma.elo.findMany({ orderBy: { rating: 'desc' } });
    const allRankIndex = allElos.findIndex(e => e.slug === founder.slug);
    if (allRankIndex !== -1) {
      allRank = allRankIndex + 1;
    }
    
    // Get track ranking based on EloTrack
    const trackElos = await prisma.eloTrack.findMany({ 
      where: { track: founder.rank.track },
      orderBy: { rating: 'desc' }
    });
    const trackRankIndex = trackElos.findIndex(e => e.slug === founder.slug);
    if (trackRankIndex !== -1) {
      trackRank = trackRankIndex + 1;
    }
  } catch (error) {
    console.error('Database error in founder page:', error);
    // Use static ranks as fallback
  }
  return (
    <div className="mx-auto max-w-[960px]">
      <Link href="/" className="text-[#0b88b6] font-bold">← Back to Choose</Link>
      <div className="flex items-center gap-6 mt-6">
        <AvatarCarousel images={founder.avatars && founder.avatars.length ? founder.avatars : [founder.avatar]} alt={founder.name} />
        <div>
          <h2 className="text-2xl font-extrabold m-0">{founder.name}</h2>
          <div>{founder.summary}</div>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="uppercase text-sm font-bold mb-3 tracking-wide">Rank</h3>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 border rounded px-3 py-2">
            <span className="text-xs font-bold bg-gray-100 rounded px-2 py-1">ALL</span>
            <span className="text-lg font-extrabold">{allRank}</span>
          </div>
          <div className="flex items-center gap-2 border rounded px-3 py-2">
            <span className="text-xs font-bold bg-gray-100 rounded px-2 py-1">{founder.rank.track}</span>
            <span className="text-lg font-extrabold">{trackRank}</span>
          </div>
        </div>
      </section>


      <section className="mt-6">
        <h3 className="uppercase text-sm font-bold mb-3 tracking-wide">Work</h3>
        <div>{founder.life}</div>
      </section>

      <section className="mt-6">
        <h3 className="uppercase text-sm font-bold mb-3 tracking-wide">Social</h3>
        <div className="flex gap-3 flex-wrap">
          {founder.social.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#0b88b6] font-bold hover:underline">{s.label}</a>
          ))}
        </div>
      </section>
      <section className="mt-6">
        <h3 className="uppercase text-sm font-bold mb-3 tracking-wide">Project</h3>
        <div className="flex items-center gap-4 border rounded p-4">
          <Image
            src={founder.project.logo}
            alt={`${founder.project.name} logo`}
            width={48}
            height={48}
            className="rounded border w-12 h-12 object-contain bg-white p-1"
          />
          <div className="flex-1 text-left">
            {founder.project.url ? (
              <a href={founder.project.url} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline">
                {founder.project.name}
              </a>
            ) : (
              <div className="font-bold">{founder.project.name}</div>
            )}
            <div className="text-sm text-[#555] mt-1">{founder.project.description}</div>
          </div>
          <div className="text-right font-bold min-w-[120px]">
            {founder.project.fdv && (
              <div>FDV: {founder.project.fdv}</div>
            )}
            {founder.project.mindshare && (
              <div>Mindshare: {founder.project.mindshare}</div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="uppercase text-sm font-bold tracking-wide">Story</h3>
          <Link 
            href="/submit" 
            className="bg-[#0b88b6] text-white px-3 py-1 rounded text-xs font-bold hover:bg-[#096d8a] transition-colors"
          >
            SHARE
          </Link>
        </div>
        <div className="border rounded p-4 bg-gray-50">
          <p className="text-sm text-gray-600 italic">
          Share any stories or thoughts on this founder.
          </p>
        </div>
      </section>
    </div>
  );
}


