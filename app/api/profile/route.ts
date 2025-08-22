import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { loadFounders } from '@/data/load-founders';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    // Get all user votes for this session
    const userVotes = await prisma.userVote.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'desc' },
    });

    if (userVotes.length === 0) {
      return NextResponse.json({
        mostSelected: null, 
        mostIgnored: null,
        leastPopularChoice: null,
        totalVotes: 0,
      });
    }

    const founders = loadFounders();
    const founderMap = new Map(founders.map(f => [f.slug, f]));

    // Calculate most selected founder
    const selectedCounts = new Map<string, number>();
    userVotes.forEach((vote: any) => {
      const count = selectedCounts.get(vote.winner) || 0;
      selectedCounts.set(vote.winner, count + 1);
    });

    let mostSelectedSlug = '';
    let maxSelectedCount = 0;
    for (const [slug, count] of selectedCounts) {
      if (count > maxSelectedCount) {
        maxSelectedCount = count;
        mostSelectedSlug = slug;
      }
    }

    // Calculate most ignored founder (appeared in comparison but never chosen)
    const appearedIn = new Map<string, number>();
    const chosenCounts = new Map<string, number>();

    userVotes.forEach((vote: any) => {
      // Count appearances
      const aCount = appearedIn.get(vote.aSlug) || 0;
      const bCount = appearedIn.get(vote.bSlug) || 0;
      appearedIn.set(vote.aSlug, aCount + 1);
      appearedIn.set(vote.bSlug, bCount + 1);

      // Count times chosen
      const chosenCount = chosenCounts.get(vote.winner) || 0;
      chosenCounts.set(vote.winner, chosenCount + 1);
    });

    let mostIgnoredSlug = '';
    let maxIgnoreRatio = 0;
    for (const [slug, appearances] of appearedIn) {
      const chosen = chosenCounts.get(slug) || 0;
      const ignoreRatio = (appearances - chosen) / appearances;
      if (ignoreRatio > maxIgnoreRatio && appearances >= 2) { // Need at least 2 appearances
        maxIgnoreRatio = ignoreRatio;
        mostIgnoredSlug = slug;
      }
    }

    // Find the choice with the lowest percentage (most unpopular/unique choice)
    let leastPopularVote: { aSlug: string; bSlug: string; winner: string; percentage: number } | null = null;
    let lowestPercentage = 101; // Start higher than possible percentage
    userVotes.forEach((vote: any) => {
      if (vote.percentage < lowestPercentage) {
        lowestPercentage = vote.percentage;
        leastPopularVote = vote as { aSlug: string; bSlug: string; winner: string; percentage: number };
      }
    });

    // Get statistics for most selected founder
    let mostSelectedStats = null;
    if (mostSelectedSlug && founderMap.has(mostSelectedSlug)) {
      const founder = founderMap.get(mostSelectedSlug)!;
      
      // Count how many people also chose this founder most frequently
      const allUserSessions = await prisma.userVote.findMany({
        select: { sessionId: true, winner: true },
      });
      
      const sessionStats = new Map<string, Map<string, number>>();
      allUserSessions.forEach((vote: any) => {
        if (!sessionStats.has(vote.sessionId)) {
          sessionStats.set(vote.sessionId, new Map());
        }
        const sessionMap = sessionStats.get(vote.sessionId)!;
        const count = sessionMap.get(vote.winner) || 0;
        sessionMap.set(vote.winner, count + 1);
      });

      let sameChoiceCount = 0;
      let totalSessionsWithVotes = 0;
      
      for (const [, choices] of sessionStats) {
        if (choices.size > 0) {
          totalSessionsWithVotes++;
          let sessionMostSelected = '';
          let sessionMaxCount = 0;
          
          for (const [slug, count] of choices) {
            if (count > sessionMaxCount) {
              sessionMaxCount = count;
              sessionMostSelected = slug;
            }
          }
          
          if (sessionMostSelected === mostSelectedSlug) {
            sameChoiceCount++;
          }
        }
      }

      mostSelectedStats = {
        founder,
        count: maxSelectedCount,
        sameChoiceCount,
        totalSessions: totalSessionsWithVotes,
        percentage: totalSessionsWithVotes > 0 ? Math.round((sameChoiceCount / totalSessionsWithVotes) * 100) : 0,
      };
    }

    // Get statistics for most ignored founder
    let mostIgnoredStats = null;
    if (mostIgnoredSlug && founderMap.has(mostIgnoredSlug)) {
      const founder = founderMap.get(mostIgnoredSlug)!;
      const appearances = appearedIn.get(mostIgnoredSlug) || 0;
      const chosen = chosenCounts.get(mostIgnoredSlug) || 0;
      
      // Similar calculation for how many people also ignore this founder most
      const allVotes = await prisma.userVote.findMany();
      const sessionIgnoreStats = new Map<string, Map<string, { appeared: number; chosen: number }>>();
      
      allVotes.forEach((vote: any) => {
        if (!sessionIgnoreStats.has(vote.sessionId)) {
          sessionIgnoreStats.set(vote.sessionId, new Map());
        }
        const sessionMap = sessionIgnoreStats.get(vote.sessionId)!;
        
        // Track appearances for both founders in comparison
        [vote.aSlug, vote.bSlug].forEach((slug: string) => {
          if (!sessionMap.has(slug)) {
            sessionMap.set(slug, { appeared: 0, chosen: 0 });
          }
          sessionMap.get(slug)!.appeared++;
        });
        
        // Track who was chosen
        if (!sessionMap.has(vote.winner)) {
          sessionMap.set(vote.winner, { appeared: 0, chosen: 0 });
        }
        sessionMap.get(vote.winner)!.chosen++;
      });

      let sameIgnoreCount = 0;
      let totalSessionsWithIgnores = 0;
      
      for (const [, stats] of sessionIgnoreStats) {
        let sessionMostIgnored = '';
        let maxIgnoreRatio = 0;
        
        for (const [slug, data] of stats) {
          if (data.appeared >= 2) {
            const ignoreRatio = (data.appeared - data.chosen) / data.appeared;
            if (ignoreRatio > maxIgnoreRatio) {
              maxIgnoreRatio = ignoreRatio;
              sessionMostIgnored = slug;
            }
          }
        }
        
        if (sessionMostIgnored) {
          totalSessionsWithIgnores++;
          if (sessionMostIgnored === mostIgnoredSlug) {
            sameIgnoreCount++;
          }
        }
      }

      mostIgnoredStats = {
        founder,
        appeared: appearances,
        chosen,
        sameChoiceCount: sameIgnoreCount,
        totalSessions: totalSessionsWithIgnores,
        percentage: totalSessionsWithIgnores > 0 ? Math.round((sameIgnoreCount / totalSessionsWithIgnores) * 100) : 0,
      };
    }

    // Get statistics for least popular choice
    let leastPopularStats = null;
    if (leastPopularVote) {
      const vote = leastPopularVote as { aSlug: string; bSlug: string; winner: string; percentage: number; track: string };
      if (founderMap.has(vote.aSlug) && founderMap.has(vote.bSlug)) {
        const founderA = founderMap.get(vote.aSlug)!;
        const founderB = founderMap.get(vote.bSlug)!;
        const winner = founderMap.get(vote.winner)!;
      
        leastPopularStats = {
          founderA,
          founderB,
          winner,
          percentage: vote.percentage,
          track: vote.track,
        };
      }
    }

    return NextResponse.json({
      mostSelected: mostSelectedStats,
      mostIgnored: mostIgnoredStats,
      leastPopularChoice: leastPopularStats,
      totalVotes: userVotes.length,
    });

  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
