import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const write = async () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = join(__dirname, 'files', 'fileToWrite.txt');
    const writableStream = createWriteStream(filePath);

    process.stdin.pipe(writableStream);

    writableStream.on('open', () => {
      console.log('Write your text hear, enter end to exit process');
    });

    process.stdin.on('data', (chunk) => {
      if (chunk.toString().trim() === 'end') {
          process.stdin.unpipe(writableStream);
          writableStream.end();
          console.log('Process ended by user input.');
      }
  });

    writableStream.on('error', (err) => {
        console.error('Error writing to the file:', err);
    });
};

await write();
