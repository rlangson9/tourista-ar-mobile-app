import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen } from '../App';
import { ImageUpload } from './ImageUpload';

interface SourcingRequestFlowProps {
  onNavigate: (screen: Screen) => void;
}

export function SourcingRequestFlow({ onNavigate }: SourcingRequestFlowProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    productDescription: '',
    quantity: '',
    budget: '',
    targetBudgetMin: '',
    targetBudgetMax: '',
    destination: '',
    deliveryTimeline: '',
    category: '',
    agreeToTerms: false,
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setStep(4); // Confirmation
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => step === 1 ? onNavigate('home') : setStep(step - 1)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Post Sourcing Request</h1>
              <p className="text-sm text-gray-500">Get quotes from verified suppliers</p>
            </div>
          </div>
          
          {/* Progress Steps */}
          {step < 4 && (
            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-1 rounded-full transition ${
                    s <= step ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <AnimatePresence mode="wait">
          {/* Step 1: Product Details */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Product Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Description *
                    </label>
                    <textarea
                      value={formData.productDescription}
                      onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
                      placeholder="Describe the product you're looking for..."
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[120px]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">Select category</option>
                      <option value="electronics">Electronics</option>
                      <option value="machinery">Machinery</option>
                      <option value="construction">Construction Materials</option>
                      <option value="textiles">Textiles</option>
                      <option value="agriculture">Agriculture</option>
                      <option value="automotive">Automotive</option>
                      <option value="technology">New Technologies</option>
                      <option value="others">Others</option>
                    </select>
                  </div>

                  <ImageUpload
                    images={uploadedImages}
                    onImagesChange={setUploadedImages}
                    label="Upload Reference Images (Optional)"
                    aspectRatio="4:5 (Product)"
                    maxImages={5}
                    hint="PNG, JPG up to 10MB"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Quantity & Budget */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Quantity & Budget</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quantity Needed *
                    </label>
                    <input
                      type="text"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="e.g., 100 units, 50 tons"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Target Budget (USD) *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        value={formData.targetBudgetMin}
                        onChange={(e) => setFormData({ ...formData, targetBudgetMin: e.target.value })}
                        placeholder="Min"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <input
                        type="number"
                        value={formData.targetBudgetMax}
                        onChange={(e) => setFormData({ ...formData, targetBudgetMax: e.target.value })}
                        placeholder="Max"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-blue-900">
                      <strong>Tip:</strong> Providing a budget range helps suppliers prepare more accurate quotes for you.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Delivery Details */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Destination Country *
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">Select destination</option>
                      <option value="south-africa">South Africa</option>
                      <option value="nigeria">Nigeria</option>
                      <option value="kenya">Kenya</option>
                      <option value="ethiopia">Ethiopia</option>
                      <option value="tanzania">Tanzania</option>
                      <option value="ghana">Ghana</option>
                      <option value="zimbabwe">Zimbabwe</option>
                      <option value="other">Other African Country</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Delivery Timeline *
                    </label>
                    <select
                      value={formData.deliveryTimeline}
                      onChange={(e) => setFormData({ ...formData, deliveryTimeline: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">Select timeline</option>
                      <option value="urgent">Urgent (Within 30 days)</option>
                      <option value="standard">Standard (30-60 days)</option>
                      <option value="flexible">Flexible (60+ days)</option>
                    </select>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-4">
                    <p className="text-sm text-amber-900">
                      <strong>Note:</strong> Shorter delivery timelines may result in higher shipping costs. We recommend choosing standard or flexible options when possible.
                    </p>
                  </div>

                  {/* Commission Disclosure */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-5">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-blue-600">ℹ️</span>
                      Service Fee
                    </h3>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                      Tourista AR charges <strong className="text-blue-600">10% of total consignment value</strong> for sourcing and coordination services.
                    </p>
                    <p className="text-xs text-gray-600">
                      This includes supplier verification, quality control, logistics coordination, and dispute resolution.
                    </p>
                  </div>

                  {/* Agreement Checkbox */}
                  <label className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms || false}
                      onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                      className="mt-1 w-5 h-5 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        I agree to the terms and commission structure
                      </p>
                      <p className="text-xs text-gray-600">
                        By submitting, I acknowledge and accept the 10% service fee
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-10 h-10 text-green-600" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
                <p className="text-gray-600 mb-6">
                  Your sourcing request has been sent to verified suppliers. You'll start receiving quotations within 24-48 hours.
                </p>
                
                <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
                  <h3 className="font-bold mb-3">What's Next?</h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>1. Verified suppliers will review your request</p>
                    <p>2. You'll receive detailed quotations</p>
                    <p>3. Compare quotes and negotiate terms</p>
                    <p>4. Place your order with confidence</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => onNavigate('bookings')}
                    className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                  >
                    View My RFQs
                  </button>
                  <button
                    onClick={() => onNavigate('home')}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed Bottom Button */}
      {step < 4 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg max-w-md mx-auto">
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && (!formData.productDescription || !formData.category)) ||
              (step === 2 && (!formData.quantity || !formData.targetBudgetMin || !formData.targetBudgetMax)) ||
              (step === 3 && (!formData.destination || !formData.deliveryTimeline || !formData.agreeToTerms))
            }
            className="w-full bg-blue-600 text-white py-4 rounded-full font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 3 ? 'Submit Request' : 'Continue'}
          </button>
        </div>
      )}
    </div>
  );
}