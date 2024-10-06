import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const srcDir = path.join(__dirname, 'files');

    try {
        try {
            await fs.stat(srcDir);
        } catch {
            throw new Error('FS operation failed');
        }

        const files = await fs.readdir(srcDir);
        console.log('List of files:', files);
    } catch (error) {
        console.error(error.message);
    }
};

await list();
