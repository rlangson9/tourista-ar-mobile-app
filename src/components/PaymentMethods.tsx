import { ArrowLeft, CreditCard, Plus, Trash2, Edit2, Building2, Smartphone, DollarSign } from 'lucide-react';
import { useState } from 'react';

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

export function PaymentMethods({ onBack }: PaymentMethodsProps) {
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
            <h1 className="text-2xl font-bold">Payment Methods</h1>
            <p className="text-blue-100 text-sm">Manage your payment options</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
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
          <div className="bg-white rounded-2xl p-5 shadow-sm">
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
                    newMethod.type === 'ecocash' ? 'Phone number' :
                    newMethod.type === 'm-pesa' ? 'Phone number' :
                    newMethod.type === 'airtelmoney' ? 'Phone number' :
                    newMethod.type === 'mobilemoney' ? 'Phone number' :
                    'Account ID'
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
          </div>
        )}

        {/* Payment Methods List */}
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-white rounded-2xl p-4 shadow-sm">
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
            </div>
          ))}
        </div>

        {/* Security Note */}
        <div className="bg-blue-50 p-4 rounded-xl">
          <p className="text-sm text-blue-700">
            🔒 Your payment information is encrypted and securely stored. We never share your financial details with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}
