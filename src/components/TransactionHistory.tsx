import { ArrowLeft, FileText, Search, Filter, Calendar, DollarSign, Package, Plane, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface TransactionHistoryProps {
  onBack: () => void;
}

interface Transaction {
  id: string;
  type: 'payment' | 'refund' | 'withdrawal' | 'deposit';
  status: 'completed' | 'pending' | 'failed' | 'cancelled';
  amount: number;
  currency: string;
  description: string;
  category: 'tourism' | 'trade' | 'wallet';
  date: string;
  reference: string;
  method: string;
}

export function TransactionHistory({ onBack }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'payment' | 'refund' | 'withdrawal' | 'deposit'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed' | 'cancelled'>('all');
  const [filterCategory, setFilterCategory] = useState<'all' | 'tourism' | 'trade' | 'wallet'>('all');

  const transactions: Transaction[] = [
    {
      id: 'TXN001',
      type: 'payment',
      status: 'completed',
      amount: 2499,
      currency: 'USD',
      description: 'Beijing Business & Culture Tour',
      category: 'tourism',
      date: '2024-03-01',
      reference: 'TOUR-2024-001',
      method: 'Visa ending in 4242'
    },
    {
      id: 'TXN002',
      type: 'payment',
      status: 'completed',
      amount: 85000,
      currency: 'USD',
      description: 'Solar Panel 550W Monocrystalline (500 pieces)',
      category: 'trade',
      date: '2024-02-28',
      reference: 'ORDER-2024-002',
      method: 'Bank Transfer'
    },
    {
      id: 'TXN003',
      type: 'withdrawal',
      status: 'pending',
      amount: 5000,
      currency: 'USD',
      description: 'Withdrawal to Alipay',
      category: 'wallet',
      date: '2024-03-02',
      reference: 'WTH-2024-003',
      method: 'Alipay'
    },
    {
      id: 'TXN004',
      type: 'refund',
      status: 'completed',
      amount: 3200,
      currency: 'USD',
      description: 'Safari Adventure cancellation',
      category: 'tourism',
      date: '2024-02-25',
      reference: 'REF-2024-004',
      method: 'Visa ending in 4242'
    },
    {
      id: 'TXN005',
      type: 'payment',
      status: 'failed',
      amount: 1800,
      currency: 'USD',
      description: 'Great Zimbabwe Ancient Kingdom Tour',
      category: 'tourism',
      date: '2024-03-03',
      reference: 'TOUR-2024-005',
      method: 'PayPal'
    },
    {
      id: 'TXN006',
      type: 'deposit',
      status: 'completed',
      amount: 10000,
      currency: 'USD',
      description: 'Wallet deposit',
      category: 'wallet',
      date: '2024-02-20',
      reference: 'DEP-2024-006',
      method: 'Bank Transfer'
    },
    {
      id: 'TXN007',
      type: 'payment',
      status: 'completed',
      amount: 2100,
      currency: 'USD',
      description: 'Cape Town & Winelands Tour',
      category: 'tourism',
      date: '2024-02-15',
      reference: 'TOUR-2024-007',
      method: 'Visa ending in 4242'
    },
    {
      id: 'TXN008',
      type: 'withdrawal',
      status: 'completed',
      amount: 3000,
      currency: 'USD',
      description: 'Withdrawal to bank account',
      category: 'wallet',
      date: '2024-02-10',
      reference: 'WTH-2024-008',
      method: 'Bank Transfer'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'cancelled':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="w-4 h-4" />;
      case 'refund':
        return <AlertCircle className="w-4 h-4" />;
      case 'withdrawal':
        return <Package className="w-4 h-4" />;
      case 'deposit':
        return <Plane className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tourism':
        return <Plane className="w-4 h-4 text-blue-600" />;
      case 'trade':
        return <Package className="w-4 h-4 text-green-600" />;
      case 'wallet':
        return <DollarSign className="w-4 h-4 text-purple-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'text-red-600';
      case 'refund':
      case 'deposit':
        return 'text-green-600';
      case 'withdrawal':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getAmountPrefix = (type: string) => {
    switch (type) {
      case 'payment':
        return '-';
      case 'refund':
      case 'deposit':
        return '+';
      case 'withdrawal':
        return '-';
      default:
        return '';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.method.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;

    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const totalAmount = filteredTransactions.reduce((sum, transaction) => {
    const multiplier = transaction.type === 'payment' || transaction.type === 'withdrawal' ? -1 : 1;
    return sum + (transaction.amount * multiplier);
  }, 0);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Transaction History</h1>
            <p className="text-blue-100 text-sm">View all your payments and transactions</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="font-semibold text-gray-700">Filters</span>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="payment">Payments</option>
                <option value="refund">Refunds</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="deposit">Deposits</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="tourism">Tourism</option>
                <option value="trade">Trade</option>
                <option value="wallet">Wallet</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-700">Net Total ({filteredTransactions.length} transactions)</span>
            <span className={`text-xl font-bold ${getAmountColor(totalAmount >= 0 ? 'deposit' : 'payment')}`}>
              {getAmountPrefix(totalAmount >= 0 ? 'deposit' : 'payment')}${Math.abs(totalAmount).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {getTypeIcon(transaction.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">{transaction.description}</p>
                      {getCategoryIcon(transaction.category)}
                    </div>
                    <p className="text-sm text-gray-600">{transaction.reference}</p>
                    <p className="text-xs text-gray-500">{transaction.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${getAmountColor(transaction.type)}`}>
                    {getAmountPrefix(transaction.type)}${transaction.amount.toLocaleString()}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {getStatusIcon(transaction.status)}
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(transaction.date).toLocaleDateString()}</span>
                </div>
                <span>{transaction.currency}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No transactions found</p>
            <p className="text-sm text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
