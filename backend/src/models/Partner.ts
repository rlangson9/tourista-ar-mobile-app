import mongoose from 'mongoose';

interface PartnerDocument extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  businessName: string;
  businessDescription: string;
  businessAddress: string;
  businessPhone: string;
  businessEmail: string;
  website: string;
  registrationNumber: string;
  categories: string[];
  services: string[];
  isApproved: boolean;
  verificationDocuments: string[];
  rating: number;
  reviewCount: number;
  totalBookings: number;
  createdAt: Date;
  updatedAt: Date;
}

const partnerSchema = new mongoose.Schema<PartnerDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  businessName: {
    type: String,
    required: [true, 'Please provide your business name'],
  },
  businessDescription: {
    type: String,
    required: [true, 'Please provide a business description'],
  },
  businessAddress: {
    type: String,
    required: [true, 'Please provide your business address'],
  },
  businessPhone: {
    type: String,
    required: [true, 'Please provide your business phone number'],
  },
  businessEmail: {
    type: String,
    required: [true, 'Please provide your business email'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
  },
  website: {
    type: String,
    required: [true, 'Please provide your website'],
  },
  registrationNumber: {
    type: String,
    required: [true, 'Please provide your business registration number'],
  },
  categories: {
    type: [String],
    required: [true, 'Please select at least one category'],
  },
  services: {
    type: [String],
    required: [true, 'Please list your services'],
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  verificationDocuments: {
    type: [String],
    default: [],
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  totalBookings: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Partner = mongoose.model<PartnerDocument>('Partner', partnerSchema);

export default Partner;
