import express from 'express';
import { uploadAsset, getAssets, deleteAsset, upload } from '../controllers/assetController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getAssets).post(protect, upload.single('image'), uploadAsset);
router.route('/:id').delete(protect, deleteAsset);

export default router;
