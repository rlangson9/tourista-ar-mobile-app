import mongoose, { Schema, Document } from 'mongoose';

export interface IAfricanSupplier extends Document {
  user_id: string;
  name: string;
  role: 'african_supplier';
  country: string;
  region: string;
  email: string;
  phone: string;
  languages: string[];
  business_type: string;
  product_offers: string[];
  verification_status: 'pending' | 'verified' | 'rejected';
  rating: number;
  total_transactions: number;
  created_at: Date;
  updated_at: Date;
}

const AfricanSupplierSchema = new Schema<IAfricanSupplier>(
  {
    user_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['african_supplier'], required: true },
    country: { type: String, required: true },
    region: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    languages: [{ type: String }],
    business_type: { type: String, required: true },
    product_offers: [{ type: String }],
    verification_status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    total_transactions: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

AfricanSupplierSchema.index({ email: 1 });
AfricanSupplierSchema.index({ user_id: 1 });
AfricanSupplierSchema.index({ region: 1 });
AfricanSupplierSchema.index({ verification_status: 1 });
AfricanSupplierSchema.index({ rating: -1 });

export const AfricanSupplier = mongoose.model<IAfricanSupplier>('AfricanSupplier', AfricanSupplierSchema);
