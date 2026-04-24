import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import User from '../models/User.js';
import Partner from '../models/Partner.js';
import Supplier from '../models/Supplier.js';
import Tour from '../models/Tour.js';
import Product from '../models/Product.js';
import Booking from '../models/Booking.js';
import Order from '../models/Order.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Helper function to send emails
const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT as string),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html
    });
    return true;
  } catch (error) {
    console.error('Email send failed:', error);
    return false;
  }
};

// Helper for pagination
const getPagination = (query: any) => {
  const page = parseInt(query.page) || 1;
  const limit = Math.min(parseInt(query.limit) || 20, 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (Admin only)
router.get('/users', protect, admin, async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
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
    const { page, limit, skip } = getPagination(req.query);
    const partners = await Partner.find()
      .populate('userId')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Partner.countDocuments();

    res.status(200).json({
      success: true,
      message: 'Partners retrieved successfully',
      data: {
        partners,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
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
    const partner = await Partner.findById(req.params.id).populate('userId');

    if (!partner) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Partner not found',
          status: 404
        }
      });
    }

    partner.isApproved = true;
    await partner.save();

    // Send approval email
    const user = partner.userId as any;
    if (user?.email) {
      await sendEmail(
        user.email,
        'Your Tourista AR Partner Account Has Been Approved! 🎉',
        `
          <h1>Congratulations! Your Partner Account is Approved</h1>
          <p>Dear ${partner.businessName},</p>
          <p>Your partner application has been approved! You can now:</p>
          <ul>
            <li>Create and manage tour packages</li>
            <li>Receive booking requests from travelers</li>
            <li>Negotiate tour details with clients</li>
            <li>Process bookings and payments</li>
          </ul>
          <p>Log in to your dashboard to get started!</p>
          <a href="${process.env.FRONTEND_URL}/partner/dashboard">Go to Dashboard</a>
        `
      );
    }

    res.status(200).json({
      success: true,
      message: 'Partner approved successfully',
      data: {
        partner
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
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
    const { page, limit, skip } = getPagination(req.query);
    const suppliers = await Supplier.find()
      .populate('userId')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Supplier.countDocuments();

    res.status(200).json({
      success: true,
      message: 'Suppliers retrieved successfully',
      data: {
        suppliers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
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
    const supplier = await Supplier.findById(req.params.id).populate('userId');

    if (!supplier) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Supplier not found',
          status: 404
        }
      });
    }

    supplier.isApproved = true;
    await supplier.save();

    // Send approval email
    const user = supplier.userId as any;
    if (user?.email) {
      await sendEmail(
        user.email,
        'Your Tourista AR Supplier Account Has Been Approved! 🎉',
        `
          <h1>Congratulations! Your Supplier Account is Approved</h1>
          <p>Dear ${supplier.companyName},</p>
          <p>Your supplier application has been approved! You can now:</p>
          <ul>
            <li>List your products for trade</li>
            <li>Receive RFQs from buyers</li>
            <li>Negotiate deals with clients</li>
            <li>Process orders and shipments</li>
          </ul>
          <p>Log in to your dashboard to get started!</p>
          <a href="${process.env.FRONTEND_URL}/supplier/dashboard">Go to Dashboard</a>
        `
      );
    }

    res.status(200).json({
      success: true,
      message: 'Supplier approved successfully',
      data: {
        supplier
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
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
    const { page, limit, skip } = getPagination(req.query);
    const tours = await Tour.find()
      .populate('partnerId')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Tour.countDocuments();

    res.status(200).json({
      success: true,
      message: 'Tours retrieved successfully',
      data: {
        tours,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
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
    const { page, limit, skip } = getPagination(req.query);
    const products = await Product.find()
      .populate('supplierId')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments();

    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
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
    const { page, limit, skip } = getPagination(req.query);
    const bookings = await Booking.find()
      .populate('userId tourId partnerId')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments();

    res.status(200).json({
      success: true,
      message: 'Bookings retrieved successfully',
      data: {
        bookings,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
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
    const { page, limit, skip } = getPagination(req.query);
    const orders = await Order.find()
      .populate('userId supplierId')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments();

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: {
        orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Server error',
        status: 500
      }
    });
  }
});

export default router;