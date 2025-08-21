#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import vm from 'vm';

const root = process.cwd();
const contentDir = path.join(root, 'content', 'founders');
const foundersTs = path.join(root, 'data', 'founders.ts');

function readFoundersTsMindshare() {
  const ts = fs.readFileSync(foundersTs, 'utf-8');
  const start = ts.indexOf('export const FOUNDERS');
  if (start === -1) return new Map();
  const arrStart = ts.indexOf('[', start);
  const arrEnd = ts.lastIndexOf(']');
  const code = ts.slice(arrStart, arrEnd + 1);
  const js = 'module.exports = ' + code + ';';
  const sandbox = { module: { exports: [] } };
  vm.createContext(sandbox);
  vm.runInContext(js, sandbox, { timeout: 1000 });
  const list = sandbox.module.exports;
  const map = new Map();
  for (const f of list) {
    const slug = String(f.slug).toLowerCase().replace(/\s+/g, '-');
    const mindshare = f?.project?.mindshare ?? '';
    map.set(slug, mindshare);
  }
  return map;
}

const msMap = readFoundersTsMindshare();
let updated = 0;
for (const dirent of fs.readdirSync(contentDir, { withFileTypes: true })) {
  if (!dirent.isDirectory()) continue;
  const slug = dirent.name;
  const metaPath = path.join(contentDir, slug, 'meta.json');
  if (!fs.existsSync(metaPath)) continue;
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
  meta.project = meta.project || {};
  if (meta.project.mindshare === undefined || meta.project.mindshare === '') {
    meta.project.mindshare = msMap.get(slug) ?? '';
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
    updated += 1;
  }
}
console.log(`Updated mindshare in ${updated} meta.json files.`);


