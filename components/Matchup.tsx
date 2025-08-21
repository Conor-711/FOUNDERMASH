"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

type Founder = {
  slug: string;
  name: string;
  avatar: string;
  project: { name: string };
};

function getTwoDistinctIndices(max: number, exclude?: [number, number]): [number, number] {
  if (max < 2) return [0, 0];
  let a = Math.floor(Math.random() * max);
  let b = Math.floor(Math.random() * max);
  let guard = 0;
  while ((
    b === a || (
      exclude && (
        (a === exclude[0] && b === exclude[1]) ||
        (a === exclude[1] && b === exclude[0])
      )
    )
  ) && guard < 50) {
    a = Math.floor(Math.random() * max);
    b = Math.floor(Math.random() * max);
    guard += 1;
  }
  if (a === b) b = (a + 1) % max;
  return [a, b];
}

export default function Matchup({ founders }: { founders: Founder[] }) {
  const pool = useMemo(() => founders.filter(Boolean), [founders]);
  // 初始对局使用确定性索引，避免 SSR 与客户端首次渲染不一致
  const [pair, setPair] = useState<[number, number]>(() => (pool.length >= 2 ? [0, 1] as [number, number] : [0, 0] as [number, number]));
  const [bubble, setBubble] = useState<{ side: 'left' | 'right'; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const choose = useCallback(async (winnerIdx: number) => {
    if (busy) return;
    setBusy(true);
    const left = pool[pair[0]];
    const right = pool[pair[1]];
    const winner = winnerIdx === 0 ? left : right;
    const a = left.slug;
    const b = right.slug;
    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a, b, winner: winner.slug })
      });
      const data = await res.json();
      const pct = typeof data.percent === 'number' ? data.percent : 50;
      const cnt = typeof data.count === 'number' ? data.count : undefined;
      const msg = typeof cnt === 'number'
        ? `${cnt} people chose the same as you, which is ${pct}% of the total`
        : `${pct}% chose ${winner.name}`;
      setBubble({ side: winnerIdx === 0 ? 'left' : 'right', text: msg });
    } catch (e) {
      setBubble({ side: winnerIdx === 0 ? 'left' : 'right', text: `Recorded your choice` });
    }
    setTimeout(() => {
      setBubble(null);
      setPair((prev) => getTwoDistinctIndices(pool.length, prev));
      setBusy(false);
    }, 2000);
  }, [busy, pool, pair]);

  // 客户端挂载后再随机化，避免 Hydration mismatch
  useEffect(() => {
    const key = pool.map(p => p.slug).join('|');
    setPair(getTwoDistinctIndices(pool.length));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool.length]);

  if (!Array.isArray(pool) || pool.length < 2) {
    return <div className="text-sm text-gray-500">Not enough founders to compare.</div>;
  }

  // 保障索引在范围内，避免边界情况下 undefined
  let i0 = Math.min(Math.max(pair[0] ?? 0, 0), pool.length - 1);
  let i1 = Math.min(Math.max(pair[1] ?? 1, 0), pool.length - 1);
  if (i0 === i1) i1 = (i0 + 1) % pool.length;
  const left = pool[i0];
  const right = pool[i1];

  return (
    <div className="relative flex items-start justify-center gap-20 mt-4">
      <div className="inline-flex flex-col items-center relative" data-name={left.name}>
        <button type="button" onClick={() => choose(0)} disabled={busy} className="focus:outline-none disabled:opacity-50">
          <Image src={left.avatar} alt={left.name} width={300} height={380} className="border border-[#ccc] object-cover" />
        </button>
        {bubble && bubble.side === 'left' && (
          <div className="absolute -right-2 top-2 bg-black text-white text-xs px-2 py-1 rounded shadow">
            {bubble.text}
          </div>
        )}
        <Link href={`/founder/${left.slug}`} className="mt-2 text-[#00a0a0] font-bold text-[20px]">{left.name}</Link>
        <Link href={`/founder/${left.slug}`} className="text-sm text-[#555] mt-1 hover:underline">Founder of {left.project.name}</Link>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 font-bold text-[#333]">OR</div>

      <div className="inline-flex flex-col items-center relative" data-name={right.name}>
        <button type="button" onClick={() => choose(1)} disabled={busy} className="focus:outline-none disabled:opacity-50">
          <Image src={right.avatar} alt={right.name} width={300} height={380} className="border border-[#ccc] object-cover" />
        </button>
        {bubble && bubble.side === 'right' && (
          <div className="absolute -left-2 top-2 bg-black text-white text-xs px-2 py-1 rounded shadow">
            {bubble.text}
          </div>
        )}
        <Link href={`/founder/${right.slug}`} className="mt-2 text-[#00a0a0] font-bold text-[20px]">{right.name}</Link>
        <Link href={`/founder/${right.slug}`} className="text-sm text-[#555] mt-1 hover:underline">Founder of {right.project.name}</Link>
      </div>
    </div>
  );
}


