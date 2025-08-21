import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { updateElo } from '@/lib/elo';


function pairKey(a: string, b: string): { key: string; aSlug: string; bSlug: string; winnerSide: 'A' | 'B' } {
  const [sa, sb] = [a, b].sort();
  const key = `${sa}|${sb}`;
  const winnerSide = (sa === a) ? 'A' : 'B';
  return { key, aSlug: sa, bSlug: sb, winnerSide };
}

export async function POST(req: NextRequest) {
  try {
    const { a, b, winner, track, sessionId } = await req.json();
    if (!a || !b || !winner) {
      return NextResponse.json({ error: 'Missing params' }, { status: 400 });
    }

    const { key, aSlug, bSlug } = pairKey(a, b);
    const winSorted = winner === aSlug ? 'A' : 'B';

    const record = await prisma.matchup.upsert({
      where: { pairKey: key },
      create: {
        pairKey: key,
        aSlug,
        bSlug,
        votesA: winSorted === 'A' ? 1 : 0,
        votesB: winSorted === 'B' ? 1 : 0,
      },
      update: {
        votesA: { increment: winSorted === 'A' ? 1 : 0 },
        votesB: { increment: winSorted === 'B' ? 1 : 0 },
      },
    });

    const total = record.votesA + record.votesB;
    const winnerVotes = winSorted === 'A' ? record.votesA : record.votesB;
    const percent = total > 0 ? Math.round((winnerVotes / total) * 100) : 50;

    // Elo (ALL 类别)：读当前 rating，根据赢家更新
    const allEloA = await prisma.elo.upsert({
      where: { slug: aSlug },
      create: { slug: aSlug, rating: 1000 },
      update: {},
      select: { rating: true }
    });
    const allEloB = await prisma.elo.upsert({
      where: { slug: bSlug },
      create: { slug: bSlug, rating: 1000 },
      update: {},
      select: { rating: true }
    });

    const allUpdated = updateElo(allEloA.rating, allEloB.rating, winSorted);
    await prisma.elo.update({ where: { slug: aSlug }, data: { rating: allUpdated.Ra } });
    await prisma.elo.update({ where: { slug: bSlug }, data: { rating: allUpdated.Rb } });

    // Elo per track（若提供了 track）
    if (track && typeof track === 'string' && track.toUpperCase() !== 'ALL') {
      const t = track.toUpperCase();
      const tA = await prisma.eloTrack.upsert({
        where: { slug_track: { slug: aSlug, track: t } },
        create: { slug: aSlug, track: t, rating: 1000 },
        update: {},
        select: { rating: true }
      });
      const tB = await prisma.eloTrack.upsert({
        where: { slug_track: { slug: bSlug, track: t } },
        create: { slug: bSlug, track: t, rating: 1000 },
        update: {},
        select: { rating: true }
      });
      const upT = updateElo(tA.rating, tB.rating, winSorted);
      await prisma.eloTrack.update({ where: { slug_track: { slug: aSlug, track: t } }, data: { rating: upT.Ra } });
      await prisma.eloTrack.update({ where: { slug_track: { slug: bSlug, track: t } }, data: { rating: upT.Rb } });
    }

    // Record user vote for profile statistics (if sessionId provided)
    if (sessionId && typeof sessionId === 'string') {
      await prisma.userVote.create({
        data: {
          sessionId,
          aSlug,
          bSlug, 
          winner,
          track: track || 'ALL',
          percentage: percent,
        },
      });
    }

    return NextResponse.json({ percent, total, count: winnerVotes, winner });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


