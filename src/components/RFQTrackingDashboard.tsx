import { useState, useEffect } from 'react';
import { BarChart2, PieChart, Clock, CheckCircle, AlertCircle, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface RFQ {
  id: string;
  status: 'pending' | 'processing' | 'classified' | 'routed' | 'responded' | 'completed';
  responseTime: number; // in hours
  satisfactionScore?: number; // 1-5
  createdAt: Date;
  respondedAt?: Date;
  completedAt?: Date;
}

interface RFQTrackingDashboardProps {
  onNavigate: (screen: string) => void;
}

export function RFQTrackingDashboard({ onNavigate }: RFQTrackingDashboardProps) {
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [timeRange, setTimeRange] = useState('week'); // week, month, quarter

  // Mock data generation
  useEffect(() => {
    const generateMockData = () => {
      const mockRfqs: RFQ[] = [];
      const now = new Date();
      
      // Generate data for the last 30 days
      for (let i = 0; i < 30; i++) {
        const createdAt = new Date(now);
        createdAt.setDate(now.getDate() - i);
        
        // Random status
        const statuses: RFQ['status'][] = ['pending', 'processing', 'classified', 'routed', 'responded', 'completed'];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Calculate response time if responded or completed
        let responseTime = 0;
        let respondedAt: Date | undefined;
        let completedAt: Date | undefined;
        let satisfactionScore: number | undefined;
        
        if (status === 'responded' || status === 'completed') {
          responseTime = Math.floor(Math.random() * 48) + 1; // 1-48 hours
          respondedAt = new Date(createdAt);
          respondedAt.setHours(createdAt.getHours() + responseTime);
          
          if (status === 'completed') {
            completedAt = new Date(respondedAt);
            completedAt.setHours(respondedAt.getHours() + Math.floor(Math.random() * 72) + 24); // 24-96 hours after response
            satisfactionScore = Math.floor(Math.random() * 5) + 1; // 1-5
          }
        }
        
        mockRfqs.push({
          id: `RFQ-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate() - i).padStart(2, '0')}${String(i).padStart(2, '0')}`,
          status,
          responseTime,
          satisfactionScore,
          createdAt,
          respondedAt,
          completedAt
        });
      }
      
      setRfqs(mockRfqs);
    };
    
    generateMockData();
  }, []);

  // Filter RFQs based on time range
  const filteredRfqs = rfqs.filter(rfq => {
    const now = new Date();
    const rfqDate = new Date(rfq.createdAt);
    
    if (timeRange === 'week') {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);
      return rfqDate >= oneWeekAgo;
    } else if (timeRange === 'month') {
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setMonth(now.getMonth() - 1);
      return rfqDate >= oneMonthAgo;
    } else if (timeRange === 'quarter') {
      const threeMonthsAgo = new Date(now);
      threeMonthsAgo.setMonth(now.getMonth() - 3);
      return rfqDate >= threeMonthsAgo;
    }
    
    return true;
  });

  // Calculate metrics
  const totalRFQs = filteredRfqs.length;
  const completedRFQs = filteredRfqs.filter(rfq => rfq.status === 'completed').length;
  const completionRate = totalRFQs > 0 ? (completedRFQs / totalRFQs) * 100 : 0;
  
  const respondedRFQs = filteredRfqs.filter(rfq => rfq.status === 'responded' || rfq.status === 'completed');
  const avgResponseTime = respondedRFQs.length > 0 
    ? respondedRFQs.reduce((sum, rfq) => sum + rfq.responseTime, 0) / respondedRFQs.length 
    : 0;
  
  const ratedRFQs = filteredRfqs.filter(rfq => rfq.satisfactionScore !== undefined);
  const avgSatisfaction = ratedRFQs.length > 0 
    ? ratedRFQs.reduce((sum, rfq) => sum + (rfq.satisfactionScore || 0), 0) / ratedRFQs.length 
    : 0;

  // Status distribution
  const statusCounts = filteredRfqs.reduce((counts, rfq) => {
    counts[rfq.status] = (counts[rfq.status] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  // Response time distribution
  const responseTimeDistribution = {
    '0-4h': 0,
    '4-12h': 0,
    '12-24h': 0,
    '24+h': 0
  };
  
  respondedRFQs.forEach(rfq => {
    if (rfq.responseTime <= 4) {
      responseTimeDistribution['0-4h']++;
    } else if (rfq.responseTime <= 12) {
      responseTimeDistribution['4-12h']++;
    } else if (rfq.responseTime <= 24) {
      responseTimeDistribution['12-24h']++;
    } else {
      responseTimeDistribution['24+h']++;
    }
  });

  return (
    <div className="max-w-6xl mx-auto min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">RFQ Tracking Dashboard</h1>
              <p className="text-sm text-gray-500">Monitor request status, response times, and satisfaction metrics</p>
            </div>
            <div className="flex gap-2">
              {['week', 'month', 'quarter'].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${timeRange === range ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Total RFQs</h3>
            <BarChart2 className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold mb-2 text-center">{totalRFQs}</p>
          <p className="text-sm text-gray-500 text-center">Received in selected period</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Completion Rate</h3>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold mb-2 text-center">{completionRate.toFixed(1)}%</p>
          <p className="text-sm text-gray-500 text-center">Of total RFQs</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Avg Response Time</h3>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold mb-2 text-center">{avgResponseTime.toFixed(1)}h</p>
          <p className="text-sm text-gray-500 text-center">From submission to response</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm">Avg Satisfaction</h3>
            <Users className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold mb-2 text-center">{avgSatisfaction.toFixed(1)}/5</p>
          <p className="text-sm text-gray-500 text-center">Based on completed RFQs</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Status Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-600" />
            Status Distribution
          </h2>
          <div className="space-y-4">
            {Object.entries(statusCounts).map(([status, count]) => {
              const percentage = (count / totalRFQs) * 100;
              const getStatusColor = (status: string) => {
                switch (status) {
                  case 'pending': return 'bg-gray-200';
                  case 'processing': return 'bg-blue-200';
                  case 'classified': return 'bg-purple-200';
                  case 'routed': return 'bg-green-200';
                  case 'responded': return 'bg-cyan-200';
                  case 'completed': return 'bg-green-200';
                  default: return 'bg-gray-200';
                }
              };
              
              return (
                <div key={status}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium capitalize">{status}</span>
                    <span className="text-sm font-semibold">{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStatusColor(status)} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Response Time Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-sm p-6"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Response Time Distribution
          </h2>
          <div className="space-y-4">
            {Object.entries(responseTimeDistribution).map(([range, count]) => {
              const percentage = respondedRFQs.length > 0 ? (count / respondedRFQs.length) * 100 : 0;
              
              return (
                <div key={range}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{range}</span>
                    <span className="text-sm font-semibold">{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Recent RFQs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-2xl shadow-sm p-6"
      >
        <h2 className="text-xl font-bold mb-4">Recent RFQs</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 bg-gray-50">
                <th className="p-4">RFQ ID</th>
                <th className="p-4">Status</th>
                <th className="p-4">Submitted</th>
                <th className="p-4">Response Time</th>
                <th className="p-4">Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {filteredRfqs.slice(0, 10).map((rfq) => (
                <tr key={rfq.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-mono text-sm">{rfq.id}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rfq.status)}`}>
                      {rfq.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm">{new Date(rfq.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-sm">{rfq.responseTime > 0 ? `${rfq.responseTime}h` : '-'}</td>
                  <td className="p-4">
                    {rfq.satisfactionScore ? (
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs ${i < rfq.satisfactionScore ? 'text-amber-500' : 'text-gray-300'}`}>
                            ★
                          </span>
                        ))}
                      </div>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

// Helper function to get status color
function getStatusColor(status: string) {
  switch (status) {
    case 'pending': return 'text-gray-600 bg-gray-50';
    case 'processing': return 'text-blue-600 bg-blue-50';
    case 'classified': return 'text-purple-600 bg-purple-50';
    case 'routed': return 'text-green-600 bg-green-50';
    case 'responded': return 'text-cyan-600 bg-cyan-50';
    case 'completed': return 'text-green-600 bg-green-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}
