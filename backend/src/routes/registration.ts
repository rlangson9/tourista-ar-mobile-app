import express from 'express';
import { ChineseBuyer } from '../models/ChineseBuyer.js';
import { AfricanSupplier } from '../models/AfricanSupplier.js';

const router = express.Router();

// Register Chinese Buyer
router.post('/buyer', async (req, res) => {
  try {
    const {
      user_id,
      name,
      country,
      region,
      email,
      phone,
      languages,
      business_type,
      product_interests,
      preferred_payment_methods,
      budget_range_min,
      budget_range_max,
    } = req.body;

    // Validation
    if (!user_id || !name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Missing required fields: user_id, name, email, phone',
        },
      });
    }

    // Check if user already exists
    const existingUser = await ChineseBuyer.findOne({ $or: [{ user_id }, { email }] });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: {
          message: 'User with this user_id or email already exists',
        },
      });
    }

    const buyer = new ChineseBuyer({
      user_id,
      name,
      role: 'chinese_buyer',
      country: country || 'China',
      region: region || '',
      email,
      phone,
      languages: languages || ['zh'],
      business_type: business_type || '',
      product_interests: product_interests || [],
      preferred_payment_methods: preferred_payment_methods || [],
      budget_range_min: budget_range_min || 0,
      budget_range_max: budget_range_max || 0,
    });

    await buyer.save();

    res.status(201).json({
      success: true,
      user_id: buyer.user_id,
      message: 'Chinese buyer registered successfully',
    });
  } catch (error: any) {
    console.error('Chinese buyer registration error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Registration failed',
      },
    });
  }
});

// Register African Supplier
router.post('/supplier', async (req, res) => {
  try {
    const {
      user_id,
      name,
      country,
      region,
      email,
      phone,
      languages,
      business_type,
      product_offers,
      verification_status,
      rating,
      total_transactions,
    } = req.body;

    // Validation
    if (!user_id || !name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Missing required fields: user_id, name, email, phone',
        },
      });
    }

    // Check if user already exists
    const existingUser = await AfricanSupplier.findOne({ $or: [{ user_id }, { email }] });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: {
          message: 'User with this user_id or email already exists',
        },
      });
    }

    const supplier = new AfricanSupplier({
      user_id,
      name,
      role: 'african_supplier',
      country: country || '',
      region: region || '',
      email,
      phone,
      languages: languages || ['en'],
      business_type: business_type || '',
      product_offers: product_offers || [],
      verification_status: verification_status || 'pending',
      rating: rating || 0,
      total_transactions: total_transactions || 0,
    });

    await supplier.save();

    res.status(201).json({
      success: true,
      user_id: supplier.user_id,
      message: 'African supplier registered successfully',
    });
  } catch (error: any) {
    console.error('African supplier registration error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Registration failed',
      },
    });
  }
});

// Get all Chinese buyers
router.get('/buyers', async (req, res) => {
  try {
    const { region, product_interest, min_budget, max_budget } = req.query;

    const filter: any = {};

    if (region) filter.region = region;
    if (product_interest) filter.product_interests = product_interest;
    if (min_budget) filter.budget_range_min = { $gte: Number(min_budget) };
    if (max_budget) filter.budget_range_max = { $lte: Number(max_budget) };

    const buyers = await ChineseBuyer.find(filter).sort({ created_at: -1 });

    res.json({
      success: true,
      count: buyers.length,
      buyers,
    });
  } catch (error: any) {
    console.error('Get buyers error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Failed to fetch buyers',
      },
    });
  }
});

// Get all African suppliers
router.get('/suppliers', async (req, res) => {
  try {
    const { region, product_offer, verification_status, min_rating } = req.query;

    const filter: any = {};

    if (region) filter.region = region;
    if (product_offer) filter.product_offers = product_offer;
    if (verification_status) filter.verification_status = verification_status;
    if (min_rating) filter.rating = { $gte: Number(min_rating) };

    const suppliers = await AfricanSupplier.find(filter).sort({ rating: -1, created_at: -1 });

    res.json({
      success: true,
      count: suppliers.length,
      suppliers,
    });
  } catch (error: any) {
    console.error('Get suppliers error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Failed to fetch suppliers',
      },
    });
  }
});

// Get buyer by user_id
router.get('/buyer/:user_id', async (req, res) => {
  try {
    const buyer = await ChineseBuyer.findOne({ user_id: req.params.user_id });

    if (!buyer) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Buyer not found',
        },
      });
    }

    res.json({
      success: true,
      buyer,
    });
  } catch (error: any) {
    console.error('Get buyer error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Failed to fetch buyer',
      },
    });
  }
});

// Get supplier by user_id
router.get('/supplier/:user_id', async (req, res) => {
  try {
    const supplier = await AfricanSupplier.findOne({ user_id: req.params.user_id });

    if (!supplier) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Supplier not found',
        },
      });
    }

    res.json({
      success: true,
      supplier,
    });
  } catch (error: any) {
    console.error('Get supplier error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Failed to fetch supplier',
      },
    });
  }
});

// Match buyers with suppliers
router.post('/match', async (req, res) => {
  try {
    const { buyer_id, supplier_ids } = req.body;

    if (!buyer_id || !supplier_ids || !Array.isArray(supplier_ids)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Missing required fields: buyer_id, supplier_ids array',
        },
      });
    }

    const buyer = await ChineseBuyer.findOne({ user_id: buyer_id });
    if (!buyer) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Buyer not found',
        },
      });
    }

    const suppliers = await AfricanSupplier.find({
      user_id: { $in: supplier_ids },
    });

    // Score suppliers based on product match
    const matchedSuppliers = suppliers.map(supplier => {
      const matchingProducts = supplier.product_offers.filter(
        product => buyer.product_interests.includes(product)
      );
      return {
        ...supplier.toObject(),
        matching_products: matchingProducts,
        match_score: matchingProducts.length / buyer.product_interests.length,
      };
    }).sort((a, b) => b.match_score - a.match_score);

    res.json({
      success: true,
      buyer,
      matched_suppliers: matchedSuppliers,
      total_matches: matchedSuppliers.length,
    });
  } catch (error: any) {
    console.error('Match error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Matching failed',
      },
    });
  }
});

export default router;
