import { useState } from 'react';
import { ArrowLeft, Check, Plus, Minus, Trash2, Send, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen } from '../App';
import { mockProducts, TradeProduct } from '../data/mockData';

interface BulkOrderingProps {
  onNavigate: (screen: Screen) => void;
}

export function BulkOrdering({ onNavigate }: BulkOrderingProps) {
  const [selectedProducts, setSelectedProducts] = useState<Array<{
    product: TradeProduct;
    quantity: number;
    targetPrice: string;
  }>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', 'electronics', 'machinery', 'construction', 'textiles', 'agriculture', 'vehicles', 'technology', 'apparel'];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const addToBulkOrder = (product: TradeProduct) => {
    if (!selectedProducts.some(item => item.product.id === product.id)) {
      setSelectedProducts(prev => [...prev, {
        product,
        quantity: 1,
        targetPrice: ''
      }]);
    }
  };

  const removeFromBulkOrder = (productId: string) => {
    setSelectedProducts(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setSelectedProducts(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQuantity = item.quantity + delta;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    }));
  };

  const updateTargetPrice = (productId: string, price: string) => {
    setSelectedProducts(prev => prev.map(item => {
      if (item.product.id === productId) {
        return { ...item, targetPrice: price };
      }
      return item;
    }));
  };

  const totalItems = selectedProducts.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onNavigate('explore')}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">Bulk Ordering</h1>
              <p className="text-sm text-gray-500">Select multiple products for bulk purchase</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <Filter className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
            </div>

            <div className="overflow-x-auto">
              <div className="flex gap-2 pb-1">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setFilterCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${filterCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="font-bold text-lg mb-4">Available Products</h2>
          
          <div className="space-y-4">
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition"
              >
                <div className="flex items-start gap-4">
                  <img src={product.image} alt={product.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                        {product.moq}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{product.supplier}</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-blue-600">{product.priceRange}</p>
                      <button
                        onClick={() => addToBulkOrder(product)}
                        disabled={selectedProducts.some(item => item.product.id === product.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition ${selectedProducts.some(item => item.product.id === product.id) ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Selected Products */}
        <AnimatePresence>
          {selectedProducts.length > 0 && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '300px', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-gray-50 border-l border-gray-200 overflow-y-auto"
            >
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-bold text-lg">Your Bulk Order ({totalItems} items)</h2>
              </div>
              
              <div className="p-4 space-y-4">
                {selectedProducts.map(item => (
                  <div key={item.product.id} className="bg-white rounded-xl p-3 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-sm">{item.product.name}</h3>
                      <button
                        onClick={() => removeFromBulkOrder(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-sm font-medium">{item.product.unit}</span>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Target Price (Optional)</label>
                      <input
                        type="text"
                        placeholder="Enter target price"
                        value={item.targetPrice}
                        onChange={(e) => updateTargetPrice(item.product.id, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <button className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Submit Bulk Order
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
