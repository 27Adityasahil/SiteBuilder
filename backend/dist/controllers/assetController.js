"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAsset = exports.getAssets = exports.uploadAsset = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const Asset_1 = __importDefault(require("../models/Asset"));
const fs_1 = __importDefault(require("fs"));
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Setup multer for local storage before upload
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        if (!fs_1.default.existsSync('uploads/')) {
            fs_1.default.mkdirSync('uploads/');
        }
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
exports.upload = (0, multer_1.default)({ storage });
const uploadAsset = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const result = await cloudinary_1.v2.uploader.upload(req.file.path, {
            folder: 'devflow_assets',
        });
        // Remove local file
        fs_1.default.unlinkSync(req.file.path);
        const asset = new Asset_1.default({
            user: req.user._id,
            url: result.secure_url,
            type: result.resource_type,
            public_id: result.public_id,
        });
        const createdAsset = await asset.save();
        res.status(201).json(createdAsset);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.uploadAsset = uploadAsset;
const getAssets = async (req, res) => {
    try {
        const assets = await Asset_1.default.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(assets);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAssets = getAssets;
const deleteAsset = async (req, res) => {
    try {
        const asset = await Asset_1.default.findById(req.params.id);
        if (asset) {
            if (asset.user.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized' });
            }
            if (asset.public_id) {
                await cloudinary_1.v2.uploader.destroy(asset.public_id);
            }
            await asset.deleteOne();
            res.json({ message: 'Asset removed' });
        }
        else {
            res.status(404).json({ message: 'Asset not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteAsset = deleteAsset;
//# sourceMappingURL=assetController.js.map