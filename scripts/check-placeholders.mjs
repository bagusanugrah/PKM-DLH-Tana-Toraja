#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const scanDirs = [
  path.join(rootDir, 'content'),
  path.join(rootDir, 'app'),
];

let placeholderFound = false;

// Regex to detect placeholders like [Alamat kantor], [telepon], [Visi dinas], [Nama], etc.
// Exclude markdown links like [Text](url), empty brackets [], numeric arrays like [0], regex character classes, etc.
const placeholderRegex = /\[([A-Za-zÀ-ÿ][A-Za-z0-9À-ÿ\s,./_\-–—]{2,})\](?!\()/g;

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip import statements, comments, regex, or variable declaration destructuring e.g. const [a, b] = ...
    if (
      line.includes('//') &&
      (line.includes('placeholder') || line.includes('regex') || line.includes('check-placeholder'))
    ) {
      return;
    }
    if (line.trim().startsWith('*') || line.trim().startsWith('/*')) {
      return;
    }
    if (/^\s*(const|let|var)\s*\[/.test(line)) {
      return;
    }

    let match;
    while ((match = placeholderRegex.exec(line)) !== null) {
      const captured = match[1].trim();
      // Whitelist common false positives in code/markdown
      const allowed = [
        'kebijakan dinas',
        'id-ID',
        'timestamp',
        'status',
        'key',
        'index',
        'x',
        'y',
        'lat',
        'lng',
        'data',
        'item',
        'kategori',
      ];
      if (!allowed.includes(captured.toLowerCase()) && !captured.includes('=>') && !captured.includes(':')) {
        console.error(`\x1b[31m[PLACEHOLDER FOUND]\x1b[0m ${path.relative(rootDir, filePath)}:${index + 1} -> "${match[0]}"`);
        placeholderFound = true;
      }
    }
  });
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.next') {
        walkDir(fullPath);
      }
    } else if (entry.isFile() && /\.(tsx?|jsx?|json|html|md)$/.test(entry.name)) {
      checkFile(fullPath);
    }
  }
}

console.log('🔍 Memeriksa placeholder berkurung siku di content/ dan app/...');
for (const dir of scanDirs) {
  walkDir(dir);
}

if (placeholderFound) {
  console.error('\n❌ Ditemukan placeholder berkurung siku yang belum diganti!');
  process.exit(1);
} else {
  console.log('✅ Tidak ditemukan placeholder berkurung siku. Siap untuk produksi!');
  process.exit(0);
}
