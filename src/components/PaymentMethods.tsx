import { ArrowLeft, CreditCard, Plus, Trash2, Edit2, Building2, Smartphone, DollarSign, FileText, Download, Eye, Filter, Calendar, CheckCircle, Clock, XCircle, ChevronDown, Search, Receipt } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentMethodsProps {
  onBack: () => void;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'alipay' | 'wechat' | 'paypal' | 'ecocash' | 'm-pesa' | 'airtelmoney' | 'mobilemoney';
  name: string;
  details: string;
  isDefault: boolean;
  last4?: string;
  expiry?: string;
}

interface BankDetails {
  bankName: string;
  accountHolderName: string;
  accountNumber: string;
  routingNumber: string;
  swiftCode: string;
  bankAddress: string;
  currency: string;
}

interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
}

export function PaymentMethods({ onBack }: PaymentMethodsProps) {
  const [activeTab, setActiveTab] = useState<'methods' | 'bank' | 'invoices'>('methods');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Visa ending in 4242',
      details: 'John Doe',
      isDefault: true,
      last4: '4242',
      expiry: '12/25'
    },
    {
      id: '2',
      type: 'bank',
      name: 'Industrial & Commercial Bank',
      details: '****5678',
      isDefault: false
    },
    {
      id: '3',
      type: 'alipay',
      name: 'Alipay',
      details: '****8901',
      isDefault: false
    },
    {
      id: '4',
      type: 'paypal',
      name: 'PayPal',
      details: 'john.doe@email.com',
      isDefault: false
    },
    {
      id: '5',
      type: 'ecocash',
      name: 'EcoCash',
      details: '+263 77 123 4567',
      isDefault: false
    }
  ]);

  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankName: 'Industrial and Commercial Bank of China',
    accountHolderName: 'Tourista AR Ltd',
    accountNumber: '6222021234567890',
    routingNumber: '01020152',
    swiftCode: 'ICBKCNBJSHR',
    bankAddress: 'No.1 Garden Suburb, Beijing, China',
    currency: 'USD'
  });

  const [showBankForm, setShowBankForm] = useState(false);
  const [editingBank, setEditingBank] = useState(false);

  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      number: 'INV-2026-001',
      date: '2026-01-15',
      dueDate: '2026-02-15',
      amount: 2500.00,
      currency: 'USD',
      status: 'paid',
      description: 'Subscription Payment - Gold Plan',
      items: [
        { description: 'Gold Plan Subscription', quantity: 1, unitPrice: 2000.00, total: 2000.00 },
        { description: 'AR Premium Add-on', quantity: 1, unitPrice: 500.00, total: 500.00 }
      ]
    },
    {
      id: '2',
      number: 'INV-2026-002',
      date: '2026-02-20',
      dueDate: '2026-03-20',
      amount: 500.00,
      currency: 'USD',
      status: 'paid',
      description: 'Commission - Sourcing Request #SR-2026-015',
      items: [
        { description: 'Sourcing Commission (10%)', quantity: 1, unitPrice: 500.00, total: 500.00 }
      ]
    },
    {
      id: '3',
      number: 'INV-2026-003',
      date: '2026-03-10',
      dueDate: '2026-04-10',
      amount: 1500.00,
      currency: 'USD',
      status: 'pending',
      description: 'Tour Package - Victoria Falls',
      items: [
        { description: 'Victoria Falls Adventure Package', quantity: 1, unitPrice: 1200.00, total: 1200.00 },
        { description: 'AR Guide Service', quantity: 1, unitPrice: 300.00, total: 300.00 }
      ]
    },
    {
      id: '4',
      number: 'INV-2026-004',
      date: '2026-02-01',
      dueDate: '2026-02-28',
      amount: 800.00,
      currency: 'USD',
      status: 'overdue',
      description: 'Electronics Shipment - Shenzhen',
      items: [
        { description: 'Electronics Components', quantity: 100, unitPrice: 8.00, total: 800.00 }
      ]
    }
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [invoiceFilter, setInvoiceFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [newMethod, setNewMethod] = useState<{
    type: 'card' | 'bank' | 'alipay' | 'wechat' | 'paypal' | 'ecocash' | 'm-pesa' | 'airtelmoney' | 'mobilemoney';
    name: string;
    details: string;
    last4: string;
    expiry: string;
  }>({
    type: 'card',
    name: '',
    details: '',
    last4: '',
    expiry: ''
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="w-5 h-5" />;
      case 'bank':
        return <Building2 className="w-5 h-5" />;
      case 'alipay':
      case 'wechat':
      case 'ecocash':
      case 'm-pesa':
      case 'airtelmoney':
      case 'mobilemoney':
        return <Smartphone className="w-5 h-5" />;
      case 'paypal':
        return <DollarSign className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'card':
        return 'bg-blue-100 text-blue-700';
      case 'bank':
        return 'bg-purple-100 text-purple-700';
      case 'alipay':
      case 'wechat':
        return 'bg-green-100 text-green-700';
      case 'paypal':
        return 'bg-yellow-100 text-yellow-700';
      case 'ecocash':
        return 'bg-green-100 text-green-700';
      case 'm-pesa':
        return 'bg-red-100 text-red-700';
      case 'airtelmoney':
        return 'bg-blue-100 text-blue-700';
      case 'mobilemoney':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const setAsDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method =>
        method.id === id ? { ...method, isDefault: true } : { ...method, isDefault: false }
      )
    );
  };

  const deleteMethod = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const addPaymentMethod = () => {
    if (newMethod.name && newMethod.details) {
      const method: PaymentMethod = {
        id: Date.now().toString(),
        type: newMethod.type,
        name: newMethod.name,
        details: newMethod.details,
        isDefault: paymentMethods.length === 0,
        ...(newMethod.type === 'card' && { last4: newMethod.last4, expiry: newMethod.expiry })
      };
      setPaymentMethods([...paymentMethods, method]);
      setNewMethod({ type: 'card', name: '', details: '', last4: '', expiry: '' });
      setShowAddForm(false);
    }
  };

  const updatePaymentMethod = () => {
    if (editingMethod && newMethod.name && newMethod.details) {
      setPaymentMethods(methods =>
        methods.map(method =>
          method.id === editingMethod.id
            ? {
                ...method,
                type: newMethod.type,
                name: newMethod.name,
                details: newMethod.details,
                ...(newMethod.type === 'card' && { last4: newMethod.last4, expiry: newMethod.expiry })
              }
            : method
        )
      );
      setEditingMethod(null);
      setNewMethod({ type: 'card', name: '', details: '', last4: '', expiry: '' });
    }
  };

  const startEdit = (method: PaymentMethod) => {
    setEditingMethod(method);
    setNewMethod({
      type: method.type,
      name: method.name,
      details: method.details,
      last4: method.last4 || '',
      expiry: method.expiry || ''
    });
  };

  const cancelEdit = () => {
    setEditingMethod(null);
    setNewMethod({ type: 'card', name: '', details: '', last4: '', expiry: '' });
    setShowAddForm(false);
  };

  const handleSaveBankDetails = () => {
    setEditingBank(false);
    setShowBankForm(false);
  };

  const filteredInvoices = invoices.filter(invoice => {
    if (invoiceFilter === 'all') return true;
    return invoice.status === invoiceFilter;
  });

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getInvoiceStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'overdue':
        return <XCircle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const downloadInvoice = (invoice: Invoice) => {
    console.log(`Downloading invoice ${invoice.number}...`);
    // In production, this would generate and download a PDF
  };

  const viewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Payment & Invoices</h1>
            <p className="text-blue-100 text-sm">Manage payments and billing</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('methods')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'methods' ? 'bg-white text-blue-700' : 'bg-white/10 text-white'
            }`}
          >
            Methods
          </button>
          <button
            onClick={() => setActiveTab('bank')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'bank' ? 'bg-white text-blue-700' : 'bg-white/10 text-white'
            }`}
          >
            Bank Details
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'invoices' ? 'bg-white text-blue-700' : 'bg-white/10 text-white'
            }`}
          >
            Invoices
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Payment Methods Tab */}
        {activeTab === 'methods' && (
          <>
            {/* Add New Payment Method */}
            {!showAddForm && !editingMethod && (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-700">Add Payment Method</span>
              </button>
            )}

            {/* Add/Edit Form */}
            {(showAddForm || editingMethod) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-5 shadow-sm"
              >
                <h3 className="text-lg font-bold mb-4">
                  {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={newMethod.type}
                      onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="card">Credit/Debit Card</option>
                      <option value="bank">Bank Account</option>
                      <optgroup label="International Payment Methods">
                        <option value="alipay">Alipay</option>
                        <option value="wechat">WeChat Pay</option>
                        <option value="paypal">PayPal</option>
                      </optgroup>
                      <optgroup label="African Payment Methods">
                        <option value="ecocash">EcoCash (Zimbabwe)</option>
                        <option value="m-pesa">M-Pesa (Kenya, Tanzania, Uganda)</option>
                        <option value="airtelmoney">Airtel Money (Multiple African Countries)</option>
                        <option value="mobilemoney">Mobile Money (General)</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={newMethod.name}
                      onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                      placeholder={newMethod.type === 'card' ? 'Cardholder name' : 'Account name'}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
                    <input
                      type="text"
                      value={newMethod.details}
                      onChange={(e) => setNewMethod({ ...newMethod, details: e.target.value })}
                      placeholder={
                        newMethod.type === 'card' ? 'Card number' :
                        newMethod.type === 'bank' ? 'Account number' :
                        newMethod.type === 'paypal' ? 'Email address' :
                        'Phone number'
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {newMethod.type === 'card' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last 4 digits</label>
                        <input
                          type="text"
                          value={newMethod.last4}
                          onChange={(e) => setNewMethod({ ...newMethod, last4: e.target.value })}
                          placeholder="4242"
                          maxLength={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                        <input
                          type="text"
                          value={newMethod.expiry}
                          onChange={(e) => setNewMethod({ ...newMethod, expiry: e.target.value })}
                          placeholder="12/25"
                          maxLength={5}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={cancelEdit}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={editingMethod ? updatePaymentMethod : addPaymentMethod}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      {editingMethod ? 'Update' : 'Add'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Payment Methods List */}
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(method.type)}`}>
                        {getIcon(method.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold">{method.name}</p>
                          {method.isDefault && (
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{method.details}</p>
                        {method.type === 'card' && method.expiry && (
                          <p className="text-xs text-gray-500">Expires {method.expiry}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => setAsDefault(method.id)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => startEdit(method)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteMethod(method.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Bank Details Tab */}
        {activeTab === 'bank' && (
          <>
            {!showBankForm ? (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Bank Account</h3>
                      <p className="text-sm text-gray-500">Primary receiving account</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setEditingBank(true);
                      setShowBankForm(true);
                    }}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
                  >
                    Edit
                  </button>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Bank Name</span>
                    <span className="font-semibold">{bankDetails.bankName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Account Holder</span>
                    <span className="font-semibold">{bankDetails.accountHolderName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Account Number</span>
                    <span className="font-semibold">{bankDetails.accountNumber}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Routing Number</span>
                    <span className="font-semibold">{bankDetails.routingNumber}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">SWIFT Code</span>
                    <span className="font-semibold">{bankDetails.swiftCode}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Currency</span>
                    <span className="font-semibold">{bankDetails.currency}</span>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold mb-4">Edit Bank Details</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                    <input
                      type="text"
                      value={bankDetails.bankName}
                      onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
                    <input
                      type="text"
                      value={bankDetails.accountHolderName}
                      onChange={(e) => setBankDetails({ ...bankDetails, accountHolderName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                    <input
                      type="text"
                      value={bankDetails.accountNumber}
                      onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Routing Number</label>
                    <input
                      type="text"
                      value={bankDetails.routingNumber}
                      onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SWIFT Code</label>
                    <input
                      type="text"
                      value={bankDetails.swiftCode}
                      onChange={(e) => setBankDetails({ ...bankDetails, swiftCode: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      value={bankDetails.currency}
                      onChange={(e) => setBankDetails({ ...bankDetails, currency: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="CNY">CNY - Chinese Yuan</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="ZAR">ZAR - South African Rand</option>
                      <option value="KES">KES - Kenyan Shilling</option>
                      <option value="NGN">NGN - Nigerian Naira</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => {
                        setEditingBank(false);
                        setShowBankForm(false);
                      }}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveBankDetails}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bank Address */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <h4 className="font-semibold text-gray-700 mb-2">Bank Address</h4>
              <p className="text-sm text-gray-600">{bankDetails.bankAddress}</p>
            </div>

            {/* Bank Transfer Info */}
            <div className="bg-blue-50 rounded-2xl p-4">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Bank Transfer Information
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Transfers typically take 2-5 business days</li>
                <li>• Use your email as the reference</li>
                <li>• International transfers may incur additional fees</li>
                <li>• Contact support@tourista.com for wire details</li>
              </ul>
            </div>
          </>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <>
            {/* Invoice Filters */}
            <div className="flex gap-2 overflow-x-auto">
              {(['all', 'paid', 'pending', 'overdue'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setInvoiceFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                    invoiceFilter === filter
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>

            {/* Invoice List */}
            <div className="space-y-3">
              {filteredInvoices.map((invoice) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold">{invoice.number}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ${getInvoiceStatusColor(invoice.status)}`}>
                          {getInvoiceStatusIcon(invoice.status)}
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{invoice.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {invoice.date}
                        </span>
                        <span>Due: {invoice.dueDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        {invoice.currency} {invoice.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => viewInvoice(invoice)}
                      className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => downloadInvoice(invoice)}
                      className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredInvoices.length === 0 && (
              <div className="text-center py-12">
                <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No invoices found</p>
              </div>
            )}
          </>
        )}

        {/* Security Note */}
        <div className="bg-blue-50 p-4 rounded-xl">
          <p className="text-sm text-blue-700">
            🔒 Your payment information is encrypted and securely stored. We never share your financial details with third parties.
          </p>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      <AnimatePresence>
        {selectedInvoice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-50"
            onClick={() => setSelectedInvoice(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto w-full max-w-md"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{selectedInvoice.number}</h2>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 mt-1 w-fit ${getInvoiceStatusColor(selectedInvoice.status)}`}>
                    {getInvoiceStatusIcon(selectedInvoice.status)}
                    {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <XCircle className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Invoice Content */}
              <div className="p-6 space-y-6">
                {/* Invoice Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Issue Date</p>
                    <p className="font-semibold">{selectedInvoice.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Due Date</p>
                    <p className="font-semibold">{selectedInvoice.dueDate}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Description</p>
                  <p className="font-semibold">{selectedInvoice.description}</p>
                </div>

                {/* Line Items */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-3">Items</h3>
                  <div className="space-y-2">
                    {selectedInvoice.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="flex-1">
                          <p className="font-medium">{item.description}</p>
                          <p className="text-sm text-gray-500">{item.quantity} × {selectedInvoice.currency} {item.unitPrice.toLocaleString()}</p>
                        </div>
                        <p className="font-semibold">{selectedInvoice.currency} {item.total.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-lg">Total Amount</p>
                    <p className="font-bold text-2xl text-blue-600">
                      {selectedInvoice.currency} {selectedInvoice.amount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => downloadInvoice(selectedInvoice)}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </button>
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
                  >
                    Close
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
