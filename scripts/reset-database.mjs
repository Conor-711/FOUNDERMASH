#!/usr/bin/env node

import { PrismaClient } from '@prisma/client';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${join(__dirname, '../prisma/dev.db')}`
    }
  }
});

async function getAllFounders() {
  const foundersDir = join(__dirname, '../content/founders');
  const founderSlugs = [];
  
  try {
    const entries = await readdir(foundersDir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const metaPath = join(foundersDir, entry.name, 'meta.json');
        try {
          const metaContent = await readFile(metaPath, 'utf8');
          const meta = JSON.parse(metaContent);
          founderSlugs.push({
            slug: entry.name,
            track: meta.track || 'OTHER'
          });
        } catch (error) {
          console.warn(`Warning: Could not read meta.json for ${entry.name}:`, error.message);
        }
      }
    }
  } catch (error) {
    console.error('Error reading founders directory:', error);
    throw error;
  }
  
  return founderSlugs;
}

async function resetDatabase() {
  console.log('🚀 Starting database reset...');
  
  try {
    // 1. Get all founders
    console.log('📋 Getting all founders...');
    const founders = await getAllFounders();
    console.log(`Found ${founders.length} founders`);
    
    // 2. Clear all voting data
    console.log('🗑️  Clearing all voting data...');
    
    // Clear UserVote table
    const deletedUserVotes = await prisma.userVote.deleteMany();
    console.log(`Deleted ${deletedUserVotes.count} user votes`);
    
    // Clear Matchup table
    const deletedMatchups = await prisma.matchup.deleteMany();
    console.log(`Deleted ${deletedMatchups.count} matchup records`);
    
    // 3. Clear all story submissions
    console.log('📝 Clearing all story submissions...');
    const deletedSubmissions = await prisma.submission.deleteMany();
    console.log(`Deleted ${deletedSubmissions.count} story submissions`);
    
    // 4. Reset all ELO ratings to 1000
    console.log('⚖️  Resetting ELO ratings...');
    
    // Clear existing ELO records
    await prisma.elo.deleteMany();
    await prisma.eloTrack.deleteMany();
    
    // Create fresh ELO records for all founders
    const uniqueTracks = [...new Set(founders.map(f => f.track))];
    console.log(`Creating ELO records for tracks: ${uniqueTracks.join(', ')}`);
    
    // Create global ELO records
    for (const founder of founders) {
      await prisma.elo.create({
        data: {
          slug: founder.slug,
          rating: 1000
        }
      });
    }
    console.log(`Created ${founders.length} global ELO records`);
    
    // Create track-specific ELO records
    let trackEloCount = 0;
    for (const founder of founders) {
      await prisma.eloTrack.create({
        data: {
          slug: founder.slug,
          track: founder.track,
          rating: 1000
        }
      });
      trackEloCount++;
    }
    console.log(`Created ${trackEloCount} track-specific ELO records`);
    
    console.log('✅ Database reset completed successfully!');
    console.log('\n📊 Reset Summary:');
    console.log(`- ${founders.length} founders found`);
    console.log(`- ${deletedUserVotes.count} user votes deleted`);
    console.log(`- ${deletedMatchups.count} matchup records deleted`);
    console.log(`- ${deletedSubmissions.count} story submissions deleted`);
    console.log(`- ${founders.length} global ELO ratings reset to 1000`);
    console.log(`- ${trackEloCount} track ELO ratings reset to 1000`);
    console.log(`- ${uniqueTracks.length} tracks: ${uniqueTracks.join(', ')}`);
    
  } catch (error) {
    console.error('❌ Error during database reset:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Confirmation prompt
console.log('⚠️  WARNING: This will reset ALL database data!');
console.log('This includes:');
console.log('- All ELO ratings (reset to 1000)');
console.log('- All voting data');
console.log('- All matchup statistics');
console.log('- All user vote history');
console.log('- All story submissions');
console.log('');

if (process.argv.includes('--confirm')) {
  resetDatabase().catch(error => {
    console.error('Failed to reset database:', error);
    process.exit(1);
  });
} else {
  console.log('To proceed with the reset, run:');
  console.log('npm run reset:database -- --confirm');
  console.log('');
  console.log('Or with node directly:');
  console.log('node scripts/reset-database.mjs --confirm');
}
