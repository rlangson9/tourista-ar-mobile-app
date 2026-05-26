import { Search, MapPin, Star, Clock, Sparkles, Plane, Package, ShoppingBag, Factory, Briefcase, Bot, Plus, Shield, TrendingUp, ChevronRight, ChevronLeft, Filter, Zap, Cog, Building2, Wheat, Car, Cpu, Shirt, Smartphone, Stethoscope, Coffee, Dumbbell, Beaker, Gamepad2, X, Sun, Moon, Users, Languages, Camera, Copy, Check, Volume2, RefreshCw, ChevronDown, Mic, MicOff } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import touristaLogo from '/tourista-app-icon.png';
import { mockTours, mockProducts, tradeCategories } from '../data/mockData';
import type { Screen, AppMode } from '../App';
import { AdDisplay } from './AdDisplay';
import { AIButton } from './AIButton';
import { BottomNav } from './BottomNav';
import { useLanguage } from '../i18n/LanguageContext';

interface HomeScreenProps {
  onNavigate: (screen: Screen, itemId?: string) => void;
  onSwitchToPartner: () => void;
  appMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  isAssistantOpen: boolean;
  onToggleAssistant: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function HomeScreen({ onNavigate, onSwitchToPartner, appMode, onModeChange, isAssistantOpen, onToggleAssistant, darkMode, onToggleDarkMode }: HomeScreenProps) {
  const { t } = useLanguage();
  console.log('HomeScreen props - isAssistantOpen:', isAssistantOpen, 'onToggleAssistant:', typeof onToggleAssistant);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showArPopup, setShowArPopup] = useState(false);
  const [arPopupMode, setArPopupMode] = useState<AppMode>('tourism');
  const [arCountdown, setArCountdown] = useState(10);
  const [arCanClose, setArCanClose] = useState(false);
  const [filterOrder, setFilterOrder] = useState<string[]>([]);
  const [draggedFilter, setDraggedFilter] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  // ── Translate Scanner state ──────────────────────────────────────────────
  const [showTranslate, setShowTranslate]         = useState(false);
  const [translateTab, setTranslateTab]           = useState<'scan' | 'ai'>('scan');
  const [scanText, setScanText]                   = useState('');
  const [translatedText, setTranslatedText]       = useState('');
  const [isTranslating, setIsTranslating]         = useState(false);
  const [translateFrom, setTranslateFrom]         = useState('auto');
  const [translateTo, setTranslateTo]             = useState('en');
  const [copied, setCopied]                       = useState(false);
  const [aiQuestion, setAiQuestion]               = useState('');
  const [aiAnswer, setAiAnswer]                   = useState('');
  const [isAiLoading, setIsAiLoading]             = useState(false);
  const [showFromDropdown, setShowFromDropdown]   = useState(false);
  const [showToDropdown, setShowToDropdown]       = useState(false);
  const [isListening, setIsListening]             = useState(false);
  const [isListeningAi, setIsListeningAi]         = useState(false);

  // Voice recognition for scan tab
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = translateFrom === 'auto' ? 'en-US' : `${translateFrom}-US`;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setScanText(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Voice recognition for AI tab
  const startVoiceInputAi = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListeningAi(true);
    };

    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setAiQuestion(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListeningAi(false);
    };

    recognition.onend = () => {
      setIsListeningAi(false);
    };

