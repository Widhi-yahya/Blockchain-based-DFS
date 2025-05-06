import express from 'express';
import multer from 'multer';
import * as fileController from '../controllers/fileController';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/files/:fileName', fileController.getFile);
router.get('/files', fileController.listFiles);

export default router;