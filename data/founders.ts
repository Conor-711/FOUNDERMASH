export type Social = { label: string; url: string };
export type Project = {
  logo: string;
  name: string;
  description: string;
  fdv: string;
  url?: string;
};
export type Rank = { all: number; track: string; trackRank: number };

export type Founder = {
  slug: string;
  name: string;
  avatar: string; // primary
  avatars?: string[]; // up to 3
  summary: string;
  life: string;
  social: Social[];
  project: Project;
  rank: Rank;
  score: number; // for ranking page
};

export const FOUNDERS: Founder[] = [
  {
    slug: 'jason-zhao',
    name: 'Jason Zhao',
    avatar: '/images/founders/jason-zhao/avatar-1.jpg',
    avatars: ['/images/founders/jason-zhao/avatar-1.jpg', '/images/founders/jason-zhao/avatar-2.jpg', '/images/founders/jason-zhao/avatar-3.jpg'],
    summary: 'Co-founder at Example Co. Passionate about consumer AI.',
    life: 'Graduated from Somewhere University. Worked at BigCo, then founded Example Co. Lives in San Francisco.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/jason-zhao.png',
      name: 'Story',
      description: 'Consumer social app focused on creative storytelling.',
      fdv: '$120M',
      url: '#'
    },
    rank: { all: 1, track: 'AI', trackRank: 1 },
    score: 92
  },
  {
    slug: 'maria',
    name: 'Maria',
    avatar: '/images/maria.jpg',
    avatars: ['/images/maria.jpg'],
    summary: 'Founder at Another Co. Building tools for developers.',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/vercel.svg',
      name: 'Example Co',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'DEFI', trackRank: 1 },
    score: 85
  },
  {
    slug: 'CZ',
    name: 'CZ',
    avatar: '/images/founders/cz/ava-1.jpg',
    avatars: ['/images/founders/cz/ava-1.jpg', '/images/founders/cz/ava-2.jpg', '/images/founders/cz/ava-3.jpg'],  
    summary: 'Founder of Binance',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/cz.png',
      name: 'Binance',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'EXCHANGE', trackRank: 1 },
    score: 85
  },
  {
    slug: 'Star Xu',
    name: 'Star Xu',
    avatar: '/images/founders/starxu/ava-1.jpg',
    avatars: ['/images/founders/starxu/ava-1.jpg', '/images/founders/starxu/ava-2.jpg', '/images/founders/starxu/ava-3.jpg'],
    summary: 'Founder of OKX',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/starxu.png',
      name: 'OKX',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'EXCHANGE', trackRank: 2 },
    score: 80
  }
];


