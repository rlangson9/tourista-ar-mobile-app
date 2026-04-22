import { useState } from 'react';
import { X, FileText, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Modal } from './ui/modal';

interface RequestDocumentModalProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
  onRequestSubmitted: () => void;
}

export function RequestDocumentModal({ orderId, isOpen, onClose, onRequestSubmitted }: RequestDocumentModalProps) {
  const [selectedDocument, setSelectedDocument] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const documentTypes = [
    { value: 'commercial-invoice', label: 'Commercial Invoice' },
    { value: 'packing-list', label: 'Packing List' },
    { value: 'bill-of-lading', label: 'Bill of Lading' },
    { value: 'certificate-of-origin', label: 'Certificate of Origin' },
    { value: 'insurance-certificate', label: 'Insurance Certificate' },
    { value: 'customs-declaration', label: 'Customs Declaration' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDocument) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      // Close modal after success
      setTimeout(() => {
        setShowSuccess(false);
        onRequestSubmitted();
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Document"
      size="md"
    >
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Document Type *
            </label>
            <select
              value={selectedDocument}
              onChange={(e) => setSelectedDocument(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select a document type</option>
              {documentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Details (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Please provide any additional information or specific requirements for this document..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedDocument || isSubmitting}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-1"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Request Document</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">Request Submitted</h3>
              <p className="text-gray-600 text-center mb-6">
                Your document request has been submitted successfully.
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </Modal>
  );
}
