import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, DollarSign, AlertCircle, Check, X, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Screen } from '../App';
import { mockTours } from '../data/mockData';

interface BookingManagementProps {
  tourId: string;
  status: 'confirmed' | 'pending';
  date: string;
  onNavigate: (screen: Screen) => void;
}

export function BookingManagement({ tourId, status, date, onNavigate }: BookingManagementProps) {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const tour = mockTours.find(t => t.id === tourId);

  if (!tour) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-600">Tour not found</p>
      </div>
    );
  }

  const handleCancelBooking = () => {
    setIsCancelling(true);
    // Simulate API call
    setTimeout(() => {
      setIsCancelling(false);
      setShowSuccess(true);
      // Redirect to bookings page after success
      setTimeout(() => {
        onNavigate('bookings');
      }, 2000);
    }, 1500);
  };

  const handleContinueToPayment = () => {
    // Navigate to payment page with tourId
    onNavigate('booking', tourId);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10" style={{ paddingTop: `env(safe-area-inset-top)` }}>
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => onNavigate('bookings')}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold flex-1">Manage Booking</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        {/* Tour Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl overflow-hidden shadow-md"
        >
          <div className="relative h-40">
            <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${
              status === 'confirmed' ? 'bg-green-600 text-white' : 'bg-amber-600 text-white'
            }`}>
              {status === 'confirmed' ? 'Confirmed' : 'Pending'}
            </div>
          </div>
          <div className="p-4">
            <h2 className="font-bold text-lg mb-3">{tour.title}</h2>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{tour.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span>${tour.price} per person</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cancellation Policy */}
        {status === 'confirmed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-md p-4"
          >
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Cancellation Policy</h3>
                <p className="text-sm text-gray-600">{tour.cancellationPolicy}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {status === 'confirmed' ? (
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5" />
              Cancel Booking
            </button>
          ) : (
            <button
              onClick={handleContinueToPayment}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <ChevronRight className="w-5 h-5" />
              Continue to Payment
            </button>
          )}
          
          <button
            onClick={() => onNavigate('tour-details', tourId)}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            View Tour Details
          </button>
        </motion.div>

        {/* Cancellation Confirmation Modal */}
        {showCancelConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold mb-4 text-center">Confirm Cancellation</h3>
              <p className="text-gray-600 mb-6 text-center">
                Are you sure you want to cancel this booking?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  No, Keep Booking
                </button>
                <button
                  onClick={handleCancelBooking}
                  disabled={isCancelling}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
                >
                  {isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Success Modal */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Booking Cancelled</h3>
              <p className="text-gray-600 mb-6 text-center">
                Your booking has been successfully cancelled.
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
