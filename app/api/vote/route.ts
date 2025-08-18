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
    const { a, b, winner } = await req.json();
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

    // Elo (ALL 类别)：读当前 rating（默认 0），根据赢家更新
    const eloA = await prisma.elo.upsert({
      where: { slug: aSlug },
      create: { slug: aSlug, rating: 0 },
      update: {},
      select: { rating: true }
    });
    const eloB = await prisma.elo.upsert({
      where: { slug: bSlug },
      create: { slug: bSlug, rating: 0 },
      update: {},
      select: { rating: true }
    });

    const updated = updateElo(eloA.rating, eloB.rating, winSorted);
    await prisma.elo.update({ where: { slug: aSlug }, data: { rating: updated.Ra } });
    await prisma.elo.update({ where: { slug: bSlug }, data: { rating: updated.Rb } });

    return NextResponse.json({ percent, total, count: winnerVotes, winner });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


