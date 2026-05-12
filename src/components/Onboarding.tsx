import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Globe, Briefcase, Compass, User, Building2, Factory, ArrowLeft, X, ExternalLink, Eye, EyeOff, CheckCircle, Mail, Lock, Phone, AlertCircle, Umbrella, Mountain, Coffee, Landmark, Cat } from 'lucide-react';
import touristaLogo from '/TOURISTA AR 2.png';

interface OnboardingProps {
  onComplete: () => void;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'sn', name: 'Shona', flag: '🇿🇼' },
  { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
  { code: 'zu', name: 'Zulu', flag: '🇿🇦' },
];

const travelInterests = [
  { id: 'business', name: 'Business Trip', icon: Briefcase, color: 'bg-blue-500' },
  { id: 'cultural', name: 'Cultural Tour', icon: Compass, color: 'bg-amber-500' },
  { id: 'safari', name: 'Safari Adventure', icon: Globe, color: 'bg-green-500' },
  { id: 'beach', name: 'Beach Vacation', icon: Umbrella, color: 'bg-cyan-500' },
  { id: 'mountain', name: 'Mountain Hiking', icon: Mountain, color: 'bg-emerald-500' },
  { id: 'food', name: 'Food Tour', icon: Coffee, color: 'bg-amber-600' },
  { id: 'historical', name: 'Historical Sites', icon: Landmark, color: 'bg-gray-600' },
  { id: 'wildlife', name: 'Wildlife Watching', icon: Cat, color: 'bg-orange-500' },
];

// Add Umbrella, Mountain, Coffee, Landmark, Cat to imports

type AccountRole = 'user' | 'partner' | 'supplier' | null;
type AuthView = 'register' | 'signin' | 'forgot-password' | 'success';

