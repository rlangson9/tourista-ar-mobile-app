import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  phone: string;
  country: string;
  language: string;
  currency: string;
  role: 'user' | 'partner' | 'supplier' | 'admin';
  isVerified: boolean;
  verificationToken: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/demo/image/upload/v1600000000/default-avatar.png',
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
  },
  country: {
    type: String,
    required: [true, 'Please provide your country'],
  },
  language: {
    type: String,
    default: 'en',
  },
  currency: {
    type: String,
    default: 'USD',
  },
  role: {
    type: String,
    enum: ['user', 'partner', 'supplier', 'admin'],
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

// Add indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isVerified: 1 });

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
