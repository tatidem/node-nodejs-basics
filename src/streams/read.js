import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const read = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, 'files', 'fileToRead.txt');
    const stream = createReadStream(filePath);

    stream.pipe(process.stdout);

    stream.on('error', (err) => {
        console.error('Error reading the file:', err);
    });
};

await read();
