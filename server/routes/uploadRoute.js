import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const UPLOAD_DIR = process.env.FILE_UPLOAD_DIR || 'public/ar';

// Set storage location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.resolve(UPLOAD_DIR);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, 'customModel.glb'); 
  }
});

const upload = multer({ storage });

// POST /api/upload
router.post('/', upload.single('model'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const fileUrl = `${process.env.BASE_URL}/api/ar/customModel.glb`;
  res.status(200).json({ message: 'Upload successful', url: fileUrl });
});

export default router;