    recognition.start();
  };

  const stopVoiceInput = () => {
    setIsListening(false);
    setIsListeningAi(false);
  };

  // OCR - Image text scanning using OCR.space free API
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setScanText('Image too large. Please use a smaller image (max 5MB).');
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setScanText('Please select a valid image file.');
      return;
    }

    setIsOcrProcessing(true);
    setScanText('');

    try {
      // Resize image before sending to OCR API
      const resizedFile = await resizeImage(file, 800, 800);
      
      const formData = new FormData();
      formData.append('file', resizedFile);
      formData.append('language', translateFrom === 'auto' ? 'eng' : translateFrom);
      formData.append('isOverlayRequired', 'false');
      formData.append('detectOrientation', 'true');
      formData.append('scale', 'true');
      formData.append('OCREngine', '2');

      const response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        headers: {
          'apikey': 'helloworld', // Free API key for demo
        },
        body: formData,
      });

      const data = await response.json();

      if (data.IsErroredOnProcessing) {
        // Try fallback OCR using Tesseract.js if available, otherwise show error
        console.warn('OCR API failed:', data.ErrorMessage);
        setScanText('OCR service unavailable. Please try again later or use manual input.');
      } else if (data.ParsedResults && data.ParsedResults.length > 0) {
        const extractedText = data.ParsedResults.map((result: any) => result.ParsedText).join('\n');
        const trimmedText = extractedText.trim();
        if (trimmedText) {
          setScanText(trimmedText);
        } else {
          setScanText('No text detected in the image. Please try with a clearer image.');
        }
      } else {
        setScanText('No text detected in the image. Please try with a clearer image.');
      }
    } catch (error) {
      console.error('OCR Error:', error);
      setScanText('Failed to scan image. Please check your connection and try again.');
    } finally {
      setIsOcrProcessing(false);
      // Reset file input
      event.target.value = '';
    }
  };

  // Helper function to resize images
  const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<Blob> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          // Calculate scaling factor
          const scaleFactor = Math.min(maxWidth / width, maxHeight / height);
          if (scaleFactor < 1) {
            width *= scaleFactor;
            height *= scaleFactor;
          }

          // Create canvas and draw resized image
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                resolve(file);
              }
            }, 'image/jpeg', 0.9);
          } else {
            resolve(file);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const LANGUAGES = [
    { code: 'auto', name: 'Auto-detect' },
    { code: 'en',   name: 'English'     },
    { code: 'zh',   name: 'Chinese'     },
    { code: 'fr',   name: 'French'      },
    { code: 'es',   name: 'Spanish'     },
    { code: 'ar',   name: 'Arabic'      },
    { code: 'sw',   name: 'Swahili'     },
    { code: 'pt',   name: 'Portuguese'  },
    { code: 'hi',   name: 'Hindi'       },
    { code: 'ja',   name: 'Japanese'    },
    { code: 'ko',   name: 'Korean'      },
    { code: 'de',   name: 'German'      },
    { code: 'ru',   name: 'Russian'     },
    { code: 'sn',   name: 'Shona'       },
    { code: 'zu',   name: 'Zulu'        },
  ];

  const getLangName = (code: string) =>
    LANGUAGES.find(l => l.code === code)?.name ?? code;

  // Translate via Google Translate free endpoint (no API key needed for basic use)
  const handleTranslate = async () => {
    if (!scanText.trim()) return;
    setIsTranslating(true);
    setTranslatedText('');
    try {
      const from = translateFrom === 'auto' ? 'auto' : translateFrom;
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${translateTo}&dt=t&q=${encodeURIComponent(scanText)}`;
      const res  = await fetch(url);
      const data = await res.json();
      // Response shape: [ [ ["translatedText","originalText",...], ...], null, sourceLang ]
      const result = (data[0] as any[])
        .map((chunk: any[]) => chunk[0])
        .filter(Boolean)
        .join('');
      setTranslatedText(result);
    } catch {
      setTranslatedText('Translation failed. Check your connection and try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  // Ask Touri AI for translation help
  const handleAiTranslate = async () => {
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    setAiAnswer('');
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mode: appMode,
          messages: [{
            role: 'user',
            content: `You are Touri, the AI assistant for the Tourista AR app — a travel and trade platform connecting China and Africa. The user needs translation or language help. Be concise, accurate, and friendly. If they paste text, translate it and also explain any cultural context that would be helpful for a traveler or trader.\n\nUser: ${aiQuestion}`
          }]
        })
      });
      const data = await res.json();
      if (data.success) {
        setAiAnswer(data.response);
      } else {
        setAiAnswer('Touri is unavailable right now. Please try again.');
      }
    } catch {
      setAiAnswer('Could not reach Touri AI. Check your connection and try again.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSpeak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'auto' ? 'en' : lang;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (appMode === 'tourism') {
      setFilterOrder(['Country', 'Budget', 'Duration', 'Business/Leisure', 'Language', 'Rating']);
    } else {
      setFilterOrder(['Category', 'MOQ', 'Price Range', 'Verified Only', 'Shipping', 'Delivery Time']);
    }
  }, [appMode]);

  const handleDragStart = (filter: string) => {
    setDraggedFilter(filter);
  };

  const handleDragOver = (e: React.DragEvent, targetFilter: string) => {
    e.preventDefault();
    if (draggedFilter && draggedFilter !== targetFilter) {
      const newOrder = [...filterOrder];
      const draggedIndex = newOrder.indexOf(draggedFilter);
      const targetIndex = newOrder.indexOf(targetFilter);
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedFilter);
      setFilterOrder(newOrder);
    }
  };

  const handleDragEnd = () => {
    setDraggedFilter(null);
  };

  useEffect(() => {
    console.log('showArPopup changed:', showArPopup);
  }, [showArPopup]);

  // ── AR popup: launch for a given mode ──────────────────────────────────
  const showArComingSoon = (mode: AppMode) => {
    setArPopupMode(mode);
    setArCountdown(10);
    setArCanClose(false);
    setShowArPopup(true);
  };

  const closeArPopup = () => {
    if (!arCanClose) return;
    setShowArPopup(false);
    setArCountdown(10);
    setArCanClose(false);
  };

  // Countdown + auto-close — resets whenever popup opens
  useEffect(() => {
    if (!showArPopup) return;
    const tick = setInterval(() => {
      setArCountdown(prev => {
        if (prev <= 1) {
          clearInterval(tick);
          closeArPopup();
          return 0;
        }
        if (prev === 6) setArCanClose(true);
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [showArPopup, arCanClose]);

  // Show on first mount (tourism colours by default)
  useEffect(() => {
    showArComingSoon('tourism');
  }, []);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered data states
  const [filteredChinaTours, setFilteredChinaTours] = useState(mockTours.filter(t => t.region === 'china').slice(0, 6));
  const [filteredAfricaTours, setFilteredAfricaTours] = useState(mockTours.filter(t => t.region === 'africa').slice(0, 6));
  const [filteredBusinessTrips, setFilteredBusinessTrips] = useState(mockTours.filter(t => t.category === 'business'));
  const [filteredProducts, setFilteredProducts] = useState(mockProducts.slice(0, 6));
  const [filteredVerifiedSuppliers, setFilteredVerifiedSuppliers] = useState(Array.from(new Set(mockProducts.map(p => p.supplier))).slice(0, 4));

  // Filter functions
  const filterTours = (tours: any[]) => {
    return tours.filter(tour => {
      if (activeFilters.includes('Country') && !tour.location.includes('China') && !tour.location.includes('Africa')) {
        return false;
      }
      if (activeFilters.includes('Budget') && tour.price > 1000) {
        return false;
      }
      if (activeFilters.includes('Duration') && tour.duration.includes('Day') && parseInt(tour.duration) > 7) {
        return false;
      }
      if (activeFilters.includes('Business/Leisure') && tour.category !== 'business') {
        return false;
      }
      if (activeFilters.includes('Language') && !tour.language.includes('English')) {
        return false;
      }
      if (activeFilters.includes('Rating') && tour.rating < 4.5) {
        return false;
      }
      return true;
    });
  };

  const filterProducts = (products: any[]) => {
    return products.filter(product => {
      if (activeFilters.includes('Category') && !product.category.includes('Electronics')) {
        return false;
      }
      if (activeFilters.includes('MOQ') && product.moq.includes('1000')) {
        return false;
      }
      if (activeFilters.includes('Price Range') && parseFloat(product.priceRange.split('$')[1]) > 500) {
        return false;
      }
      if (activeFilters.includes('Verified Only') && !product.verified) {
        return false;
      }
      if (activeFilters.includes('Shipping') && !product.shippingTime.includes('7-10')) {
        return false;
      }
      if (activeFilters.includes('Delivery Time') && !product.shippingTime.includes('7-10')) {
        return false;
      }
      return true;
    });
  };

  // Update filtered data when activeFilters changes
  useEffect(() => {
    setFilteredChinaTours(filterTours(mockTours.filter(t => t.region === 'china')).slice(0, 6));
    setFilteredAfricaTours(filterTours(mockTours.filter(t => t.region === 'africa')).slice(0, 6));
    setFilteredBusinessTrips(filterTours(mockTours.filter(t => t.category === 'business')));
    setFilteredProducts(filterProducts(mockProducts).slice(0, 6));
    
    // Filter verified suppliers based on filtered products
    const filteredSuppliers = Array.from(new Set(filterProducts(mockProducts).map(p => p.supplier))).slice(0, 4);
    setFilteredVerifiedSuppliers(filteredSuppliers);
  }, [activeFilters]);

  // Sponsored content
  const sponsoredTours = mockTours.slice(0, 3).map(t => ({ ...t, sponsored: true }));
  const sponsoredProducts = mockProducts.slice(0, 3).map(p => ({ ...p, sponsored: true }));

  // Auto-rotate banners (AR Feature + Sponsored)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const tourFilters = ['Country', 'Budget', 'Duration', 'Business/Leisure', 'Language', 'Rating'];
  const tradeFilters = ['Category', 'MOQ', 'Price Range', 'Verified Only', 'Shipping', 'Delivery Time'];
  const currentFilters = appMode === 'tourism' ? tourFilters : tradeFilters;



  return (
    <div className="w-full bg-background pb-20">
      {/* Header - Sticky */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 pb-6 shadow-lg" style={{ paddingTop: `calc(0rem + env(safe-area-inset-top))` }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={touristaLogo} alt="Tourista AR" className="h-12" />
          </div>
          {/* Mode Toggle */}
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1">
            <button
              onClick={() => {
                onModeChange('tourism');
                showArComingSoon('tourism');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition ${
                appMode === 'tourism'
                  ? 'bg-white text-blue-600'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <MapPin className="w-4 h-4" />
              {t('home.travel')}
            </button>
            <button
              onClick={() => {
                onModeChange('trade');
                showArComingSoon('trade');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition ${
                appMode === 'trade'
                  ? 'bg-white text-orange-600'
                  : 'text-white hover:bg-white/20'
              }`}
              style={appMode === 'trade' ? { color: '#000000' } : {}}
            >
              <Briefcase className="w-4 h-4" />
              {t('home.trade')}
            </button>
          </div>
          {/* Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
              className="ml-2 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition"
              aria-label="Settings menu"
            >
              <Cog className="w-5 h-5" />
            </button>
            {/* Dropdown Menu */}
            {showSettingsDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[160px] z-50">
                <button
                  onClick={() => {
                    setShowTranslate(true);
                    setShowSettingsDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition text-left"
                >
                  <Languages className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium">Translate</span>
                </button>
                <button
                  onClick={() => {
                    onToggleDarkMode();
                    setShowSettingsDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition text-left"
                >
                  {darkMode ? (
                    <>
                      <Sun className="w-5 h-5 text-amber-500" />
                      <span className="text-sm font-medium">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium">Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full bg-card rounded-2xl shadow-lg hover:shadow-xl transition-shadow mb-3">
          <div className="flex items-center gap-3" style={{ padding: '7px 16px' }}>
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  onNavigate('explore');
                }
              }}
              placeholder={appMode === 'tourism' ? 'Where do you want to go?' : 'What product are you sourcing?'}
              className="flex-1 bg-transparent border-none outline-none text-card-foreground placeholder-muted-foreground"
              aria-label={appMode === 'tourism' ? 'Search destinations' : 'Search products'}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-card-foreground transition-colors rounded-full hover:bg-accent"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2" style={{ paddingBottom: '0px', marginTop: '-9px', marginBottom: '-9px' }}>
          {editMode && (
            <button
              onClick={() => setEditMode(false)}
              className="flex-shrink-0 px-3 py-2 rounded-full text-xs font-semibold bg-white text-green-600 hover:bg-green-50 transition"
            >
              Done
            </button>
          )}
          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="flex-shrink-0 px-3 py-2 rounded-full font-semibold bg-white/20 text-white hover:bg-white/30 transition"
              style={{ fontSize: '10px' }}
            >
              Edit
            </button>
          )}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
            {filterOrder.map((filter) => (
              <div
                key={filter}
                draggable={editMode}
                onDragStart={() => handleDragStart(filter)}
                onDragOver={(e) => handleDragOver(e, filter)}
                onDragEnd={handleDragEnd}
                className={`flex-shrink-0 px-4 rounded-full font-semibold transition whitespace-nowrap cursor-pointer ${
                  editMode 
                    ? 'bg-yellow-400 text-gray-900 opacity-75' 
                    : activeFilters.includes(filter)
                      ? 'bg-white text-blue-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                } ${draggedFilter === filter ? 'opacity-50' : ''}`}
                style={{ 
                  fontSize: '10px',
                  marginTop: '4px',
                  marginBottom: '4px',
                  paddingTop: filter === 'Shipping' ? '8px' : '8px',
                  paddingBottom: filter === 'Shipping' ? '8px' : '8px'
                }}
                onClick={() => {
                  if (!editMode) {
                    if (activeFilters.includes(filter)) {
                      setActiveFilters(activeFilters.filter(f => f !== filter));
                    } else {
                      setActiveFilters([...activeFilters, filter]);
                    }
                  }
                }}
              >
                {filter}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-4 space-y-6">
        {/* Banner Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">
              {appMode === 'tourism' ? 'Featured Destinations' : 'Featured Products'}
            </h2>
            <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded-full">
              {appMode === 'tourism' ? 'Sponsored' : 'Trending'}
            </span>
          </div>
          <div className="relative h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <div className="text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-bold text-lg">
                  {appMode === 'tourism' ? 'AR Experience' : 'Trade Deals'}
                </h3>
                <p className="text-sm opacity-90">
                  {appMode === 'tourism' ? 'Preview destinations in AR' : 'Exclusive supplier offers'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {appMode === 'tourism' ? (
          <>
            {/* Cross-sell Prompt */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Going on a business trip?</h3>
                  <p className="text-sm text-gray-600 mb-3">Source products during your visit to China or Africa</p>
                  <button
                    onClick={() => onModeChange('trade')}
                    className="text-sm font-semibold text-amber-700 hover:underline"
                  >
                    Explore Trade Mode →
                  </button>
                </div>
              </div>
            </div>

            {/* Native Ad */}
            <AdDisplay
              type="native"
              position="home"
              category="tourism"
              onNavigate={onNavigate}
              onAdClick={(adId) => console.log(`Native ad clicked: ${adId}`)}
              onAdClose={(adId) => console.log(`Native ad closed: ${adId}`)}
            />

            {/* Request Custom Tour */}
            <button
              onClick={() => onNavigate('custom-tour-request')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-lg">Request Custom Tour</h3>
                <p className="text-blue-50 text-sm">Can't find what you're looking for?</p>
              </div>
            </button>
            
            {/* School & Company Trip Customization */}
            <button
              onClick={() => onNavigate('group-booking-form')}
              style={{ backgroundColor: '#f97316', transition: 'background-color 0.3s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ea580c'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f97316'}
              className="w-full text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-lg">School/Company Trips</h3>
                <p className="text-orange-50 text-sm">Customize trips for your school or company</p>
              </div>
            </button>

            {/* Sponsored Tours Card Ads */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Featured Experiences</h2>
                <span className="text-xs text-gray-500 bg-amber-100 px-2 py-1 rounded-full">Sponsored</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <AdDisplay
                  type="card"
                  position="home"
                  category="tourism"
                  onNavigate={onNavigate}
                  onAdClick={(adId) => console.log(`Card ad clicked: ${adId}`)}
                  onAdClose={(adId) => console.log(`Card ad closed: ${adId}`)}
                />
                <AdDisplay
                  type="card"
                  position="home"
                  category="tourism"
                  onNavigate={onNavigate}
                  onAdClick={(adId) => console.log(`Card ad clicked: ${adId}`)}
                  onAdClose={(adId) => console.log(`Card ad closed: ${adId}`)}
                />
              </div>
            </div>

            {/* Featured Destinations - China */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Discover China</h2>
                <button 
                  onClick={() => onNavigate('explore')}
                  className="text-blue-600 text-sm font-semibold"
                >
                  See all
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {filteredChinaTours.length > 0 ? (
                  filteredChinaTours.map((tour) => (
                    <VerticalTourCard key={tour.id} tour={tour} onNavigate={onNavigate} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500">No tours found matching your filters</p>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Destinations - Africa */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Explore Africa</h2>
                <button 
                  onClick={() => onNavigate('explore')}
                  className="text-blue-600 text-sm font-semibold"
                >
                  See all
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {filteredAfricaTours.length > 0 ? (
                  filteredAfricaTours.map((tour) => (
                    <VerticalTourCard key={tour.id} tour={tour} onNavigate={onNavigate} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500">No tours found matching your filters</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Post Sourcing Request */}
            <button
              onClick={() => onNavigate('sourcing-request')}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-lg">Post Sourcing Request</h3>
                <p className="text-amber-50 text-sm">Get quotes from verified suppliers</p>
              </div>
            </button>

            {/* Categories */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Browse Categories</h2>
              <button
                onClick={() => onNavigate('explore')}
                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-600">
                    <path d="M16.5 9.4 7.55 4.24"/>
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.29 7 12 12 20.71 7"/>
                    <line x1="12" x2="12" y1="22" y2="12"/>
                  </svg>
                  <span className="font-medium text-gray-900">Browse Categories</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-600 transition-transform">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
            </div>

            {/* Sponsored Products */}
            {sponsoredProducts.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Promoted Products</h2>
                  <span className="text-xs text-gray-500 bg-amber-100 px-2 py-1 rounded-full">Sponsored</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.slice(0, 3).map((product) => (
                      <VerticalProductCard key={product.id} product={product} onNavigate={onNavigate} sponsored />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8">
                      <p className="text-gray-500">No products found matching your filters</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Featured Products */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Featured Products</h2>
                <button 
                  onClick={() => onNavigate('explore')}
                  className="text-blue-600 text-sm font-semibold"
                >
                  See all
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <AdDisplay
                  type="card"
                  position="home"
                  category="trade"
                  onNavigate={onNavigate}
                  onAdClick={(adId) => console.log(`Trade card ad clicked: ${adId}`)}
                  onAdClose={(adId) => console.log(`Trade card ad closed: ${adId}`)}
                />
                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 4).map((product) => (
                    <VerticalProductCard key={product.id} product={product} onNavigate={onNavigate} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <p className="text-gray-500">No products found matching your filters</p>
                  </div>
                )}
              </div>
            </div>

            {/* Native Trade Ad */}
            <AdDisplay
              type="native"
              position="home"
              category="trade"
              onNavigate={onNavigate}
              onAdClick={(adId) => console.log(`Trade native ad clicked: ${adId}`)}
              onAdClose={(adId) => console.log(`Trade native ad closed: ${adId}`)}
            />

            {/* Cross-sell to Tourism */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Plane className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Looking for business tours?</h3>
                  <p className="text-sm text-gray-600 mb-3">Book guided tours to visit factories and suppliers in China and Africa</p>
                  <button
                    onClick={() => onModeChange('tourism')}
                    className="text-sm font-semibold text-amber-700 hover:underline"
                  >
                    Explore Business Tours →
                  </button>
                </div>
              </div>
            </div>

            {/* Verified Suppliers */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Verified Suppliers</h2>
              <div className="space-y-3">
                {filteredVerifiedSuppliers.length > 0 ? (
                  filteredVerifiedSuppliers.map((supplier, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {supplier.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 truncate">{supplier}</h3>
                          <Shield className="w-4 h-4 text-green-600 flex-shrink-0" />
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>⭐ 4.8</span>
                          <span>•</span>
                          <span>150+ products</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => onNavigate('supplier-dashboard')}
                        className="text-blue-600 text-sm font-semibold whitespace-nowrap hover:underline transition"
                      >
                        View Store
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No suppliers found matching your filters</p>
                  </div>
                )}
              </div>
            </div>

            {/* Product Discovery */}
            <button
              onClick={() => onNavigate('product-discovery')}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-lg">Product Discovery</h3>
                <p className="text-blue-50 text-sm">AI-powered recommendations and comparisons</p>
              </div>
            </button>

            {/* Cross-sell to Tourism */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Factory className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Visit factories in person</h3>
                  <p className="text-sm text-gray-600 mb-3">Book a business tour and meet suppliers face-to-face</p>
                  <button
                    onClick={() => onModeChange('tourism')}
                    className="text-sm font-semibold text-purple-700 hover:underline"
                  >
                    Browse Business Tours →
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="home" onNavigate={onNavigate} />

      {/* AR Coming Soon Popup */}
      <AnimatePresence>
        {showArPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 z-50 border-2 border-white/30 max-w-sm"
          >
            {/* Title */}
            <h3 className="text-2xl font-bold text-white text-center">Tourista AR</h3>
            
            {/* AR Preview Mock-up */}
            <div className="w-full bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center gap-3">
              <div className="w-24 h-24 bg-white/20 rounded-lg flex items-center justify-center relative">
                {/* AR Camera Frame */}
                <div className="absolute inset-0 border-2 border-dashed border-white/50 rounded-lg"></div>
                {/* AR Target */}
                <div className="w-16 h-16 border-2 border-white/80 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-white/60 rounded flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-white/90">
                Point your camera at landmarks to see virtual guides
              </p>
            </div>
            
            {/* Features List */}
            <div className="w-full space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-3 h-3" />
                </div>
                <span>Virtual tour guides</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-3 h-3" />
                </div>
                <span>Interactive information overlays</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-3 h-3" />
                </div>
                <span>Available on iOS and Android</span>
              </div>
            </div>
            
            {/* Coming Soon */}
            <div className="flex items-center gap-2 text-xs text-white/80 mt-2">
              <Sparkles className="w-4 h-4" />
              <span>Launching Q4 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Translation Scanner Modal */}
      <AnimatePresence>
        {showTranslate && (
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
              className="bg-white rounded-2xl max-w-md w-full max-h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Languages className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Translate Scanner</h2>
                </div>
                <button
                  onClick={() => setShowTranslate(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Tab Switcher */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setTranslateTab('scan')}
                  className={`flex-1 py-3 text-sm font-semibold transition ${
                    translateTab === 'scan'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Text Scanner
                </button>
                <button
                  onClick={() => setTranslateTab('ai')}
                  className={`flex-1 py-3 text-sm font-semibold transition ${
                    translateTab === 'ai'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Touri AI
                </button>
              </div>

              {/* Scan Tab */}
              {translateTab === 'scan' && (
                <div className="p-4 space-y-4">
                  {/* Language Selection */}
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <button
                        onClick={() => {
                          setShowFromDropdown(true);
                          setShowToDropdown(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                      >
                        <span className="font-semibold">{getLangName(translateFrom)}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {showFromDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 w-40 z-10 max-h-64 overflow-y-auto"
                          style={{ maxHeight: '256px', overflowY: 'auto' }}
                        >
                          {LANGUAGES.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setTranslateFrom(lang.code);
                                setShowFromDropdown(false);
                              }}
                              className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition ${
                                translateFrom === lang.code ? 'bg-blue-50 text-blue-600' : ''
                              }`}
                            >
                              {lang.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        const temp = translateFrom;
                        setTranslateFrom(translateTo);
                        setTranslateTo(temp);
                      }}
                      className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>

                    <div className="relative">
                      <button
                        onClick={() => {
                          setShowToDropdown(true);
                          setShowFromDropdown(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <span className="font-semibold">{getLangName(translateTo)}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      {showToDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 w-40 z-10 max-h-64 overflow-y-auto"
                          style={{ maxHeight: '256px', overflowY: 'auto' }}
                        >
                          {LANGUAGES.filter(l => l.code !== 'auto').map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setTranslateTo(lang.code);
                                setShowToDropdown(false);
                              }}
                              className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition ${
                                translateTo === lang.code ? 'bg-blue-50 text-blue-600' : ''
                              }`}
                            >
                              {lang.name}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Input Area */}
                  <div>
                    {/* Camera and Text Row */}
                    <div className="relative flex items-start gap-2 mb-2">
                      {/* Camera Button */}
                      <label
                        className={`flex-shrink-0 p-3 rounded-xl cursor-pointer transition ${
                          isOcrProcessing
                            ? 'bg-blue-100 animate-pulse'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={handleImageUpload}
                          disabled={isOcrProcessing}
                          className="hidden"
                        />
                        {isOcrProcessing ? (
                          <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                        ) : (
                          <Camera className="w-5 h-5 text-gray-600" />
                        )}
                      </label>
                      {/* Textarea */}
                      <textarea
                        value={scanText}
                        onChange={(e) => setScanText(e.target.value)}
                        placeholder="Enter text to translate, or paste scanned text..."
                        className="flex-1 h-32 p-4 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    {/* Mic Button - aligned right */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={isListening ? stopVoiceInput : startVoiceInput}
                        className={`p-2 rounded-full transition ${
                          isListening
                            ? 'bg-red-500 text-white animate-pulse'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        aria-label={isListening ? 'Stop listening' : 'Start voice input'}
                      >
                        {isListening ? (
                          <MicOff className="w-5 h-5" />
                        ) : (
                          <Mic className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleTranslate}
                    disabled={!scanText.trim() || isTranslating}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isTranslating ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Translating...
                      </>
                    ) : (
                      <>Translate</>
                    )}
                  </button>

                  {/* Output Area */}
                  {translatedText && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Translation</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSpeak(translatedText, translateTo)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition"
                          >
                            <Volume2 className="w-5 h-5 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleCopy(translatedText)}
                            className="p-2 hover:bg-gray-200 rounded-lg transition"
                          >
                            {copied ? (
                              <Check className="w-5 h-5 text-green-600" />
                            ) : (
                              <Copy className="w-5 h-5 text-gray-600" />
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-900">{translatedText}</p>
                    </motion.div>
                  )}
                </div>
              )}

              {/* AI Tab */}
              {translateTab === 'ai' && (
                <div className="p-4 space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold text-purple-600">Touri AI</span> can help with translations, cultural explanations, and travel tips. Ask away!
                    </p>
                  </div>

                  <div className="relative">
                    <textarea
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      placeholder="Ask Touri AI about translations, cultural context, or travel advice..."
                      className="w-full h-32 p-4 pr-12 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                      type="button"
                      onClick={isListeningAi ? stopVoiceInput : startVoiceInputAi}
                      className={`absolute bottom-3 right-3 p-2 rounded-full transition ${
                        isListeningAi
                          ? 'bg-red-500 text-white animate-pulse'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      aria-label={isListeningAi ? 'Stop listening' : 'Start voice input'}
                    >
                      {isListeningAi ? (
                        <MicOff className="w-5 h-5" />
                      ) : (
                        <Mic className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <button
                    onClick={handleAiTranslate}
                    disabled={!aiQuestion.trim() || isAiLoading}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isAiLoading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Asking Touri...
                      </>
                    ) : (
                      <>
                        <Bot className="w-5 h-5" />
                        Ask Touri AI
                      </>
                    )}
                  </button>

                  {aiAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-purple-600" />
                        </div>
                        <p className="text-gray-900">{aiAnswer}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Close dropdowns when clicking outside */}
      {showFromDropdown || showToDropdown ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-0"
          onClick={() => {
            setShowFromDropdown(false);
            setShowToDropdown(false);
          }}
        />
      ) : null}

      {/* AI Assistant Button */}
      {console.log('HomeScreen rendering AIButton, isAssistantOpen:', isAssistantOpen)}
      <AIButton onOpen={onToggleAssistant} isAssistantOpen={isAssistantOpen} />
    </div>
  );
}

// NEW: Vertical Tour Card (Trip.com style - image 65-70%)
function VerticalTourCard({ tour, onNavigate, sponsored }: { tour: any; onNavigate: (screen: Screen, itemId?: string) => void; sponsored?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onNavigate('tour-details', tour.id)}
      className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer ${
        sponsored ? 'ring-2 ring-amber-400 ring-opacity-50' : ''
      }`}
    >
      {/* Image (70% of card) */}
      <div className="relative" style={{ aspectRatio: '4/5' }}>
        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
        
        {/* Sponsored Badge */}
        {sponsored && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
            Promoted
          </div>
        )}
        
        {/* AR Badge */}
        <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          AR
        </div>
        
        {/* Price */}
        <div className="absolute bottom-2 left-2 bg-white px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow-lg">
          ${tour.price}
        </div>
        
        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs font-semibold">
          {tour.duration}
        </div>
      </div>
      
      {/* Info (30% of card) */}
      <div className="p-3">
        <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2 leading-tight">{tour.title}</h3>
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
          <MapPin className="w-3 h-3" />
          <span className="line-clamp-1">{tour.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-xs">{tour.rating}</span>
          </div>
          <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-700 transition">
            Book
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// NEW: Vertical Product Card (Pinduoduo style - image 65-70%)
function VerticalProductCard({ product, onNavigate, sponsored }: { product: any; onNavigate: (screen: Screen, itemId?: string) => void; sponsored?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onNavigate('trade-product-detail', product.id)}
      className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer ${
        sponsored ? 'ring-2 ring-amber-400 ring-opacity-50' : ''
      }`}
    >
      {/* Image (70% of card) */}
      <div className="relative" style={{ aspectRatio: '4/5' }}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        
        {/* Sponsored Badge */}
        {sponsored && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-lg">
            Promoted
          </div>
        )}
        
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

