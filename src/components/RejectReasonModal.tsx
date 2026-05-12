import { useState } from 'react';
import { X, AlertCircle, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RejectReasonModalProps {
  quotationId: string;
  supplier: string;
  isOpen: boolean;
  onClose: () => void;
  onReject: (reason: string, counterOffer: number) => void;
}

export function RejectReasonModal({ quotationId, supplier, isOpen, onClose, onReject }: RejectReasonModalProps) {
  const [reason, setReason] = useState('');
  const [counterOffer, setCounterOffer] = useState('');

  const handleSubmit = () => {
    if (reason.trim()) {
      onReject(reason, parseFloat(counterOffer) || 0);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Reject Quotation</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Supplier: {supplier}</h4>
                <p className="text-sm text-gray-600 mb-4">Please provide a reason for rejecting this quotation. You can also make a counter offer.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Rejection</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter your reason here..."
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  rows={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Counter Offer (USD)</label>
                <input
                  type="number"
                  value={counterOffer}
                  onChange={(e) => setCounterOffer(e.target.value)}
                  placeholder="Enter your counter offer"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!reason.trim()}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1 ${
                    reason.trim() 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Save className="w-4 h-4" />
                  Submit
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
