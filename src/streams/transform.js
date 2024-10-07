import { Transform } from 'stream';

const transform = async () => {
    const reverseStream = new Transform({
        transform(chunk, _encoding, callback) {
            const reversedChunk = chunk.toString().trim().split('').reverse().join('') + '\n';
            callback(null, reversedChunk);
        }
    });

    process.stdout.write('Enter your text hear and it would be reversed\n');

    process.stdin.pipe(reverseStream).pipe(process.stdout);

    process.stdin.on('data', (chunk) => {
        if (chunk.toString().trim() === 'end') {
            process.stdin.unpipe(reverseStream);
            reverseStream.end();
            console.log('\nProcess ended by user input.');
        }
    });

    reverseStream.on('error', (err) => {
        console.error('Error in transform stream:', err);
    });
};

await transform();
