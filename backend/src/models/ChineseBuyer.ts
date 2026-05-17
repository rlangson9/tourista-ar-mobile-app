import mongoose, { Schema, Document } from 'mongoose';

export interface IChineseBuyer extends Document {
  user_id: string;
  name: string;
  role: 'chinese_buyer';
  country: string;
  region: string;
  email: string;
  phone: string;
  languages: string[];
  business_type: string;
  product_interests: string[];
  preferred_payment_methods: string[];
  budget_range_min: number;
  budget_range_max: number;
  created_at: Date;
  updated_at: Date;
}

const ChineseBuyerSchema = new Schema<IChineseBuyer>(
  {
    user_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['chinese_buyer'], required: true },
    country: { type: String, required: true },
    region: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    languages: [{ type: String }],
    business_type: { type: String, required: true },
    product_interests: [{ type: String }],
    preferred_payment_methods: [{ type: String }],
    budget_range_min: { type: Number, default: 0 },
    budget_range_max: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

ChineseBuyerSchema.index({ email: 1 });
ChineseBuyerSchema.index({ user_id: 1 });
ChineseBuyerSchema.index({ region: 1 });

export const ChineseBuyer = mongoose.model<IChineseBuyer>('ChineseBuyer', ChineseBuyerSchema);
