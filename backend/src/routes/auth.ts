import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, country, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        error: {
          message: 'User already exists',
          status: 400
        }
      });
    }

    // Create verification token
    const verificationToken = uuidv4();

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      country,
      role: role || 'user',
      verificationToken
    });

    // Send verification email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT as string),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Verify your email',
      html: `
        <h1>Welcome to Tourista AR!</h1>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
      `
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email to verify your account.',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified
        },
        token
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

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({
        error: {
          message: 'Invalid email or password',
          status: 400
        }
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        error: {
          message: 'Invalid email or password',
          status: 400
        }
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified
        },
        token
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

// @route   GET /api/auth/verify-email
// @desc    Verify user email
// @access  Public
router.get('/verify-email', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        error: {
          message: 'No verification token provided',
          status: 400
        }
      });
    }

    // Find user by verification token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        error: {
          message: 'Invalid verification token',
          status: 400
        }
      });
    }

    // Verify user
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified
        }
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

// @route   POST /api/auth/forgot-password
// @desc    Forgot password
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: {
          message: 'User does not exist',
          status: 400
        }
      });
    }

    // Create reset token
    const resetToken = uuidv4();
    const resetPasswordExpire = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save();

    // Send reset email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT as string),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Reset your password',
      html: `
        <h1>Password Reset</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
      `
    });

    res.status(200).json({
      success: true,
      message: 'Reset password email sent',
      data: {
        email: user.email
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

// @route   POST /api/auth/reset-password
// @desc    Reset password
// @access  Public
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    // Find user by reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        error: {
          message: 'Invalid or expired reset token',
          status: 400
        }
      });
    }

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
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