// --- Validation helpers ---
function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePhone(phone: string) {
  return /^\+?[\d\s\-()]{7,}$/.test(phone);
}
function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' };
  if (score <= 2) return { score, label: 'Fair', color: 'bg-amber-500' };
  if (score <= 3) return { score, label: 'Good', color: 'bg-blue-500' };
  return { score, label: 'Strong', color: 'bg-green-500' };
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [showInterestsDropdown, setShowInterestsDropdown] = useState(false);
  const [selectedRole, setSelectedRole] = useState<AccountRole>(null);
  const [portalModal, setPortalModal] = useState<{ role: 'partner' | 'supplier' } | null>(null);
  const [authView, setAuthView] = useState<AuthView>('register');

  // --- Registration form state ---
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [regTouched, setRegTouched] = useState<Record<string, boolean>>({});
  const [regSubmitting, setRegSubmitting] = useState(false);

  // --- Sign-in form state ---
  const [signEmail, setSignEmail] = useState('');
  const [signPassword, setSignPassword] = useState('');
  const [showSignPassword, setShowSignPassword] = useState(false);
  const [signTouched, setSignTouched] = useState<Record<string, boolean>>({});
  const [signSubmitting, setSignSubmitting] = useState(false);

  // --- Forgot password state ---
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotTouched, setForgotTouched] = useState(false);

  // --- Derived validation ---
  const regErrors = {
    name: regTouched.name && regName.trim().length < 2 ? 'Please enter your full name' : '',
    email: regTouched.email && !validateEmail(regEmail) ? 'Please enter a valid email address' : '',
    phone: regTouched.phone && !validatePhone(regPhone) ? 'Please enter a valid phone number' : '',
    password: regTouched.password && regPassword.length < 8 ? 'Password must be at least 8 characters' : '',
  };
  const regValid = regName.trim().length >= 2 && validateEmail(regEmail) && validatePhone(regPhone) && regPassword.length >= 8;

  const signErrors = {
    email: signTouched.email && !validateEmail(signEmail) ? 'Please enter a valid email address' : '',
    password: signTouched.password && signPassword.length < 1 ? 'Please enter your password' : '',
  };
  const signValid = validateEmail(signEmail) && signPassword.length > 0;

  const passwordStrength = getPasswordStrength(regPassword);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (authView === 'signin' || authView === 'forgot-password') {
      setAuthView('register');
      return;
    }
    if (step > 0) {
      setStep(step - 1);
      if (step === 4) setSelectedRole(null);
    }
  };

  const handleRegisterSubmit = async () => {
    // Touch all fields to show errors
    setRegTouched({ name: true, email: true, phone: true, password: true });
    if (!regValid) return;
    setRegSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setRegSubmitting(false);
    setAuthView('success');
  };

  const handleSignInSubmit = async () => {
    setSignTouched({ email: true, password: true });
    if (!signValid) return;
    setSignSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSignSubmitting(false);
    setAuthView('success');
  };

  const handleForgotSubmit = () => {
    setForgotTouched(true);
    if (!validateEmail(forgotEmail)) return;
    setForgotSent(true);
  };

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleRoleSelection = (role: AccountRole) => {
    setSelectedRole(role);
    if (role === 'user') {
      // Continue with mobile registration
      setTimeout(() => setStep(4), 300);
    } else {
      // Show modal for Partner/Supplier redirect
      setPortalModal({ role: role as 'partner' | 'supplier' });
      setSelectedRole(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex flex-col" style={{ maxWidth: '100%', width: '100%', height: '100vh', margin: 0, padding: 0 }}>
      <AnimatePresence mode="wait">
        {/* Step 0: Welcome */}
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-6 text-white text-center"
            style={{ minHeight: '100vh' }}
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-8"
            >
              <img src={touristaLogo} alt="Tourista AR" className="h-24 w-auto" />
            </motion.div>
            
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold mb-4 leading-tight"
            >
              Connecting China & the world through immersive travel and intelligent trade solutions
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base text-blue-100 mb-12 max-w-md leading-relaxed"
            >
              Explore destinations with AR-powered experiences and source products seamlessly through our AI-driven trade facilitation platform.
            </motion.p>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleNext}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2"
            >
              Get Started
              <ChevronRight className="w-5 h-5" />
            </motion.button>

            <div className="mt-12 flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step ? 'w-8 bg-white' : 'w-1.5 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 1: Language Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col p-6 text-white"
          >
            <div className="mb-8 mt-12">
              <Globe className="w-12 h-12 mb-4" />
              <h2 className="text-3xl font-bold mb-2">Select Your Language</h2>
              <p className="text-blue-100">Choose your preferred language</p>
            </div>

            <div className="flex-1 flex items-start justify-center pt-8">
              <div className="w-full max-w-xs">
                <div className="relative">
                  <button
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-white hover:bg-white/20 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">
                        {languages.find(lang => lang.code === selectedLanguage)?.flag || '🌍'}
                      </span>
                      <span className="font-semibold text-lg">
                        {languages.find(lang => lang.code === selectedLanguage)?.name || 'Select Language'}
                      </span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-white transition-transform ${
                      showLanguageDropdown ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  <AnimatePresence>
                    {showLanguageDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl shadow-xl z-20 max-h-48 overflow-y-auto"
                      >
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setSelectedLanguage(lang.code);
                              setShowLanguageDropdown(false);
                            }}
                            className={`w-full p-3 flex items-center gap-3 transition-all ${
                              selectedLanguage === lang.code
                                ? 'bg-white text-blue-600'
                                : 'text-white hover:bg-white/20'
                            }`}
                          >
                            <span className="text-2xl">{lang.flag}</span>
                            <span className="font-semibold text-base">{lang.name}</span>
                            {selectedLanguage === lang.code && (
                              <div className="ml-auto w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                                ✓
                              </div>
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-white text-blue-600 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all mt-12"
            >
              Continue
            </button>

            <div className="mt-6 flex gap-2 justify-center">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step ? 'w-8 bg-white' : 'w-1.5 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Travel Interests */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col p-6 text-white"
          >
            <div className="mb-8 mt-12">
              <Compass className="w-12 h-12 mb-4" />
              <h2 className="text-3xl font-bold mb-2">Your Interests</h2>
              <p className="text-blue-100">Select what interests you (optional)</p>
            </div>

            <div className="flex-1 flex items-start justify-center pt-8">
              <div className="w-full max-w-xs">
                <div className="relative">
                  <button
                    onClick={() => setShowInterestsDropdown(!showInterestsDropdown)}
                    className="w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-white hover:bg-white/20 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Compass className="w-6 h-6 text-white" />
                      <span className="font-semibold text-lg">
                        {selectedInterests.length > 0
                          ? `${selectedInterests.length} selected`
                          : 'Select Interests'
                        }
                      </span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-white transition-transform ${
                      showInterestsDropdown ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  <AnimatePresence>
                    {showInterestsDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl shadow-xl z-20 max-h-64 overflow-y-auto"
                      >
                        {travelInterests.map((interest) => {
                          const Icon = interest.icon;
                          const isSelected = selectedInterests.includes(interest.id);
                          return (
                            <button
                              key={interest.id}
                              onClick={() => toggleInterest(interest.id)}
                              className={`w-full p-3 flex items-center gap-3 transition-all ${
                                isSelected
                                  ? 'bg-white text-blue-600'
                                  : 'text-white hover:bg-white/20'
                              }`}
                            >
                              <div className={`w-10 h-10 ${isSelected ? interest.color : 'bg-white/20'} rounded-xl flex items-center justify-center`}>
                                <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-white/80'}`} />
                              </div>
                              <span className="font-semibold text-base flex-1">{interest.name}</span>
                              {isSelected && (
                                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">
                                  ✓
                                </div>
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

            <button
              onClick={handleNext}
              className="w-full bg-white text-blue-600 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all mt-12"
            >
              Continue
            </button>

            <div className="mt-6 flex gap-2 justify-center">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step ? 'w-8 bg-white' : 'w-1.5 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Role Selection */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col p-6 text-white"
          >
            <div className="mb-8 mt-12">
              <h2 className="text-3xl font-bold mb-2">How would you like to join Tourista AR?</h2>
              <p className="text-blue-100">Select your account type</p>
            </div>

            <div className="flex-1 space-y-4">
              {/* User */}
              <button
                onClick={() => handleRoleSelection('user')}
                className="w-full p-6 rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-white hover:bg-white/20 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">User</h3>
                    <p className="text-sm text-blue-100">Travel & Trade</p>
                    <p className="text-xs text-blue-200 mt-2">Book tours and source products</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/50" />
                </div>
              </button>

              {/* Partner */}
              <button
                onClick={() => handleRoleSelection('partner')}
                className="w-full p-6 rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-white hover:bg-white/20 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">Partner</h3>
                    <p className="text-sm text-blue-100">Tour Agency</p>
                    <p className="text-xs text-blue-200 mt-2">List and manage tour packages</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/50" />
                </div>
              </button>

              {/* Supplier */}
              <button
                onClick={() => handleRoleSelection('supplier')}
                className="w-full p-6 rounded-3xl bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-white hover:bg-white/20 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Factory className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">Supplier</h3>
                    <p className="text-sm text-blue-100">Trade Vendor</p>
                    <p className="text-xs text-blue-200 mt-2">Sell products to global buyers</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/50" />
                </div>
              </button>
            </div>

            <p className="text-sm text-blue-100 text-center mt-6 bg-white/10 p-4 rounded-2xl">
              Partners and Suppliers will be redirected to our secure web portal for registration
            </p>

            <div className="mt-6 flex gap-2 justify-center">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step ? 'w-8 bg-white' : 'w-1.5 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Auth screens */}
        {step === 4 && authView === 'register' && (
          <motion.div
            key="step4-register"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col p-6 text-white overflow-y-auto"
          >
            <button
              onClick={handleBack}
              className="mb-6 mt-6 flex items-center gap-2 text-blue-100 hover:text-white transition flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <div className="mb-6 flex-shrink-0">
              <h2 className="text-3xl font-bold mb-1">Create Your Account</h2>
              <p className="text-blue-100">Join thousands of global travelers and traders</p>
            </div>

            <div className="space-y-4 flex-shrink-0">
              {/* Full name */}
              <div>
                <div className={`flex items-center gap-3 w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border transition ${
                  regErrors.name ? 'border-red-400' : 'border-white/20 focus-within:border-white'
                }`}>
                  <User className="w-5 h-5 text-white/50 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Full name"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    onBlur={() => setRegTouched((t) => ({ ...t, name: true }))}
                    className="flex-1 bg-transparent placeholder-white/50 focus:outline-none text-white"
                  />
                </div>
                {regErrors.name && (
                  <p className="flex items-center gap-1 text-red-300 text-xs mt-1 ml-1">
                    <AlertCircle className="w-3 h-3" />{regErrors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <div className={`flex items-center gap-3 w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border transition ${
                  regErrors.email ? 'border-red-400' : 'border-white/20 focus-within:border-white'
                }`}>
                  <Mail className="w-5 h-5 text-white/50 flex-shrink-0" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    onBlur={() => setRegTouched((t) => ({ ...t, email: true }))}
                    className="flex-1 bg-transparent placeholder-white/50 focus:outline-none text-white"
                  />
                </div>
                {regErrors.email && (
                  <p className="flex items-center gap-1 text-red-300 text-xs mt-1 ml-1">
                    <AlertCircle className="w-3 h-3" />{regErrors.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <div className={`flex items-center gap-3 w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border transition ${
                  regErrors.phone ? 'border-red-400' : 'border-white/20 focus-within:border-white'
                }`}>
                  <Phone className="w-5 h-5 text-white/50 flex-shrink-0" />
                  <input
                    type="tel"
                    placeholder="Phone number (e.g. +260 97 000 0000)"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    onBlur={() => setRegTouched((t) => ({ ...t, phone: true }))}
                    className="flex-1 bg-transparent placeholder-white/50 focus:outline-none text-white"
                  />
                </div>
                {regErrors.phone && (
                  <p className="flex items-center gap-1 text-red-300 text-xs mt-1 ml-1">
                    <AlertCircle className="w-3 h-3" />{regErrors.phone}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className={`flex items-center gap-3 w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border transition ${
                  regErrors.password ? 'border-red-400' : 'border-white/20 focus-within:border-white'
                }`}>
                  <Lock className="w-5 h-5 text-white/50 flex-shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password (min. 8 characters)"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    onBlur={() => setRegTouched((t) => ({ ...t, password: true }))}
                    className="flex-1 bg-transparent placeholder-white/50 focus:outline-none text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-white/50 hover:text-white transition flex-shrink-0"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {regErrors.password && (
                  <p className="flex items-center gap-1 text-red-300 text-xs mt-1 ml-1">
                    <AlertCircle className="w-3 h-3" />{regErrors.password}
                  </p>
                )}
                {/* Password strength bar */}
                {regPassword.length > 0 && (
                  <div className="mt-2 ml-1">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            i <= passwordStrength.score ? passwordStrength.color : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-blue-100">{passwordStrength.label} password</p>
                  </div>
                )}
              </div>

              {/* Social auth */}
              <div className="pt-2">
                <div className="text-sm text-center text-blue-100 mb-3">Or continue with</div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 rounded-2xl bg-white text-gray-900 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button className="p-3 rounded-2xl bg-green-500 text-white font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition">
                    <span className="text-xl">💬</span>
                    WeChat
                  </button>
                  <button className="p-3 rounded-2xl bg-[#1877F2] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#166fe5] transition">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M9.198 21.5h5.604c2.43 0 4.4-1.97 4.4-4.4v-8.59c0-2.43-1.97-4.4-4.4-4.4h-5.604c-2.43 0-4.4 1.97-4.4 4.4v8.59c0 2.43 1.97 4.4 4.4 4.4zm0-15.39c1.34 0 2.43 1.09 2.43 2.43s-1.09 2.43-2.43 2.43-2.43-1.09-2.43-2.43 1.09-2.43 2.43-2.43zm5.604 10.56c1.34 0 2.43-1.09 2.43-2.43s-1.09-2.43-2.43-2.43-2.43 1.09-2.43 2.43 1.09 2.43 2.43 2.43z"/>
                    </svg>
                    Facebook
                  </button>
                  <button className="p-3 rounded-2xl bg-gradient-to-r from-[#E4405F] via-[#FCAF45] to-[#833AB4] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"/>
                    </svg>
                    Instagram
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleRegisterSubmit}
              disabled={regSubmitting}
              className="w-full bg-white text-blue-600 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all mt-6 flex-shrink-0 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {regSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </>
              ) : 'Create Account'}
            </button>

            <p className="text-center text-sm text-blue-100 mt-4 flex-shrink-0">
              Already have an account?{' '}
              <button
                onClick={() => setAuthView('signin')}
                className="underline font-semibold hover:text-white transition"
              >
                Sign in
              </button>
            </p>

            <div className="mt-6 flex gap-2 justify-center flex-shrink-0">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step ? 'w-8 bg-white' : 'w-1.5 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Sign In */}
        {step === 4 && authView === 'signin' && (
          <motion.div
            key="step4-signin"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col p-6 text-white"
          >
            <button
              onClick={handleBack}
              className="mb-8 mt-6 flex items-center gap-2 text-blue-100 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-1">Welcome back</h2>
              <p className="text-blue-100">Sign in to your Tourista AR account</p>
            </div>

            <div className="flex-1 space-y-4">
              {/* Email */}
              <div>
                <div className={`flex items-center gap-3 w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border transition ${
                  signErrors.email ? 'border-red-400' : 'border-white/20 focus-within:border-white'
                }`}>
                  <Mail className="w-5 h-5 text-white/50 flex-shrink-0" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={signEmail}
                    onChange={(e) => setSignEmail(e.target.value)}
                    onBlur={() => setSignTouched((t) => ({ ...t, email: true }))}
                    className="flex-1 bg-transparent placeholder-white/50 focus:outline-none text-white"
                  />
                </div>
                {signErrors.email && (
                  <p className="flex items-center gap-1 text-red-300 text-xs mt-1 ml-1">
                    <AlertCircle className="w-3 h-3" />{signErrors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className={`flex items-center gap-3 w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border transition ${
                  signErrors.password ? 'border-red-400' : 'border-white/20 focus-within:border-white'
                }`}>
                  <Lock className="w-5 h-5 text-white/50 flex-shrink-0" />
                  <input
                    type={showSignPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={signPassword}
                    onChange={(e) => setSignPassword(e.target.value)}
                    onBlur={() => setSignTouched((t) => ({ ...t, password: true }))}
                    className="flex-1 bg-transparent placeholder-white/50 focus:outline-none text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignPassword(!showSignPassword)}
                    className="text-white/50 hover:text-white transition flex-shrink-0"
                  >
                    {showSignPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {signErrors.password && (
                  <p className="flex items-center gap-1 text-red-300 text-xs mt-1 ml-1">
                    <AlertCircle className="w-3 h-3" />{signErrors.password}
                  </p>
                )}
              </div>

              <button
                onClick={() => setAuthView('forgot-password')}
                className="text-sm text-blue-100 hover:text-white transition text-right w-full"
              >
                Forgot password?
              </button>

              {/* Social auth */}
              <div className="pt-2">
                <div className="text-sm text-center text-blue-100 mb-3">Or continue with</div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 rounded-2xl bg-white text-gray-900 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button className="p-3 rounded-2xl bg-green-500 text-white font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition">
                    <span className="text-xl">💬</span>
                    WeChat
                  </button>
                  <button className="p-3 rounded-2xl bg-[#1877F2] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#166fe5] transition">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M9.198 21.5h5.604c2.43 0 4.4-1.97 4.4-4.4v-8.59c0-2.43-1.97-4.4-4.4-4.4h-5.604c-2.43 0-4.4 1.97-4.4 4.4v8.59c0 2.43 1.97 4.4 4.4 4.4zm0-15.39c1.34 0 2.43 1.09 2.43 2.43s-1.09 2.43-2.43 2.43-2.43-1.09-2.43-2.43 1.09-2.43 2.43-2.43zm5.604 10.56c1.34 0 2.43-1.09 2.43-2.43s-1.09-2.43-2.43-2.43-2.43 1.09-2.43 2.43 1.09 2.43 2.43 2.43z"/>
                    </svg>
                    Facebook
                  </button>
                  <button className="p-3 rounded-2xl bg-gradient-to-r from-[#E4405F] via-[#FCAF45] to-[#833AB4] text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"/>
                    </svg>
                    Instagram
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleSignInSubmit}
              disabled={signSubmitting}
              className="w-full bg-white text-blue-600 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all mt-6 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {signSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : 'Sign In'}
            </button>

            <p className="text-center text-sm text-blue-100 mt-4">
              Don't have an account?{' '}
              <button
                onClick={() => setAuthView('register')}
                className="underline font-semibold hover:text-white transition"
              >
                Create one
              </button>
            </p>
          </motion.div>
        )}

        {/* Step 4: Forgot Password */}
        {step === 4 && authView === 'forgot-password' && (
          <motion.div
            key="step4-forgot"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex-1 flex flex-col p-6 text-white"
          >
            <button
              onClick={() => setAuthView('signin')}
              className="mb-8 mt-6 flex items-center gap-2 text-blue-100 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to sign in
            </button>

            <div className="mb-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-1">Reset Password</h2>
              <p className="text-blue-100">
                {forgotSent
                  ? 'Check your inbox — we sent a reset link.'
                  : "Enter your email and we'll send you a reset link."}
              </p>
            </div>

            {!forgotSent ? (
              <>
                <div>
                  <div className={`flex items-center gap-3 w-full p-4 rounded-2xl bg-white/10 backdrop-blur-sm border transition ${
                    forgotTouched && !validateEmail(forgotEmail) ? 'border-red-400' : 'border-white/20 focus-within:border-white'
                  }`}>
                    <Mail className="w-5 h-5 text-white/50 flex-shrink-0" />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      onBlur={() => setForgotTouched(true)}
                      className="flex-1 bg-transparent placeholder-white/50 focus:outline-none text-white"
                    />
                  </div>
                  {forgotTouched && !validateEmail(forgotEmail) && (
                    <p className="flex items-center gap-1 text-red-300 text-xs mt-1 ml-1">
                      <AlertCircle className="w-3 h-3" />Please enter a valid email address
                    </p>
                  )}
                </div>
                <button
                  onClick={handleForgotSubmit}
                  className="w-full bg-white text-blue-600 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all mt-6"
                >
                  Send Reset Link
                </button>
              </>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/10 rounded-3xl p-6 text-center"
              >
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="font-semibold mb-1">Email sent to</p>
                <p className="text-blue-100 text-sm mb-4">{forgotEmail}</p>
                <button
                  onClick={() => setAuthView('signin')}
                  className="text-sm underline text-blue-100 hover:text-white"
                >
                  Back to sign in
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step 4: Success */}
        {step === 4 && authView === 'success' && (
          <motion.div
            key="step4-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center p-6 text-white text-center"
          >
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
              className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              >
                <CheckCircle className="w-16 h-16 text-green-400" />
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold mb-3"
            >
              You're all set!
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-blue-100 text-lg mb-2"
            >
              Welcome to Tourista AR
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-blue-200 text-sm mb-12 max-w-xs"
            >
              Your account is ready. Explore destinations with AR or start sourcing products globally.
            </motion.p>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={onComplete}
              className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Explore
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portal Redirect Modal */}
      <AnimatePresence>
        {portalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            onClick={() => setPortalModal(null)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${portalModal.role === 'partner' ? 'bg-amber-100' : 'bg-green-100'}`}>
                {portalModal.role === 'partner'
                  ? <Building2 className="w-8 h-8 text-amber-600" />
                  : <Factory className="w-8 h-8 text-green-600" />}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                {portalModal.role === 'partner' ? 'Partner' : 'Supplier'} Registration
              </h3>
              <p className="text-gray-500 text-center text-sm mb-6 leading-relaxed">
                {portalModal.role === 'partner' ? 'Partner' : 'Supplier'} accounts are registered through our secure web portal where you can submit your business documents and verification details.
              </p>

              {/* URL box */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ExternalLink className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Registration portal</p>
                  <p className="text-sm font-semibold text-blue-600">tourista-ar.com/register</p>
                </div>
              </div>

              {/* Buttons */}
              <button
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-base mb-3 hover:bg-blue-700 transition flex items-center justify-center gap-2"
                onClick={() => {
                  window.open('https://tourista-ar.com/register', '_blank');
                  setPortalModal(null);
                }}
              >
                <ExternalLink className="w-4 h-4" />
                Open Registration Portal
              </button>
              <button
                className="w-full text-gray-500 py-3 rounded-2xl font-semibold text-sm hover:bg-gray-50 transition flex items-center justify-center gap-2"
                onClick={() => setPortalModal(null)}
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
