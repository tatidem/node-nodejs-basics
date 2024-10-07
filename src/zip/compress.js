import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
    const filePath = join(__dirname, 'files', 'fileToCompress.txt');
    const outputPath = join(__dirname, 'files', 'archive.gz');

    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(outputPath);
    const gzip = createGzip();

    readStream.pipe(gzip).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('File has been compressed successfully.');
    });

    writeStream.on('error', (err) => {
        console.error('Error writing to the file:', err);
    });

    readStream.on('error', (err) => {
        console.error('Error reading the file:', err);
    });

    gzip.on('error', (err) => {
        console.error('Error during compression:', err);
    });
};

await compress();
