import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  CreditCard, 
  Smartphone, 
  Building2, 
  ArrowRight, 
  Check, 
  X, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Calendar,
  FileText
} from 'lucide-react';

interface WithdrawalMethod {
  id: string;
  type: 'bank' | 'alipay' | 'wechat' | 'paypal';
  name: string;
  details: string;
  icon: React.ElementType;
  currency: string;
  processingTime: string;
  fee: number;
  minAmount: number;
  maxAmount: number;
}

interface WithdrawalRequest {
  id: string;
  amount: number;
  method: WithdrawalMethod;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  processedAt?: string;
  transactionId?: string;
  fee: number;
  netAmount: number;
}

interface WithdrawalManagerProps {
  availableBalance: number;
  pendingBalance: number;
  userType: 'partner' | 'supplier';
  onWithdrawalRequest?: (request: WithdrawalRequest) => void;
}

export function WithdrawalManager({ 
  availableBalance, 
  pendingBalance, 
  userType,
  onWithdrawalRequest 
}: WithdrawalManagerProps) {
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<WithdrawalMethod | null>(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalHistory, setWithdrawalHistory] = useState<WithdrawalRequest[]>([
    {
      id: 'WD001',
      amount: 2500,
      method: {
        id: 'bank1',
        type: 'bank',
        name: 'Bank of China',
        details: '****1234',
        icon: Building2,
        currency: 'USD',
        processingTime: '2-3 business days',
        fee: 25,
        minAmount: 100,
        maxAmount: 50000
      },
      status: 'completed',
      createdAt: '2024-02-28',
      processedAt: '2024-03-02',
      transactionId: 'TXN20240302001',
      fee: 25,
      netAmount: 2475
    },
    {
      id: 'WD002',
      amount: 1200,
      method: {
        id: 'alipay1',
        type: 'alipay',
        name: 'Alipay',
        details: '138****5678',
        icon: Smartphone,
        currency: 'CNY',
        processingTime: '1-2 business days',
        fee: 12,
        minAmount: 50,
        maxAmount: 20000
      },
      status: 'processing',
      createdAt: '2024-03-01',
      fee: 12,
      netAmount: 1188
    }
  ]);

  const withdrawalMethods: WithdrawalMethod[] = [
    {
      id: 'bank1',
      type: 'bank',
      name: 'Bank of China',
      details: '****1234',
      icon: Building2,
      currency: 'USD',
      processingTime: '2-3 business days',
      fee: 25,
      minAmount: 100,
      maxAmount: 50000
    },
    {
      id: 'alipay1',
      type: 'alipay',
      name: 'Alipay',
      details: '138****5678',
      icon: Smartphone,
      currency: 'CNY',
      processingTime: '1-2 business days',
      fee: 12,
      minAmount: 50,
      maxAmount: 20000
    },
    {
      id: 'wechat1',
      type: 'wechat',
      name: 'WeChat Pay',
      details: 'wx****8888',
      icon: Smartphone,
      currency: 'CNY',
      processingTime: '1-2 business days',
      fee: 10,
      minAmount: 50,
      maxAmount: 15000
    },
    {
      id: 'paypal1',
      type: 'paypal',
      name: 'PayPal',
      details: 'paypal@example.com',
      icon: CreditCard,
      currency: 'USD',
      processingTime: '3-5 business days',
      fee: 30,
      minAmount: 100,
      maxAmount: 25000
    }
  ];

  const handleWithdrawalRequest = () => {
    if (!selectedMethod || !withdrawalAmount) return;

    const amount = parseFloat(withdrawalAmount);
    const fee = selectedMethod.fee;
    const netAmount = amount - fee;

    const newRequest: WithdrawalRequest = {
      id: `WD${Date.now()}`,
      amount,
      method: selectedMethod,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      fee,
      netAmount
    };

    setWithdrawalHistory(prev => [newRequest, ...prev]);
    setShowWithdrawalModal(false);
    setSelectedMethod(null);
    setWithdrawalAmount('');
    onWithdrawalRequest?.(newRequest);
  };

  const getStatusColor = (status: WithdrawalRequest['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-green-600 bg-green-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: WithdrawalRequest['status']) => {
    switch (status) {
      case 'pending': return Clock;
      case 'processing': return TrendingUp;
      case 'completed': return Check;
      case 'failed': return X;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Available Balance</h3>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-700 mb-2">
            ${availableBalance.toLocaleString()}
          </div>
          <p className="text-sm text-green-600">Ready for withdrawal</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Pending Balance</h3>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-700 mb-2">
            ${pendingBalance.toLocaleString()}
          </div>
          <p className="text-sm text-blue-600">Processing transactions</p>
        </div>
      </div>

      {/* Withdrawal Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowWithdrawalModal(true)}
          disabled={availableBalance < 50}
          className="flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-2xl font-semibold hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <DollarSign className="w-5 h-5" />
          Request Withdrawal
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Withdrawal History */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Withdrawal History</h2>
        
        {withdrawalHistory.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No withdrawal history</p>
            <p className="text-sm">Your withdrawal requests will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {withdrawalHistory.map((request) => {
              const StatusIcon = getStatusIcon(request.status);
              const MethodIcon = request.method.icon;
              
              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <MethodIcon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{request.method.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                            <StatusIcon className="w-3 h-3 inline mr-1" />
                            {request.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{request.method.details}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Requested: {request.createdAt}
                          {request.processedAt && ` • Processed: ${request.processedAt}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        ${request.netAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        Fee: ${request.fee}
                      </div>
                      {request.transactionId && (
                        <div className="text-xs text-blue-600 mt-1">
                          ID: {request.transactionId}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Withdrawal Modal */}
      <AnimatePresence>
        {showWithdrawalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowWithdrawalModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Request Withdrawal</h2>
                  <button
                    onClick={() => setShowWithdrawalModal(false)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Available Balance */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700 font-medium">Available Balance</span>
                    <span className="text-xl font-bold text-blue-900">
                      ${availableBalance.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Withdrawal Methods */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Withdrawal Method</h3>
                  <div className="space-y-3">
                    {withdrawalMethods.map((method) => {
                      const MethodIcon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedMethod(method)}
                          className={`w-full border-2 rounded-xl p-4 text-left transition ${
                            selectedMethod?.id === method.id
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <MethodIcon className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{method.name}</h4>
                                <p className="text-sm text-gray-500">{method.details}</p>
                                <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                                  <span>Fee: ${method.fee}</span>
                                  <span>Min: ${method.minAmount}</span>
                                  <span>{method.processingTime}</span>
                                </div>
                              </div>
                            </div>
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full">
                              {selectedMethod?.id === method.id && (
                                <div className="w-full h-full bg-green-500 rounded-full" />
                              )}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Amount Input */}
                {selectedMethod && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter Amount</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Withdrawal Amount ({selectedMethod.currency})
                        </label>
                        <input
                          type="number"
                          value={withdrawalAmount}
                          onChange={(e) => setWithdrawalAmount(e.target.value)}
                          min={selectedMethod.minAmount}
                          max={Math.min(selectedMethod.maxAmount, availableBalance)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder={`Min: $${selectedMethod.minAmount} - Max: $${Math.min(selectedMethod.maxAmount, availableBalance)}`}
                        />
                      </div>

                      {withdrawalAmount && parseFloat(withdrawalAmount) >= selectedMethod.minAmount && (
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Withdrawal Amount:</span>
                            <span className="font-semibold">${parseFloat(withdrawalAmount).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Processing Fee:</span>
                            <span className="font-semibold">${selectedMethod.fee}</span>
                          </div>
                          <div className="border-t pt-2">
                            <div className="flex justify-between">
                              <span className="font-semibold text-gray-900">You'll Receive:</span>
                              <span className="font-bold text-green-600">
                                ${(parseFloat(withdrawalAmount) - selectedMethod.fee).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowWithdrawalModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleWithdrawalRequest}
                    disabled={!selectedMethod || !withdrawalAmount || parseFloat(withdrawalAmount) < selectedMethod.minAmount}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Request Withdrawal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
