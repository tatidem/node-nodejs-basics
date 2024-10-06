import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const remove = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const srcDir = path.join(__dirname, 'files');
    const fileToRemove = path.join(srcDir, 'fileToRemove.txt');

    try {
        try {
            await fs.stat(fileToRemove);
        } catch {
            throw new Error('FS operation failed');
        }

        await fs.unlink(fileToRemove);
        console.log(`File removed ${fileToRemove}`);
    } catch (error) {
        console.error(error.message);
    }
};

await remove();
