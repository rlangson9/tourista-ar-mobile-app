import mongoose from 'mongoose';

interface TourDocument extends mongoose.Document {
  partnerId: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  location: string;
  duration: number;
  durationUnit: 'hours' | 'days';
  price: number;
  currency: string;
  discount: number;
  images: string[];
  videoUrl: string;
  itinerary: any[];
  inclusions: string[];
  exclusions: string[];
  meetingPoint: string;
  pickupOptions: boolean;
  languages: string[];
  minimumParticipants: number;
  maximumParticipants: number;
  availability: string[];
  isFeatured: boolean;
  isActive: boolean;
  views: number;
  bookings: number;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const tourSchema = new mongoose.Schema<TourDocument>({
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partner',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a tour title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a tour description'],
  },
  category: {
    type: String,
    required: [true, 'Please select a tour category'],
  },
  subcategory: {
    type: String,
    required: [true, 'Please select a tour subcategory'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a tour location'],
  },
  duration: {
    type: Number,
    required: [true, 'Please specify tour duration'],
  },
  durationUnit: {
    type: String,
    enum: ['hours', 'days'],
    default: 'hours',
  },
  price: {
    type: Number,
    required: [true, 'Please specify tour price'],
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
  itinerary: {
    type: [Object],
    default: [],
  },
  inclusions: {
    type: [String],
    default: [],
  },
  exclusions: {
    type: [String],
    default: [],
  },
  meetingPoint: {
    type: String,
    required: [true, 'Please specify meeting point'],
  },
  pickupOptions: {
    type: Boolean,
    default: false,
  },
  languages: {
    type: [String],
    required: [true, 'Please specify available languages'],
  },
  minimumParticipants: {
    type: Number,
    default: 1,
  },
  maximumParticipants: {
    type: Number,
    required: [true, 'Please specify maximum participants'],
  },
  availability: {
    type: [String],
    default: [],
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
  bookings: {
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

const Tour = mongoose.model<TourDocument>('Tour', tourSchema);

export default Tour;
