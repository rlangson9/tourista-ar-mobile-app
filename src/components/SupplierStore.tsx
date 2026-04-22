import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Star, Shield, Package, Truck, Clock, ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen } from '../App';
import { mockProducts } from '../data/mockData';
import { BottomNav } from './BottomNav';

interface SupplierStoreProps {
  onNavigate: (screen: Screen, productId?: string) => void;
  supplierName: string;
}

export function SupplierStore({ onNavigate, supplierName }: SupplierStoreProps) {
  const [supplierProducts, setSupplierProducts] = useState(mockProducts.filter(p => p.supplier === supplierName));
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: 'all',
    minRating: 0,
    verifiedOnly: false
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Filter products based on search and filters
  useEffect(() => {
    let filtered = mockProducts.filter(p => p.supplier === supplierName);
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (activeFilters.category !== 'all') {
      filtered = filtered.filter(p => p.category === activeFilters.category);
    }

    // Apply rating filter
    if (activeFilters.minRating > 0) {
      filtered = filtered.filter(p => p.supplierRating >= activeFilters.minRating);
    }

    // Apply verified filter
    if (activeFilters.verifiedOnly) {
      filtered = filtered.filter(p => p.verified);
    }

    setSupplierProducts(filtered);
  }, [supplierName, searchQuery, activeFilters]);

  // Get unique categories for this supplier
  const supplierCategories = Array.from(new Set(mockProducts
    .filter(p => p.supplier === supplierName)
    .map(p => p.category)
  ));

  // Get supplier info
  const supplierInfo = mockProducts.find(p => p.supplier === supplierName);

  return (
    <div className="w-full min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-lg truncate">{supplierName}</h1>
            {supplierInfo && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{supplierInfo.supplierRating}</span>
                <span>•</span>
                <span>{supplierProducts.length} products</span>
                {supplierInfo.verified && (
                  <Shield className="w-3 h-3 text-green-600" />
                )}
              </div>
            )}
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-4 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap bg-white border border-gray-300 hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button
            onClick={() => setActiveFilters({ ...activeFilters, category: 'all' })}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap ${
              activeFilters.category === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {supplierCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilters({ ...activeFilters, category })}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap ${
                activeFilters.category === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Modal */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-w-md mx-auto max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Filters</h2>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Minimum Rating */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Minimum Rating</h3>
                  <div className="flex gap-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setActiveFilters({ ...activeFilters, minRating: rating })}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                          activeFilters.minRating === rating
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {rating === 0 ? 'Any' : `${rating}+`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Verified Only */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Verified Only</h3>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.verifiedOnly}
                      onChange={(e) => setActiveFilters({ ...activeFilters, verifiedOnly: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Show only verified products</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setActiveFilters({
                        category: 'all',
                        minRating: 0,
                        verifiedOnly: false
                      });
                    }}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="px-4 py-4">
        {/* Supplier Info Card */}
        {supplierInfo && (
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {supplierName.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-lg mb-1">{supplierName}</h2>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{supplierInfo.supplierRating}</span>
                  <span className="text-gray-500 text-sm">({supplierProducts.length} products)</span>
                  {supplierInfo.verified && (
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full text-xs text-green-700">
                      <Shield className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    <span>{supplierInfo.shippingTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Response within 24h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    <span>Minimum Order: {supplierInfo.moq}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button 
                    onClick={() => onNavigate('supplier-profile', undefined, undefined, undefined, supplierName)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    View Company Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {supplierProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {supplierProducts.map((product) => (
              <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="font-bold text-lg text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilters({
                  category: 'all',
                  minRating: 0,
                  verifiedOnly: false
                });
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="explore" onNavigate={onNavigate} />
    </div>
  );
}

function ProductCard({ product, onNavigate }: { product: any; onNavigate: (screen: Screen, productId?: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onNavigate('trade-product-detail', product.id)}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
    >
      {/* Image */}
      <div className="relative" style={{ aspectRatio: '1/1' }}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        
        {/* Verified Badge */}
        {product.verified && (
          <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Verified
          </div>
        )}
        
        {/* MOQ */}
        <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-semibold">
          MOQ: {product.moq}
        </div>
      </div>
      
      {/* Info */}
      <div className="p-3">
        <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2 leading-tight">{product.name}</h3>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{product.supplierRating}</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-blue-600 text-sm">{product.priceRange.split(' - ')[0]}</p>
            <p className="text-xs text-gray-500">{product.unit}</p>
          </div>
          <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-700 transition">
            Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
}
