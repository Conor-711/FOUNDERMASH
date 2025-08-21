#!/usr/bin/env node
/**
 * Bulk update founders' meta.json using structured lines.
 *
 * Input format per line (use ASCII/中文分隔均可，脚本会容错)：
 *   <identifier>：<year>——<twitter_url>；<linkedin_url>；<description>——<fdv>——<mindshare>
 * 说明：
 * - identifier 可以是 slug（如 brian-armstrong）或去掉连接符的小写名（如 brianarmstrong）
 * - year 将用于 life 字段，自动生成：`Founded <project.name> in <year>`
 * - twitter_url / linkedin_url 将写入 social 数组（label 分别为 Twitter / LinkedIn）
 * - description → project.description
 * - fdv → project.fdv（原样字符串）
 * - mindshare → project.mindshare（如 "#9"）
 *
 * 用法：
 *   node scripts/bulk-update-founders.mjs updates.txt
 *   # 或从标准输入读入
 */

import fs from 'fs';
import path from 'path';

const root = process.cwd();
const contentDir = path.join(root, 'content', 'founders');

function readAllMeta() {
  const map = new Map();
  for (const dirent of fs.readdirSync(contentDir, { withFileTypes: true })) {
    if (!dirent.isDirectory()) continue;
    const slug = dirent.name;
    const metaPath = path.join(contentDir, slug, 'meta.json');
    if (!fs.existsSync(metaPath)) continue;
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    const key1 = slug.toLowerCase();
    const key2 = key1.replace(/[^a-z0-9]/g, '');
    map.set(key1, { slug, metaPath, meta });
    map.set(key2, { slug, metaPath, meta });
  }
  return map;
}

function parseLine(raw) {
  // 统一分隔符：中文/英文冒号、破折号、分号
  const line = raw.trim();
  if (!line || line.startsWith('#')) return null;
  // split identifier and the rest
  const idSplit = line.split(/[：:]/);
  if (idSplit.length < 2) return null;
  const identifier = idSplit[0].trim().toLowerCase();
  const body = idSplit.slice(1).join(':');
  // first level with long dash —— (could be -- or ——)
  const parts = body.split(/[—-]{2,}/); // match —— or --
  // expected groups: [year, urls+desc, fdv, mindshare]
  const year = parts[0]?.trim() || '';
  const urlsAndDesc = parts[1] || '';
  const fdv = (parts[2] || '').trim();
  const mindshare = (parts[3] || '').trim();
  const urlSegs = urlsAndDesc.split(/[；;]+/).map(s => s.trim()).filter(Boolean);
  
  // 智能解析：检查每个字段是否为 URL
  let twitter = '', linkedin = '', description = '';
  let descIndex = -1;
  
  for (let i = 0; i < urlSegs.length; i++) {
    const seg = urlSegs[i];
    if (seg.includes('x.com') || seg.includes('twitter.com')) {
      twitter = seg;
    } else if (seg.includes('linkedin.com')) {
      linkedin = seg;
    } else {
      // 第一个非URL字段就是描述
      if (descIndex === -1) descIndex = i;
    }
  }
  
  // 如果找到了描述的起始位置，合并剩余的字段作为描述
  if (descIndex >= 0) {
    description = urlSegs.slice(descIndex).join(' ').trim();
  }
  return { identifier, year, twitter, linkedin, description, fdv, mindshare };
}

function formatLife(meta, year) {
  if (!year) return meta.life || '';
  const company = meta.project?.name || 'the company';
  return `Founded ${company} in ${year}`;
}

async function main() {
  const inputPath = process.argv[2];
  const text = inputPath ? fs.readFileSync(inputPath, 'utf-8') : fs.readFileSync(0, 'utf-8');
  const lines = text.split(/\r?\n/);
  const index = readAllMeta();
  let updated = 0, skipped = 0;

  for (const raw of lines) {
    const item = parseLine(raw);
    if (!item) { continue; }
    const key = item.identifier.replace(/\s+/g, '-').toLowerCase();
    const keyCompact = item.identifier.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const hit = index.get(key) || index.get(keyCompact);
    if (!hit) { skipped++; continue; }
    const { metaPath } = hit;
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));

    // life
    meta.life = formatLife(meta, item.year);
    // social
    meta.social = [];
    if (item.twitter) meta.social.push({ label: 'Twitter', url: item.twitter });
    if (item.linkedin) meta.social.push({ label: 'LinkedIn', url: item.linkedin });
    // project
    meta.project = meta.project || {};
    if (item.description) meta.project.description = item.description;
    if (item.fdv) meta.project.fdv = item.fdv;
    if (item.mindshare) meta.project.mindshare = item.mindshare;

    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
    updated++;
  }

  console.log(`Updated ${updated} founders. Skipped ${skipped}.`);
}

main().catch(err => { console.error(err); process.exit(1); });


