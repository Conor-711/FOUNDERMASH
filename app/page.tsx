
import { loadFounders } from "@/data/load-founders";
import HomePage from "@/components/HomePage";

export default async function Home({ searchParams }: { searchParams?: Promise<{ track?: string }> }) {
  const params = (await searchParams) || {};
  const active = (params.track || 'ALL').toUpperCase();
  const all = loadFounders();
  const filtered = active === 'ALL' ? all : all.filter(f => f.rank.track.toUpperCase() === active);

  return <HomePage filtered={filtered} active={active} />;
}
