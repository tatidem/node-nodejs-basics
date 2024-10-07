import { Worker } from 'worker_threads';
import { cpus } from 'os';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
    const numCores = cpus().length;
    const workers = [];
    const results = new Array(numCores).fill(null);

    for (let i = 0; i < numCores; i++) {
        workers.push(new Promise((resolve) => {
            const worker = new Worker(join(__dirname, 'worker.js'));

            worker.on('message', (result) => {
                results[i] = result;
                resolve();
            });

            worker.on('error', (_error) => {
                results[i] = { status: 'error', data: null };
                resolve();
            });

            worker.postMessage(10 + i);
        }));
    }

    await Promise.all(workers);
    console.log(results);
};

await performCalculations();
