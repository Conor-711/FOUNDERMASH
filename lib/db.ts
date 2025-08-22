import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma with error handling for production environments
let prismaInstance: PrismaClient;

try {
  // Check if DATABASE_URL is available
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.warn('DATABASE_URL not found, using mock client');
    throw new Error('DATABASE_URL not set');
  }

  prismaInstance = globalThis.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: databaseUrl
      }
    },
    // 优化数据库连接配置
    transactionOptions: {
      timeout: 10000, // 10秒超时（生产环境可能需要更长时间）
    }
  });
  
  if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prismaInstance;
  }
} catch (error) {
  console.error('Failed to initialize Prisma Client:', error);
  // Create a mock client for environments where database is not available
  prismaInstance = {
    $transaction: async (fn: any) => {
      // Mock transaction that returns empty results
      return await fn({
        elo: { upsert: async () => ({ slug: '', rating: 1000 }), update: async () => ({ slug: '', rating: 1000 }) },
        eloTrack: { upsert: async () => ({ slug: '', track: '', rating: 1000 }), update: async () => ({ slug: '', track: '', rating: 1000 }) },
        matchup: { upsert: async () => ({ pairKey: '', aSlug: '', bSlug: '', votesA: 0, votesB: 0 }) },
        userVote: { create: async () => ({ id: 0, sessionId: '', aSlug: '', bSlug: '', winner: '', track: '', percentage: 0, createdAt: new Date() }) }
      });
    },
    elo: {
      findMany: async () => [],
      upsert: async () => ({ slug: '', rating: 1000 }),
      update: async () => ({ slug: '', rating: 1000 })
    },
    eloTrack: {
      findMany: async () => [],
      upsert: async () => ({ slug: '', track: '', rating: 1000 }),
      update: async () => ({ slug: '', track: '', rating: 1000 })
    },
    matchup: {
      upsert: async () => ({ pairKey: '', aSlug: '', bSlug: '', votesA: 0, votesB: 0 })
    },
    userVote: {
      findMany: async () => [],
      create: async () => ({ id: 0, sessionId: '', aSlug: '', bSlug: '', winner: '', track: '', percentage: 0, createdAt: new Date() }),
      groupBy: async () => []
    },
    submission: {
      create: async () => ({ id: 0, founder: '', nickname: '', email: '', story: '', createdAt: new Date(), updatedAt: new Date() })
    },
    pageView: {
      count: async () => 0,
      groupBy: async () => [],
      create: async () => ({ id: 0, page: '', sessionId: '', userAgent: '', referrer: '', createdAt: new Date() })
    },
    clickEvent: {
      count: async () => 0,
      groupBy: async () => [],
      create: async () => ({ id: 0, eventType: '', target: '', page: '', sessionId: '', metadata: '', createdAt: new Date() })
    }
  } as unknown as PrismaClient;
}

export const prisma = prismaInstance;


