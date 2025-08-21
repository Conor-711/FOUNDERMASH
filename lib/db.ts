import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// Initialize Prisma with error handling for production environments
let prismaInstance: PrismaClient;

try {
  prismaInstance = globalThis.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL || 'file:./dev.db'
      }
    }
  });
  
  if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = prismaInstance;
  }
} catch (error) {
  console.error('Failed to initialize Prisma Client:', error);
  // Create a mock client for environments where database is not available
  prismaInstance = {
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
      create: async () => ({ id: 0, sessionId: '', aSlug: '', bSlug: '', winner: '', track: '', percentage: 0, createdAt: new Date() })
    },
    submission: {
      create: async () => ({ id: 0, founder: '', nickname: '', email: '', story: '', createdAt: new Date(), updatedAt: new Date() })
    }
  } as unknown as PrismaClient;
}

export const prisma = prismaInstance;


