import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const srcDir = path.join(__dirname, 'files');
    const wrongFilename = path.join(srcDir, 'wrongFilename.txt');
    const properFilename = path.join(srcDir, 'properFilename.md');

    try {
        try {
            await fs.stat(wrongFilename);
        } catch {
            throw new Error('FS operation failed');
        }

        try {
            await fs.stat(properFilename);
            throw new Error('FS operation failed');
        } catch {
        }
        await fs.rename(wrongFilename, properFilename);
    } catch (error) {
        console.error(error.message);
    }
};

await rename();
