import { ArrowLeft, Plane, Package, Wallet, MapPin, X, Plus, Save, Sun, Moon } from 'lucide-react';
import { useState } from 'react';

interface PreferencesSettingsProps {
  onBack: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function PreferencesSettings({ onBack, darkMode, onToggleDarkMode }: PreferencesSettingsProps) {
  const [travelInterests, setTravelInterests] = useState([
    'Business trips',
    'Cultural tours',
    'Safari adventures',
    'Historical sites'
  ]);
  const [productInterests, setProductInterests] = useState([
    'Machinery',
    'Electronics',
    'Textiles'
  ]);
  const [budgetRange, setBudgetRange] = useState({
    min: 1000,
    max: 50000
  });
  const [preferredCountries, setPreferredCountries] = useState([
    'China',
    'South Africa',
    'Nigeria'
  ]);
  
  const [newTravelInterest, setNewTravelInterest] = useState('');
  const [newProductInterest, setNewProductInterest] = useState('');
  const [newCountry, setNewCountry] = useState('');

  const addTravelInterest = () => {
    if (newTravelInterest.trim() && !travelInterests.includes(newTravelInterest.trim())) {
      setTravelInterests([...travelInterests, newTravelInterest.trim()]);
      setNewTravelInterest('');
    }
  };

  const removeTravelInterest = (interest: string) => {
    setTravelInterests(travelInterests.filter(i => i !== interest));
  };

  const addProductInterest = () => {
    if (newProductInterest.trim() && !productInterests.includes(newProductInterest.trim())) {
      setProductInterests([...productInterests, newProductInterest.trim()]);
      setNewProductInterest('');
    }
  };

  const removeProductInterest = (interest: string) => {
    setProductInterests(productInterests.filter(i => i !== interest));
  };

  const addCountry = () => {
    if (newCountry.trim() && !preferredCountries.includes(newCountry.trim())) {
      setPreferredCountries([...preferredCountries, newCountry.trim()]);
      setNewCountry('');
    }
  };

  const removeCountry = (country: string) => {
    setPreferredCountries(preferredCountries.filter(c => c !== country));
  };

  const handleSave = () => {
    // Here you would save the preferences to your backend/state management
    console.log('Saving preferences:', {
      travelInterests,
      productInterests,
      budgetRange,
      preferredCountries
    });
    onBack();
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background">
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
            <h1 className="text-2xl font-bold">Preferences</h1>
            <p className="text-blue-100 text-sm">Customize your experience</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Travel Interests */}
        <div className="bg-card rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Plane className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold">Travel Interests</h2>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {travelInterests.map((interest, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span className="text-sm">{interest}</span>
                <button
                  onClick={() => removeTravelInterest(interest)}
                  className="hover:text-blue-900 dark:hover:text-blue-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newTravelInterest}
              onChange={(e) => setNewTravelInterest(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTravelInterest()}
              placeholder="Add travel interest"
              className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-card-foreground"
            />
            <button
              onClick={addTravelInterest}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Interests */}
        <div className="bg-card rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold">Product Interests</h2>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {productInterests.map((interest, index) => (
              <div
                key={index}
                className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span className="text-sm">{interest}</span>
                <button
                  onClick={() => removeProductInterest(interest)}
                  className="hover:text-green-900 dark:hover:text-green-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newProductInterest}
              onChange={(e) => setNewProductInterest(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addProductInterest()}
              placeholder="Add product interest"
              className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-card-foreground"
            />
            <button
              onClick={addProductInterest}
              className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Budget Range */}
        <div className="bg-card rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold">Budget Range</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Minimum Budget: ${budgetRange.min.toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={budgetRange.min}
                onChange={(e) => setBudgetRange({ ...budgetRange, min: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Maximum Budget: ${budgetRange.max.toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max="200000"
                step="1000"
                value={budgetRange.max}
                onChange={(e) => setBudgetRange({ ...budgetRange, max: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Budget Range: ${budgetRange.min.toLocaleString()} - ${budgetRange.max.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Dark Mode */}
        <div className="bg-card rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            {darkMode ? (
              <Moon className="w-5 h-5 text-blue-600" />
            ) : (
              <Sun className="w-5 h-5 text-blue-600" />
            )}
            <h2 className="text-lg font-bold">Dark Mode</h2>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Toggle between light and dark themes
            </p>
            <button
              onClick={onToggleDarkMode}
              className={`w-14 h-8 rounded-full p-1 transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Preferred Countries */}
        <div className="bg-card rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold">Preferred Countries</h2>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {preferredCountries.map((country, index) => (
              <div
                key={index}
                className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-3 py-1 rounded-full flex items-center gap-2"
              >
                <span className="text-sm">{country}</span>
                <button
                  onClick={() => removeCountry(country)}
                  className="hover:text-purple-900 dark:hover:text-purple-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newCountry}
              onChange={(e) => setNewCountry(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCountry()}
              placeholder="Add preferred country"
              className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-card-foreground"
            />
            <button
              onClick={addCountry}
              className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
