import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { blogPosts } from '../src/components/blogPosts.js';

const baseUrl = 'https://www.pstech.website';

const urls = [
  '/',
  '/#about',
  '/#skills',
  '/#projects',
  '/#experience',
  '/#blog',
  '/#contact',
  ...blogPosts.map(p => `/blog/${p.slug}`)
];

const xmlItems = urls.map((path) => {
  return `  <url><loc>${baseUrl}${path}</loc></url>`;
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlItems}\n</urlset>`;

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
if (!existsSync(publicDir)) mkdirSync(publicDir);

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);

console.log('sitemap.xml generated with', urls.length, 'urls'); 