import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {
    const scriptPath = join(__dirname, 'files', 'script.js');
    const child = spawn('node', [scriptPath, ...args], {
        stdio: ['pipe', 'pipe', 'pipe', 'ipc']
    });

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

    child.on('message', (message) => {
        console.log('Message from child:', message);
    });

    child.send({ greeting: 'Hello from parent process' });

    child.on('error', (error) => {
        console.error('Error in child process:', error);
    });

    child.on('exit', (code) => {
        console.log(`Child process exited with code ${code}`);
    });
};

spawnChildProcess(['arg1', 'arg2']);
