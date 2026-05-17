import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  product_id: string;
  supplier_id: string;
  name: string;
  name_zh: string;
  category: string;
  description: string;
  description_zh: string;
  price: number;
  currency: string;
  available_quantity: number;
  min_order_quantity: number;
  location: string;
  images: string[];
  status: 'active' | 'inactive' | 'out_of_stock';
  created_at: Date;
  updated_at: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    product_id: { type: String, required: true, unique: true },
    supplier_id: { type: String, required: true },
    name: { type: String, required: true },
    name_zh: { type: String, default: '' },
    category: { type: String, required: true },
    description: { type: String, default: '' },
    description_zh: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD' },
    available_quantity: { type: Number, default: 0, min: 0 },
    min_order_quantity: { type: Number, default: 1, min: 1 },
    location: { type: String, default: '' },
    images: [{ type: String }],
    status: {
      type: String,
      enum: ['active', 'inactive', 'out_of_stock'],
      default: 'active'
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

ProductSchema.index({ product_id: 1 });
ProductSchema.index({ supplier_id: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ price: 1 });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
