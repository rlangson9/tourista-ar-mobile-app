import mongoose from 'mongoose';

interface OrderDocument extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  supplierId: mongoose.Schema.Types.ObjectId;
  orderDate: Date;
  deliveryDate: Date;
  totalPrice: number;
  currency: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod: string;
  transactionId: string;
  items: any[];
  shippingAddress: any;
  billingAddress: any;
  trackingNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<OrderDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryDate: {
    type: Date,
  },
  totalPrice: {
    type: Number,
    required: [true, 'Please specify total price'],
  },
  currency: {
    type: String,
    default: 'USD',
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending',
  },
  paymentMethod: {
    type: String,
  },
  transactionId: {
    type: String,
  },
  items: {
    type: [Object],
    required: [true, 'Please specify order items'],
  },
  shippingAddress: {
    type: Object,
    required: [true, 'Please provide shipping address'],
  },
  billingAddress: {
    type: Object,
  },
  trackingNumber: {
    type: String,
  },
}, {
  timestamps: true,
});

const Order = mongoose.model<OrderDocument>('Order', orderSchema);

export default Order;
