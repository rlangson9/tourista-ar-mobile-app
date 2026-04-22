import { useState } from 'react';
import { ArrowLeft, Send, DollarSign, CheckCircle, AlertCircle, Save, Trash2, X, BarChart3, FileText, MessageCircle, MapPin, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen } from '../App';
import { mockProducts, TradeProduct } from '../data/mockData';
import { convertCurrency, formatCurrency } from '../services/exchangeRateService';

interface NegotiationToolProps {
  onNavigate: (screen: Screen) => void;
  currency?: string;
  exchangeRates?: any;
}

interface TravelQuote {
  id: string;
  type: 'travel';
  tourId: string;
  tourName: string;
  price: string;
  duration: string;
  partner: string;
  timestamp: Date;
  notes?: string;
  image?: string;
}

interface TradeQuote {
  id: string;
  type: 'trade';
  negotiationId: string;
  product: TradeProduct;
  price: string;
  moq: string;
  supplier: string;
  timestamp: Date;
  notes?: string;
}

type Quotation = TravelQuote | TradeQuote;

interface SavedComparison {
  id: string;
  name: string;
  quotations: Quotation[];
  createdAt: Date;
}

export function NegotiationTool({ onNavigate, currency = 'USD', exchangeRates }: NegotiationToolProps) {
  
  const convertAndFormatPrice = (price: number | string, fromCurrency = 'USD') => {
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]/g, '')) : price;
    if (isNaN(numPrice)) return price;
    
    if (exchangeRates && exchangeRates.rates) {
      const converted = convertCurrency(numPrice, fromCurrency, currency, exchangeRates.rates);
      return formatCurrency(converted, currency);
    }
    
    return formatCurrency(numPrice, fromCurrency);
  };
  const [activeTab, setActiveTab] = useState<'negotiations' | 'saved-quotations' | 'comparisons'>('negotiations');
  const [negotiations, setNegotiations] = useState<Array<{
    id: string;
    product: TradeProduct;
    initialPrice: string;
    currentOffer: string;
    supplierCounter: string | null;
    status: 'pending' | 'negotiating' | 'accepted' | 'rejected';
    messages: Array<{
      sender: 'user' | 'supplier';
      text: string;
      timestamp: Date;
      type: 'message' | 'offer' | 'counteroffer' | 'acceptance' | 'rejection';
    }>;
  }>>([]);

  const [selectedProduct, setSelectedProduct] = useState<TradeProduct | null>(null);
  const [offerPrice, setOfferPrice] = useState('');
  const [message, setMessage] = useState('');
  const [activeNegotiation, setActiveNegotiation] = useState<string | null>(null);
  const [counterOfferPrice, setCounterOfferPrice] = useState('');
  const [showCounterOfferForm, setShowCounterOfferForm] = useState(false);
  const [savedQuotations, setSavedQuotations] = useState<Quotation[]>([]);
  const [savedComparisons, setSavedComparisons] = useState<SavedComparison[]>([]);
  const [selectedQuotations, setSelectedQuotations] = useState<string[]>([]);
  const [comparisonName, setComparisonName] = useState('');
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [quoteTypeFilter, setQuoteTypeFilter] = useState<'all' | 'trade' | 'travel'>('all');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');


  const startNegotiation = (product: TradeProduct) => {
    setSelectedProduct(product);
    setOfferPrice('');
  };

  const submitOffer = () => {
    if (selectedProduct && offerPrice) {
      const newNegotiation = {
        id: `neg-${Date.now()}`,
        product: selectedProduct,
        initialPrice: selectedProduct.priceRange,
        currentOffer: offerPrice,
        supplierCounter: null,
        status: 'pending' as const,
        messages: [
          {
            sender: 'user' as const,
            text: `I'm interested in your ${selectedProduct.name}. My offer is $${offerPrice} ${selectedProduct.unit}`,
            timestamp: new Date(),
            type: 'offer' as const
          }
        ]
      };

      setNegotiations(prev => [...prev, newNegotiation]);
      setSelectedProduct(null);
      setOfferPrice('');

      setTimeout(() => {
        setNegotiations(prev => prev.map(neg => {
          if (neg.id === newNegotiation.id) {
            const counterOffer = (parseFloat(offerPrice) * 1.1).toFixed(2);
            return {
              ...neg,
              supplierCounter: counterOffer,
              status: 'negotiating' as const,
              messages: [
                ...neg.messages,
                {
                  sender: 'supplier' as const,
                  text: `Thank you for your interest in our ${selectedProduct.name}. We can offer it at $${counterOffer} ${selectedProduct.unit}.`,
                  timestamp: new Date(),
                  type: 'counteroffer' as const
                }
              ]
            };
          }
          return neg;
        }));
      }, 2000);
    }
  };

  const sendMessage = (negotiationId: string) => {
    if (message) {
      setNegotiations(prev => prev.map(neg => {
        if (neg.id === negotiationId) {
          return {
            ...neg,
            messages: [
              ...neg.messages,
              {
                sender: 'user' as const,
                text: message,
                timestamp: new Date(),
                type: 'message' as const
              }
            ]
          };
        }
        return neg;
      }));
      setMessage('');

      setTimeout(() => {
        setNegotiations(prev => prev.map(neg => {
          if (neg.id === negotiationId) {
            return {
              ...neg,
              messages: [
                ...neg.messages,
                {
                  sender: 'supplier' as const,
                  text: 'Thank you for your message. We are reviewing your request and will get back to you shortly.',
                  timestamp: new Date(),
                  type: 'message' as const
                }
              ]
            };
          }
          return neg;
        }));
      }, 1500);
    }
  };

  const submitCounterOffer = (negotiationId: string) => {
    if (counterOfferPrice) {
      setNegotiations(prev => prev.map(neg => {
        if (neg.id === negotiationId) {
          return {
            ...neg,
            currentOffer: counterOfferPrice,
            messages: [
              ...neg.messages,
              {
                sender: 'user' as const,
                text: `Thank you for your counteroffer. I would like to counter with $${counterOfferPrice} ${neg.product.unit}.`,
                timestamp: new Date(),
                type: 'counteroffer' as const
              }
            ]
          };
        }
        return neg;
      }));
      setCounterOfferPrice('');
      setShowCounterOfferForm(false);

      setTimeout(() => {
        setNegotiations(prev => prev.map(neg => {
          if (neg.id === negotiationId) {
            const newCounter = (parseFloat(counterOfferPrice) * 1.05).toFixed(2);
            return {
              ...neg,
              supplierCounter: newCounter,
              messages: [
                ...neg.messages,
                {
                  sender: 'supplier' as const,
                  text: `Thank you for your counteroffer. Our best price is $${newCounter} ${neg.product.unit}.`,
                  timestamp: new Date(),
                  type: 'counteroffer' as const
                }
              ]
            };
          }
          return neg;
        }));
      }, 2000);
    }
  };

  const acceptOffer = (negotiationId: string) => {
    setNegotiations(prev => prev.map(neg => {
      if (neg.id === negotiationId) {
        return {
          ...neg,
          status: 'accepted' as const,
          messages: [
            ...neg.messages,
            {
              sender: 'user' as const,
              text: 'I accept the offer. Lets proceed with the order.',
              timestamp: new Date(),
              type: 'acceptance' as const
            },
            {
              sender: 'supplier' as const,
              text: 'Great! We will send you the order details shortly. Thank you for your business.',
              timestamp: new Date(),
              type: 'message' as const
            }
          ]
        };
      }
      return neg;
    }));
  };

  const rejectOffer = (negotiationId: string) => {
    setNegotiations(prev => prev.map(neg => {
      if (neg.id === negotiationId) {
        return {
          ...neg,
          status: 'rejected' as const,
          messages: [
            ...neg.messages,
            {
              sender: 'user' as const,
              text: "I'm sorry, but I can't accept this offer.",
              timestamp: new Date(),
              type: 'rejection' as const
            },
            {
              sender: 'supplier' as const,
              text: 'Thank you for your consideration. If you change your mind, please feel free to reach out again.',
              timestamp: new Date(),
              type: 'message' as const
            }
          ]
        };
      }
      return neg;
    }));
  };

  const saveQuotation = (negotiation: any) => {
    const newQuotation: TradeQuote = {
      id: `quot-${Date.now()}`,
      type: 'trade',
      negotiationId: negotiation.id,
      product: negotiation.product,
      price: negotiation.supplierCounter || negotiation.currentOffer,
      moq: negotiation.product.moq,
      supplier: negotiation.product.supplier,
      timestamp: new Date()
    };
    setSavedQuotations(prev => [...prev, newQuotation]);
  };

  const deleteQuotation = (quotationId: string) => {
    setSavedQuotations(prev => prev.filter(q => q.id !== quotationId));
  };

  const toggleQuotationSelection = (quotationId: string) => {
    setSelectedQuotations(prev => {
      if (prev.includes(quotationId)) {
        return prev.filter(id => id !== quotationId);
      } else if (prev.length < 3) {
        return [...prev, quotationId];
      }
      return prev;
    });
  };

  const saveComparison = () => {
    if (comparisonName && selectedQuotations.length > 0) {
      const newComparison: SavedComparison = {
        id: `comp-${Date.now()}`,
        name: comparisonName,
        quotations: savedQuotations.filter(q => selectedQuotations.includes(q.id)),
        createdAt: new Date()
      };
      setSavedComparisons(prev => [...prev, newComparison]);
      setComparisonName('');
      setSelectedQuotations([]);
      setShowComparisonModal(false);
    }
  };

  const deleteComparison = (comparisonId: string) => {
    setSavedComparisons(prev => prev.filter(c => c.id !== comparisonId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-gray-600 bg-gray-50';
      case 'negotiating': return 'text-blue-600 bg-blue-50';
      case 'accepted': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case 'offer': return 'border-l-4 border-blue-500 bg-blue-50';
      case 'counteroffer': return 'border-l-4 border-orange-500 bg-orange-50';
      case 'acceptance': return 'border-l-4 border-green-500 bg-green-50';
      case 'rejection': return 'border-l-4 border-red-500 bg-red-50';
      default: return '';
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setNotificationMessage('Copied to clipboard!');
      setShowNotification(true);
      
      // Hide notification after 2 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    });
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
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
              <h1 className="text-xl font-bold">Negotiation Tool</h1>
              <p className="text-sm text-gray-500">Negotiate prices with suppliers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="grid w-full grid-cols-3 bg-white border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('negotiations')}
            className={`px-4 py-3 text-sm font-semibold transition ${
              activeTab === 'negotiations' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Negotiations
          </button>
          <button 
            onClick={() => setActiveTab('saved-quotations')}
            className={`px-4 py-3 text-sm font-semibold transition ${
              activeTab === 'saved-quotations' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Saved Quotations
          </button>
          <button 
            onClick={() => setActiveTab('comparisons')}
            className={`px-4 py-3 text-sm font-semibold transition ${
              activeTab === 'comparisons' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Comparisons
          </button>
        </div>

        <div className="p-4">
          <AnimatePresence mode="wait">
            {activeTab === 'negotiations' && !selectedProduct && activeNegotiation === null && (
              <motion.div
                key="product-selection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="font-bold text-lg mb-4">Select a Product to Negotiate</h2>
                
                <div className="space-y-4">
                  {mockProducts.map(product => (
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
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">{product.name}</h3>
                              <button 
                                onClick={() => handleCopy(product.name)}
                                className="text-sm text-blue-600 font-medium hover:text-blue-700 transition"
                              >
                                Copy
                              </button>
                            </div>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                              {product.moq}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{product.supplier}</p>
                          <div className="flex justify-between items-center">
                            <p className="font-bold text-blue-600">{product.priceRange}</p>
                            <button
                              onClick={() => startNegotiation(product)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                            >
                              Start Negotiation
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'saved-quotations' && (
              <motion.div
                key="saved-quotations"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg">Saved Quotations</h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setQuoteTypeFilter('all')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        quoteTypeFilter === 'all' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setQuoteTypeFilter('trade')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        quoteTypeFilter === 'trade' 
                          ? 'bg-orange-600 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Trade
                    </button>
                    <button
                      onClick={() => setQuoteTypeFilter('travel')}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        quoteTypeFilter === 'travel' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Travel
                    </button>
                  </div>
                </div>

                {savedQuotations.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No saved quotations yet</p>
                    <p className="text-sm text-gray-400 mt-1">Save quotations during negotiations</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedQuotations.filter(q => quoteTypeFilter === 'all' || q.type === quoteTypeFilter).map((quotation) => (
                      <motion.div
                        key={quotation.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition"
                      >
                        <div className="flex items-start gap-4">
                          {quotation.type === 'trade' ? (
                            <img src={quotation.product.image} alt={quotation.product.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                          ) : (
                            <div className="w-20 h-20 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-8 h-8 text-purple-600" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold mb-1 ${
                                  quotation.type === 'trade' 
                                    ? 'bg-orange-100 text-orange-700' 
                                    : 'bg-purple-100 text-purple-700'
                                }`}>
                                  {quotation.type === 'trade' ? 'Trade' : 'Travel'}
                                </span>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-gray-900">
                                    {quotation.type === 'trade' ? quotation.product.name : quotation.tourName}
                                  </h3>
                                  <button 
                                    onClick={() => handleCopy(quotation.type === 'trade' ? quotation.product.name : quotation.tourName)}
                                    className="text-sm text-blue-600 font-medium hover:text-blue-700 transition"
                                  >
                                    Copy
                                  </button>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => toggleQuotationSelection(quotation.id)}
                                  className={`p-2 rounded-full transition ${
                                    selectedQuotations.includes(quotation.id)
                                      ? 'bg-blue-100 text-blue-600'
                                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                  }`}
                                >
                                  <BarChart3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteQuotation(quotation.id)}
                                  className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600 transition"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div className="space-y-1">
                              {quotation.type === 'trade' ? (
                                <>
                                  <p className="text-sm text-gray-600">{quotation.supplier}</p>
                                  <p className="font-bold text-blue-600">${quotation.price} {quotation.product.unit}</p>
                                  <p className="text-xs text-gray-500">MOQ: {quotation.moq}</p>
                                </>
                              ) : (
                                <>
                                  <p className="text-sm text-gray-600">{quotation.partner}</p>
                                  <p className="font-bold text-purple-600">${quotation.price}</p>
                                  <p className="text-xs text-gray-500">Duration: {quotation.duration}</p>
                                </>
                              )}
                              <p className="text-xs text-gray-400 mt-1">
                                {quotation.timestamp.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {selectedQuotations.length > 0 && (
                  <div className="mt-6">
                    <button
                      onClick={() => setShowComparisonModal(true)}
                      className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                      <BarChart3 className="w-5 h-5" />
                      Compare Selected ({selectedQuotations.length})
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'comparisons' && (
              <motion.div
                key="comparisons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="font-bold text-lg mb-4">Saved Comparisons</h2>

                {savedComparisons.length === 0 ? (
                  <div className="text-center py-12">
                    <BarChart3 className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No saved comparisons yet</p>
                    <p className="text-sm text-gray-400 mt-1">Create comparisons from saved quotations</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedComparisons.map((comparison) => (
                      <motion.div
                        key={comparison.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">{comparison.name}</h3>
                            <p className="text-xs text-gray-400">
                              {comparison.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteComparison(comparison.id)}
                            className="p-2 rounded-full bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="overflow-x-auto">
                          <div className="min-w-full">
                            <div className="grid grid-cols-4 gap-4 border-b border-gray-200 pb-2 mb-2">
                              <div className="font-semibold text-sm text-gray-600">Feature</div>
                              {comparison.quotations.map((q) => (
                                <div key={q.id} className="font-semibold text-sm text-gray-900 truncate">
                                  {q.type === 'trade' ? q.product.name : q.tourName}
                                </div>
                              ))}
                            </div>
                            <div className="grid grid-cols-4 gap-4 border-b border-gray-100 py-2">
                              <div className="text-sm text-gray-600">Type</div>
                              {comparison.quotations.map((q) => (
                                <div key={q.id} className="text-sm">
                                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                                    q.type === 'trade' 
                                      ? 'bg-orange-100 text-orange-700' 
                                      : 'bg-purple-100 text-purple-700'
                                  }`}>
                                    {q.type === 'trade' ? 'Trade' : 'Travel'}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="grid grid-cols-4 gap-4 border-b border-gray-100 py-2">
                              <div className="text-sm text-gray-600">Price</div>
                              {comparison.quotations.map((q) => (
                                <div key={q.id} className="text-sm font-semibold text-blue-600">
                                  ${q.price}
                                </div>
                              ))}
                            </div>
                            {comparison.quotations.some(q => q.type === 'trade') && (
                              <div className="grid grid-cols-4 gap-4 border-b border-gray-100 py-2">
                                <div className="text-sm text-gray-600">Supplier/Partner</div>
                                {comparison.quotations.map((q) => (
                                  <div key={q.id} className="text-sm text-gray-700">
                                    {q.type === 'trade' ? q.supplier : q.partner}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {selectedProduct && (
              <motion.div
                key="negotiation-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-4">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-gray-900">{selectedProduct.name}</h3>
                        <button 
                          onClick={() => handleCopy(selectedProduct.name)}
                          className="text-sm text-blue-600 font-medium hover:text-blue-700 transition"
                        >
                          Copy
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{selectedProduct.supplier}</p>
                      <p className="font-bold text-blue-600 mb-2">Current Price: {selectedProduct.priceRange}</p>
                      <p className="text-sm text-gray-500">{selectedProduct.unit}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Your Offer</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Offer Price</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          placeholder="Enter your offer"
                          value={offerPrice}
                          onChange={(e) => setOfferPrice(e.target.value)}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={submitOffer}
                        disabled={!offerPrice}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Offer
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeNegotiation && (
              <motion.div
                key="negotiation-details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-[calc(100vh-200px)] flex flex-col"
              >
                {negotiations.find(neg => neg.id === activeNegotiation) && (
                  <>
                    <div className="bg-white border-b border-gray-200 p-4 rounded-t-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {negotiations.find(neg => neg.id === activeNegotiation)?.product.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm">
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(negotiations.find(neg => neg.id === activeNegotiation)?.status || '')}`}>
                              {negotiations.find(neg => neg.id === activeNegotiation)?.status}
                            </span>
                            <span className="text-gray-500">
                              {negotiations.find(neg => neg.id === activeNegotiation)?.product.supplier}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setActiveNegotiation(null)}
                          className="p-2 hover:bg-gray-100 rounded-full transition"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                      {negotiations.find(neg => neg.id === activeNegotiation)?.messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'} ${getMessageTypeColor(msg.type)}`}>
                            <p className="text-sm">{msg.text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {msg.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-white border-t border-gray-200 p-4 rounded-b-xl">
                      {negotiations.find(neg => neg.id === activeNegotiation)?.status === 'negotiating' && (
                        <div className="space-y-3">
                          {showCounterOfferForm && (
                            <div className="bg-gray-50 p-3 rounded-lg space-y-3">
                              <div className="relative">
                                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                  type="number"
                                  placeholder="Enter counteroffer price"
                                  value={counterOfferPrice}
                                  onChange={(e) => setCounterOfferPrice(e.target.value)}
                                  className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setShowCounterOfferForm(false)}
                                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => submitCounterOffer(activeNegotiation)}
                                  disabled={!counterOfferPrice}
                                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  Send Counteroffer
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="Type your message..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <button
                              onClick={() => sendMessage(activeNegotiation)}
                              disabled={!message}
                              className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Send className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="flex gap-2 flex-wrap">
                            {!showCounterOfferForm && (
                              <button
                                onClick={() => setShowCounterOfferForm(true)}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center gap-2"
                              >
                                <DollarSign className="w-4 h-4" />
                                Counteroffer
                              </button>
                            )}
                            <button
                              onClick={() => saveQuotation(negotiations.find(neg => neg.id === activeNegotiation))}
                              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center gap-2"
                            >
                              <Save className="w-4 h-4" />
                              Save Quotation
                            </button>
                            <button
                              onClick={() => acceptOffer(activeNegotiation)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Accept
                            </button>
                            <button
                              onClick={() => rejectOffer(activeNegotiation)}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition flex items-center gap-2"
                            >
                              <AlertCircle className="w-4 h-4" />
                              Reject
                            </button>
                          </div>
                        </div>
                      )}

                      {(negotiations.find(neg => neg.id === activeNegotiation)?.status === 'accepted' || 
                        negotiations.find(neg => neg.id === activeNegotiation)?.status === 'rejected') && (
                        <button
                          onClick={() => setActiveNegotiation(null)}
                          className="w-full border border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
                        >
                          Back to Negotiations
                        </button>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {!selectedProduct && activeNegotiation === null && negotiations.length > 0 && (
              <motion.div
                key="active-negotiations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <h2 className="font-bold text-lg mb-4">Active Negotiations</h2>
                
                <div className="space-y-4">
                  {negotiations.map(neg => (
                    <motion.div
                      key={neg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition cursor-pointer"
                      onClick={() => setActiveNegotiation(neg.id)}
                    >
                      <div className="flex items-start gap-4">
                        <img src={neg.product.image} alt={neg.product.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-gray-900">{neg.product.name}</h3>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCopy(neg.product.name);
                                }}
                                className="text-sm text-blue-600 font-medium hover:text-blue-700 transition"
                              >
                                Copy
                              </button>
                              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(neg.status)}`}>
                                {neg.status}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{neg.product.supplier}</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Initial Price:</span>
                              <span className="font-medium">{neg.initialPrice}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Your Offer:</span>
                              <span className="font-medium">${neg.currentOffer} {neg.product.unit}</span>
                            </div>
                            {neg.supplierCounter && (
                              <div className="flex justify-between">
                                <span className="text-gray-500">Supplier Counter:</span>
                                <span className="font-medium">${neg.supplierCounter} {neg.product.unit}</span>
                              </div>
                            )}
                          </div>
                          <div className="mt-2 flex items-center text-xs text-gray-500">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            {neg.messages.length} messages
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showComparisonModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-lg">Save Comparison</h3>
                <button
                  onClick={() => setShowComparisonModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comparison Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Solar Panels Comparison"
                    value={comparisonName}
                    onChange={(e) => setComparisonName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <h4 className="font-semibold mb-2">Selected Quotations:</h4>
                <div className="space-y-2">
                  {savedQuotations.filter(q => selectedQuotations.includes(q.id)).map(quotation => (
                    <div key={quotation.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      {quotation.type === 'trade' ? (
                        <img src={quotation.product.image} alt={quotation.product.name} className="w-10 h-10 rounded object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-purple-600" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">
                            {quotation.type === 'trade' ? quotation.product.name : quotation.tourName}
                          </p>
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                            quotation.type === 'trade' 
                              ? 'bg-orange-100 text-orange-700' 
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {quotation.type === 'trade' ? 'Trade' : 'Travel'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          ${quotation.price}
                          {quotation.type === 'trade' && ` ${quotation.product.unit}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 flex gap-2">
                <button
                  onClick={() => setShowComparisonModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={saveComparison}
                  disabled={!comparisonName}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Comparison
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iPhone-style notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-6 py-3 rounded-full flex items-center gap-2 z-50 backdrop-blur-sm"
          >
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">{notificationMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
