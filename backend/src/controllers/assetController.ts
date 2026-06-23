import { Request, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import Asset from '../models/Asset';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// Setup multer for local storage before upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (!fs.existsSync('uploads/')) {
      fs.mkdirSync('uploads/');
    }
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });

export const uploadAsset = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'devflow_assets',
    });

    // Remove local file
    fs.unlinkSync(req.file.path);

    const asset = new Asset({
      user: (req as any).user._id,
      url: result.secure_url,
      type: result.resource_type,
      public_id: result.public_id,
    });

    const createdAsset = await asset.save();
    res.status(201).json(createdAsset);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAssets = async (req: Request, res: Response) => {
  try {
    const assets = await Asset.find({ user: (req as any).user._id }).sort({ createdAt: -1 });
    res.json(assets);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAsset = async (req: Request, res: Response) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (asset) {
      if (asset.user.toString() !== (req as any).user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      if (asset.public_id) {
        await cloudinary.uploader.destroy(asset.public_id);
      }
      await asset.deleteOne();
      res.json({ message: 'Asset removed' });
    } else {
      res.status(404).json({ message: 'Asset not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
