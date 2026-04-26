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
import bookingRoutes from './routes/booking.js';
import uploadRoutes from './routes/upload.js';
import orderRoutes from './routes/order.js';

// Import rate limiters
import { apiLimiter } from './middleware/rateLimit.js';

// Load environment variables
dotenv.config();

// ── Validate required env vars ───────────────────────────────────────────────
const REQUIRED_ENV = ['MONGODB_URI', 'JWT_SECRET'];
const missing = REQUIRED_ENV.filter(k => !process.env[k]);
if (missing.length > 0) {
  console.error(`❌ Missing required environment variables: ${missing.join(', ')}`);
  console.error('   Create a backend/.env file — see backend/.env.example');
  process.exit(1);
}

// ── MongoDB connection ───────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGODB_URI as string;

const MONGO_OPTIONS: mongoose.ConnectOptions = {
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 15000,
  maxPoolSize: 10,
  minPoolSize: 2,
  retryWrites: true,
  retryReads: true,
  heartbeatFrequencyMS: 10000,
};

// Connection state labels (mongoose readyState codes)
const DB_STATES: Record<number, string> = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

function dbState(): string {
  return DB_STATES[mongoose.connection.readyState] ?? 'unknown';
}

// Mongoose connection event listeners
mongoose.connection.on('connecting', () => console.log('⏳ MongoDB connecting...'));
mongoose.connection.on('connected', () => console.log('✅ MongoDB connected'));
mongoose.connection.on('disconnected', () => console.log('⚠️  MongoDB disconnected — will retry'));
mongoose.connection.on('reconnected', () => console.log('🔄 MongoDB reconnected'));
mongoose.connection.on('error', (err) => console.error('❌ MongoDB error:', err.message));
mongoose.connection.on('close', () => console.log('🔒 MongoDB connection closed'));

let isConnecting = false;

async function connectDB(attempt = 1): Promise<void> {
  if (isConnecting) return;
  isConnecting = true;

  const MAX_RETRIES = 5;
  const RETRY_DELAY = Math.min(5000 * attempt, 30000);

  try {
    console.log(`🔌 MongoDB connect attempt ${attempt}/${MAX_RETRIES}...`);
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
    isConnecting = false;
    console.log(`✅ MongoDB ready — db: "${mongoose.connection.db?.databaseName}"`);
  } catch (err: any) {
    isConnecting = false;
    console.error(`❌ MongoDB attempt ${attempt} failed: ${err.message}`);

    if (attempt < MAX_RETRIES) {
      console.log(`   Retrying in ${RETRY_DELAY / 1000}s...`);
      await new Promise(r => setTimeout(r, RETRY_DELAY));
      return connectDB(attempt + 1);
    }

    console.error('   Max retries reached. Check Atlas credentials and network access.');
    console.error('   → `https://cloud.mongodb.com`  → Network Access → Add your IP');
  }
}

// Auto-reconnect on unexpected disconnect
mongoose.connection.on('disconnected', () => {
  if (!isConnecting) {
    console.log('🔄 Scheduling MongoDB reconnect in 5s...');
    setTimeout(() => connectDB(), 5000);
  }
});

// ── Express app ──────────────────────────────────────────────────────────────
const app = express();

// Security & parsing middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting for all /api routes
app.use('/api', apiLimiter);

// ── DB-required middleware ───────────────────────────────────────────────────
app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      error: {
        message: 'Database unavailable. Please try again in a moment.',
        status: 503,
        db: dbState(),
      },
    });
  }
  next();
});

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    status: connected ? 'ok' : 'degraded',
    server: 'Tourista AR Backend',
    version: '1.0.0',
    mongodb: {
      state: dbState(),
      database: mongoose.connection.db?.databaseName ?? null,
      host: mongoose.connection.host ?? null,
    },
    uptime: Math.floor(process.uptime()) + 's',
    timestamp: new Date().toISOString(),
  });
});

// ── Database health endpoint ──────────────────────────────────────────────────
app.get('/health/db', async (_req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        db: dbState(),
        message: 'MongoDB not connected',
      });
    }

    await mongoose.connection.db!.admin().ping();
    res.json({
      success: true,
      db: dbState(),
      message: 'MongoDB is responding',
    });
  } catch (error: any) {
    res.status(503).json({
      success: false,
      db: dbState(),
      message: error.message,
    });
  }
});

// ── API routes ───────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/trade', tradeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', uploadRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    },
  });
});

// ── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5002;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('⏳ Attempting to connect to MongoDB...');
});

// Start MongoDB connection
connectDB();
