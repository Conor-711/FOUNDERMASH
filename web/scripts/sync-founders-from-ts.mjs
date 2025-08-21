#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import vm from 'vm';

const root = process.cwd();
const foundersTsPath = path.join(root, 'data', 'founders.ts');
const contentDir = path.join(root, 'content', 'founders');

function extractArrayLiteral(ts) {
  const startIdx = ts.indexOf('export const FOUNDERS');
  if (startIdx === -1) throw new Error('FOUNDERS not found');
  const arrStart = ts.indexOf('[', startIdx);
  const arrEnd = ts.lastIndexOf(']');
  const code = ts.slice(arrStart, arrEnd + 1);
  return code;
}

function parseFounders() {
  const ts = fs.readFileSync(foundersTsPath, 'utf-8');
  const arr = extractArrayLiteral(ts);
  const js = 'module.exports = ' + arr + ';';
  const sandbox = { module: { exports: [] } };
  vm.createContext(sandbox);
  vm.runInContext(js, sandbox, { timeout: 1000 });
  return sandbox.module.exports;
}

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

async function main() {
  ensureDir(contentDir);
  const items = parseFounders();
  let created = 0;
  for (const f of items) {
    const slug = f.slug.toLowerCase().replace(/\s+/g, '-');
    const dir = path.join(contentDir, slug);
    const metaPath = path.join(dir, 'meta.json');
    if (!fs.existsSync(metaPath)) {
      ensureDir(dir);
      const meta = {
        slug,
        name: f.name,
        track: (f.rank && f.rank.track) || 'OTHER',
        summary: f.summary || '',
        life: f.life || '',
        social: Array.isArray(f.social) ? f.social : [],
        project: {
          name: f.project?.name || '',
          description: f.project?.description || '',
          fdv: f.project?.fdv || '',
          mindshare: f.project?.mindshare || '',
          url: f.project?.url || '',
          logo: ''
        },
        score: typeof f.score === 'number' ? f.score : 0
      };
      fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
      created += 1;
    }
  }
  console.log(`Synced meta.json. created=${created}`);
}

main().catch((e) => { console.error(e); process.exit(1); });


