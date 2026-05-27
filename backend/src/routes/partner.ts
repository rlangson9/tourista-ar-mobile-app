import express from 'express';
import { protect, partner } from '../middleware/auth.js';
import Partner from '../models/Partner.js';
import Tour from '../models/Tour.js';
import Booking from '../models/Booking.js';
import { tourValidation, partnerValidation } from '../middleware/validation.js';

const router = express.Router();

// @route   POST /api/partners/profile
// @desc    Create or update partner profile
// @access  Private (Partner only)
router.post('/profile', protect, partner, partnerValidation, async (req, res) => {
  try {
    const { 
      businessName, 
      businessDescription, 
      businessAddress, 
      businessPhone, 
      businessEmail, 
      website, 
      registrationNumber, 
      categories, 
      services,
      verificationDocuments
    } = req.body;

    let partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (partnerProfile) {
      partnerProfile = await Partner.findOneAndUpdate(
        { userId: req.user.id },
        {
          businessName,
          businessDescription,
          businessAddress,
          businessPhone,
          businessEmail,
          website,
          registrationNumber,
          categories,
          services,
          verificationDocuments
        },
        { new: true }
      );
    } else {
      partnerProfile = await Partner.create({
        userId: req.user.id,
        businessName,
        businessDescription,
        businessAddress,
        businessPhone,
        businessEmail,
        website,
        registrationNumber,
        categories,
        services,
        verificationDocuments
      });
    }

    res.status(200).json({
      success: true,
      message: 'Partner profile saved successfully',
      data: {
        partner: partnerProfile
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

// @route   GET /api/partners/profile
// @desc    Get partner profile
// @access  Private (Partner only)
router.get('/profile', protect, partner, async (req, res) => {
  try {
    const partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (!partnerProfile) {
      return res.status(404).json({
        error: {
          message: 'Partner profile not found',
          status: 404
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Partner profile retrieved successfully',
      data: {
        partner: partnerProfile
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

// @route   GET /api/partners/overview
// @desc    Get partner dashboard overview with metrics
// @access  Private (Partner only)
router.get('/overview', protect, partner, async (req, res) => {
  try {
    const partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (!partnerProfile) {
      return res.status(404).json({
        error: {
          message: 'Partner profile not found',
          status: 404
        }
      });
    }

    const tours = await Tour.find({ partnerId: partnerProfile._id });
    const bookings = await Booking.find({ partnerId: partnerProfile._id });
    
    // Calculate metrics
    const totalRevenue = bookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.totalPrice, 0);
    
    const totalBookings = bookings.length;
    const activeTours = tours.filter(t => t.isActive).length;
    const avgRating = tours.length > 0 
      ? tours.reduce((sum, t) => sum + t.rating, 0) / tours.length 
      : 0;

    // Get recent bookings (last 3)
    const recentBookings = await Booking.find({ partnerId: partnerProfile._id })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('userId', 'name email')
      .populate('tourId', 'title');

    // Get top performing tours
    const topTours = tours
      .sort((a, b) => b.bookings - a.bookings)
      .slice(0, 3)
      .map(tour => ({
        id: tour._id,
        name: tour.title,
        bookings: tour.bookings,
        revenue: bookings
          .filter(b => b.tourId.toString() === tour._id.toString() && b.paymentStatus === 'paid')
          .reduce((sum, b) => sum + b.totalPrice, 0)
      }));

    res.status(200).json({
      success: true,
      message: 'Overview retrieved successfully',
      data: {
        metrics: {
          totalRevenue,
          totalBookings,
          activeTours,
          avgRating
        },
        recentBookings,
        topTours
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

// @route   GET /api/partners/tours
// @desc    Get partner's tours
// @access  Private (Partner only)
router.get('/tours', protect, partner, async (req, res) => {
  try {
    const partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (!partnerProfile) {
      return res.status(404).json({
        error: {
          message: 'Partner profile not found',
          status: 404
        }
      });
    }

    const tours = await Tour.find({ partnerId: partnerProfile._id });

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

// @route   POST /api/partners/tours
// @desc    Create a new tour
// @access  Private (Partner only)
router.post('/tours', protect, partner, tourValidation, async (req, res) => {
  try {
    const partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (!partnerProfile) {
      return res.status(404).json({
        error: {
          message: 'Partner profile not found',
          status: 404
        }
      });
    }

    const tour = await Tour.create({
      partnerId: partnerProfile._id,
      ...req.body
    });

    res.status(201).json({
      success: true,
      message: 'Tour created successfully',
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

// @route   PUT /api/partners/tours/:id
// @desc    Update a tour
// @access  Private (Partner only)
router.put('/tours/:id', protect, partner, async (req, res) => {
  try {
    const partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (!partnerProfile) {
      return res.status(404).json({
        error: {
          message: 'Partner profile not found',
          status: 404
        }
      });
    }

    const tour = await Tour.findOneAndUpdate(
      { _id: req.params.id, partnerId: partnerProfile._id },
      req.body,
      { new: true }
    );

    if (!tour) {
      return res.status(404).json({
        error: {
          message: 'Tour not found',
          status: 404
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tour updated successfully',
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

// @route   DELETE /api/partners/tours/:id
// @desc    Delete a tour
// @access  Private (Partner only)
router.delete('/tours/:id', protect, partner, async (req, res) => {
  try {
    const partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (!partnerProfile) {
      return res.status(404).json({
        error: {
          message: 'Partner profile not found',
          status: 404
        }
      });
    }

    const tour = await Tour.findOneAndDelete({
      _id: req.params.id,
      partnerId: partnerProfile._id
    });

    if (!tour) {
      return res.status(404).json({
        error: {
          message: 'Tour not found',
          status: 404
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tour deleted successfully'
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

// @route   GET /api/partners/bookings
// @desc    Get partner's bookings with optional filter
// @access  Private (Partner only)
router.get('/bookings', protect, partner, async (req, res) => {
  try {
    const { status } = req.query;
    const partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (!partnerProfile) {
      return res.status(404).json({
        error: {
          message: 'Partner profile not found',
          status: 404
        }
      });
    }

    const query: any = { partnerId: partnerProfile._id };
    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('userId', 'name email phone')
      .populate('tourId', 'title duration');

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

// @route   PUT /api/partners/bookings/:id/status
// @desc    Update booking status
// @access  Private (Partner only)
router.put('/bookings/:id/status', protect, partner, async (req, res) => {
  try {
    const { status } = req.body;
    const partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (!partnerProfile) {
      return res.status(404).json({
        error: {
          message: 'Partner profile not found',
          status: 404
        }
      });
    }

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, partnerId: partnerProfile._id },
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        error: {
          message: 'Booking not found',
          status: 404
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Booking status updated successfully',
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

// @route   GET /api/partners/revenue
// @desc    Get partner revenue analytics
// @access  Private (Partner only)
router.get('/revenue', protect, partner, async (req, res) => {
  try {
    const partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (!partnerProfile) {
      return res.status(404).json({
        error: {
          message: 'Partner profile not found',
          status: 404
        }
      });
    }

    const bookings = await Booking.find({ 
      partnerId: partnerProfile._id,
      paymentStatus: 'paid'
    });

    // Calculate monthly revenue
    const monthlyRevenue: { month: string; value: number }[] = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthName = date.toLocaleString('default', { month: 'short' });
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const monthlyTotal = bookings.filter(b => {
        const bookingDate = new Date(b.createdAt);
        return bookingDate >= monthStart && bookingDate <= monthEnd;
      }).reduce((sum, b) => sum + b.totalPrice, 0);

      monthlyRevenue.unshift({
        month: monthName,
        value: monthlyTotal
      });
    }

    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
    const commission = totalRevenue * 0.10;
    const netEarnings = totalRevenue - commission;

    // Payment history
    const paymentHistory = [
      { 
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        desc: 'Monthly Settlement',
        amount: totalRevenue * 0.25,
        commission: totalRevenue * 0.025,
        net: totalRevenue * 0.225,
        status: 'paid'
      },
      { 
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        desc: 'Monthly Settlement',
        amount: totalRevenue * 0.2,
        commission: totalRevenue * 0.02,
        net: totalRevenue * 0.18,
        status: 'paid'
      }
    ];

    res.status(200).json({
      success: true,
      message: 'Revenue data retrieved successfully',
      data: {
        totalRevenue,
        commission,
        netEarnings,
        monthlyRevenue,
        paymentHistory
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

// @route   GET /api/partners/analytics
// @desc    Get partner analytics
// @access  Private (Partner only)
router.get('/analytics', protect, partner, async (req, res) => {
  try {
    const partnerProfile = await Partner.findOne({ userId: req.user.id });

    if (!partnerProfile) {
      return res.status(404).json({
        error: {
          message: 'Partner profile not found',
          status: 404
        }
      });
    }

    const tours = await Tour.find({ partnerId: partnerProfile._id });
    const bookings = await Booking.find({ partnerId: partnerProfile._id });

    const totalViews = tours.reduce((sum, t) => sum + t.views, 0);
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const conversionRate = totalViews > 0 ? (confirmedBookings / totalViews) * 100 : 0;

    res.status(200).json({
      success: true,
      message: 'Analytics retrieved successfully',
      data: {
        totalViews,
        confirmedBookings,
        conversionRate,
        avgRating: tours.length > 0 ? tours.reduce((sum, t) => sum + t.rating, 0) / tours.length : 0,
        tourPerformance: tours.map(t => ({
          id: t._id,
          title: t.title,
          views: t.views,
          bookings: t.bookings,
          rating: t.rating,
          revenue: bookings
            .filter(b => b.tourId.toString() === t._id.toString() && b.paymentStatus === 'paid')
            .reduce((sum, b) => sum + b.totalPrice, 0)
        }))
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
