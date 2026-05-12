import mongoose from 'mongoose';

interface BookingDocument extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  tourId: mongoose.Schema.Types.ObjectId;
  partnerId: mongoose.Schema.Types.ObjectId;
  bookingDate: Date;
  tourDate: Date;
  numberOfParticipants: number;
  totalPrice: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentMethod: string;
  transactionId: string;
  participantDetails: any[];
  specialRequests: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new mongoose.Schema<BookingDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: true,
  },
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner',
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  tourDate: {
    type: Date,
    required: [true, 'Please select a tour date'],
  },
  numberOfParticipants: {
    type: Number,
    required: [true, 'Please specify number of participants'],
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
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
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
  participantDetails: {
    type: [Object],
    default: [],
  },
  specialRequests: {
    type: String,
  },
}, {
  timestamps: true,
});

// Add indexes for better query performance
bookingSchema.index({ userId: 1 });
bookingSchema.index({ partnerId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ tourDate: 1 });
bookingSchema.index({ paymentStatus: 1 });

const Booking = mongoose.model<BookingDocument>('Booking', bookingSchema);

export default Booking;
