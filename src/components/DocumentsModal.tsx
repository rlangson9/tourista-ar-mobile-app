import { useState } from 'react';
import { X, FileText, Download, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RequestDocumentModal } from './RequestDocumentModal';
import { Modal } from './ui/modal';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  status: 'completed' | 'pending' | 'expired';
  url: string;
}

interface DocumentsModalProps {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentsModal({ orderId, isOpen, onClose }: DocumentsModalProps) {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false);

  const handleRequestDocument = () => {
    setIsRequestModalOpen(true);
  };

  const handleRequestSubmitted = () => {
    // Here you could refresh the documents list or show a success message
    console.log('Document request submitted successfully');
  };

  // Mock documents data
  const documents: Document[] = [
    {
      id: 'doc1',
      name: 'Purchase Order',
      type: 'PDF',
      size: '2.4 MB',
      date: '2026-01-15',
      status: 'completed',
      url: '#',
    },
    {
      id: 'doc2',
      name: 'Commercial Invoice',
      type: 'PDF',
      size: '1.8 MB',
      date: '2026-01-16',
      status: 'completed',
      url: '#',
    },
    {
      id: 'doc3',
      name: 'Packing List',
      type: 'PDF',
      size: '1.2 MB',
      date: '2026-01-20',
      status: 'completed',
      url: '#',
    },
    {
      id: 'doc4',
      name: 'Bill of Lading',
      type: 'PDF',
      size: '3.1 MB',
      date: '2026-02-01',
      status: 'completed',
      url: '#',
    },
    {
      id: 'doc5',
      name: 'Certificate of Origin',
      type: 'PDF',
      size: '950 KB',
      date: '2026-02-05',
      status: 'pending',
      url: '#',
    },
  ];

  const handleDownload = (document: Document) => {
    // Simulate download
    console.log(`Downloading ${document.name}...`);
    // In a real app, you would trigger the actual download here
  };

  const handleDocumentClick = (document: Document) => {
    // Open document preview
    console.log(`Opening preview for ${document.name}...`);
    // In a real app, you would open a preview modal or navigate to a preview page
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Order Documents"
      size="md"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Order ID: {orderId}</h4>
          <span className="text-sm text-gray-500">5 Documents</span>
        </div>

        <div className="space-y-3">
          {documents.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: documents.indexOf(doc) * 0.05 }}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
              onClick={() => handleDocumentClick(doc)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-gray-900 truncate">{doc.name}</h5>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span>{doc.type}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{doc.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  doc.status === 'completed' 
                    ? 'bg-green-100 text-green-700' 
                    : doc.status === 'pending' 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {doc.status === 'completed' ? 'Completed' : doc.status === 'pending' ? 'Pending' : 'Expired'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(doc);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                  title="Download"
                >
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Document Status Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Document Status</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>4 documents completed</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>1 document pending</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition"
          >
            Close
          </button>
          <button
            onClick={handleRequestDocument}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-1"
          >
            <FileText className="w-4 h-4" />
            Request Document
          </button>
        </div>

        {/* Request Document Modal */}
        <RequestDocumentModal
          orderId={orderId}
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
          onRequestSubmitted={handleRequestSubmitted}
        />
      </div>
    </Modal>
  );
}
