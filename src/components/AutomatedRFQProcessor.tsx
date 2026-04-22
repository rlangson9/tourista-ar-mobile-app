import { useState, useEffect } from 'react';
import { Brain, CheckCircle, Clock, AlertCircle, FileText, Send, Filter, Database, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RFQ {
  id: string;
  productDescription: string;
  category: string;
  quantity: string;
  budgetMin: string;
  budgetMax: string;
  destination: string;
  deliveryTimeline: string;
  status: 'pending' | 'processing' | 'classified' | 'routed' | 'responded' | 'completed';
  classification?: string;
  priority?: 'low' | 'medium' | 'high';
  assignedTo?: string;
  estimatedResponseTime?: string;
  createdAt: Date;
  processedAt?: Date;
}

interface AutomatedRFQProcessorProps {
  onNavigate: (screen: string) => void;
}

export function AutomatedRFQProcessor({ onNavigate }: AutomatedRFQProcessorProps) {
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedCount, setProcessedCount] = useState(0);

  // Mock RFQ data
  useEffect(() => {
    // Simulate loading RFQs from API
    setTimeout(() => {
      setRfqs([
        {
          id: 'RFQ-20240001',
          productDescription: 'Looking for high-precision CNC milling machines for industrial metal processing. Need machines with at least 5-axis capability and precision of 0.001mm.',
          category: 'machinery',
          quantity: '5 units',
          budgetMin: '100000',
          budgetMax: '150000',
          destination: 'South Africa',
          deliveryTimeline: 'standard',
          status: 'pending',
          createdAt: new Date('2024-01-15T10:00:00')
        },
        {
          id: 'RFQ-20240002',
          productDescription: 'Require solar panels for a commercial installation. Need 500 units of 350W panels with at least 25-year warranty.',
          category: 'electronics',
          quantity: '500 units',
          budgetMin: '200000',
          budgetMax: '250000',
          destination: 'Kenya',
          deliveryTimeline: 'urgent',
          status: 'pending',
          createdAt: new Date('2024-01-16T09:30:00')
        },
        {
          id: 'RFQ-20240003',
          productDescription: 'Looking for construction materials including cement, steel bars, and bricks for a medium-sized housing project.',
          category: 'construction',
          quantity: 'Various',
          budgetMin: '500000',
          budgetMax: '750000',
          destination: 'Nigeria',
          deliveryTimeline: 'flexible',
          status: 'pending',
          createdAt: new Date('2024-01-16T14:20:00')
        }
      ]);
    }, 1000);
  }, []);

  const processRFQs = () => {
    setIsProcessing(true);
    setProcessedCount(0);

    // Simulate processing each RFQ
    rfqs.forEach((rfq, index) => {
      setTimeout(() => {
        setRfqs(prevRfqs => {
          const updatedRfqs = [...prevRfqs];
          const updatedRfq = { ...rfq };
          
          // Simulate classification
          updatedRfq.status = 'processing';
          
          // Simulate classification based on content
          if (rfq.deliveryTimeline === 'urgent') {
            updatedRfq.priority = 'high';
            updatedRfq.classification = 'Urgent';
          } else if (parseInt(rfq.budgetMax) > 500000) {
            updatedRfq.priority = 'high';
            updatedRfq.classification = 'High Value';
          } else if (rfq.category === 'machinery') {
            updatedRfq.priority = 'medium';
            updatedRfq.classification = 'Machinery';
          } else {
            updatedRfq.priority = 'low';
            updatedRfq.classification = 'Standard';
          }
          
          // Simulate routing
          if (updatedRfq.classification === 'Urgent' || updatedRfq.classification === 'High Value') {
            updatedRfq.assignedTo = 'John Doe (Senior Manager)';
          } else if (updatedRfq.classification === 'Machinery') {
            updatedRfq.assignedTo = 'Jane Smith (Technical Specialist)';
          } else {
            updatedRfq.assignedTo = 'Mike Johnson (Account Manager)';
          }
          
          // Estimate response time
          if (updatedRfq.priority === 'high') {
            updatedRfq.estimatedResponseTime = 'Within 4 hours';
          } else if (updatedRfq.priority === 'medium') {
            updatedRfq.estimatedResponseTime = 'Within 12 hours';
          } else {
            updatedRfq.estimatedResponseTime = 'Within 24 hours';
          }
          
          updatedRfq.status = 'routed';
          updatedRfq.processedAt = new Date();
          
          updatedRfqs[index] = updatedRfq;
          return updatedRfqs;
        });
        
        setProcessedCount(prev => prev + 1);
        
        if (index === rfqs.length - 1) {
          setTimeout(() => {
            setIsProcessing(false);
          }, 500);
        }
      }, index * 1500);
    });
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-gray-600 bg-gray-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'classified': return 'text-purple-600 bg-purple-50';
      case 'routed': return 'text-green-600 bg-green-50';
      case 'responded': return 'text-cyan-600 bg-cyan-50';
      case 'completed': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-6xl mx-auto min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Automated RFQ Processor</h1>
              <p className="text-sm text-gray-500">Intelligent processing and routing of sourcing requests</p>
            </div>
            <button
              onClick={processRFQs}
              disabled={isProcessing || rfqs.length === 0}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Brain className="w-5 h-5" />
              {isProcessing ? 'Processing...' : 'Process RFQs'}
            </button>
          </div>
          
          {/* Processing Status */}
          {isProcessing && (
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">
                    Processing RFQs: {processedCount}/{rfqs.length}
                  </span>
                </div>
                <div className="w-3/4 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${(processedCount / rfqs.length) * 100}%` }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-blue-600"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RFQ List */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">RFQ Processing Queue</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 bg-gray-50">
                  <th className="p-4">RFQ ID</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Budget</th>
                  <th className="p-4">Timeline</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Classification</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Assigned To</th>
                  <th className="p-4">Est. Response</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rfqs.map((rfq) => (
                  <tr key={rfq.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{rfq.id}</td>
                    <td className="p-4">
                      <p className="font-semibold truncate max-w-[200px]">{rfq.productDescription}</p>
                    </td>
                    <td className="p-4">{rfq.category}</td>
                    <td className="p-4">${rfq.budgetMin}-${rfq.budgetMax}</td>
                    <td className="p-4">{rfq.deliveryTimeline}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rfq.status)}`}>
                        {rfq.status}
                      </span>
                    </td>
                    <td className="p-4">{rfq.classification || '-'}</td>
                    <td className="p-4">
                      {rfq.priority && (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(rfq.priority)}`}>
                          {rfq.priority}
                        </span>
                      )}
                    </td>
                    <td className="p-4">{rfq.assignedTo || '-'}</td>
                    <td className="p-4">{rfq.estimatedResponseTime || '-'}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          View
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm flex items-center gap-1">
                          <Send className="w-4 h-4" />
                          Respond
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Processing Analytics</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Total RFQs</p>
              <p className="text-2xl font-bold">{rfqs.length}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Processed</p>
              <p className="text-2xl font-bold text-blue-600">{rfqs.filter(r => r.status !== 'pending').length}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Routed</p>
              <p className="text-2xl font-bold text-green-600">{rfqs.filter(r => r.status === 'routed').length}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-2xl font-bold text-amber-600">{rfqs.filter(r => r.status === 'pending').length}</p>
            </div>
          </div>
        </div>

        {/* Automation Settings */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">Automation Settings</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Filter className="w-5 h-5 text-blue-600" />
                Classification Rules
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Urgent Requests</span>
                  <span className="text-xs text-gray-500">Delivery timeline &lt; 30 days</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">High Value</span>
                  <span className="text-xs text-gray-500">Budget &gt; $500,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Technical</span>
                  <span className="text-xs text-gray-500">Category = machinery</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                Routing Rules
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Urgent/High Value</span>
                  <span className="text-xs text-gray-500">Senior Manager</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Technical</span>
                  <span className="text-xs text-gray-500">Technical Specialist</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Standard</span>
                  <span className="text-xs text-gray-500">Account Manager</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
