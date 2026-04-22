import express from 'express';
import Tour from '../models/Tour.js';

const router = express.Router();

// @route   GET /api/tours
// @desc    Get all tours
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, location, minPrice, maxPrice, sort } = req.query;

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

    const tours = await Tour.find(query).sort(sortQuery).populate('partnerId');

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

// @route   GET /api/tours/featured
// @desc    Get featured tours
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const tours = await Tour.find({ isFeatured: true }).populate('partnerId');

    res.status(200).json({
      success: true,
      message: 'Featured tours retrieved successfully',
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

// @route   GET /api/tours/:id
// @desc    Get tour details
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate('partnerId');

    if (!tour) {
      return res.status(404).json({
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
      error: {
        message: error.message || 'Server error',
        status: 500
      }
    });
  }
});

export default router;
