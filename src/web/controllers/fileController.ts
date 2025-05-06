import { Request, Response } from 'express';
import { FileManager } from '../../storage/fileManager';

export class FileController {
    private fileManager: FileManager;

    constructor() {
        this.fileManager = new FileManager();
    }

    public uploadFile = async (req: Request, res: Response): Promise<void> => {
        try {
            const file = req.file;
            if (!file) {
                res.status(400).send('No file uploaded.');
                return;
            }
            await this.fileManager.saveFile(file);
            res.status(200).send('File uploaded successfully.');
        } catch (error) {
            res.status(500).send('Error uploading file: ' + error.message);
        }
    };

    public getFile = async (req: Request, res: Response): Promise<void> => {
        try {
            const fileName = req.params.fileName;
            const file = await this.fileManager.getFile(fileName);
            if (!file) {
                res.status(404).send('File not found.');
                return;
            }
            res.status(200).sendFile(file);
        } catch (error) {
            res.status(500).send('Error retrieving file: ' + error.message);
        }
    };
}