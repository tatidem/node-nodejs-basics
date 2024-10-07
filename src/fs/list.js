import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const srcDir = path.join(__dirname, 'files');

    try {
        const files = await fs.readdir(srcDir);
        console.log('List of files:', files);
    } catch (error) {
        throw new Error('FS operation failed');
    }
};

await list();
