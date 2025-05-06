import { Request, Response } from 'express';
import FileManager from '../../storage/fileManager';

const fileManager = new FileManager();

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).send('No file uploaded');
            return;
        }

        const file = req.file;
        const filePath = await fileManager.saveFile(file.originalname, file.buffer);
        
        res.status(200).json({
            message: 'File uploaded successfully',
            fileName: file.originalname,
            path: filePath
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).send('Error uploading file: ' + errorMessage);
    }
};

export const getFile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fileName } = req.params;
        const fileData = await fileManager.getFile(fileName);
        
        res.set('Content-Type', 'application/octet-stream');
        res.set('Content-Disposition', `attachment; filename="${fileName}"`);
        res.send(fileData);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).send('Error retrieving file: ' + errorMessage);
    }
};

export const listFiles = async (_req: Request, res: Response): Promise<void> => {
    try {
        const files = await fileManager.listFiles();
        res.status(200).json(files);
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).send('Error listing files: ' + errorMessage);
    }
};