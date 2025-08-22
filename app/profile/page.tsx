'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Founder {
  slug: string;
  name: string;
  avatar: string;
  project: {
    name: string;
  };
}

interface ProfileStats {
  mostSelected: {
    founder: Founder;
    count: number;
    sameChoiceCount: number;
    totalSessions: number;
    percentage: number;
  } | null;
  mostIgnored: {
    founder: Founder;
    appeared: number;
    chosen: number;
    sameChoiceCount: number;
    totalSessions: number;
    percentage: number;
  } | null;
  leastPopularChoice: {
    founderA: Founder;
    founderB: Founder;
    winner: Founder;
    percentage: number;
    track: string;
  } | null;
  totalVotes: number;
}

export default function ProfilePage() {
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showIgnored, setShowIgnored] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get or create session ID
        let sessionId = localStorage.getItem('foundermash_session');
        if (!sessionId) {
          sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem('foundermash_session', sessionId);
        }

        const response = await fetch(`/api/profile?sessionId=${encodeURIComponent(sessionId)}`);
        const data = await response.json();

        if (response.ok) {
          setStats(data);
        } else {
          setError(data.error || 'Failed to load profile');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-[800px] px-4">
        <Link href="/" className="text-[#0b88b6] font-bold">← Back to Choose</Link>
        <div className="mt-6">
          <h1 className="text-3xl font-extrabold mb-8">Your Profile</h1>
          <div className="text-center py-12">
            <div className="text-gray-500">Loading your stats...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[800px] px-4">
        <Link href="/" className="text-[#0b88b6] font-bold">← Back to Choose</Link>
        <div className="mt-6">
          <h1 className="text-3xl font-extrabold mb-8">Your Profile</h1>
          <div className="text-center py-12">
            <div className="text-red-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats || stats.totalVotes === 0) {
    return (
      <div className="mx-auto max-w-[800px] px-4">
        <Link href="/" className="text-[#0b88b6] font-bold">← Back to Choose</Link>
        <div className="mt-6">
          <h1 className="text-3xl font-extrabold mb-8">Your Profile</h1>
          <div className="text-center py-12">
            <div className="text-gray-600 mb-4">You haven&rsquo;t made any choices yet!</div>
            <Link href="/" className="text-[#0b88b6] font-bold hover:underline">
              Start comparing founders →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[800px] px-4">
      <Link href="/" className="text-[#0b88b6] font-bold">← Back to Choose</Link>
      
      <div className="mt-6">
        <h1 className="text-3xl font-extrabold mb-2">Your Profile</h1>
        <p className="text-gray-600 mb-8">
          Based on {stats.totalVotes} choice{stats.totalVotes !== 1 ? 's' : ''} you&rsquo;ve made
        </p>

        <div className="space-y-6">
          {/* Most Selected Founder */}
          <section className="border rounded p-6">
            <h2 className="uppercase text-sm font-bold mb-3 tracking-wide">Most Selected Founder</h2>
            {stats.mostSelected ? (
              <div className="flex items-center gap-4">
                <Link href={`/founder/${encodeURIComponent(stats.mostSelected.founder.slug)}`}>
                  <Image
                    src={stats.mostSelected.founder.avatar}
                    alt={stats.mostSelected.founder.name}
                    width={60}
                    height={60}
                    className="rounded border object-cover w-20 h-20"
                  />
                </Link>
                <div>
                  <Link 
                    href={`/founder/${encodeURIComponent(stats.mostSelected.founder.slug)}`}
                    className="text-lg font-bold text-[#0b88b6] hover:underline"
                  >
                    {stats.mostSelected.founder.name}
                  </Link>
                  <div className="text-sm text-[#555] mt-1">
                    Founder of {stats.mostSelected.founder.project.name}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    You chose him/her {stats.mostSelected.count} time{stats.mostSelected.count !== 1 ? 's' : ''}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stats.mostSelected.sameChoiceCount} people have the same favorite
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">Not enough data yet</div>
            )}
          </section>

          {/* Most Ignored Founder */}
          <section className="border rounded p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="uppercase text-sm font-bold tracking-wide">Most Ignored Founder</h2>
              <button
                onClick={() => setShowIgnored(!showIgnored)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                title={showIgnored ? "Hide ignored founder" : "Show ignored founder"}
              >
                {showIgnored ? (
                  // 眼睛睁开图标
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  // 眼睛闭上图标（有斜线）
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                    <path d="m15 18-.722-3.25"/>
                    <path d="m2 2 20 20"/>
                    <path d="M6.71 6.71C4.8 8.1 3.35 10.13 2 12c1.63 2.63 4.66 6 10 6 1.65 0 3.15-.4 4.29-1.071"/>
                    <path d="M9 4.24A9.32 9.32 0 0 1 12 4c5.34 0 8.37 3.37 10 6a11.43 11.43 0 0 1-1.07 1.94"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            {showIgnored && (
              <>
                {stats.mostIgnored ? (
                  <div className="flex items-center gap-4">
                    <Link href={`/founder/${encodeURIComponent(stats.mostIgnored.founder.slug)}`}>
                      <Image
                        src={stats.mostIgnored.founder.avatar}
                        alt={stats.mostIgnored.founder.name}
                        width={60}
                        height={60}
                        className="rounded border object-cover w-20 h-20"
                      />
                    </Link>
                    <div>
                      <Link 
                        href={`/founder/${encodeURIComponent(stats.mostIgnored.founder.slug)}`}
                        className="text-lg font-bold text-[#0b88b6] hover:underline"
                      >
                        {stats.mostIgnored.founder.name}
                      </Link>
                      <div className="text-sm text-[#555] mt-1">
                        Founder of {stats.mostIgnored.founder.project.name}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Appeared {stats.mostIgnored.appeared} times, chosen {stats.mostIgnored.chosen} times
                      </div>
                      <div className="text-sm text-gray-600">
                        {stats.mostIgnored.sameChoiceCount} people also ignore him/her most
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500">Not enough data yet</div>
                )}
              </>
            )}
            {!showIgnored && (
              <div className="text-center py-4">
                <div className="text-gray-400 text-sm">Content hidden</div>
              </div>
            )}
          </section>

          {/* Least Popular Choice */}
          <section className="border rounded p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="uppercase text-sm font-bold tracking-wide">Most unique choice</h2>
              <Link 
                href="/submit" 
                className="bg-[#0b88b6] text-white px-3 py-1 rounded text-xs font-bold hover:bg-[#096d8a] transition-colors"
              >
                SHARE
              </Link>
            </div>
            {stats.leastPopularChoice ? (
              <div>
                <div className="text-sm text-gray-600 mb-4">
                  Your most unique choice in {stats.leastPopularChoice.track}:
                </div>
                <div className="flex items-center justify-center gap-8">
                  {/* Founder A */}
                  <div className="flex flex-col items-center">
                    <Link href={`/founder/${encodeURIComponent(stats.leastPopularChoice.founderA.slug)}`}>
                      <Image
                        src={stats.leastPopularChoice.founderA.avatar}
                        alt={stats.leastPopularChoice.founderA.name}
                        width={60}
                        height={60}
                        className={`rounded border object-cover w-15 h-15 ${
                          stats.leastPopularChoice.winner.slug === stats.leastPopularChoice.founderA.slug 
                            ? 'ring-2 ring-[#0b88b6]' 
                            : 'opacity-50'
                        }`}
                      />
                    </Link>
                    <div className="text-sm text-center mt-2">
                      <Link 
                        href={`/founder/${encodeURIComponent(stats.leastPopularChoice.founderA.slug)}`}
                        className="font-bold text-[#0b88b6] hover:underline"
                      >
                        {stats.leastPopularChoice.founderA.name}
                      </Link>
                    </div>
                  </div>

                  <div className="text-gray-400 font-bold">OR</div>

                  {/* Founder B */}
                  <div className="flex flex-col items-center">
                    <Link href={`/founder/${encodeURIComponent(stats.leastPopularChoice.founderB.slug)}`}>
                      <Image
                        src={stats.leastPopularChoice.founderB.avatar}
                        alt={stats.leastPopularChoice.founderB.name}
                        width={60}
                        height={60}
                        className={`rounded border object-cover w-15 h-15 ${
                          stats.leastPopularChoice.winner.slug === stats.leastPopularChoice.founderB.slug 
                            ? 'ring-2 ring-[#0b88b6]' 
                            : 'opacity-50'
                        }`}
                      />
                    </Link>
                    <div className="text-sm text-center mt-2">
                      <Link 
                        href={`/founder/${encodeURIComponent(stats.leastPopularChoice.founderB.slug)}`}
                        className="font-bold text-[#0b88b6] hover:underline"
                      >
                        {stats.leastPopularChoice.founderB.name}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <div className="text-sm text-gray-700">
                    You chose <span className="font-bold text-[#0b88b6]">{stats.leastPopularChoice.winner.name}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Only {stats.leastPopularChoice.percentage}% of people made the same choice
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-500">Not enough data yet</div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
