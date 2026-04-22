import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import User from '../models/User.js';
import Partner from '../models/Partner.js';
import Supplier from '../models/Supplier.js';
import Tour from '../models/Tour.js';
import Product from '../models/Product.js';
import Booking from '../models/Booking.js';
import Order from '../models/Order.js';

const router = express.Router();

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin only)
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: {
        users
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

// @route   GET /api/admin/partners
// @desc    Get all partners
// @access  Private (Admin only)
router.get('/partners', protect, admin, async (req, res) => {
  try {
    const partners = await Partner.find().populate('userId');

    res.status(200).json({
      success: true,
      message: 'Partners retrieved successfully',
      data: {
        partners
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

// @route   PUT /api/admin/partners/:id/approve
// @desc    Approve partner
// @access  Private (Admin only)
router.put('/partners/:id/approve', protect, admin, async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);

    if (!partner) {
      return res.status(404).json({
        error: {
          message: 'Partner not found',
          status: 404
        }
      });
    }

    partner.isApproved = true;
    await partner.save();

    res.status(200).json({
      success: true,
      message: 'Partner approved successfully',
      data: {
        partner
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

// @route   GET /api/admin/suppliers
// @desc    Get all suppliers
// @access  Private (Admin only)
router.get('/suppliers', protect, admin, async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate('userId');

    res.status(200).json({
      success: true,
      message: 'Suppliers retrieved successfully',
      data: {
        suppliers
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

// @route   PUT /api/admin/suppliers/:id/approve
// @desc    Approve supplier
// @access  Private (Admin only)
router.put('/suppliers/:id/approve', protect, admin, async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        error: {
          message: 'Supplier not found',
          status: 404
        }
      });
    }

    supplier.isApproved = true;
    await supplier.save();

    res.status(200).json({
      success: true,
      message: 'Supplier approved successfully',
      data: {
        supplier
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

// @route   GET /api/admin/tours
// @desc    Get all tours
// @access  Private (Admin only)
router.get('/tours', protect, admin, async (req, res) => {
  try {
    const tours = await Tour.find().populate('partnerId');

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

// @route   GET /api/admin/products
// @desc    Get all products
// @access  Private (Admin only)
router.get('/products', protect, admin, async (req, res) => {
  try {
    const products = await Product.find().populate('supplierId');

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: {
        products
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

// @route   GET /api/admin/bookings
// @desc    Get all bookings
// @access  Private (Admin only)
router.get('/bookings', protect, admin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId tourId partnerId');

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

// @route   GET /api/admin/orders
// @desc    Get all orders
// @access  Private (Admin only)
router.get('/orders', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate('userId supplierId');

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
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
