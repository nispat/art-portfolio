#!/usr/bin/env node
// Scans articles/*/meta.json and writes articles/manifest.json.
// Run locally: node .github/scripts/generate-manifest.js
// Run in CI: called automatically by the deploy workflow before upload.

const fs   = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, '..', '..', 'articles');
const OUTPUT       = path.join(ARTICLES_DIR, 'manifest.json');

const entries = fs
  .readdirSync(ARTICLES_DIR)
  .filter(name => {
    const full = path.join(ARTICLES_DIR, name);
    return fs.statSync(full).isDirectory();
  })
  .sort()
  .flatMap(id => {
    const metaPath = path.join(ARTICLES_DIR, id, 'meta.json');
    if (!fs.existsSync(metaPath)) return [];

    const meta      = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    const articleDir = `articles/${id}`;

    const images = (meta.images || []).map(img => ({
      src:   img.file ? `${articleDir}/${img.file}` : null,
      color: img.color  || null,
      label: img.label  || ''
    }));

    // Resolve videos array — supports both 'videos' (array) and legacy 'video' (single)
    const rawVideos = meta.videos || (meta.video ? [meta.video] : []);
    const videos = rawVideos
      .map(v => {
        const src = v.file ? `${articleDir}/${v.file}` : (v.url || null);
        return src ? { src, label: v.label || '' } : null;
      })
      .filter(Boolean);

    return [{
      id,
      path:        articleDir,
      title:       meta.title,
      medium:      meta.medium,
      dimensions:  meta.dimensions  || null,
      year:        meta.year        || null,
      price:       meta.price,
      category:    meta.category,
      status:      meta.status      || 'available',
      description: meta.description,
      images,
      videos
    }];
  })
  .reverse(); // newest folder name (YYYY-MM-*) sorts last → reverse = newest first

const manifest = { generated: new Date().toISOString(), articles: entries };
fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2));
console.log(`manifest.json written — ${entries.length} article(s)`);
