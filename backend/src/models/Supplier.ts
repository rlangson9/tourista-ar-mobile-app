import mongoose from 'mongoose';

interface SupplierDocument extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  companyName: string;
  companyDescription: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  website: string;
  registrationNumber: string;
  businessType: string;
  productCategories: string[];
  minimumOrderQuantity: number;
  deliveryRegions: string[];
  paymentMethods: string[];
  isApproved: boolean;
  verificationDocuments: string[];
  rating: number;
  reviewCount: number;
  totalOrders: number;
  createdAt: Date;
  updatedAt: Date;
}

const supplierSchema = new mongoose.Schema<SupplierDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyName: {
    type: String,
    required: [true, 'Please provide your company name'],
  },
  companyDescription: {
    type: String,
    required: [true, 'Please provide a company description'],
  },
  companyAddress: {
    type: String,
    required: [true, 'Please provide your company address'],
  },
  companyPhone: {
    type: String,
    required: [true, 'Please provide your company phone number'],
  },
  companyEmail: {
    type: String,
    required: [true, 'Please provide your company email'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
  },
  website: {
    type: String,
    required: [true, 'Please provide your website'],
  },
  registrationNumber: {
    type: String,
    required: [true, 'Please provide your company registration number'],
  },
  businessType: {
    type: String,
    required: [true, 'Please specify your business type'],
  },
  productCategories: {
    type: [String],
    required: [true, 'Please select at least one product category'],
  },
  minimumOrderQuantity: {
    type: Number,
    required: [true, 'Please specify minimum order quantity'],
  },
  deliveryRegions: {
    type: [String],
    required: [true, 'Please specify delivery regions'],
  },
  paymentMethods: {
    type: [String],
    required: [true, 'Please specify accepted payment methods'],
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
  totalOrders: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Supplier = mongoose.model<SupplierDocument>('Supplier', supplierSchema);

export default Supplier;
