import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const srcDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files_copy');

    try {
        await fs.stat(srcDir);
        try {
            await fs.stat(destDir);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
        }
        await fs.mkdir(destDir);
        const entries = await fs.readdir(srcDir, { withFileTypes: true });
        for (const entry of entries) {
            const srcPath = path.join(srcDir, entry.name);
            const destPath = path.join(destDir, entry.name);

            if (entry.isDirectory()) {
                await fs.mkdir(destPath);
                await copyFolder(srcPath, destPath);
            } else {
                await fs.copyFile(srcPath, destPath);
            }
        }
        console.log('Folder copied successfully');
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const copyFolder = async (src, dest) => {
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await fs.mkdir(destPath);
            await copyFolder(srcPath, destPath);
        } else {
            await fs.copyFile(srcPath, destPath);
        }
    }
};

await copy();
