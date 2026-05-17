import express from 'express';
import { protect, supplier, admin } from '../middleware/auth.js';
import Order from '../models/Order.js';
import { Product } from '../models/Product.js';
import Supplier from '../models/Supplier.js';
import { orderValidation } from '../middleware/validation.js';

const router = express.Router();

// Helper for pagination
const getPagination = (query: any) => {
  const page = parseInt(query.page) || 1;
  const limit = Math.min(parseInt(query.limit) || 20, 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', protect, orderValidation, async (req, res) => {
  try {
    const { supplierId, items, deliveryDate, shippingAddress, specialRequests } = req.body;

    // Validate supplier exists
    const supplierExists = await Supplier.findById(supplierId);
    if (!supplierExists) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Supplier not found',
          status: 404
        }
      });
    }

    // Validate products and calculate total
    let totalPrice = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: {
            message: `Product ${item.productId} not found`,
            status: 404
          }
        });
      }
      totalPrice += product.price * item.quantity;
    }

    // Create order
    const order = await Order.create({
      userId: req.user?.id,
      supplierId,
      items,
      totalPrice,
      deliveryDate,
      shippingAddress,
      specialRequests,
      status: 'pending',
      paymentStatus: 'pending'
    });

    // Populate and return
    await order.populate('supplierId userId items.productId');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        order
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

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const orders = await Order.find({ userId: req.user?.id })
      .populate('supplierId items.productId')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments({ userId: req.user?.id });

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

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('supplierId userId items.productId');

    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Order not found',
          status: 404
        }
      });
    }

    // Check if user owns the order or is supplier
    if (order.userId.toString() !== req.user?.id.toString() && 
        order.supplierId.toString() !== req.user?.id.toString()) {
      return res.status(403).json({
        success: false,
        error: {
          message: 'Not authorized',
          status: 403
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order retrieved successfully',
      data: {
        order
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

// @route   PUT /api/orders/:id/status
// @desc    Update order status (supplier only)
// @access  Private (supplier only)
router.put('/:id/status', protect, supplier, async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Order not found',
          status: 404
        }
      });
    }

    // Check if user is the supplier
    if (order.supplierId.toString() !== req.user?.id.toString()) {
      return res.status(403).json({
        success: false,
        error: {
          message: 'Not authorized',
          status: 403
        }
      });
    }

    // Update status
    order.status = status;
    await order.save();
    await order.populate('supplierId userId items.productId');

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: {
        order
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

// @route   PUT /api/orders/:id/cancel
// @desc    Cancel order (user only)
// @access  Private (user only)
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Order not found',
          status: 404
        }
      });
    }

    // Check if user owns the order
    if (order.userId.toString() !== req.user?.id.toString()) {
      return res.status(403).json({
        success: false,
        error: {
          message: 'Not authorized',
          status: 403
        }
      });
    }

    // Only allow cancellation if order is in pending status
    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Only pending orders can be cancelled',
          status: 400
        }
      });
    }

    // Update status
    order.status = 'cancelled';
    await order.save();
    await order.populate('supplierId userId items.productId');

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      data: {
        order
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