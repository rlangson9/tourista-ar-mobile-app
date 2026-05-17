import express from 'express';
import { Product } from '../models/Product.js';
import { AfricanSupplier } from '../models/AfricanSupplier.js';

const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
  try {
    const {
      product_id,
      supplier_id,
      name,
      name_zh,
      category,
      description,
      description_zh,
      price,
      currency,
      available_quantity,
      min_order_quantity,
      location,
      images,
    } = req.body;

    // Validation
    if (!product_id || !supplier_id || !name || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Missing required fields: product_id, supplier_id, name, category, price',
        },
      });
    }

    // Check if product already exists
    const existingProduct = await Product.findOne({ product_id });
    if (existingProduct) {
      return res.status(409).json({
        success: false,
        error: {
          message: 'Product with this product_id already exists',
        },
      });
    }

    // Verify supplier exists
    const supplier = await AfricanSupplier.findOne({ user_id: supplier_id });
    if (!supplier) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Supplier not found',
        },
      });
    }

    const product = new Product({
      product_id,
      supplier_id,
      name,
      name_zh: name_zh || '',
      category,
      description: description || '',
      description_zh: description_zh || '',
      price,
      currency: currency || 'USD',
      available_quantity: available_quantity || 0,
      min_order_quantity: min_order_quantity || 1,
      location: location || supplier.region || '',
      images: images || [],
      status: 'active',
    });

    await product.save();

    res.status(201).json({
      success: true,
      product_id: product.product_id,
      message: 'Product created successfully',
    });
  } catch (error: any) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Failed to create product',
      },
    });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, supplier_id, min_price, max_price, status, limit, offset } = req.query;

    const filter: any = {};

    if (category) filter.category = category;
    if (supplier_id) filter.supplier_id = supplier_id;
    if (status) filter.status = status;
    if (min_price) filter.price = { ...filter.price, $gte: Number(min_price) };
    if (max_price) filter.price = { ...filter.price, $lte: Number(max_price) };

    const products = await Product.find(filter)
      .sort({ created_at: -1 })
      .skip(Number(offset) || 0)
      .limit(Number(limit) || 50);

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      count: products.length,
      total,
      products,
    });
  } catch (error: any) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Failed to fetch products',
      },
    });
  }
});

// Get product by ID
router.get('/:product_id', async (req, res) => {
  try {
    const product = await Product.findOne({ product_id: req.params.product_id });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Product not found',
        },
      });
    }

    // Get supplier info
    const supplier = await AfricanSupplier.findOne({ user_id: product.supplier_id });

    res.json({
      success: true,
      product,
      supplier: supplier ? {
        user_id: supplier.user_id,
        name: supplier.name,
        rating: supplier.rating,
        verification_status: supplier.verification_status,
        location: supplier.region,
      } : null,
    });
  } catch (error: any) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Failed to fetch product',
      },
    });
  }
});

// Update product
router.put('/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;

    const product = await Product.findOne({ product_id });
    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Product not found',
        },
      });
    }

    const allowedUpdates = [
      'name', 'name_zh', 'category', 'description', 'description_zh',
      'price', 'currency', 'available_quantity', 'min_order_quantity',
      'location', 'images', 'status'
    ];

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        (product as any)[field] = req.body[field];
      }
    });

    // Update status based on quantity
    if (product.available_quantity === 0) {
      product.status = 'out_of_stock';
    }

    await product.save();

    res.json({
      success: true,
      product_id: product.product_id,
      message: 'Product updated successfully',
    });
  } catch (error: any) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Failed to update product',
      },
    });
  }
});

// Delete product
router.delete('/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;

    const product = await Product.findOneAndDelete({ product_id });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Product not found',
        },
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Failed to delete product',
      },
    });
  }
});

// Get products by supplier
router.get('/supplier/:supplier_id', async (req, res) => {
  try {
    const { supplier_id } = req.params;

    const products = await Product.find({ supplier_id }).sort({ created_at: -1 });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error: any) {
    console.error('Get supplier products error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Failed to fetch supplier products',
      },
    });
  }
});

// Search products
router.get('/search/query', async (req, res) => {
  try {
    const { q, category, min_price, max_price, location } = req.query;

    const filter: any = { status: 'active' };

    if (category) filter.category = category;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (min_price || max_price) {
      filter.price = {};
      if (min_price) filter.price.$gte = Number(min_price);
      if (max_price) filter.price.$lte = Number(max_price);
    }

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { name_zh: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { description_zh: { $regex: q, $options: 'i' } },
      ];
    }

    const products = await Product.find(filter).sort({ rating: -1, created_at: -1 }).limit(50);

    res.json({
      success: true,
      count: products.length,
      query: q,
      products,
    });
  } catch (error: any) {
    console.error('Search products error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Failed to search products',
      },
    });
  }
});

export default router;
