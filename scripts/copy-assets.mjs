import { mkdir, copyFile, readdir, stat } from 'node:fs/promises';
import { dirname, resolve, relative } from 'node:path';

const srcDir = resolve(process.cwd(), 'src');
const distDir = resolve(process.cwd(), 'dist');

async function ensureDir(path) {
  try {
    await mkdir(path, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

async function copyRecursive(current) {
  const entries = await readdir(current);
  for (const entry of entries) {
    const fromPath = resolve(current, entry);
    const stats = await stat(fromPath);
    if (stats.isDirectory()) {
      await copyRecursive(fromPath);
      continue;
    }
    if (!entry.endsWith('.css')) {
      continue;
    }
    const relativePath = relative(srcDir, fromPath);
    const toPath = resolve(distDir, relativePath);
    await ensureDir(dirname(toPath));
    await copyFile(fromPath, toPath);
  }
}

await ensureDir(distDir);
await copyRecursive(srcDir);
