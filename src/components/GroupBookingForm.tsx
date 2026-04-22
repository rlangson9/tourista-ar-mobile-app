import { useState } from 'react';
import { ArrowLeft, Calendar, Users, MapPin, Clock, Building2, User, Phone, MessageSquare, CheckCircle, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen } from '../App';

interface GroupBookingFormProps {
  onNavigate: (screen: Screen) => void;
}

export function GroupBookingForm({ onNavigate }: GroupBookingFormProps) {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    contactPhone: '',
    numberOfTravelers: '',
    tripType: 'school' as 'school' | 'corporate' | 'government',
    destination: '',
    departureDate: '',
    duration: '',
    specialNeeds: {
      hotelLevel: '',
      meals: '',
      transport: '',
      guides: '',
    },
    additionalRequests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const destinations = [
    'Beijing, China',
    'Shanghai, China',
    'Guangzhou, China',
    'Victoria Falls, Zimbabwe',
    'Harare, Zimbabwe',
    'Cape Town, South Africa',
    'Johannesburg, South Africa',
    'Nairobi, Kenya',
    'Mombasa, Kenya',
    'Dar es Salaam, Tanzania',
    'Zanzibar, Tanzania',
    'Lusaka, Zambia',
    'Livingstone, Zambia',
    'Kampala, Uganda',
    'Entebbe, Uganda',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('specialNeeds.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        specialNeeds: {
          ...prev.specialNeeds,
          [field]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
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
          <h1 className="text-xl font-bold flex-1">Group Booking Request</h1>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Organization Info */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-green-600" />
                  Organization Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="Enter school or company name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                        placeholder="+123 456 7890"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  Trip Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
                    <input
                      type="number"
                      name="numberOfTravelers"
                      value={formData.numberOfTravelers}
                      onChange={handleChange}
                      required
                      min="1"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="Enter number of people"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trip Type</label>
                    <select
                      name="tripType"
                      value={formData.tripType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="school">School Trip</option>
                      <option value="corporate">Corporate Trip</option>
                      <option value="government">Government Trip</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="">Select a destination</option>
                      {destinations.map((dest) => (
                        <option key={dest} value={dest}>{dest}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                      <input
                        type="date"
                        name="departureDate"
                        value={formData.departureDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
                      <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                        placeholder="Number of days"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Needs */}
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  Special Requirements
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Level</label>
                    <select
                      name="specialNeeds.hotelLevel"
                      value={formData.specialNeeds.hotelLevel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="">Select hotel level</option>
                      <option value="budget">Budget</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                      <option value="luxury">Luxury</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meals</label>
                    <input
                      type="text"
                      name="specialNeeds.meals"
                      value={formData.specialNeeds.meals}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="Special meal requirements"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Transport</label>
                    <input
                      type="text"
                      name="specialNeeds.transport"
                      value={formData.specialNeeds.transport}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="Transport preferences"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guides</label>
                    <input
                      type="text"
                      name="specialNeeds.guides"
                      value={formData.specialNeeds.guides}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="Guide requirements"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requests</label>
                    <textarea
                      name="additionalRequests"
                      value={formData.additionalRequests}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                      placeholder="Any other special requests or information"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Submit Group Booking Request</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-12 flex flex-col items-center justify-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
            <p className="text-gray-600 text-center mb-8 max-w-md">
              Thank you for your group booking request. Our team will review it and contact you with a custom quote and itinerary within 24-48 hours.
            </p>
            <div className="w-full max-w-md space-y-3">
              <button
                onClick={() => onNavigate('bookings')}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition"
              >
                View My Bookings
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition"
              >
                Back to Home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
