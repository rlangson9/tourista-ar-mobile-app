import express from 'express';
import Tour from '../models/Tour.js';

const router = express.Router();

// Helper for pagination
const getPagination = (query: any) => {
  const page = parseInt(query.page) || 1;
  const limit = Math.min(parseInt(query.limit) || 20, 100);
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

// @route   GET /api/tours
// @desc    Get all tours
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, location, minPrice, maxPrice, sort } = req.query;
    const { page, limit, skip } = getPagination(req.query);

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
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

    const tours = await Tour.find(query)
      .sort(sortQuery)
      .populate('partnerId')
      .skip(skip)
      .limit(limit);

    const total = await Tour.countDocuments(query);

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

// @route   GET /api/tours/featured
// @desc    Get featured tours
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const { limit } = getPagination(req.query);
    const tours = await Tour.find({ isFeatured: true })
      .populate('partnerId')
      .limit(limit);

    res.status(200).json({
      success: true,
      message: 'Featured tours retrieved successfully',
      data: {
        tours
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

// @route   GET /api/tours/:id
// @desc    Get tour details
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate('partnerId');

    if (!tour) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Tour not found',
          status: 404
        }
      });
    }

    // Increment views
    tour.views += 1;
    await tour.save();

    res.status(200).json({
      success: true,
      message: 'Tour retrieved successfully',
      data: {
        tour
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