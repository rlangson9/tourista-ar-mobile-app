import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tourista',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mov', 'avi'],
    resource_type: 'auto'
  } as any
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// @route   POST /api/uploads/image
// @desc    Upload single image
// @access  Private
router.post('/image', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'No image file provided',
          status: 400
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: req.file.path,
        publicId: (req.file as any).filename
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Upload failed',
        status: 500
      }
    });
  }
});

// @route   POST /api/uploads/images
// @desc    Upload multiple images
// @access  Private
router.post('/images', protect, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'No image files provided',
          status: 400
        }
      });
    }

    const files = req.files as Express.Multer.File[];
    const urls = files.map(file => ({
      url: file.path,
      publicId: (file as any).filename
    }));

    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      data: {
        files: urls
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Upload failed',
        status: 500
      }
    });
  }
});

// @route   POST /api/uploads/video
// @desc    Upload video
// @access  Private
router.post('/video', protect, upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'No video file provided',
          status: 400
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Video uploaded successfully',
      data: {
        url: req.file.path,
        publicId: (req.file as any).filename
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Upload failed',
        status: 500
      }
    });
  }
});

// @route   DELETE /api/uploads/:publicId
// @desc    Delete uploaded file
// @access  Private
router.delete('/:publicId', protect, async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.params.publicId);

    if (result.result !== 'ok') {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Failed to delete file',
          status: 400
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Delete failed',
        status: 500
      }
    });
  }
});

export default router;