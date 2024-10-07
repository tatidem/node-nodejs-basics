import { promises as fs } from 'fs';
import path from 'path';

const create = async () => {
    const filePath = path.join(process.cwd(), 'src', 'fs', 'files', 'fresh.txt');
    const content = 'I am fresh and young';

    try {
        await fs.writeFile(filePath, content, { flag: 'wx' });
        console.log('File created successfully');
    } catch (error) {
        if (error.code === 'EEXIST') {
            throw new Error('FS operation failed');
        } else {
            console.error('Error writing file:', error);
        }
    }
};

create();
