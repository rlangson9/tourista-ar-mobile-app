import { ArrowLeft, Wallet as WalletIcon, DollarSign, TrendingUp, ArrowUp, ArrowDown, History, CreditCard, Shield, Building2, Smartphone } from 'lucide-react';
import { useState } from 'react';

interface WalletProps {
  onBack: () => void;
}

export function Wallet({ onBack }: WalletProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'deposit' | 'withdraw' | 'history'>('overview');
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  // Mock data
  const balances = {
    available: 12450.00,
    pending: 3200.00,
    total: 15650.00
  };

  const recentTransactions = [
    { id: 1, type: 'deposit', amount: 5000, description: 'Wallet deposit', date: '2024-03-01', status: 'completed' },
    { id: 2, type: 'withdrawal', amount: 2000, description: 'Bank transfer', date: '2024-02-28', status: 'completed' },
    { id: 3, type: 'deposit', amount: 85000, description: 'Trade order payment', date: '2024-02-25', status: 'completed' },
    { id: 4, type: 'withdrawal', amount: 1500, description: 'Alipay withdrawal', date: '2024-02-20', status: 'pending' }
  ];

  const paymentMethods = [
    { id: '1', type: 'card', name: 'Visa ending in 4242', available: true },
    { id: '2', type: 'bank', name: 'Industrial & Commercial Bank', available: true },
    { id: '3', type: 'alipay', name: 'Alipay', available: true },
    { id: '4', type: 'paypal', name: 'PayPal', available: false },
    { id: '5', type: 'ecocash', name: 'EcoCash', available: true },
    { id: '6', type: 'm-pesa', name: 'M-Pesa', available: true },
    { id: '7', type: 'airtelmoney', name: 'Airtel Money', available: true },
    { id: '8', type: 'mobilemoney', name: 'Mobile Money', available: true }
  ];

  const handleDeposit = () => {
    if (depositAmount && selectedMethod) {
      console.log('Deposit:', { amount: depositAmount, method: selectedMethod });
      setDepositAmount('');
      setSelectedMethod('');
      setActiveTab('overview');
    }
  };

  const handleWithdraw = () => {
    if (withdrawAmount && selectedMethod) {
      console.log('Withdraw:', { amount: withdrawAmount, method: selectedMethod });
      setWithdrawAmount('');
      setSelectedMethod('');
      setActiveTab('overview');
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
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDown className="w-4 h-4 text-green-600" />;
      case 'withdrawal':
        return <ArrowUp className="w-4 h-4 text-red-600" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-600" />;
    }
  };

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
            <h1 className="text-2xl font-bold">Wallet</h1>
            <p className="text-blue-100 text-sm">Manage your funds</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Balance Overview */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Total Balance</h2>
            <Shield className="w-5 h-5 text-blue-200" />
          </div>
          <p className="text-3xl font-bold mb-4">${balances.total.toLocaleString()}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-blue-100 text-sm mb-1">Available</p>
              <p className="text-xl font-bold">${balances.available.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
              <p className="text-blue-100 text-sm mb-1">Pending</p>
              <p className="text-xl font-bold">${balances.pending.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 bg-white rounded-xl p-1 shadow-sm">
          {[
            { id: 'overview', label: 'Overview', icon: WalletIcon },
            { id: 'deposit', label: 'Deposit', icon: ArrowDown },
            { id: 'withdraw', label: 'Withdraw', icon: ArrowUp },
            { id: 'history', label: 'History', icon: History }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-medium transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.id !== 'history' && <span className="text-sm">{tab.label}</span>}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab('deposit')}
                className="bg-green-50 border-2 border-green-200 rounded-xl p-4 hover:bg-green-100 transition"
              >
                <ArrowDown className="w-6 h-6 text-green-600 mb-2" />
                <p className="font-semibold text-green-900">Deposit</p>
                <p className="text-xs text-green-700">Add funds</p>
              </button>
              <button
                onClick={() => setActiveTab('withdraw')}
                className="bg-red-50 border-2 border-red-200 rounded-xl p-4 hover:bg-red-100 transition"
              >
                <ArrowUp className="w-6 h-6 text-red-600 mb-2" />
                <p className="font-semibold text-red-900">Withdraw</p>
                <p className="text-xs text-red-700">Transfer funds</p>
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentTransactions.slice(0, 3).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(transaction.type)}
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setActiveTab('history')}
                className="w-full mt-4 text-center text-blue-600 font-medium hover:text-blue-700 transition"
              >
                View All History →
              </button>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowDown className="w-4 h-4 text-green-600" />
                    <span className="text-gray-700">Total Deposits</span>
                  </div>
                  <span className="font-semibold text-green-600">+$12,500</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowUp className="w-4 h-4 text-red-600" />
                    <span className="text-gray-700">Total Withdrawals</span>
                  </div>
                  <span className="font-semibold text-red-600">-$3,500</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700">Net Change</span>
                  </div>
                  <span className="font-semibold text-blue-600">+$9,000</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Deposit Tab */}
        {activeTab === 'deposit' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Deposit Funds</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10">$</span>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="space-y-2">
                    {paymentMethods.filter(method => method.available).map((method) => (
                      <label key={method.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="deposit-method"
                          value={method.id}
                          checked={selectedMethod === method.id}
                          onChange={(e) => setSelectedMethod(e.target.value)}
                          className="text-blue-600"
                        />
                        {method.type === 'card' && <CreditCard className="w-4 h-4 text-gray-600" />}
                        {method.type === 'bank' && <Building2 className="w-4 h-4 text-gray-600" />}
                        {method.type === 'alipay' || method.type === 'wechat' || method.type === 'ecocash' || method.type === 'm-pesa' || method.type === 'airtelmoney' || method.type === 'mobilemoney' ? <Smartphone className="w-4 h-4 text-gray-600" /> : null}
                        {method.type === 'paypal' && <DollarSign className="w-4 h-4 text-gray-600" />}
                        <span className="text-gray-900">{method.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleDeposit}
                  disabled={!depositAmount || !selectedMethod}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Deposit ${depositAmount || '0.00'}
                </button>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-3">Quick Amounts</h4>
              <div className="grid grid-cols-3 gap-2">
                {[100, 500, 1000, 2500, 5000, 10000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setDepositAmount(amount.toString())}
                    className="py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Withdraw Tab */}
        {activeTab === 'withdraw' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Withdraw Funds</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 z-10">$</span>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="0.00"
                      max={balances.available}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Available: ${balances.available.toLocaleString()}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Method</label>
                  <div className="space-y-2">
                    {paymentMethods.filter(method => method.available && method.type !== 'card').map((method) => (
                      <label key={method.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="withdraw-method"
                          value={method.id}
                          checked={selectedMethod === method.id}
                          onChange={(e) => setSelectedMethod(e.target.value)}
                          className="text-blue-600"
                        />
                        {method.type === 'bank' && <Building2 className="w-4 h-4 text-gray-600" />}
                        {method.type === 'alipay' || method.type === 'wechat' || method.type === 'ecocash' || method.type === 'm-pesa' || method.type === 'airtelmoney' || method.type === 'mobilemoney' ? <Smartphone className="w-4 h-4 text-gray-600" /> : null}
                        {method.type === 'paypal' && <DollarSign className="w-4 h-4 text-gray-600" />}
                        <span className="text-gray-900">{method.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount || !selectedMethod || parseFloat(withdrawAmount) > balances.available}
                  className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Withdraw ${withdrawAmount || '0.00'}
                </button>
              </div>
            </div>

            {/* Withdrawal Info */}
            <div className="bg-blue-50 p-4 rounded-xl">
              <h4 className="font-medium text-blue-900 mb-2">Withdrawal Information</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Processing time: 1-3 business days</li>
                <li>• Minimum withdrawal: $10</li>
                <li>• No withdrawal fees</li>
                <li>• Available balance: ${balances.available.toLocaleString()}</li>
              </ul>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(transaction.type)}
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
