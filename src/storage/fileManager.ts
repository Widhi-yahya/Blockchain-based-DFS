import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

class FileManager {
    private storagePath: string;

    constructor(storagePath: string) {
        this.storagePath = storagePath;
        this.initializeStorage();
    }

    private initializeStorage() {
        if (!fs.existsSync(this.storagePath)) {
            fs.mkdirSync(this.storagePath, { recursive: true });
        }
    }

    public uploadFile(fileName: string, fileData: Buffer): string {
        const fileHash = this.calculateHash(fileData);
        const filePath = path.join(this.storagePath, fileHash + path.extname(fileName));
        fs.writeFileSync(filePath, fileData);
        return fileHash;
    }

    public getFile(fileHash: string): Buffer | null {
        const filePath = path.join(this.storagePath, fileHash);
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath);
        }
        return null;
    }

    private calculateHash(data: Buffer): string {
        return crypto.createHash('sha256').update(data).digest('hex');
    }
}

export default FileManager;