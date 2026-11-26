import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const dirsToRemove = ['node_modules', '.turbo'];

for (const dir of dirsToRemove) {
  const fullPath = path.join(rootDir, dir);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    console.log(`Removed ${fullPath}`);
  }
}
