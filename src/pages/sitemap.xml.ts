// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';

const nonDefaultLanguages = ['es', 'fr', 'de', 'pt', 'hi', 'ja', 'zh', 'ar', 'it', 'ru', 'ko'];

const pages = [
  { url: 'https://redactfree.com/', priority: '1.0', changefreq: 'weekly' },
  ...nonDefaultLanguages.map(lang => ({
    url: `https://redactfree.com/${lang}/`,
    priority: '0.9',
    changefreq: 'weekly'
  })),
  { url: 'https://redactfree.com/about', priority: '0.8', changefreq: 'monthly' },
  { url: 'https://redactfree.com/privacy', priority: '0.6', changefreq: 'monthly' },
  { url: 'https://redactfree.com/terms', priority: '0.6', changefreq: 'monthly' },
  { url: 'https://redactfree.com/contact', priority: '0.7', changefreq: 'monthly' },
];

const lastmod = new Date().toISOString().split('T')[0];

export const GET: APIRoute = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
