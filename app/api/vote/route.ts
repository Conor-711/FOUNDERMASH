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

    // 使用单个事务来执行所有数据库操作，提高性能
    const result = await prisma.$transaction(async (tx) => {
      // 1. 更新matchup记录
      const record = await tx.matchup.upsert({
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

      // 2. 批量获取/创建 Elo 记录
      const [allEloA, allEloB] = await Promise.all([
        tx.elo.upsert({
          where: { slug: aSlug },
          create: { slug: aSlug, rating: 1000 },
          update: {},
          select: { rating: true }
        }),
        tx.elo.upsert({
          where: { slug: bSlug },
          create: { slug: bSlug, rating: 1000 },
          update: {},
          select: { rating: true }
        })
      ]);

      // 3. 计算新的 Elo 分数
      const allUpdated = updateElo(allEloA.rating, allEloB.rating, winSorted);

      // 4. 批量更新 Elo 分数
      await Promise.all([
        tx.elo.update({ where: { slug: aSlug }, data: { rating: allUpdated.Ra } }),
        tx.elo.update({ where: { slug: bSlug }, data: { rating: allUpdated.Rb } })
      ]);

      // 5. 处理 track-specific Elo（如果提供了 track）
      if (track && typeof track === 'string' && track.toUpperCase() !== 'ALL') {
        const t = track.toUpperCase();
        
        const [tA, tB] = await Promise.all([
          tx.eloTrack.upsert({
            where: { slug_track: { slug: aSlug, track: t } },
            create: { slug: aSlug, track: t, rating: 1000 },
            update: {},
            select: { rating: true }
          }),
          tx.eloTrack.upsert({
            where: { slug_track: { slug: bSlug, track: t } },
            create: { slug: bSlug, track: t, rating: 1000 },
            update: {},
            select: { rating: true }
          })
        ]);
        
        const upT = updateElo(tA.rating, tB.rating, winSorted);
        
        await Promise.all([
          tx.eloTrack.update({ where: { slug_track: { slug: aSlug, track: t } }, data: { rating: upT.Ra } }),
          tx.eloTrack.update({ where: { slug_track: { slug: bSlug, track: t } }, data: { rating: upT.Rb } })
        ]);
      }

      // 6. 记录用户投票（如果提供了 sessionId）
      if (sessionId && typeof sessionId === 'string') {
        const total = record.votesA + record.votesB;
        const winnerVotes = winSorted === 'A' ? record.votesA : record.votesB;
        const percent = total > 0 ? Math.round((winnerVotes / total) * 100) : 50;

        await tx.userVote.create({
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

      return record;
    });

    const total = result.votesA + result.votesB;
    const winnerVotes = winSorted === 'A' ? result.votesA : result.votesB;
    const percent = total > 0 ? Math.round((winnerVotes / total) * 100) : 50;

    return NextResponse.json({ percent, total, count: winnerVotes, winner });
  } catch (e) {
    console.error('Vote API error:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


