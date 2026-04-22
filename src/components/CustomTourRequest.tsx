import { ArrowLeft, MapPin, Calendar, Users, DollarSign, Briefcase, Upload, Check, Sun, Building, Factory, Globe, GraduationCap, Info } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen } from '../App';
import { mockCustomTourRequests, type CustomTourRequest } from '../data/mockData';

interface CustomTourRequestProps {
  onNavigate: (screen: Screen) => void;
}

interface TourRequestData {
  destination: string;
  city: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budgetMin: string;
  budgetMax: string;
  purpose: string;
  requirements: string;
  images: File[];
}

export function CustomTourRequest({ onNavigate }: CustomTourRequestProps) {
  const [step, setStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<TourRequestData>({
    destination: '',
    city: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budgetMin: '',
    budgetMax: '',
    purpose: '',
    requirements: '',
    images: [],
  });

  const handleSubmit = () => {
    const newRequest: CustomTourRequest = {
      id: `ct${Date.now()}`,
      userId: 'user1',
      country: formData.destination,
      city: formData.city,
      startDate: formData.startDate,
      endDate: formData.endDate,
      travelers: formData.travelers,
      budget: Math.floor((parseFloat(formData.budgetMin) + parseFloat(formData.budgetMax)) / 2),
      purpose: formData.purpose,
      requirements: formData.requirements,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    };
    mockCustomTourRequests.push(newRequest);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      onNavigate('bookings');
    }, 3000);
  };

  const purposes = [
    { id: 'leisure', label: 'Leisure', icon: Sun },
    { id: 'business', label: 'Business', icon: Briefcase },
    { id: 'factory', label: 'Factory Visit', icon: Factory },
    { id: 'cultural', label: 'Cultural', icon: Globe },
    { id: 'education', label: 'Education', icon: GraduationCap },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-b-3xl shadow-lg">
        <button
          onClick={() => step === 1 ? onNavigate('home') : setStep(step - 1)}
          className="mb-4 p-2 hover:bg-white/10 rounded-full transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <h1 className="text-2xl font-bold mb-2">Request Custom Tour</h1>
        <p className="text-blue-100 text-sm">Tell us what you're looking for</p>

        {/* Progress Bar */}
        <div className="mt-6 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition ${
                s <= step ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        <AnimatePresence mode="wait">
          {/* Step 1: Destination & Dates */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Where & When</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Destination Country *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="">Select destination</option>
                        <option value="china">🇨🇳 China</option>
                        <option value="south-africa">🇿🇦 South Africa</option>
                        <option value="nigeria">🇳🇬 Nigeria</option>
                        <option value="kenya">🇰🇪 Kenya</option>
                        <option value="ethiopia">🇪🇹 Ethiopia</option>
                        <option value="tanzania">🇹🇿 Tanzania</option>
                        <option value="zimbabwe">🇿🇼 Zimbabwe</option>
                        <option value="malawi">🇲🇼 Malawi</option>
                        <option value="mozambique">🇲🇿 Mozambique</option>
                        <option value="zambia">🇿🇲 Zambia</option>
                        <option value="namibia">🇳🇦 Namibia</option>
                        <option value="ghana">🇬🇭 Ghana</option>
                        <option value="egypt">🇪🇬 Egypt</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Specific City/Area *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g., Beijing, Shenzhen, Johannesburg"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Start Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                          className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        End Date *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Travelers *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        value={formData.travelers}
                        onChange={(e) => setFormData({ ...formData, travelers: parseInt(e.target.value) })}
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.destination || !formData.city || !formData.startDate || !formData.endDate}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* Step 2: Budget & Purpose */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Budget & Purpose</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Budget Range (per person) *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="number"
                            value={formData.budgetMin}
                            onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                            placeholder="Min"
                            className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="number"
                            value={formData.budgetMax}
                            onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                            placeholder="Max"
                            className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Tour Purpose *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {purposes.map((purpose) => (
                        <button
                          key={purpose.id}
                          onClick={() => setFormData({ ...formData, purpose: purpose.id })}
                          className={`p-4 rounded-xl border-2 transition ${
                            formData.purpose === purpose.id
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="w-full flex justify-center mb-2">
                          <purpose.icon className="w-8 h-8 text-blue-600" />
                        </div>
                          <div className="text-center text-sm font-semibold">{purpose.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                disabled={!formData.budgetMin || !formData.budgetMax || !formData.purpose}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* Step 3: Requirements & Submit */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Special Requirements</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tell us more about your needs
                    </label>
                    <textarea
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="E.g., dietary restrictions, accessibility needs, specific interests, must-see locations..."
                      rows={5}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload Reference Images (Optional)
                    </label>
                    <button className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-600 hover:bg-blue-50 transition text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-700">
                        Click to upload images
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Share photos of places you'd like to visit
                      </p>
                    </button>
                  </div>
                </div>
              </div>

              {/* Coordination Notice */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  Tour Coordination
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Tourista AR will coordinate with verified partners or assign a certified Tourista guide in your requested area.
                </p>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg"
              >
                Submit Request
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-green-600" />
                </motion.div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Request Submitted!
                </h2>
                
                <p className="text-gray-600 mb-6">
                  Your tour request has been submitted successfully. Our team will confirm availability shortly.
                </p>

                <div className="bg-blue-50 rounded-xl p-4 text-sm text-gray-700">
                  <p className="font-semibold mb-1">What happens next?</p>
                  <ul className="text-left space-y-1 text-xs">
                    <li>• We'll review your request within 24 hours</li>
                    <li>• You'll receive custom tour proposals</li>
                    <li>• Track progress in your Bookings section</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
