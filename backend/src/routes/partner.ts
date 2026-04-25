import express from 'express';
import { protect, partner } from '../middleware/auth.js';
import Partner from '../models/Partner.js';
import Tour from '../models/Tour.js';
import Booking from '../models/Booking.js';
import { tourValidation, partnerValidation } from '../middleware/validation.js';

const router = express.Router();

// @route   POST /api/partners/profile
// @desc    Create or update partner profile
// @access  Private (Partner only)
router.post('/profile', protect, partner, partnerValidation, async (req, res) => {
  try {
    const { 
      businessName, 
      businessDescription, 
      businessAddress, 
      businessPhone, 
      businessEmail, 
      website, 
      registrationNumber, 
      categories, 
      services,
      verificationDocuments
    } = req.body;

    // Check if partner profile already exists
    let partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (partnerProfile) {
      // Update existing profile
      partnerProfile = await Partner.findOneAndUpdate(
        { userId: req.user.id },
        {
          businessName,
          businessDescription,
          businessAddress,
          businessPhone,
          businessEmail,
          website,
          registrationNumber,
          categories,
          services,
          verificationDocuments
        },
        { new: true }
      );
    } else {
      // Create new profile
      partnerProfile = await Partner.create({
        userId: req.user.id,
        businessName,
        businessDescription,
        businessAddress,
        businessPhone,
        businessEmail,
        website,
        registrationNumber,
        categories,
        services,
        verificationDocuments
      });
    }

    res.status(200).json({
      success: true,
      message: 'Partner profile saved successfully',
      data: {
        partner: partnerProfile
      }
    });
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Server error',
        status: 500
      }
    });
  }
});

// @route   GET /api/partners/profile
// @desc    Get partner profile
// @access  Private (Partner only)
router.get('/profile', protect, partner, async (req, res) => {
  try {
    const partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (!partnerProfile) {
      return res.status(404).json({
        error: {
          message: 'Partner profile not found',
          status: 404
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Partner profile retrieved successfully',
      data: {
        partner: partnerProfile
      }
    });
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Server error',
        status: 500
      }
    });
  }
});

// @route   POST /api/partners/tours
// @desc    Create a new tour
// @access  Private (Partner only)
router.post('/tours', protect, partner, tourValidation, async (req, res) => {
  try {
    const partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (!partnerProfile) {
      return res.status(404).json({
        error: {
          message: 'Partner profile not found',
          status: 404
        }
      });
    }

    const tour = await Tour.create({
      partnerId: partnerProfile._id,
      ...req.body
    });

    res.status(201).json({
      success: true,
      message: 'Tour created successfully',
      data: {
        tour
      }
    });
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Server error',
        status: 500
      }
    });
  }
});

// @route   GET /api/partners/tours
// @desc    Get partner's tours
// @access  Private (Partner only)
router.get('/tours', protect, partner, async (req, res) => {
  try {
    const partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (!partnerProfile) {
      return res.status(404).json({
        error: {
          message: 'Partner profile not found',
          status: 404
        }
      });
    }

    const tours = await Tour.find({ partnerId: partnerProfile._id });

    res.status(200).json({
      success: true,
      message: 'Tours retrieved successfully',
      data: {
        tours
      }
    });
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Server error',
        status: 500
      }
    });
  }
});

// @route   GET /api/partners/bookings
// @desc    Get partner's bookings
// @access  Private (Partner only)
router.get('/bookings', protect, partner, async (req, res) => {
  try {
    const partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (!partnerProfile) {
      return res.status(404).json({
        error: {
          message: 'Partner profile not found',
          status: 404
        }
      });
    }

    const bookings = await Booking.find({ partnerId: partnerProfile._id }).populate('userId tourId');

    res.status(200).json({
      success: true,
      message: 'Bookings retrieved successfully',
      data: {
        bookings
      }
    });
  } catch (error: any) {
    res.status(500).json({
      error: {
        message: error.message || 'Server error',
        status: 500
      }
    });
  }
});

export default router;
