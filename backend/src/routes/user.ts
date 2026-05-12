import express from 'express';
import { protect } from '../middleware/auth.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import Order from '../models/Order.js';

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found',
          status: 404
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'User profile retrieved successfully',
      data: {
        user
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

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, country, language, currency, avatar } = req.body;

    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        error: {
          message: 'User not found',
          status: 404
        }
      });
    }

    // Update user profile
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (country) user.country = country;
    if (language) user.language = language;
    if (currency) user.currency = currency;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'User profile updated successfully',
      data: {
        user
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

// @route   GET /api/users/bookings
// @desc    Get user bookings
// @access  Private
router.get('/bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('tourId partnerId');

    res.status(200).json({
      success: true,
      message: 'User bookings retrieved successfully',
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

// @route   GET /api/users/orders
// @desc    Get user orders
// @access  Private
router.get('/orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('supplierId');

    res.status(200).json({
      success: true,
      message: 'User orders retrieved successfully',
      data: {
        orders
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
