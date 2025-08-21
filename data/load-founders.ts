import fs from 'fs';
import path from 'path';
import { Founder, Track } from './types';

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'founders');

export function ensureContentDirs() {
  if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

export function readFounders(): Omit<Founder, 'rank' | 'avatar' | 'avatars'>[] {
  ensureContentDirs();
  let dirs: string[] = [];
  try {
    dirs = fs
      .readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return [];
  }

  const items: Omit<Founder, 'rank' | 'avatar' | 'avatars'>[] = [];
  for (const dir of dirs) {
    try {
      const metaPath = path.join(CONTENT_DIR, dir, 'meta.json');
      if (!fs.existsSync(metaPath)) continue;
      const raw = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
      items.push(raw as Omit<Founder, 'rank' | 'avatar' | 'avatars'>);
    } catch {
      // skip bad file
    }
  }
  return items;
}

export function detectAvatars(slug: string): { avatar: string; avatars: string[] } {
  const baseDir = path.join(process.cwd(), 'public', 'images', 'founders', slug);
  const candidates = [
    'avatar-1.jpg', 'avatar-1.png',
    'avatar-2.jpg', 'avatar-2.png',
    'avatar-3.jpg', 'avatar-3.png',
    // also accept shorter naming like ava-1.*
    'ava-1.jpg', 'ava-1.png',
    'ava-2.jpg', 'ava-2.png',
    'ava-3.jpg', 'ava-3.png',
  ];
  const existing = candidates
    .map(name => path.join(baseDir, name))
    .filter(p => fs.existsSync(p))
    .map(p => p.replace(process.cwd(), '').replace(/\\/g, '/').replace('/public', ''));
  const avatar = existing[0] || '/vercel.svg';
  return { avatar, avatars: existing.slice(0, 3) };
}

export function projectLogo(slug: string): string {
  const png = path.join(process.cwd(), 'public', 'images', 'projects', `${slug}.png`);
  const jpg = path.join(process.cwd(), 'public', 'images', 'projects', `${slug}.jpg`);
  if (fs.existsSync(png)) return '/images/projects/' + `${slug}.png`;
  if (fs.existsSync(jpg)) return '/images/projects/' + `${slug}.jpg`;
  return '/vercel.svg';
}

export function computeRanks(items: (Omit<Founder, 'rank' | 'avatar' | 'avatars'> & { avatar: string; avatars: string[] })[]): Founder[] {
  const allSorted = [...items].sort((a, b) => b.score - a.score);
  const allRankMap = new Map<string, number>();
  allSorted.forEach((f, idx) => allRankMap.set(f.slug, idx + 1));

  const byTrack = new Map<Track, typeof items>();
  allSorted.forEach(f => {
    const arr = byTrack.get(f.track as Track) || [];
    arr.push(f);
    byTrack.set(f.track as Track, arr);
  });

  const result: Founder[] = items.map(f => {
    const trackArr = (byTrack.get(f.track as Track) || []).sort((a, b) => b.score - a.score);
    const trackRank = trackArr.findIndex(x => x.slug === f.slug) + 1;
    return {
      ...f,
      rank: { all: allRankMap.get(f.slug) || 0, track: f.track as Track, trackRank },
    } as Founder;
  });

  return result;
}

export function loadFounders(): Founder[] {
  const raw = readFounders();
  const withAssets = raw.map((f) => {
    const { avatar, avatars } = detectAvatars(f.slug);
    return {
      ...f,
      avatar,
      avatars,
      project: { ...f.project, logo: projectLogo(f.slug) },
    };
  });
  return computeRanks(withAssets);
}


