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
  },
  {
    slug: 'Jeff',
    name: 'Jeff',
    avatar: '/images/founders/jeff/ava-1.jpg',
    avatars: ['/images/founders/jeff/ava-1.jpg', '/images/founders/jeff/ava-2.jpg', '/images/founders/jeff/ava-3.jpg'],
    summary: 'Founder of Hyperliquid',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/jeff.png',
      name: 'Hyperliquid',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 1 },
    score: 80
  },
  {
    slug: 'Bing',
    name: 'Bing',
    avatar: '/images/founders/bing/ava-1.jpg',
    avatars: ['/images/founders/bing/ava-1.jpg', '/images/founders/bing/ava-2.jpg', '/images/founders/bing/ava-3.jpg'],
    summary: 'Founder of MegaET',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/bing.png',
      name: 'MegaETH',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 2 },
    score: 75
  },
  {
    slug: 'Keone Hon',
    name: 'Keone Hon',
    avatar: '/images/founders/keonehon/ava-1.jpg',
    avatars: ['/images/founders/keonehon/ava-1.jpg', '/images/founders/keonehon/ava-2.jpg', '/images/founders/keonehon/ava-3.jpg'],
    summary: 'Founder of Mona',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/keonehon.png',
      name: 'Monad',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 3 },
    score: 70
  },
  {
    slug: 'Ben Zhou',
    name: 'Ben Zhou',
    avatar: '/images/founders/benzhou/ava-1.jpg',
    avatars: ['/images/founders/benzhou/ava-1.jpg'],
    summary: 'Founder of Bybit',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/benzhou.png',
      name: 'Bybit',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'EXCHANGE', trackRank: 3 },
    score: 65
  },
  {
    slug: 'Justin Sun',
    name: 'Justin Sun',
    avatar: '/images/founders/justinsun/ava-1.jpg',
    avatars: ['/images/founders/justinsun/ava-1.jpg', '/images/founders/justinsun/ava-2.jpg', '/images/founders/justinsun/ava-3.jpg'],
    summary: 'Founder of Tron',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/justinsun.png',
      name: 'Tron',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 4 },
    score: 60
  },
  {
    slug: 'Vitalik Buterin',
    name: 'Vitalik Buterin',
    avatar: '/images/founders/vitalikbuterin/ava-1.jpg',
    avatars: ['/images/founders/vitalikbuterin/ava-1.jpg', '/images/founders/vitalikbuterin/ava-2.jpg', '/images/founders/vitalikbuterin/ava-3.jpg'],
    summary: 'Founder of Ethereum',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/vitalikbuterin.png',
      name: 'Ethereum',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 5 },
    score: 55
  },
  {
    slug: 'Toly',
    name: 'Toly',
    avatar: '/images/founders/toly/ava-1.jpg',
    avatars: ['/images/founders/toly/ava-1.jpg', '/images/founders/toly/ava-2.jpg', '/images/founders/toly/ava-3.jpg'],
    summary: 'Founder of Solana',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/toly.png',
      name: 'Solana',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 6 },
    score: 50
  },
  {
    slug: 'SBF',
    name: 'SBF',
    avatar: '/images/founders/sbf/ava-1.jpg',
    avatars: ['/images/founders/sbf/ava-1.jpg', '/images/founders/sbf/ava-2.jpg', '/images/founders/sbf/ava-3.jpg'],
    summary: 'Founder of FTX',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/sbf.png',
      name: 'FTX',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'EXCHANGE', trackRank: 4 },
    score: 45
  },
  {
    slug: 'Pacman',
    name: 'Pacman',
    avatar: '/images/founders/pacman/ava-1.jpg',
    avatars: ['/images/founders/pacman/ava-1.jpg', '/images/founders/pacman/ava-2.jpg', '/images/founders/pacman/ava-3.jpg'],
    summary: 'Founder of Blast',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/pacman.png',
      name: 'Blast',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 7 },
    score: 40
  },
  {
    slug: 'Smokey',
    name: 'Smokey',
    avatar: '/images/founders/smokey/ava-1.jpg',
    avatars: ['/images/founders/smokey/ava-1.jpg', '/images/founders/smokey/ava-2.jpg', '/images/founders/smokey/ava-3.jpg'],
    summary: 'Founder of Berachain',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/smokey.png',
      name: 'Berachain',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 7 },
    score: 40
  },
  {
    slug: 'meow',
    name: 'meow',
    avatar: '/images/founders/meow/ava-1.jpg',
    avatars: ['/images/founders/meow/ava-1.jpg', '/images/founders/meow/ava-2.jpg', '/images/founders/meow/ava-3.jpg'],
    summary: 'Founder of Jupiter',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/meow.png',
      name: 'Jupiter',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'EXCHANGE', trackRank: 5 },
    score: 40
  },
  {
    slug: 'Brian Armstrong',
    name: 'Brian Armstrong',
    avatar: '/images/founders/brianarmstrong/ava-1.jpg',
    avatars: ['/images/founders/brianarmstrong/ava-1.jpg', '/images/founders/brianarmstrong/ava-2.jpg', '/images/founders/brianarmstrong/ava-3.jpg'],
    summary: 'Founder of Coinbase',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/brianarmstrong.png',
      name: 'Coinbase',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'EXCHANGE', trackRank: 6 },
    score: 40
  },
  {
    slug: 'Armani Ferrante',
    name: 'Armani Ferrante',
    avatar: '/images/founders/armaniferrante/ava-1.jpg',
    avatars: ['/images/founders/armaniferrante/ava-1.jpg', '/images/founders/armaniferrante/ava-2.jpg', '/images/founders/armaniferrante/ava-3.jpg'],
    summary: 'Founder of Backpack',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/armaniferrante.png',
      name: 'Backpack',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'EXCHANGE', trackRank: 7 },
    score: 40
  },
  {
    slug: 'Richard Liu',
    name: 'Richard Liu',
    avatar: '/images/founders/richardliu/ava-1.jpg',
    avatars: ['/images/founders/richardliu/ava-1.jpg', '/images/founders/richardliu/ava-2.jpg', '/images/founders/richardliu/ava-3.jpg'],
    summary: 'Founder of Huma',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/richardliu.png',
      name: 'Huma',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'OTHER', trackRank: 7 },
    score: 40
  },
  {
    slug: 'alon',
    name: 'alon',
    avatar: '/images/founders/alon/ava-1.jpg',
    avatars: ['/images/founders/alon/ava-1.jpg', '/images/founders/alon/ava-2.jpg', '/images/founders/alon/ava-3.jpg'],
    summary: 'Founder of Pumpfun',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/alon.png',
      name: 'Pumpfun',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'OTHER', trackRank: 8 },
    score: 40
  },
  {
    slug: 'everythingempty',
    name: 'Wee Kee',
    avatar: '/images/founders/everythingempty/ava-1.jpg',
    avatars: ['/images/founders/everythingempty/ava-1.jpg', '/images/founders/everythingempty/ava-2.jpg', '/images/founders/everythingempty/ava-3.jpg'],
    summary: 'Founder of Virtuals',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/everythingempty.png',
      name: 'Virtuals',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'AI', trackRank: 7 },
    score: 40
  },
  {
    slug: 'Vladimir Novakovski',
    name: 'Vladimir Novakovski',
    avatar: '/images/founders/vladimirnovakovski/ava-1.jpg',
    avatars: ['/images/founders/vladimirnovakovski/ava-1.jpg', '/images/founders/vladimirnovakovski/ava-2.jpg', '/images/founders/vladimirnovakovski/ava-3.jpg'],
    summary: 'Founder of Lighter',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/vladimirnovakovski.png',
      name: 'Lighter',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'EXCHANGE', trackRank: 7 },
    score: 40
  },
  {
    slug: 'Ezaan Mangalji',
    name: 'Ezaan Mangalji',
    avatar: '/images/founders/ezaanmangalji/ava-1.jpg',
    avatars: ['/images/founders/ezaanmangalji/ava-1.jpg', '/images/founders/ezaanmangalji/ava-2.jpg', '/images/founders/ezaanmangalji/ava-3.jpg'],
    summary: 'Founder of Initia',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/ezaanmangalji.png',
      name: 'Initia',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 8 },
    score: 40
  },  {
    slug: 'satoshi',
    name: 'satoshi',
    avatar: '/images/founders/satoshi/ava-1.jpg',
    avatars: ['/images/founders/satoshi/ava-1.jpg', '/images/founders/satoshi/ava-2.jpg', '/images/founders/satoshi/ava-3.jpg'],
    summary: 'Founder of Bitcoin',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/satoshi.png',
      name: 'Bitcoin',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 8 },
    score: 40
  },  {
    slug: 'Ming Wu',
    name: 'Ming Wu',
    avatar: '/images/founders/mingwu/ava-1.jpg',
    avatars: ['/images/founders/mingwu/ava-1.jpg', '/images/founders/mingwu/ava-2.jpg', '/images/founders/mingwu/ava-3.jpg'],
    summary: 'Founder of 0G Labs',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/mingwu.png',
      name: '0G Labs',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 8 },
    score: 40
  },  {
    slug: 'Pengyu Wang',
    name: 'Pengyu Wang',
    avatar: '/images/founders/pengyuwang/ava-1.jpg',
    avatars: ['/images/founders/pengyuwang/ava-1.jpg', '/images/founders/pengyuwang/ava-2.jpg', '/images/founders/pengyuwang/ava-3.jpg'],
    summary: 'Founder of Particle Network',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/pengyuwang.png',
      name: 'Particle Network',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 8 },
    score: 40
  },  {
    slug: 'Sreeram Kannan',
    name: 'Sreeram Kannan',
    avatar: '/images/founders/sreeramkannan/ava-1.jpg',
    avatars: ['/images/founders/sreeramkannan/ava-1.jpg', '/images/founders/sreeramkannan/ava-2.jpg', '/images/founders/sreeramkannan/ava-3.jpg'],
    summary: 'Founder of Eigenlayer',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/sreeramkannan.png',
      name: 'Eigenlayer',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'DEFI', trackRank: 8 },
    score: 40
  },  {
    slug: 'wayn',
    name: 'wayn',
    avatar: '/images/founders/wayn/ava-1.jpg',
    avatars: ['/images/founders/wayn/ava-1.jpg', '/images/founders/wayn/ava-2.jpg', '/images/founders/wayn/ava-3.jpg'],
    summary: 'Founder of Galxe',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/wayn.png',
      name: 'Galxe',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 8 },
    score: 40
  },  {
    slug: 'Terence Kwok',
    name: 'Terence Kwok',
    avatar: '/images/founders/terencekwok/ava-1.jpg',
    avatars: ['/images/founders/terencekwok/ava-1.jpg', '/images/founders/terencekwok/ava-2.jpg', '/images/founders/terencekwok/ava-3.jpg'],
    summary: 'Founder of Humanity Protocol',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/terencekwok.png',
      name: 'Humanity Protocol',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 8 },
    score: 40
  },  {
    slug: 'James Chi',
    name: 'James Chi',
    avatar: '/images/founders/jameschi/ava-1.jpg',
    avatars: ['/images/founders/jameschi/ava-1.jpg', '/images/founders/jameschi/ava-2.jpg', '/images/founders/jameschi/ava-3.jpg'],
    summary: 'Founder of Pumpfun',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/jameschi.png',
      name: 'Camp Network',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 8 },
    score: 40
  },  {
    slug: 'Haze',
    name: 'Haze',
    avatar: '/images/founders/haze/ava-1.jpg',
    avatars: ['/images/founders/haze/ava-1.jpg', '/images/founders/haze/ava-2.jpg', '/images/founders/haze/ava-3.jpg'],
    summary: 'Founder of GMGN',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/haze.png',
      name: 'GMGN',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'EXCHANGE', trackRank: 8 },
    score: 40
  },  {
    slug: 'Hayden Adams',
    name: 'Hayden Adams',
    avatar: '/images/founders/haydenadams/ava-1.jpg',
    avatars: ['/images/founders/haydenadams/ava-1.jpg', '/images/founders/haydenadams/ava-2.jpg', '/images/founders/haydenadams/ava-3.jpg'],
    summary: 'Founder of Uniswap',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/haydenadams.png',
      name: 'Uniswap',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'DEFI', trackRank: 8 },
    score: 40
  },  {
    slug: 'Shayne Coplan',
    name: 'Shayne Coplan',
    avatar: '/images/founders/shaynecoplan/ava-1.jpg',
    avatars: ['/images/founders/shaynecoplan/ava-1.jpg', '/images/founders/shaynecoplan/ava-2.jpg', '/images/founders/shaynecoplan/ava-3.jpg'],
    summary: 'Founder of Polymarket',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/shaynecoplan.png',
      name: 'Polymarket',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'EXCHANGE', trackRank: 8 },
    score: 40
  },  {
    slug: 'Michael Lee',
    name: 'Michael Lee',
    avatar: '/images/founders/michaellee/ava-1.jpg',
    avatars: ['/images/founders/michaellee/ava-1.jpg', '/images/founders/michaellee/ava-2.jpg', '/images/founders/michaellee/ava-3.jpg'],
    summary: 'Founder of Abstract',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/michaellee.png',
      name: 'Abstract',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 8 },
    score: 40
  },  {
    slug: 'Kain Warwick',
    name: 'Kain Warwick',
    avatar: '/images/founders/kainwarwick/ava-1.jpg',
    avatars: ['/images/founders/kainwarwick/ava-1.jpg', '/images/founders/kainwarwick/ava-2.jpg', '/images/founders/kainwarwick/ava-3.jpg'],
    summary: 'Founder of Infinex',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/kainwarwick.png',
      name: 'Infinex',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'DEFI', trackRank: 8 },
    score: 40
  },  {
    slug: 'Jonny Fish',
    name: 'Jonny Fish',
    avatar: '/images/founders/jonnyfish/ava-1.jpg',
    avatars: ['/images/founders/jonnyfish/ava-1.jpg', '/images/founders/jonnyfish/ava-2.jpg', '/images/founders/jonnyfish/ava-3.jpg'],
    summary: 'Founder of Sidekick',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/jonnyfish.png',
      name: 'Sidekick',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'OTHER', trackRank: 8 },
    score: 40
  },  {
    slug: 'zhusu',
    name: 'zhusu',
    avatar: '/images/founders/zhusu/ava-1.jpg',
    avatars: ['/images/founders/zhusu/ava-1.jpg', '/images/founders/zhusu/ava-2.jpg', '/images/founders/zhusu/ava-3.jpg'],
    summary: 'Founder of Three Arrows Capital',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/zhusu.png',
      name: 'Three Arrows Capital',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'OTHER', trackRank: 8 },
    score: 40
  },  {
    slug: 'Devin Finzer',
    name: 'Devin Finzer',
    avatar: '/images/founders/devinfinzer/ava-1.jpg',
    avatars: ['/images/founders/devinfinzer/ava-1.jpg', '/images/founders/devinfinzer/ava-2.jpg', '/images/founders/devinfinzer/ava-3.jpg'],
    summary: 'Founder of OpenSea',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/devinfinzer.png',
      name: 'OpenSea',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'NFT', trackRank: 8 },
    score: 40
  },  {
    slug: 'Dan Romero',
    name: 'Dan Romero',
    avatar: '/images/founders/danromero/ava-1.jpg',
    avatars: ['/images/founders/danromero/ava-1.jpg', '/images/founders/danromero/ava-2.jpg', '/images/founders/danromero/ava-3.jpg'],
    summary: 'Founder of Farcaster',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/danromero.png',
      name: 'Farcaster',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 8 },
    score: 40
  },  {
    slug: 'Cobie',
    name: 'Cobie',
    avatar: '/images/founders/cobie/ava-1.jpg',
    avatars: ['/images/founders/cobie/ava-1.jpg', '/images/founders/cobie/ava-2.jpg', '/images/founders/cobie/ava-3.jpg'],
    summary: 'Founder of Echo',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/cobie.png',
      name: 'Echo',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'OTHER', trackRank: 8 },
    score: 40
  },  {
    slug: 'Guy Young',
    name: 'Guy Young',
    avatar: '/images/founders/guyyoung/ava-1.jpg',
    avatars: ['/images/founders/guyyoung/ava-1.jpg', '/images/founders/guyyoung/ava-2.jpg', '/images/founders/guyyoung/ava-3.jpg'],
    summary: 'Founder of Ethena',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/guyyoung.png',
      name: 'Ethena',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'STABLECOIN', trackRank: 8 },
    score: 40
  },  {
    slug: 'Dan Greer',
    name: 'Dan Greer',
    avatar: '/images/founders/dangreer/ava-1.jpg',
    avatars: ['/images/founders/dangreer/ava-1.jpg', '/images/founders/dangreer/ava-2.jpg', '/images/founders/dangreer/ava-3.jpg'],
    summary: 'Founder of Defi App',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/dangreer.png',
      name: 'Defi App',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'DEFI', trackRank: 8 },
    score: 40
  },  {
    slug: 'TN Lee',
    name: 'TN Lee',
    avatar: '/images/founders/tnlee/ava-1.jpg',
    avatars: ['/images/founders/tnlee/ava-1.jpg', '/images/founders/tnlee/ava-2.jpg', '/images/founders/tnlee/ava-3.jpg'],
    summary: 'Founder of Pendle',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/tnlee.png',
      name: 'Pendle',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'DEFI', trackRank: 8 },
    score: 40
  },  {
    slug: 'Sergey Nazarov',
    name: 'Sergey Nazarov',
    avatar: '/images/founders/sergeynazarov/ava-1.jpg',
    avatars: ['/images/founders/sergeynazarov/ava-1.jpg', '/images/founders/sergeynazarov/ava-2.jpg', '/images/founders/sergeynazarov/ava-3.jpg'],
    summary: 'Founder of Chainlink',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/sergeynazarov.png',
      name: 'Chainlink',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'DEFI', trackRank: 8 },
    score: 40
  },  {
    slug: 'Sandeep Nailwal',
    name: 'Sandeep Nailwal',
    avatar: '/images/founders/sandeepnailwal/ava-1.jpg',
    avatars: ['/images/founders/sandeepnailwal/ava-1.jpg', '/images/founders/sandeepnailwal/ava-2.jpg', '/images/founders/sandeepnailwal/ava-3.jpg'],
    summary: 'Founder of Polygon',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/sandeepnailwal.png',
      name: 'Polygon',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 8 },
    score: 40
  },  {
    slug: 'Emin Gün Sirer',
    name: 'Emin Gün Sirer',
    avatar: '/images/founders/eminunsirer/ava-1.jpg',
    avatars: ['/images/founders/eminunsirer/ava-1.jpg', '/images/founders/eminunsirer/ava-2.jpg', '/images/founders/eminunsirer/ava-3.jpg'],
    summary: 'Founder of Avalanche',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/eminunsirer.png',
      name: 'Avalanche',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 8 },
    score: 40
  },  {
    slug: 'Avery Ching',
    name: 'Avery Ching',
    avatar: '/images/founders/averyching/ava-1.jpg',
    avatars: ['/images/founders/averyching/ava-1.jpg', '/images/founders/averyching/ava-2.jpg', '/images/founders/averyching/ava-3.jpg'],
    summary: 'Founder of Apto',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/averyching.png',
      name: 'Aptos',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 8 },
    score: 40
  },  {
    slug: 'Rushi Manche',
    name: 'Rushi Manche',
    avatar: '/images/founders/rushimanche/ava-1.jpg',
    avatars: ['/images/founders/rushimanche/ava-1.jpg', '/images/founders/rushimanche/ava-2.jpg', '/images/founders/rushimanche/ava-3.jpg'],
    summary: 'ex-Founder of Movement',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/rushimanche.png',
      name: 'Movement',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'L1/L2', trackRank: 8 },
    score: 40
  },  {
    slug: 'Mable Jiang',
    name: 'Mable Jiang',
    avatar: '/images/founders/mablejiang/ava-1.jpg',
    avatars: ['/images/founders/mablejiang/ava-1.jpg', '/images/founders/mablejiang/ava-2.jpg', '/images/founders/mablejiang/ava-3.jpg'],
    summary: 'Founder of Trends',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/mablejiang.png',
      name: 'Trends',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'OTHER', trackRank: 8 },
    score: 40
  },  
  {
    slug: 'Taiki',
    name: 'Taiki',
    avatar: '/images/founders/taiki/ava-1.jpg',
    avatars: ['/images/founders/taiki/ava-1.jpg', '/images/founders/taiki/ava-2.jpg', '/images/founders/taiki/ava-3.jpg'],
    summary: 'Founder of Humble Farmer Army',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/taiki.png',
      name: 'Humble Farmer Army',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'OTHER', trackRank: 8 },
    score: 40
  },
  {
    slug: 'Joseph Lubin',
    name: 'Joseph Lubin',
    avatar: '/images/founders/josephlubin/ava-1.jpg',
    avatars: ['/images/founders/josephlubin/ava-1.jpg', '/images/founders/josephlubin/ava-2.jpg', '/images/founders/josephlubin/ava-3.jpg'],
    summary: 'Founder of ConsenSys',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/josephlubin.png',
      name: 'ConsenSys',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'OTHER', trackRank: 8 },
    score: 40
  },
  {
    slug: 'Han Lin',
    name: 'Han Lin',
    avatar: '/images/founders/hanlin/ava-1.jpg',
    avatars: ['/images/founders/hanlin/ava-1.jpg', '/images/founders/hanlin/ava-2.jpg', '/images/founders/hanlin/ava-3.jpg'],
    summary: 'Founder of Gate',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/hanlin.png',
      name: 'Gate',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'EXCHANGE', trackRank: 8 },
    score: 40
  },
  {
    slug: 'Jesse Powell',
    name: 'Jesse Powell',
    avatar: '/images/founders/jessepowell/ava-1.jpg',
    avatars: ['/images/founders/jessepowell/ava-1.jpg', '/images/founders/jessepowell/ava-2.jpg', '/images/founders/jessepowell/ava-3.jpg'],
    summary: 'Founder of Kraken',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/jessepowell.png',
      name: 'Kraken',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'EXCHANGE', trackRank: 8 },
    score: 40
  },
  {
    slug: 'Bryan Pellegrino',
    name: 'Bryan Pellegrino',
    avatar: '/images/founders/bryanpelgrino/ava-1.jpg',
    avatars: ['/images/founders/bryanpelgrino/ava-1.jpg', '/images/founders/bryanpelgrino/ava-2.jpg', '/images/founders/bryanpelgrino/ava-3.jpg'],
    summary: 'Founder of LayerZero',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/bryanpelgrino.png',
      name: 'LayerZero',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'OTHER', trackRank: 8 },
    score: 40
  },
  {
    slug: 'Jack Lu',
    name: 'Jack Lu',
    avatar: '/images/founders/jacklu/ava-1.jpg',
    avatars: ['/images/founders/jacklu/ava-1.jpg', '/images/founders/jacklu/ava-2.jpg', '/images/founders/jacklu/ava-3.jpg'],
    summary: 'Founder of Magic Eden',
    life: 'Background in CS and design. Previously at Startup X. Based in NYC.',
    social: [
      { label: 'Twitter', url: 'https://twitter.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com' }
    ],
    project: {
      logo: '/images/projects/jacklu.png',
      name: 'Magic Eden',
      description: 'Developer tools and infrastructure platform.',
      fdv: '$80M',
      url: '#'
    },
    rank: { all: 2, track: 'OTHER', trackRank: 8 },
    score: 40
  }
];


