import mongoose from 'mongoose';

interface ProductDocument extends mongoose.Document {
  supplierId: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  currency: string;
  discount: number;
  images: string[];
  videoUrl: string;
  sku: string;
  stock: number;
  minimumOrder: number;
  weight: number;
  weightUnit: string;
  dimensions: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  colors: string[];
  variations: any[];
  features: string[];
  specifications: any[];
  shippingInfo: string;
  returnPolicy: string;
  isFeatured: boolean;
  isActive: boolean;
  views: number;
  orders: number;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<ProductDocument>({
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  category: {
    type: String,
    required: [true, 'Please select a product category'],
  },
  subcategory: {
    type: String,
    required: [true, 'Please select a product subcategory'],
  },
  price: {
    type: Number,
    required: [true, 'Please specify product price'],
  },
  currency: {
    type: String,
    default: 'USD',
  },
  discount: {
    type: Number,
    default: 0,
  },
  images: {
    type: [String],
    required: [true, 'Please upload at least one image'],
  },
  videoUrl: {
    type: String,
  },
  sku: {
    type: String,
    required: [true, 'Please provide a SKU'],
  },
  stock: {
    type: Number,
    required: [true, 'Please specify stock quantity'],
  },
  minimumOrder: {
    type: Number,
    default: 1,
  },
  weight: {
    type: Number,
  },
  weightUnit: {
    type: String,
    default: 'kg',
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      default: 'cm',
    },
  },
  colors: {
    type: [String],
    default: [],
  },
  variations: {
    type: [Object],
    default: [],
  },
  features: {
    type: [String],
    default: [],
  },
  specifications: {
    type: [Object],
    default: [],
  },
  shippingInfo: {
    type: String,
  },
  returnPolicy: {
    type: String,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  orders: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Product = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
