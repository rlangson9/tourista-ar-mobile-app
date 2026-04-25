import express from 'express';
import { protect, supplier } from '../middleware/auth.js';
import Supplier from '../models/Supplier.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import { supplierValidation, productValidation } from '../middleware/validation.js';

const router = express.Router();

// @route   POST /api/suppliers/profile
// @desc    Create or update supplier profile
// @access  Private (Supplier only)
router.post('/profile', protect, supplier, supplierValidation, async (req, res) => {
  try {
    const { 
      companyName, 
      companyDescription, 
      companyAddress, 
      companyPhone, 
      companyEmail, 
      website, 
      registrationNumber, 
      businessType, 
      productCategories,
      minimumOrderQuantity,
      deliveryRegions,
      paymentMethods,
      verificationDocuments
    } = req.body;

    // Check if supplier profile already exists
    let supplierProfile = await Supplier.findOne({ userId: req.user.id });

    if (supplierProfile) {
      // Update existing profile
      supplierProfile = await Supplier.findOneAndUpdate(
        { userId: req.user.id },
        {
          companyName,
          companyDescription,
          companyAddress,
          companyPhone,
          companyEmail,
          website,
          registrationNumber,
          businessType,
          productCategories,
          minimumOrderQuantity,
          deliveryRegions,
          paymentMethods,
          verificationDocuments
        },
        { new: true }
      );
    } else {
      // Create new profile
      supplierProfile = await Supplier.create({
        userId: req.user.id,
        companyName,
        companyDescription,
        companyAddress,
        companyPhone,
        companyEmail,
        website,
        registrationNumber,
        businessType,
        productCategories,
        minimumOrderQuantity,
        deliveryRegions,
        paymentMethods,
        verificationDocuments
      });
    }

    res.status(200).json({
      success: true,
      message: 'Supplier profile saved successfully',
      data: {
        supplier: supplierProfile
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

// @route   GET /api/suppliers/profile
// @desc    Get supplier profile
// @access  Private (Supplier only)
router.get('/profile', protect, supplier, async (req, res) => {
  try {
    const supplierProfile = await Supplier.findOne({ userId: req.user.id });

    if (!supplierProfile) {
      return res.status(404).json({
        error: {
          message: 'Supplier profile not found',
          status: 404
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Supplier profile retrieved successfully',
      data: {
        supplier: supplierProfile
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

// @route   POST /api/suppliers/products
// @desc    Create a new product
// @access  Private (Supplier only)
router.post('/products', protect, supplier, productValidation, async (req, res) => {
  try {
    const supplierProfile = await Supplier.findOne({ userId: req.user.id });

    if (!supplierProfile) {
      return res.status(404).json({
        error: {
          message: 'Supplier profile not found',
          status: 404
        }
      });
    }

    const product = await Product.create({
      supplierId: supplierProfile._id,
      ...req.body
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        product
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

// @route   GET /api/suppliers/products
// @desc    Get supplier's products
// @access  Private (Supplier only)
router.get('/products', protect, supplier, async (req, res) => {
  try {
    const supplierProfile = await Supplier.findOne({ userId: req.user.id });

    if (!supplierProfile) {
      return res.status(404).json({
        error: {
          message: 'Supplier profile not found',
          status: 404
        }
      });
    }

    const products = await Product.find({ supplierId: supplierProfile._id });

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

// @route   GET /api/suppliers/orders
// @desc    Get supplier's orders
// @access  Private (Supplier only)
router.get('/orders', protect, supplier, async (req, res) => {
  try {
    const supplierProfile = await Supplier.findOne({ userId: req.user.id });

    if (!supplierProfile) {
      return res.status(404).json({
        error: {
          message: 'Supplier profile not found',
          status: 404
        }
      });
    }

    const orders = await Order.find({ supplierId: supplierProfile._id }).populate('userId');

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
