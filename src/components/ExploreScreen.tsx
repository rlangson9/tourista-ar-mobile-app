import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, SlidersHorizontal, MapPin, Star, Clock, Sparkles, X, Building2, Shield, ChevronDown, Package, Cpu, Car, Shirt, Heart, Apple, Dumbbell, Beaker, Gamepad2, Armchair, Home, MessageCircle, Mountain, Landmark, Cat, Briefcase, Umbrella, Search, GraduationCap, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen, AppMode } from '../App';
import { mockTours, mockProducts, tradeCategories } from '../data/mockData';
import { AdDisplay } from './AdDisplay';
import { BottomNav } from './BottomNav';
import { SkeletonCard } from './ui/SkeletonCard';
import { fuzzySearch, debounce, SearchResult, highlightText } from '../utils/searchUtils';

interface ExploreScreenProps {
  onNavigate: (screen: Screen, itemId?: string) => void;
  appMode: AppMode;
}

export function ExploreScreen({ onNavigate, appMode }: ExploreScreenProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showFilterModalCategoryDropdown, setShowFilterModalCategoryDropdown] = useState(false);
  const [filters, setFilters] = useState({
    region: 'all',
    priceRange: [0, 5000],
    duration: 'all',
    category: 'all',
    rating: 0,
    moq: 0,
    availability: 'all',
    groupSize: 'all',
    tripType: 'all',
    amenities: [] as string[],
  });
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const filterModalCategoryDropdownRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Debounced search function
  const debouncedSearch = useRef(
    debounce((query: string) => {
      if (query.trim() === '') {
        setSearchResults([]);
        setShowSearchResults(false);
        return;
      }

      const results = fuzzySearch(
        query,
        appMode === 'trade' ? mockProducts : mockTours,
        appMode === 'trade' ? 'product' : 'tour'
      );
      
      setSearchResults(results);
      setShowSearchResults(results.length > 0);
    }, 300)
  ).current;

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCategoryDropdown && categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
      if (showFilterModalCategoryDropdown && filterModalCategoryDropdownRef.current && !filterModalCategoryDropdownRef.current.contains(event.target as Node)) {
        setShowFilterModalCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCategoryDropdown, showFilterModalCategoryDropdown]);

  const filteredTours = mockTours.filter((tour) => {
    if (filters.region !== 'all' && tour.region !== filters.region) return false;
    if (tour.price < filters.priceRange[0] || tour.price > filters.priceRange[1]) return false;
    if (filters.category !== 'all' && tour.category !== filters.category) return false;
    if (tour.rating < filters.rating) return false;
    if (filters.availability !== 'all' && tour.availability && tour.availability !== filters.availability) return false;
    if (filters.duration !== 'all' && tour.duration !== filters.duration) return false;
    // Group size filter
    if (filters.groupSize !== 'all') {
      const maxSize = tour.maxGroupSize || 10;
      if (filters.groupSize === 'small' && maxSize > 10) return false;
      if (filters.groupSize === 'medium' && (maxSize <= 10 || maxSize > 30)) return false;
      if (filters.groupSize === 'large' && maxSize <= 30) return false;
    }
    // Trip type filter
    if (filters.tripType !== 'all') {
      if (!tour.tripType || tour.tripType !== filters.tripType) return false;
    }
    // Amenities filter
    if (filters.amenities.length > 0) {
      const tourAmenities = tour.amenities || tour.included || [];
      const hasAllAmenities = filters.amenities.every(amenity => 
        tourAmenities.some(tourAmenity => 
          tourAmenity.toLowerCase().includes(amenity.toLowerCase())
        )
      );
      if (!hasAllAmenities) return false;
    }
    return true;
  });

  const filteredProducts = mockProducts.filter((product) => {
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    if (filters.rating > 0 && product.supplierRating < filters.rating) return false;
    if (filters.moq > 0) {
      const productMoq = parseInt(product.moq.replace(/[^0-9]/g, '')) || 0;
      if (productMoq < filters.moq) return false;
    }
    if (product.priceRange) {
      const priceMatch = product.priceRange.match(/\$?(\d+)-\$?(\d+)/);
      if (priceMatch) {
        const [, minPrice, maxPrice] = priceMatch.map(Number);
        if (minPrice > filters.priceRange[1] || maxPrice < filters.priceRange[0]) return false;
      }
    }
    if (filters.availability !== 'all' && product.availability && product.availability !== filters.availability) return false;
    return true;
  });

  const isTradeMode = appMode === 'trade';
  const items = isTradeMode ? filteredProducts : filteredTours;
  
  // Icon mapping for trade categories
  const categoryIcons: { [key: string]: any } = {
    electronics: Cpu,
    machinery: Package,
    construction: Building2,
    textiles: Shirt,
    agriculture: Heart,
    vehicles: Car,
    technology: Sparkles,
    apparel: Shirt,
    devices: Cpu,
    home: Home,
    medical: Heart,
    food: Apple,
    sports: Dumbbell,
    chemicals: Beaker,
    toys: Gamepad2,
    furniture: Armchair,
    others: Package,
  };

  // Color mapping for categories
  const categoryColors: { [key: string]: string } = {
    electronics: 'text-blue-500',
    machinery: 'text-orange-500',
    construction: 'text-gray-500',
    textiles: 'text-purple-500',
    agriculture: 'text-green-500',
    vehicles: 'text-red-500',
    technology: 'text-indigo-500',
    apparel: 'text-pink-500',
    devices: 'text-cyan-500',
    home: 'text-amber-500',
    medical: 'text-emerald-500',
    food: 'text-lime-500',
    sports: 'text-sky-500',
    chemicals: 'text-yellow-500',
    toys: 'text-rose-500',
    furniture: 'text-amber-700',
    others: 'text-gray-600',
  };
  
  const categories = isTradeMode ? tradeCategories : [
    { id: 'adventure', name: 'Adventure', icon: Mountain },
    { id: 'cultural', name: 'Cultural', icon: Landmark },
    { id: 'wildlife', name: 'Wildlife', icon: Cat },
    { id: 'business', name: 'Business', icon: Briefcase },
    { id: 'leisure', name: 'Leisure', icon: Umbrella },
    { id: 'school', name: 'School Tours', icon: GraduationCap },
    { id: 'company', name: 'Company Tours', icon: Users },
  ];

  return (
    <div className="w-full bg-gray-50 pt-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10" style={{ paddingTop: `env(safe-area-inset-top)` }}>
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 relative">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-600 transition-all">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={isTradeMode ? "Search products, suppliers..." : "Search destinations, tours..."}
                className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Search Results */}
            <AnimatePresence>
              {showSearchResults && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-30 max-h-96 overflow-y-auto"
                >
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * searchResults.indexOf(result) }}
                        onClick={() => {
                          if (result.type === 'tour') {
                            onNavigate('tour-details', result.id);
                          } else if (result.type === 'product') {
                            onNavigate('trade-product-detail', result.id);
                          }
                          setShowSearchResults(false);
                        }}
                        className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          {result.image && (
                            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={result.image} alt={result.title} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 line-clamp-1" dangerouslySetInnerHTML={{ __html: highlightText(result.title, searchQuery) }} />
                            {result.location && (
                              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span dangerouslySetInnerHTML={{ __html: highlightText(result.location, searchQuery) }} />
                              </p>
                            )}
                            {result.supplier && (
                              <p className="text-sm text-gray-500 mt-1" dangerouslySetInnerHTML={{ __html: highlightText(result.supplier, searchQuery) }} />
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              {result.price && (
                                <span className="text-sm font-semibold text-blue-600">
                                  {typeof result.price === 'number' ? `$${result.price}` : result.price}
                                </span>
                              )}
                              {result.rating && (
                                <div className="flex items-center gap-1 text-sm">
                                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                  <span>{result.rating}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <h4 className="font-medium text-gray-900 mb-1">No results found</h4>
                      <p className="text-sm text-gray-500">
                        Try adjusting your search terms or filters
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {isTradeMode && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('negotiation-tool')}
                className="p-2 hover:bg-gray-100 rounded-full transition"
                title="Negotiation Tool"
              >
                <MessageCircle className="w-6 h-6" />
              </button>
              <button
                onClick={() => onNavigate('bulk-ordering')}
                className="p-2 hover:bg-gray-100 rounded-full transition"
                title="Bulk Ordering"
              >
                <Package className="w-6 h-6" />
              </button>
            </div>
          )}
          <button
            onClick={() => setShowFilters(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition relative"
          >
            <SlidersHorizontal className="w-6 h-6" />
            {(filters.region !== 'all' || filters.category !== 'all' || filters.rating > 0) && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
            )}
          </button>
        </div>

        {/* Category Dropdown */}
        <div className="px-4 pb-3">
          <div className="relative" ref={categoryDropdownRef}>
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                {filters.category === 'all' ? (
                  <Package className="w-5 h-5 text-gray-600" />
                ) : (
                  (() => {
                    const Icon = categoryIcons[filters.category] || Package;
                    const color = categoryColors[filters.category] || 'text-blue-600';
                    return <Icon className={`w-5 h-5 ${color}`} />;
                  })()
                )}
                <span className="font-medium text-gray-900">
                  {filters.category === 'all' 
                    ? (isTradeMode ? 'Browse Categories' : 'All Categories')
                    : categories.find(c => c.id === filters.category)?.name || 'All Categories'
                  }
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${
                showCategoryDropdown ? 'rotate-180' : ''
              }`} />
            </button>
            
            {/* Dropdown Menu */}
            <AnimatePresence>
              {showCategoryDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-64 overflow-y-auto"
                >
                  {categories.map((category) => {
                    const Icon = isTradeMode ? categoryIcons[category.id] : null;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setFilters({ ...filters, category: category.id });
                          setShowCategoryDropdown(false);
                        }}
                        className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition ${
                          filters.category === category.id ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                        }`}
                      >
                        {isTradeMode && Icon ? (
                          <Icon className={`w-5 h-5 ${categoryColors[category.id] || 'text-gray-500'}`} />
                        ) : (
                          <category.icon className="w-5 h-5 text-gray-500" />
                        )}
                        <span className="font-medium">{category.name}</span>
                        {filters.category === category.id && (
                          <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Banner Ad */}
      <div className="mb-6">
        <AdDisplay
          type="banner"
          position="search"
          category="tourism"
          onNavigate={onNavigate}
          onAdClick={(adId) => console.log(`Search banner ad clicked: ${adId}`)}
          onAdClose={(adId) => console.log(`Search banner ad closed: ${adId}`)}
        />
      </div>

      <div className="space-y-4 pt-24">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <SkeletonCard variant="card" count={1} />
              </div>
            ))}
          </div>
        ) : (
          isTradeMode ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                {items.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
                ))}
              </div>
              
              {/* Native Ad */}
              <AdDisplay
                type="native"
                position="search"
                category="trade"
                onNavigate={onNavigate}
                onAdClick={(adId) => console.log(`Search native ad clicked: ${adId}`)}
                onAdClose={(adId) => console.log(`Search native ad closed: ${adId}`)}
              />
              
              <div className="grid grid-cols-2 gap-3">
                {items.slice(4).map((product) => (
                  <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                {filteredTours.slice(0, 4).map((tour) => (
                  <TourCard key={tour.id} tour={tour} onNavigate={onNavigate} />
                ))}
              </div>
              
              {/* Native Ad */}
              <AdDisplay
                type="native"
                position="search"
                category="tourism"
                onNavigate={onNavigate}
                onAdClick={(adId) => console.log(`Search native ad clicked: ${adId}`)}
                onAdClose={(adId) => console.log(`Search native ad closed: ${adId}`)}
              />
              
              <div className="grid grid-cols-2 gap-3">
                {filteredTours.slice(4).map((tour) => (
                  <TourCard key={tour.id} tour={tour} onNavigate={onNavigate} />
                ))}
              </div>
            </>
          )
        )}
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

                {isTradeMode ? (
                  // Trade filters
                  <>
                    {/* Category */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Category</h3>
                      <div className="relative" ref={filterModalCategoryDropdownRef}>
                        <button
                          onClick={() => setShowFilterModalCategoryDropdown(!showFilterModalCategoryDropdown)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition"
                        >
                          <span className="font-medium text-gray-900">
                            {filters.category === 'all'
                              ? 'All Categories'
                              : categories.find(c => c.id === filters.category)?.name || 'All Categories'
                            }
                          </span>
                          <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${
                            showFilterModalCategoryDropdown ? 'rotate-180' : ''
                          }`} />
                        </button>

                        {/* Category Dropdown */}
                        <AnimatePresence>
                          {showFilterModalCategoryDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto"
                            >
                              {categories.map((category) => (
                                <button
                                  key={category.id}
                                  onClick={() => {
                                    setFilters({ ...filters, category: category.id });
                                    setShowFilterModalCategoryDropdown(false);
                                  }}
                                  className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition ${
                                    filters.category === category.id ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                                  }`}
                                >
                                  {category.name}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Minimum Rating */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Minimum Rating</h3>
                      <div className="flex gap-2">
                        {[0, 3, 4, 4.5].map((rating) => (
                          <FilterButton
                            key={rating}
                            label={rating === 0 ? 'Any' : `${rating}+`}
                            isActive={filters.rating === rating}
                            onClick={() => setFilters({ ...filters, rating })}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Price Range (USD)</h3>
                      <div className="flex gap-3 items-center">
                        <input
                          type="number"
                          value={filters.priceRange[0]}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              priceRange: [Number(e.target.value), filters.priceRange[1]],
                            })
                          }
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="Min"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="number"
                          value={filters.priceRange[1]}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              priceRange: [filters.priceRange[0], Number(e.target.value)],
                            })
                          }
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="Max"
                        />
                      </div>
                    </div>

                    {/* MOQ */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Minimum Order Quantity</h3>
                      <div className="flex gap-2">
                        <FilterButton
                          label="Any"
                          isActive={filters.moq === 0}
                          onClick={() => setFilters({ ...filters, moq: 0 })}
                        />
                        <FilterButton
                          label="10+"
                          isActive={filters.moq === 10}
                          onClick={() => setFilters({ ...filters, moq: 10 })}
                        />
                        <FilterButton
                          label="100+"
                          isActive={filters.moq === 100}
                          onClick={() => setFilters({ ...filters, moq: 100 })}
                        />
                        <FilterButton
                          label="1000+"
                          isActive={filters.moq === 1000}
                          onClick={() => setFilters({ ...filters, moq: 1000 })}
                        />
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Availability</h3>
                      <div className="flex gap-2">
                        <FilterButton
                          label="Any"
                          isActive={filters.availability === 'all'}
                          onClick={() => setFilters({ ...filters, availability: 'all' })}
                        />
                        <FilterButton
                          label="In Stock"
                          isActive={filters.availability === 'in stock'}
                          onClick={() => setFilters({ ...filters, availability: 'in stock' })}
                        />
                        <FilterButton
                          label="Pre-order"
                          isActive={filters.availability === 'pre-order'}
                          onClick={() => setFilters({ ...filters, availability: 'pre-order' })}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  // Tourism filters
                  <>
                    {/* Destination */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Destination</h3>
                      <div className="grid grid-cols-3 gap-2">
                        <FilterButton
                          label="All"
                          isActive={filters.region === 'all'}
                          onClick={() => setFilters({ ...filters, region: 'all' })}
                        />
                        <FilterButton
                          label="China"
                          isActive={filters.region === 'china'}
                          onClick={() => setFilters({ ...filters, region: 'china' })}
                        />
                        <FilterButton
                          label="Africa"
                          isActive={filters.region === 'africa'}
                          onClick={() => setFilters({ ...filters, region: 'africa' })}
                        />
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Price Range (USD)</h3>
                      <div className="flex gap-3 items-center">
                        <input
                          type="number"
                          value={filters.priceRange[0]}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              priceRange: [Number(e.target.value), filters.priceRange[1]],
                            })
                          }
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="Min"
                        />
                        <span className="text-gray-400">-</span>
                        <input
                          type="number"
                          value={filters.priceRange[1]}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              priceRange: [filters.priceRange[0], Number(e.target.value)],
                            })
                          }
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                          placeholder="Max"
                        />
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Duration</h3>
                      <div className="flex gap-2">
                        <FilterButton
                          label="Any"
                          isActive={filters.duration === 'all'}
                          onClick={() => setFilters({ ...filters, duration: 'all' })}
                        />
                        <FilterButton
                          label="1-3 days"
                          isActive={filters.duration === '1-3 days'}
                          onClick={() => setFilters({ ...filters, duration: '1-3 days' })}
                        />
                        <FilterButton
                          label="4-7 days"
                          isActive={filters.duration === '4-7 days'}
                          onClick={() => setFilters({ ...filters, duration: '4-7 days' })}
                        />
                        <FilterButton
                          label="7+ days"
                          isActive={filters.duration === '7+ days'}
                          onClick={() => setFilters({ ...filters, duration: '7+ days' })}
                        />
                      </div>
                    </div>

                    {/* Tour Type */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Tour Type</h3>
                      <div className="relative" ref={filterModalCategoryDropdownRef}>
                        <button
                          onClick={() => setShowFilterModalCategoryDropdown(!showFilterModalCategoryDropdown)}
                          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition"
                        >
                          <span className="font-medium text-gray-900">
                            {filters.category === 'all'
                              ? 'All Categories'
                              : categories.find(c => c.id === filters.category)?.name || 'All Categories'
                            }
                          </span>
                          <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${
                            showFilterModalCategoryDropdown ? 'rotate-180' : ''
                          }`} />
                        </button>

                        {/* Category Dropdown */}
                        <AnimatePresence>
                          {showFilterModalCategoryDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto"
                            >
                              {categories.map((category) => (
                                <button
                                  key={category.id}
                                  onClick={() => {
                                    setFilters({ ...filters, category: category.id });
                                    setShowFilterModalCategoryDropdown(false);
                                  }}
                                  className={`w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 transition ${
                                    filters.category === category.id ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                                  }`}
                                >
                                  {category.name}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Minimum Rating */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Minimum Rating</h3>
                      <div className="flex gap-2">
                        {[0, 3, 4, 4.5].map((rating) => (
                          <FilterButton
                            key={rating}
                            label={rating === 0 ? 'Any' : `${rating}+`}
                            isActive={filters.rating === rating}
                            onClick={() => setFilters({ ...filters, rating })}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Availability</h3>
                      <div className="flex gap-2">
                        <FilterButton
                          label="Any"
                          isActive={filters.availability === 'all'}
                          onClick={() => setFilters({ ...filters, availability: 'all' })}
                        />
                        <FilterButton
                          label="Available"
                          isActive={filters.availability === 'available'}
                          onClick={() => setFilters({ ...filters, availability: 'available' })}
                        />
                        <FilterButton
                          label="Limited"
                          isActive={filters.availability === 'limited'}
                          onClick={() => setFilters({ ...filters, availability: 'limited' })}
                        />
                      </div>
                    </div>
                    
                    {/* Group Size */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Group Size</h3>
                      <div className="flex gap-2">
                        <FilterButton
                          label="Any"
                          isActive={filters.groupSize === 'all'}
                          onClick={() => setFilters({ ...filters, groupSize: 'all' })}
                        />
                        <FilterButton
                          label="Small (≤10)"
                          isActive={filters.groupSize === 'small'}
                          onClick={() => setFilters({ ...filters, groupSize: 'small' })}
                        />
                        <FilterButton
                          label="Medium (11-30)"
                          isActive={filters.groupSize === 'medium'}
                          onClick={() => setFilters({ ...filters, groupSize: 'medium' })}
                        />
                        <FilterButton
                          label="Large (>30)"
                          isActive={filters.groupSize === 'large'}
                          onClick={() => setFilters({ ...filters, groupSize: 'large' })}
                        />
                      </div>
                    </div>
                    
                    {/* Trip Type */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Trip Type</h3>
                      <div className="flex gap-2 flex-wrap">
                        <FilterButton
                          label="Any"
                          isActive={filters.tripType === 'all'}
                          onClick={() => setFilters({ ...filters, tripType: 'all' })}
                        />
                        <FilterButton
                          label="School"
                          isActive={filters.tripType === 'school'}
                          onClick={() => setFilters({ ...filters, tripType: 'school' })}
                        />
                        <FilterButton
                          label="Company"
                          isActive={filters.tripType === 'company'}
                          onClick={() => setFilters({ ...filters, tripType: 'company' })}
                        />
                        <FilterButton
                          label="Family"
                          isActive={filters.tripType === 'family'}
                          onClick={() => setFilters({ ...filters, tripType: 'family' })}
                        />
                        <FilterButton
                          label="Individual"
                          isActive={filters.tripType === 'individual'}
                          onClick={() => setFilters({ ...filters, tripType: 'individual' })}
                        />
                      </div>
                    </div>
                    
                    {/* Amenities */}
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3">Amenities</h3>
                      <div className="flex gap-2 flex-wrap">
                        {['Breakfast', 'Transfers', 'Guide', 'Entrance Fees', 'Insurance', 'WiFi', 'Meals', 'Accommodation'].map((amenity) => (
                          <button
                            key={amenity}
                            onClick={() => {
                              const newAmenities = filters.amenities.includes(amenity)
                                ? filters.amenities.filter(a => a !== amenity)
                                : [...filters.amenities, amenity];
                              setFilters({ ...filters, amenities: newAmenities });
                            }}
                            className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                              filters.amenities.includes(amenity)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {amenity}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setFilters({
                        region: 'all',
                        priceRange: [0, 5000],
                        duration: 'all',
                        category: 'all',
                        rating: 0,
                        moq: 0,
                        availability: 'all',
                        groupSize: 'all',
                        tripType: 'all',
                        amenities: [],
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
                    Show Results
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="explore" onNavigate={onNavigate} />
    </div>
  );
}

function FilterButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
        isActive
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
}

function TourCard({ tour, onNavigate }: { tour: any; onNavigate: (screen: Screen, tourId?: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onNavigate('tour-details', tour.id)}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="relative h-56">
        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover rounded-t-2xl" />
        <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-full font-bold text-gray-900 shadow-sm">
          ${tour.price}
        </div>
        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm font-semibold flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {tour.duration}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('ar-experience', tour.id);
          }}
          className="absolute bottom-3 right-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold hover:scale-105 transition-transform shadow-lg"
        >
          AR
        </button>
      </div>
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{tour.title}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{tour.location}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-sm">{tour.rating}</span>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition">
            Book Now
          </button>
        </div>
        <div className="mt-3 text-sm text-gray-600">
          <span className="font-semibold">{tour.partnerName}</span>
        </div>
      </div>
    </motion.div>
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
      {/* Image (70% of card) */}
      <div className="relative" style={{ aspectRatio: '4/5' }}>
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
      
      {/* Info (30% of card) */}
      <div className="p-3">
        <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2 leading-tight">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2 line-clamp-1">{product.supplier}</p>
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
