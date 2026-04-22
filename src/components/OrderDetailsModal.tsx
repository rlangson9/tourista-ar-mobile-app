import { useState } from 'react';
import { X, Truck, Calendar, MapPin, DollarSign, Package, FileText, CheckCircle, Clock, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from './ui/modal';

interface OrderDetailsModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
  onViewDocuments?: () => void;
}

export function OrderDetailsModal({ order, isOpen, onClose, onViewDocuments }: OrderDetailsModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Order Details"
      size="md"
    >
      <div className="space-y-6">
        {/* Product Info */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Product Information</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Product Name:</span>
              <span className="font-semibold">{order.productName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Supplier:</span>
              <span className="font-semibold">{order.supplier}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Quantity:</span>
              <span className="font-semibold">{order.quantity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-bold text-blue-600">${order.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Order Status</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-mono font-semibold">{order.id}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-semibold">{order.orderDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Status:</span>
              <span className={`font-semibold ${
                order.status === 'shipping' ? 'text-cyan-600' :
                order.status === 'delivered' ? 'text-green-600' :
                order.status === 'production' ? 'text-indigo-600' :
                order.status === 'payment-pending' ? 'text-amber-600' :
                order.status === 'quotation-received' ? 'text-purple-600' :
                'text-gray-600'
              }`}>
                {order.status === 'shipping' ? 'Shipping' :
                 order.status === 'delivered' ? 'Delivered' :
                 order.status === 'production' ? 'In Production' :
                 order.status === 'payment-pending' ? 'Payment Pending' :
                 order.status === 'quotation-received' ? 'Quotation Received' :
                 order.status === 'rfq-sent' ? 'RFQ Sent' :
                 order.status}
              </span>
            </div>
            {order.estimatedDelivery && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-semibold">{order.estimatedDelivery}</span>
              </div>
            )}
          </div>
        </div>

        {/* Shipping Information */}
        {order.status === 'shipping' && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Shipping Information</h4>
            <div className="space-y-2">
              {order.trackingNumber && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tracking Number:</span>
                  <span className="font-mono font-semibold">{order.trackingNumber}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Current Status:</span>
                <span className="font-semibold text-cyan-600">In Transit</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span className="font-semibold">Shanghai, China → New York, USA</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>Departed Warehouse</span>
                <span>In Transit</span>
                <span>Delivered</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1 }}
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-600"
                />
              </div>
            </div>
          </div>
        )}

        {/* Additional Details */}
        <div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-between w-full text-sm font-semibold text-blue-600 hover:underline"
          >
            <span>Additional Details</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
          {isExpanded && (
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-semibold">Bank Transfer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status:</span>
                <span className="font-semibold text-green-600">Paid</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Method:</span>
                <span className="font-semibold">Sea Freight</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping Cost:</span>
                <span className="font-semibold">$2,500</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              // Open documents modal for this order
              console.log('Opening documents for order:', order.id);
              if (onViewDocuments) {
                onViewDocuments();
              }
            }}
            className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-1"
          >
            <FileText className="w-4 h-4" />
            View Documents
          </button>
        </div>
      </div>
    </Modal>
  );
}
