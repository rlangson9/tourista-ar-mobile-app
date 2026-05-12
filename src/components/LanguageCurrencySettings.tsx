import { ArrowLeft, Globe, DollarSign, Check, ChevronDown, RefreshCw, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExchangeRateData } from '../services/exchangeRateService';

interface LanguageCurrencySettingsProps {
  onBack: () => void;
  language: string;
  currency: string;
  onLanguageChange: (language: string) => void;
  onCurrencyChange: (currency: string) => void;
  exchangeRates?: ExchangeRateData | null;
  exchangeRatesLoading?: boolean;
  exchangeRatesError?: string | null;
  onRefreshExchangeRates?: () => void;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '中文' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
];

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', country: 'United States' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', country: 'China' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', country: 'South Africa' },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', country: 'Nigeria' },
  { code: 'EUR', name: 'Euro', symbol: '€', country: 'European Union' },
  { code: 'GBP', name: 'British Pound', symbol: '£', country: 'United Kingdom' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', country: 'Japan' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', country: 'Australia' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', country: 'Canada' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', country: 'Switzerland' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', country: 'India' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', country: 'Brazil' },
];

export function LanguageCurrencySettings({ onBack, language, currency, onLanguageChange, onCurrencyChange, exchangeRates, exchangeRatesLoading, exchangeRatesError, onRefreshExchangeRates }: LanguageCurrencySettingsProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedCurrency, setSelectedCurrency] = useState(currency);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);
  const currentCurrency = currencies.find(curr => curr.code === selectedCurrency);

  const handleSave = () => {
    // Save the language and currency settings
    onLanguageChange(selectedLanguage);
    onCurrencyChange(selectedCurrency);
    
    // Log the changes for debugging
    console.log('Saving language and currency settings:', {
      language: selectedLanguage,
      currency: selectedCurrency
    });
    
    // Return to the profile screen
    onBack();
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <h1 className="text-lg font-bold">Language & Currency</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Language Settings */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-semibold">Language</h3>
              <p className="text-sm text-gray-500">Choose your preferred language</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">
                    {currentLanguage?.code.toUpperCase()}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-medium">{currentLanguage?.name}</p>
                  <p className="text-sm text-gray-500">{currentLanguage?.nativeName}</p>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                showLanguageDropdown ? 'rotate-180' : ''
              }`} />
            </button>

            <AnimatePresence>
              {showLanguageDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto"
                >
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setSelectedLanguage(language.code);
                        setShowLanguageDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition ${
                        selectedLanguage === language.code ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-600">
                          {language.code.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{language.name}</p>
                        <p className="text-sm text-gray-500">{language.nativeName}</p>
                      </div>
                      {selectedLanguage === language.code && (
                        <Check className="w-5 h-5 text-blue-600" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-800">
              💡 Changing language will update the entire app interface. Some content may still be in English.
            </p>
          </div>
        </div>

        {/* Currency Settings */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-semibold">Currency</h3>
              <p className="text-sm text-gray-500">Set your preferred currency for prices</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
              className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-green-600">
                    {currentCurrency?.symbol}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-medium">{currentCurrency?.name}</p>
                  <p className="text-sm text-gray-500">{currentCurrency?.code} • {currentCurrency?.country}</p>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                showCurrencyDropdown ? 'rotate-180' : ''
              }`} />
            </button>

            <AnimatePresence>
              {showCurrencyDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto"
                >
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        setSelectedCurrency(currency.code);
                        setShowCurrencyDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition ${
                        selectedCurrency === currency.code ? 'bg-green-50' : ''
                      }`}
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-600">
                          {currency.symbol}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{currency.name}</p>
                        <p className="text-sm text-gray-500">{currency.code} • {currency.country}</p>
                      </div>
                      {selectedCurrency === currency.code && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 p-3 bg-green-50 rounded-xl">
            <p className="text-sm text-green-800">
              💰 Prices will be displayed in your selected currency. Exchange rates are updated daily.
            </p>
          </div>
        </div>

        {/* Real-Time Exchange Rates */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-semibold">Real-Time Exchange Rates</h3>
                <p className="text-sm text-gray-500">Live rates against USD</p>
              </div>
            </div>
            {onRefreshExchangeRates && (
              <button
                onClick={onRefreshExchangeRates}
                disabled={exchangeRatesLoading}
                className="p-2 hover:bg-gray-100 rounded-full transition disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 ${exchangeRatesLoading ? 'animate-spin' : ''}`} />
              </button>
            )}
          </div>

          {exchangeRatesError && (
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl mb-4">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-red-800">{exchangeRatesError}</p>
            </div>
          )}

          {exchangeRatesLoading && !exchangeRates && (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-100 rounded-xl animate-pulse">
                  <div className="w-24 h-4 bg-gray-200 rounded" />
                  <div className="w-16 h-4 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          )}

          {exchangeRates && (
            <>
              <div className="text-xs text-gray-500 mb-2">
                Last updated: {new Date(exchangeRates.timestamp * 1000).toLocaleString()}
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {currencies.map((curr) => {
                  const rate = exchangeRates.rates[curr.code];
                  if (!rate) return null;
                  return (
                    <div key={curr.code} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-blue-600">
                            {curr.symbol}
                          </span>
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">{curr.code}</p>
                          <p className="text-xs text-gray-500">{curr.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">
                          {rate.toFixed(4)}
                        </p>
                        <p className="text-xs text-gray-500">1 USD</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Regional Settings */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-semibold">Regional Settings</h3>
              <p className="text-sm text-gray-500">Additional preferences for your region</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Date Format</label>
              <select className="w-full p-3 border border-gray-200 rounded-xl bg-white">
                <option>MM/DD/YYYY (US)</option>
                <option>DD/MM/YYYY (UK)</option>
                <option>YYYY-MM-DD (ISO)</option>
                <option>DD.MM.YYYY (European)</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Time Format</label>
              <select className="w-full p-3 border border-gray-200 rounded-xl bg-white">
                <option>12-hour (AM/PM)</option>
                <option>24-hour</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Number Format</label>
              <select className="w-full p-3 border border-gray-200 rounded-xl bg-white">
                <option>1,234.56 (US)</option>
                <option>1.234,56 (European)</option>
                <option>1 234,56 (French)</option>
                <option>1,234.56 (Chinese)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Translation Settings */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-semibold">Translation Settings</h3>
              <p className="text-sm text-gray-500">AI-powered translation preferences</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Auto-translate Content</p>
                <p className="text-xs text-gray-500">Automatically translate tour descriptions</p>
              </div>
              <button className="w-12 h-6 bg-blue-600 rounded-full">
                <div className="w-5 h-5 bg-white rounded-full shadow-sm translate-x-6" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Show Original Text</p>
                <p className="text-xs text-gray-500">Display original language alongside translation</p>
              </div>
              <button className="w-12 h-6 bg-gray-300 rounded-full">
                <div className="w-5 h-5 bg-white rounded-full shadow-sm translate-x-0.5" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Translation Quality</p>
                <p className="text-xs text-gray-500">Use high-quality AI translation</p>
              </div>
              <button className="w-12 h-6 bg-blue-600 rounded-full">
                <div className="w-5 h-5 bg-white rounded-full shadow-sm translate-x-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSave}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
