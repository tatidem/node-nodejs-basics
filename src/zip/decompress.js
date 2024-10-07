import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
    const inputPath = join(__dirname, 'files', 'archive.gz');
    const outputPath = join(__dirname, 'files', 'fileToCompress.txt');

    const readStream = createReadStream(inputPath);
    const writeStream = createWriteStream(outputPath);
    const gunzip = createGunzip();

    readStream.pipe(gunzip).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('File has been decompressed successfully.');
    });

    writeStream.on('error', (err) => {
        console.error('Error writing to the file:', err);
    });

    readStream.on('error', (err) => {
        console.error('Error reading the file:', err);
    });

    gunzip.on('error', (err) => {
        console.error('Error during decompression:', err);
    });
};

await decompress();
