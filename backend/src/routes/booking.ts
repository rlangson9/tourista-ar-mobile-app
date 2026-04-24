import express from 'express';
import { protect } from '../middleware/auth.js';
import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';

const router = express.Router();

// @route   GET /api/bookings
// @desc    Get user's bookings
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('tourId partnerId');

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

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('tourId partnerId userId');

    if (!booking) {
      return res.status(404).json({
        error: {
          message: 'Booking not found',
          status: 404
        }
      });
    }

    // Check if user owns the booking or is partner
    if (booking.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        error: {
          message: 'Not authorized',
          status: 403
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking retrieved successfully',
      data: {
        booking
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

// @route   POST /api/bookings
// @desc    Create a booking
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { tourId, partnerId, tourDate, numberOfParticipants, specialRequests, participantDetails } = req.body;

    // Get tour to verify and calculate price
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        error: {
          message: 'Tour not found',
          status: 404
        }
      });
    }

    // Create booking
    const booking = await Booking.create({
      userId: req.user.id,
      tourId,
      partnerId,
      tourDate,
      numberOfParticipants,
      totalPrice: tour.price * numberOfParticipants,
      specialRequests,
      participantDetails: participantDetails || [],
      status: 'pending',
      paymentStatus: 'pending'
    });

    // Populate and return
    await booking.populate('tourId partnerId');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        booking
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

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status
// @access  Private (partner only)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        error: {
          message: 'Booking not found',
          status: 404
        }
      });
    }

    // Update status
    booking.status = status;
    await booking.save();
    await booking.populate('tourId partnerId');

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: {
        booking
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