import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Helper for pagination
const getPagination = (query: any) => {
  const page = parseInt(query.page) || 1;
  const limit = Math.min(parseInt(query.limit) || 20, 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

// @route   GET /api/trade/products
// @desc    Get all products
// @access  Public
router.get('/products', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, sort } = req.query;
    const { page, limit, skip } = getPagination(req.query);

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (minPrice && maxPrice) {
      query.price = {
        $gte: parseFloat(minPrice as string),
        $lte: parseFloat(maxPrice as string)
      };
    } else if (minPrice) {
      query.price = { $gte: parseFloat(minPrice as string) };
    } else if (maxPrice) {
      query.price = { $lte: parseFloat(maxPrice as string) };
    }

    let sortQuery: any = {};

    if (sort === 'price-asc') {
      sortQuery.price = 1;
    } else if (sort === 'price-desc') {
      sortQuery.price = -1;
    } else if (sort === 'rating') {
      sortQuery.rating = -1;
    } else if (sort === 'recent') {
      sortQuery.createdAt = -1;
    }

    const products = await Product.find(query)
      .sort(sortQuery)
      .populate('supplierId')
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

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

// @route   GET /api/trade/products/featured
// @desc    Get featured products
// @access  Public
router.get('/products/featured', async (req, res) => {
  try {
    const { limit } = getPagination(req.query);
    const products = await Product.find({ isFeatured: true })
      .populate('supplierId')
      .limit(limit);

    res.status(200).json({
      success: true,
      message: 'Featured products retrieved successfully',
      data: {
        products
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

// @route   GET /api/trade/products/:id
// @desc    Get product details
// @access  Public
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplierId');

    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Product not found',
          status: 404
        }
      });
    }

    // Increment views
    product.views += 1;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: {
        product
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