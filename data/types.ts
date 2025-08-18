export type Track = "ALL" | "DEFI" | "EXCHANGE" | "L1/L2" | "AI" | "NFT" | "STABLECOIN" | "OTHER";

export type Social = { label: string; url: string };
export type Project = { logo: string; name: string; description: string; fdv: string; url?: string };
export type Rank = { all: number; track: Track; trackRank: number };

export type Founder = {
  slug: string;
  name: string;
  track: Track;
  summary: string;
  life: string;
  social: Social[];
  project: Project;
  score: number;
  // derived
  avatar: string;
  avatars?: string[];
  rank: Rank;
};


