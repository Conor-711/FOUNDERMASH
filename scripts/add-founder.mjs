#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function slugify(input) {
  return input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: npm run add:founder "Full Name" -- --track AI --project "Project Name"');
  process.exit(1);
}

const name = args[0];
const trackIdx = args.indexOf('--track');
const projectIdx = args.indexOf('--project');
const track = trackIdx !== -1 ? args[trackIdx + 1] : 'OTHER';
const project = projectIdx !== -1 ? args[projectIdx + 1] : 'Project';
const slug = slugify(name);

const contentDir = path.join(process.cwd(), 'content', 'founders', slug);
const avatarDir = path.join(process.cwd(), 'public', 'images', 'founders', slug);
const projectDir = path.join(process.cwd(), 'public', 'images', 'projects');
fs.mkdirSync(contentDir, { recursive: true });
fs.mkdirSync(avatarDir, { recursive: true });
fs.mkdirSync(projectDir, { recursive: true });

const meta = {
  slug,
  name,
  track,
  summary: '',
  life: '',
  social: [],
  project: { name: project, description: '', fdv: '', url: '', logo: '' },
  score: 0
};
fs.writeFileSync(path.join(contentDir, 'meta.json'), JSON.stringify(meta, null, 2));

console.log(`Created founder scaffold for ${name} at content/founders/${slug}`);
console.log(`Add avatars at public/images/founders/${slug}/avatar-1.jpg[png], avatar-2.*, avatar-3.*`);
console.log(`Add project logo at public/images/projects/${slug}.png[jpg]`);


