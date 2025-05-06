import { Router } from 'express';
import { FileController } from '../controllers/fileController';

const router = Router();
const fileController = new FileController();

router.post('/upload', fileController.uploadFile.bind(fileController));
router.get('/files/:filename', fileController.getFile.bind(fileController));

export default router;