import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const srcDir = path.join(__dirname, 'files');
    const wrongFilename = path.join(srcDir, 'wrongFilename.txt');
    const properFilename = path.join(srcDir, 'properFilename.md');

    const exist = async (fName) => {
      try {
        await fs.stat(fName);
        return true;
      } catch {
        return false;
      }
    }

    try {
        const existMd = await exist(properFilename);
        if (existMd) throw new Error('properFilename.md already exists')
        await fs.rename(wrongFilename, properFilename);
    } catch (error) {
      throw new Error('FS operation failed');
    }
};

await rename();
