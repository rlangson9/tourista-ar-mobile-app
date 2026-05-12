import { useState } from 'react';
import { X, CheckCircle, AlertCircle, DollarSign, Calendar, MapPin, Package, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RejectReasonModal } from './RejectReasonModal';

interface Quotation {
  id: string;
  supplier: string;
  supplierRating: number;
  price: number;
  deliveryTime: string;
  paymentTerms: string;
  status: 'accepted' | 'rejected' | 'pending';
  quoteDate: string;
}

interface QuotationsModalProps {
  rfqId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function QuotationsModal({ rfqId, isOpen, onClose }: QuotationsModalProps) {
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);
  const [expandedQuoteId, setExpandedQuoteId] = useState<string | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [quotationToReject, setQuotationToReject] = useState<Quotation | null>(null);
  const [quotations, setQuotations] = useState<Quotation[]>([
    {
      id: 'Q-001',
      supplier: 'Guangzhou Precision Manufacturing',
      supplierRating: 4.7,
      price: 220000,
      deliveryTime: '45 days',
      paymentTerms: '30% deposit, 70% before shipping',
      status: 'pending',
      quoteDate: '2026-02-10',
    },
    {
      id: 'Q-002',
      supplier: 'Shanghai Industrial Equipment',
      supplierRating: 4.9,
      price: 245000,
      deliveryTime: '30 days',
      paymentTerms: '20% deposit, 80% before shipping',
      status: 'pending',
      quoteDate: '2026-02-12',
    },
    {
      id: 'Q-003',
      supplier: 'Beijing Machinery Co.',
      supplierRating: 4.5,
      price: 210000,
      deliveryTime: '60 days',
      paymentTerms: '50% deposit, 50% before shipping',
      status: 'pending',
      quoteDate: '2026-02-15',
    },
  ]);

  const handleAcceptQuotation = (quotation: Quotation) => {
    console.log(`Accepting quotation ${quotation.id} from ${quotation.supplier}`);
    // Update the quotation status using functional update to ensure latest state
    setQuotations(prevQuotations => prevQuotations.map(q => 
      q.id === quotation.id ? { ...q, status: 'accepted' } : 
      // Also reject other quotations when one is accepted
      q.status === 'pending' ? { ...q, status: 'rejected' } : q
    ));
  };

  const handleRejectQuotation = (quotation: Quotation) => {
    setQuotationToReject(quotation);
    setIsRejectModalOpen(true);
  };

  const handleRejectWithReason = (reason: string, counterOffer: number) => {
    if (quotationToReject) {
      console.log(`Rejecting quotation ${quotationToReject.id} from ${quotationToReject.supplier}`);
      console.log(`Reason: ${reason}`);
      if (counterOffer > 0) {
        console.log(`Counter offer: $${counterOffer}`);
      }
      // Update the quotation status using functional update to ensure latest state
      setQuotations(prevQuotations => prevQuotations.map(q => 
        q.id === quotationToReject.id ? { ...q, status: 'rejected' } : q
      ));
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
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Quotations</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quotations List */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">RFQ ID: {rfqId}</h4>
                <span className="text-sm text-gray-500">3 Quotes</span>
              </div>

              <div className="space-y-4">
                {quotations.map((quote) => (
                  <motion.div
                    key={quote.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: quotations.indexOf(quote) * 0.05 }}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="font-semibold text-gray-900">{quote.supplier}</h5>
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <span className="font-medium">{quote.supplierRating}</span>
                          <span>★</span>
                          <span>({Math.floor(Math.random() * 100) + 50} reviews)</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${quote.status === 'accepted' ? 'bg-green-100 text-green-700' : quote.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                        {quote.status === 'accepted' ? 'Accepted' : quote.status === 'rejected' ? 'Rejected' : 'Pending'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Price</p>
                        <p className="font-bold text-gray-900">${quote.price.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Delivery Time</p>
                        <p className="font-semibold text-gray-900">{quote.deliveryTime}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Payment Terms</p>
                        <p className="font-semibold text-gray-900 text-sm">{quote.paymentTerms}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Quote Date</p>
                        <p className="font-semibold text-gray-900">{quote.quoteDate}</p>
                      </div>
                    </div>

                    {/* More Details Button */}
                    <button
                      onClick={() => setExpandedQuoteId(expandedQuoteId === quote.id ? null : quote.id)}
                      className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-semibold hover:bg-blue-100 transition flex items-center justify-center gap-1 mb-4"
                    >
                      More
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedQuoteId === quote.id ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Additional Details */}
                    {expandedQuoteId === quote.id && (
                      <div className="border-t border-gray-200 pt-4 mb-4 space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Warranty</p>
                          <p className="font-semibold text-gray-900">12 months parts and labor</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Product Details</p>
                          <p className="font-semibold text-gray-900 text-sm">Industrial CNC Milling Machine, Model: GPM-800</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Price Per Unit</p>
                          <p className="font-semibold text-gray-900">$22,000 per unit</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Minimum Order Quantity</p>
                          <p className="font-semibold text-gray-900">10 units</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Included Accessories</p>
                          <p className="font-semibold text-gray-900 text-sm">Tooling set, operation manual, maintenance kit</p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAcceptQuotation(quote)}
                        disabled={quote.status !== 'pending'}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1 ${
                          quote.status === 'pending' 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectQuotation(quote)}
                        disabled={quote.status !== 'pending'}
                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-1 ${
                          quote.status === 'pending' 
                            ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' 
                            : 'border border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <AlertCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={onClose}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>

          {/* Reject Reason Modal */}
          <RejectReasonModal
            quotationId={quotationToReject?.id || ''}
            supplier={quotationToReject?.supplier || ''}
            isOpen={isRejectModalOpen}
            onClose={() => setIsRejectModalOpen(false)}
            onReject={handleRejectWithReason}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
