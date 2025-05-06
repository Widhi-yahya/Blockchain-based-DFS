import * as fs from 'fs';
import * as path from 'path';

class FileManager {
    private storageDir: string;

    constructor(storageDir: string = 'storage') {
        this.storageDir = storageDir;
        if (!fs.existsSync(this.storageDir)) {
            fs.mkdirSync(this.storageDir, { recursive: true });
        }
    }

    async saveFile(fileName: string, fileBuffer: Buffer): Promise<string> {
        const filePath = path.join(this.storageDir, fileName);
        await fs.promises.writeFile(filePath, fileBuffer);
        return filePath;
    }

    async getFile(fileName: string): Promise<Buffer> {
        const filePath = path.join(this.storageDir, fileName);
        return fs.promises.readFile(filePath);
    }

    async listFiles(): Promise<string[]> {
        return fs.promises.readdir(this.storageDir);
    }
}

export default FileManager;