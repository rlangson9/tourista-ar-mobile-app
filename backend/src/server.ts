import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import partnerRoutes from './routes/partner.js';
import supplierRoutes from './routes/supplier.js';
import tourRoutes from './routes/tour.js';
import tradeRoutes from './routes/trade.js';
import adminRoutes from './routes/admin.js';
import messageRoutes from './routes/message.js';
import paymentRoutes from './routes/payment.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Tourista AR Backend is running',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    mode: mongoose.connection.readyState === 1 ? 'full' : 'limited'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/trade', tradeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500
    }
  });
});

// Start server immediately
const PORT = process.env.PORT || 5002;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('⏳ Attempting to connect to MongoDB...');
});

// Connect to MongoDB asynchronously
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000,
    });
    console.log('✅ Connected to MongoDB - Full functionality available');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    console.log('\n⚠️  Running in LIMITED MODE (no database)');
    console.log('APIs will work but data will not persist\n');
    console.log('To enable full functionality:');
    console.log('1. Log into MongoDB Atlas: https://cloud.mongodb.com');
    console.log('2. Create a new cluster named "touristaar"');
    console.log('3. Create a database user: rlangson9_db_user / Tourista2025');
    console.log('4. Add your IP to Network Access');
    console.log('5. Get the connection string and update backend/.env\n');
  }
};

// Start MongoDB connection after server is running
connectDB();
