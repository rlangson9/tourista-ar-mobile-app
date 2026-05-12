import { ArrowLeft, User, MapPin, Heart, Wallet as WalletIcon, Globe, FileText, HelpCircle, LogOut, ChevronRight, Star, Calendar, Briefcase, Gift, Settings, Plane, Package, Shield, Award, Camera, Lock, Bell, CreditCard, Edit2, Check, CheckCircle, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Screen, AppMode } from '../App';
import { NotificationSettings } from './NotificationSettings';
import { LanguageCurrencySettings } from './LanguageCurrencySettings';
import { PreferencesSettings } from './PreferencesSettings';
import { PaymentMethods } from './PaymentMethods';
import { TransactionHistory } from './TransactionHistory';
import { ReferralHistory } from './ReferralHistory';
import { Wallet as WalletComponent } from './Wallet';
import { CustomerSupportChat } from './CustomerSupportChat';
import { TwoFactorAuth } from './TwoFactorAuth';
import { BottomNav } from './BottomNav';

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
  onSwitchToPartner: () => void;
  appMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  language: string;
  currency: string;
  onLanguageChange: (language: string) => void;
  onCurrencyChange: (currency: string) => void;
  exchangeRates?: any;
  exchangeRatesLoading?: boolean;
  exchangeRatesError?: string | null;
  onRefreshExchangeRates?: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function ProfileScreen({ onNavigate, onSwitchToPartner, appMode, onModeChange, language, currency, onLanguageChange, onCurrencyChange, exchangeRates, exchangeRatesLoading, exchangeRatesError, onRefreshExchangeRates, darkMode, onToggleDarkMode }: ProfileScreenProps) {
  const [loyaltyPoints, setLoyaltyPoints] = useState(850);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showLanguageCurrencySettings, setShowLanguageCurrencySettings] = useState(false);
  const [showPreferencesSettings, setShowPreferencesSettings] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showCustomerSupportChat, setShowCustomerSupportChat] = useState(false);
  const [showTwoFactorAuth, setShowTwoFactorAuth] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState({
    google: false,
    facebook: true,
    apple: false,
    wechat: false,
    linkedin: false
  });
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState('JOHNDOE123');
  const [referrals, setReferrals] = useState(5);
  const [rewardPoints, setRewardPoints] = useState(1500);
  const [showNotification, setShowNotification] = useState(false);
  const [showConvertPointsModal, setShowConvertPointsModal] = useState(false);
  const [showReferralHistory, setShowReferralHistory] = useState(false);
  const [conversionOption, setConversionOption] = useState('discount');
  const [pointsToConvert, setPointsToConvert] = useState('');
  const loyaltyLevel = getLoyaltyLevel(loyaltyPoints);

  if (showNotificationSettings) {
    return (
      <NotificationSettings
        onBack={() => setShowNotificationSettings(false)}
      />
    );
  }

  if (showLanguageCurrencySettings) {
    return (
      <LanguageCurrencySettings
        onBack={() => setShowLanguageCurrencySettings(false)}
        language={language}
        currency={currency}
        onLanguageChange={onLanguageChange}
        onCurrencyChange={onCurrencyChange}
        exchangeRates={exchangeRates}
        exchangeRatesLoading={exchangeRatesLoading}
        exchangeRatesError={exchangeRatesError}
        onRefreshExchangeRates={onRefreshExchangeRates}
      />
    );
  }

  if (showPreferencesSettings) {
    return (
      <PreferencesSettings
        onBack={() => setShowPreferencesSettings(false)}
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
      />
    );
  }

  if (showPaymentMethods) {
    return (
      <PaymentMethods
        onBack={() => setShowPaymentMethods(false)}
      />
    );
  }

  if (showTransactionHistory) {
    return (
      <TransactionHistory
        onBack={() => setShowTransactionHistory(false)}
      />
    );
  }

  if (showReferralHistory) {
    return (
      <ReferralHistory
        onBack={() => setShowReferralHistory(false)}
      />
    );
  }

  if (showWallet) {
    return (
      <WalletComponent
        onBack={() => setShowWallet(false)}
      />
    );
  }

  if (isEditingProfile) {
    return (
      <div className="max-w-md mx-auto bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsEditingProfile(false)}
              className="p-2 hover:bg-white/10 rounded-full transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Edit Profile</h1>
              <p className="text-blue-100 text-sm">Update your personal information</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john.doe@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
                <input
                  type="text"
                  defaultValue="South Africa"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="text"
                  defaultValue="Jan 15, 1990"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showCustomerSupportChat) {
    return (
      <CustomerSupportChat
        onBack={() => setShowCustomerSupportChat(false)}
      />
    );
  }

  if (showTwoFactorAuth) {
    return (
      <TwoFactorAuth
        onBack={() => setShowTwoFactorAuth(false)}
      />
    );
  }

  const handleShare = async () => {
    const referralLink = `${window.location.origin}?referral=${referralCode}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Join Tourista AR',
          text: `Join Tourista AR using my referral code ${referralCode} to earn rewards!`,
          url: referralLink,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(referralLink);
        // Show notification
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleConvertPoints = () => {
    const points = parseInt(pointsToConvert);
    if (isNaN(points) || points <= 0 || points > loyaltyPoints) {
      alert('Please enter a valid number of points to convert');
      return;
    }

    // Update loyalty points
    setLoyaltyPoints(prev => prev - points);
    
    // Show success notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
    
    // Close modal
    setShowConvertPointsModal(false);
    setPointsToConvert('');
  };

  const handleProfilePictureChange = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result;
          if (typeof result === 'string') {
            setProfileImage(result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleConnectAccount = async (account: keyof typeof connectedAccounts) => {
    setIsConnecting(account);
    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 1500));
      setConnectedAccounts(prev => ({
        ...prev,
        [account]: true
      }));
      // In a real app, this would integrate with the respective OAuth flow
    } catch (error) {
      console.error(`Failed to connect ${account}:`, error);
    } finally {
      setIsConnecting(null);
    }
  };

  const handleDisconnectAccount = async (account: keyof typeof connectedAccounts) => {
    setIsConnecting(account);
    try {
      // Simulate disconnection process
      await new Promise(resolve => setTimeout(resolve, 1000));
      setConnectedAccounts(prev => ({
        ...prev,
        [account]: false
      }));
    } catch (error) {
      console.error(`Failed to disconnect ${account}:`, error);
    } finally {
      setIsConnecting(null);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 pb-20 pt-8">
      {/* Header with Profile Info */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg" style={{ padding: '7px 24px' }}>
        <button
          onClick={() => onNavigate('home')}
          className="mb-4 p-2 hover:bg-white/10 rounded-full transition"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            {profileImage ? (
              <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg">
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
                JD
              </div>
            )}
            <button 
              className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
              onClick={handleProfilePictureChange}
              aria-label="Change profile picture"
            >
              <Camera className="w-4 h-4 text-blue-600" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="text-2xl font-bold hover:underline transition"
              >
                John Doe
              </button>
              {/* Mode Toggle Next to Name */}
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full p-0.5">
                <button
                  onClick={() => onModeChange('tourism')}
                  className={`p-1 rounded-full transition ${
                    appMode === 'tourism' ? 'bg-white/30' : ''
                  }`}
                  title="Travel Mode"
                >
                  <Plane className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onModeChange('trade')}
                  className={`p-1 rounded-full transition ${
                    appMode === 'trade' ? 'bg-white/30' : ''
                  }`}
                  title="Trade Mode"
                >
                  <Package className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-blue-100 text-sm mb-2">john.doe@email.com</p>
            <div className="flex items-center gap-2">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                <Award className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold">{loyaltyLevel}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-sm font-semibold">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Loyalty System - Minimalistic Design */}
        <div className="bg-white rounded-2xl shadow-sm" style={{ padding: '10px 24px' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Loyalty Rewards</h2>
              <p className="text-sm text-gray-500">Earn points, unlock benefits</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">{loyaltyPoints}</p>
              <p className="text-xs text-gray-500">points</p>
            </div>
          </div>
          
          {/* Clean Level Badge */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`px-4 rounded-full font-bold text-sm ${
              loyaltyLevel === 'Platinum' ? 'bg-gray-900 text-white' :
              loyaltyLevel === 'Gold' ? 'bg-amber-500 text-white' :
              loyaltyLevel === 'Silver' ? 'bg-gray-400 text-white' :
              'bg-amber-700 text-white'
            }`} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
              {loyaltyLevel} Member
            </div>
            <div className="flex-1 text-sm text-gray-600">
              {getPointsToNextLevel(loyaltyPoints) > 0 
                ? `${getPointsToNextLevel(loyaltyPoints)} pts to ${getNextLevel(loyaltyLevel)}`
                : 'Max level reached'}
            </div>
          </div>

          {/* Clean Horizontal Progress Bar */}
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getLoyaltyProgress(loyaltyPoints)}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full ${
                  loyaltyLevel === 'Platinum' ? 'bg-gray-900' :
                  loyaltyLevel === 'Gold' ? 'bg-amber-500' :
                  loyaltyLevel === 'Silver' ? 'bg-gray-400' :
                  'bg-amber-700'
                }`}
              />
            </div>
          </div>

          {/* Short Explanation */}
          <p className="text-sm text-gray-600 mb-4">
            Earn points from bookings and trade deals. Redeem for discounts, reduced commissions, and exclusive access.
          </p>

          {/* Convert Points Button */}
          <button 
            onClick={() => setShowConvertPointsModal(true)}
            className="w-full bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
            style={{ paddingTop: '0px', paddingBottom: '0px' }}
          >
            Convert Points
          </button>
        </div>

        {/* Referral Program */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Referral Program</h2>
              <p className="text-sm text-gray-500">Earn rewards for referring friends</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">{rewardPoints}</p>
              <p className="text-xs text-gray-500">reward points</p>
            </div>
          </div>
          
          {/* Referral Code */}
          <div className="rounded-xl p-4" style={{ marginBottom: '-24px', marginTop: '-24px' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Your Referral Code</span>
              <button 
                className="text-sm text-blue-600 font-medium hover:text-blue-700 transition"
                onClick={() => navigator.clipboard.writeText(referralCode)}
              >
                Copy
              </button>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between">
              <span className="font-mono font-semibold text-gray-900">{referralCode}</span>
              <div className="flex gap-2">
                <button 
                  onClick={handleShare}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                  aria-label="Share referral code"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
                <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Referral Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center bg-gray-50 rounded-xl" style={{ padding: '13px', marginTop: '1px', marginBottom: '1px' }}>
              <p className="text-2xl font-bold text-blue-600">{referrals}</p>
              <p className="text-xs text-gray-600 mt-1">Referrals</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-green-600">3</p>
              <p className="text-xs text-gray-600 mt-1">Bookings</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-amber-600">$150</p>
              <p className="text-xs text-gray-600 mt-1">Rewards</p>
            </div>
          </div>

          {/* How it works */}
          <div className="mb-6">
            <h3 className="text-md font-bold text-gray-900 mb-3">How it works</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <p className="text-sm text-gray-700">Share your unique referral code with friends</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <p className="text-sm text-gray-700">Friends sign up using your code</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <p className="text-sm text-gray-700">Earn points when they book tours or make trade deals</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">4</span>
                </div>
                <p className="text-sm text-gray-700">Redeem your points for rewards and discounts</p>
              </div>
            </div>
          </div>

          {/* Referral History */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-md font-bold text-gray-900">Recent Referrals</h3>
              <button 
                onClick={() => setShowReferralHistory(true)}
                className="text-sm text-blue-600 font-medium hover:text-blue-700 transition"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Sarah Johnson</span>
                  <span className="text-sm text-green-600 font-medium">+300 points</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Booked a safari tour</span>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Michael Chen</span>
                  <span className="text-sm text-green-600 font-medium">+500 points</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Made a trade order</span>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Activity */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-bold mb-4">My Activity</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-blue-600">5</p>
              <p className="text-xs text-gray-600 mt-1">Trips Booked</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-green-600">3</p>
              <p className="text-xs text-gray-600 mt-1">Trade Orders</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-amber-600">8</p>
              <p className="text-xs text-gray-600 mt-1">Saved Items</p>
            </div>
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold">Connected Accounts</h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Connect your social accounts for easier sign-in and personalized experiences
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#EA4335" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-medium text-gray-900">Google</span>
              </div>
              {connectedAccounts.google ? (
                <button 
                  onClick={() => handleDisconnectAccount('google')}
                  disabled={isConnecting === 'google'}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition disabled:opacity-50"
                >
                  {isConnecting === 'google' ? 'Disconnecting...' : 'Disconnect'}
                </button>
              ) : (
                <button 
                  onClick={() => handleConnectAccount('google')}
                  disabled={isConnecting === 'google'}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isConnecting === 'google' ? 'Connecting...' : 'Connect'}
                </button>
              )}
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="font-medium text-gray-900">Facebook</span>
              </div>
              {connectedAccounts.facebook ? (
                <button 
                  onClick={() => handleDisconnectAccount('facebook')}
                  disabled={isConnecting === 'facebook'}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition disabled:opacity-50"
                >
                  {isConnecting === 'facebook' ? 'Disconnecting...' : 'Disconnect'}
                </button>
              ) : (
                <button 
                  onClick={() => handleConnectAccount('facebook')}
                  disabled={isConnecting === 'facebook'}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isConnecting === 'facebook' ? 'Connecting...' : 'Connect'}
                </button>
              )}
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="black">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span className="font-medium text-gray-900">Apple</span>
              </div>
              {connectedAccounts.apple ? (
                <button 
                  onClick={() => handleDisconnectAccount('apple')}
                  disabled={isConnecting === 'apple'}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition disabled:opacity-50"
                >
                  {isConnecting === 'apple' ? 'Disconnecting...' : 'Disconnect'}
                </button>
              ) : (
                <button 
                  onClick={() => handleConnectAccount('apple')}
                  disabled={isConnecting === 'apple'}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isConnecting === 'apple' ? 'Connecting...' : 'Connect'}
                </button>
              )}
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#07C160">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                <span className="font-medium text-gray-900">WeChat</span>
              </div>
              {connectedAccounts.wechat ? (
                <button 
                  onClick={() => handleDisconnectAccount('wechat')}
                  disabled={isConnecting === 'wechat'}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition disabled:opacity-50"
                >
                  {isConnecting === 'wechat' ? 'Disconnecting...' : 'Disconnect'}
                </button>
              ) : (
                <button 
                  onClick={() => handleConnectAccount('wechat')}
                  disabled={isConnecting === 'wechat'}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isConnecting === 'wechat' ? 'Connecting...' : 'Connect'}
                </button>
              )}
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="font-medium text-gray-900">LinkedIn</span>
              </div>
              {connectedAccounts.linkedin ? (
                <button 
                  onClick={() => handleDisconnectAccount('linkedin')}
                  disabled={isConnecting === 'linkedin'}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition disabled:opacity-50"
                >
                  {isConnecting === 'linkedin' ? 'Disconnecting...' : 'Disconnect'}
                </button>
              ) : (
                <button 
                  onClick={() => handleConnectAccount('linkedin')}
                  disabled={isConnecting === 'linkedin'}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isConnecting === 'linkedin' ? 'Connecting...' : 'Connect'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Preferences & AI Personalization */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Settings className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold">Preferences & AI Personalization</h2>
          </div>
          <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-xl mb-4">
            💡 Your preferences help our AI personalize what you see in Travel and Trade modes
          </p>
          <div className="space-y-2">
            <MenuItem
              title="Travel Interests"
              subtitle="Business trips, cultural tours"
              icon={Plane}
              onClick={() => setShowPreferencesSettings(true)}
            />
            <MenuItem
              title="Product Interests"
              subtitle="Machinery, electronics"
              icon={Package}
              onClick={() => setShowPreferencesSettings(true)}
            />
            <MenuItem
              title="Budget Range"
              subtitle="$1,000 - $50,000"
              icon={WalletIcon}
              onClick={() => setShowPreferencesSettings(true)}
            />
            <MenuItem
              title="Preferred Countries"
              subtitle="China, South Africa, Nigeria"
              icon={MapPin}
              onClick={() => setShowPreferencesSettings(true)}
            />
            <MenuItem
              title="Language & Currency"
              subtitle="English, USD"
              icon={Globe}
              onClick={() => setShowLanguageCurrencySettings(true)}
            />
          </div>
        </div>

        {/* Payment & Wallet - Unified Container */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <WalletIcon className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Payment & Wallet</h2>
            </div>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700 transition">
              Manage
            </button>
          </div>

          {/* Unified List */}
          <div className="divide-y divide-gray-100">
            {/* Wallet Row */}
            <motion.button
              onClick={() => setShowWallet(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <WalletIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Wallet</p>
                  <p className="text-sm text-gray-500">Balance: $12,450.00</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </motion.button>

            {/* Payment Methods Row */}
            <motion.button
              onClick={() => setShowPaymentMethods(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Payment Methods</p>
                  <p className="text-sm text-gray-500">Manage cards & accounts</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </motion.button>

            {/* Transaction History Row */}
            <motion.button
              onClick={() => setShowTransactionHistory(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Transaction History</p>
                  <p className="text-sm text-gray-500">View all payments</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </motion.button>
          </div>
        </div>

        {/* Support & Help */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Support & Help</h2>
          <div className="space-y-2">
            <MenuItem
              title="Customer Support"
              subtitle="24/7 assistance"
              icon={HelpCircle}
              onClick={() => setShowCustomerSupportChat(true)}
            />
            <MenuItem
              title="Notifications"
              subtitle="Manage alerts and updates"
              icon={Bell}
              onClick={() => setShowNotificationSettings(true)}
            />
            <MenuItem
              title="About Tourista AR"
              subtitle="Learn more about us"
              icon={FileText}
              onClick={() => onNavigate('about')}
            />
            <MenuItem
              title="Become a Partner"
              subtitle="List tours or products"
              icon={Briefcase}
              onClick={onSwitchToPartner}
              highlight
            />
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold">Security</h2>
          </div>
          <div className="space-y-2">
            <MenuItem
              title="Change Password"
              subtitle="Last changed 30 days ago"
              icon={Lock}
              onClick={() => {}}
            />
            <MenuItem
              title="Two-Factor Authentication"
              subtitle="Enhanced security"
              icon={Shield}
              onClick={() => setShowTwoFactorAuth(true)}
            />
          </div>
        </div>

        {/* Logout */}
        <button className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 text-red-600 font-semibold hover:bg-red-50 transition">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="profile" onNavigate={onNavigate} />

      {/* Convert Points Modal */}
      <AnimatePresence>
        {showConvertPointsModal && (
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
              className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-bold text-lg">Convert Points</h3>
                <button
                  onClick={() => setShowConvertPointsModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Select Conversion Option</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      <input
                        type="radio"
                        id="discount"
                        name="conversionOption"
                        value="discount"
                        checked={conversionOption === 'discount'}
                        onChange={(e) => setConversionOption(e.target.value)}
                        className="w-5 h-5 text-blue-600"
                      />
                      <div className="flex-1">
                        <label htmlFor="discount" className="font-medium text-gray-900">Travel Discount</label>
                        <p className="text-sm text-gray-500">100 points = $10 discount</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      <input
                        type="radio"
                        id="commission"
                        name="conversionOption"
                        value="commission"
                        checked={conversionOption === 'commission'}
                        onChange={(e) => setConversionOption(e.target.value)}
                        className="w-5 h-5 text-blue-600"
                      />
                      <div className="flex-1">
                        <label htmlFor="commission" className="font-medium text-gray-900">Reduced Commission</label>
                        <p className="text-sm text-gray-500">500 points = 1% commission reduction</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                      <input
                        type="radio"
                        id="exclusive"
                        name="conversionOption"
                        value="exclusive"
                        checked={conversionOption === 'exclusive'}
                        onChange={(e) => setConversionOption(e.target.value)}
                        className="w-5 h-5 text-blue-600"
                      />
                      <div className="flex-1">
                        <label htmlFor="exclusive" className="font-medium text-gray-900">Exclusive Access</label>
                        <p className="text-sm text-gray-500">1000 points = 30 days exclusive access</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Enter Points to Convert</h4>
                  <div className="relative">
                    <input
                      type="number"
                      value={pointsToConvert}
                      onChange={(e) => setPointsToConvert(e.target.value)}
                      placeholder="Enter points"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <div className="absolute right-4 top-3.5 text-gray-500">
                      / {loyaltyPoints} available
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleConvertPoints}
                    disabled={!pointsToConvert || parseInt(pointsToConvert) <= 0 || parseInt(pointsToConvert) > loyaltyPoints}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Convert Points
                  </button>
                </div>
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
            <span className="text-sm font-medium">Points converted successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoField({ label, value, editable }: { label: string; value: string; editable: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      {editable ? (
        <input
          type="text"
          defaultValue={value}
          className="text-sm font-semibold text-gray-900 border-b border-blue-600 focus:outline-none text-right"
        />
      ) : (
        <span className="text-sm font-semibold text-gray-900">{value}</span>
      )}
    </div>
  );
}

function MenuItem({
  title,
  subtitle,
  icon: Icon,
  onClick,
  highlight,
  disabled,
}: {
  title: string;
  subtitle?: string;
  icon: any;
  onClick: () => void;
  highlight?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition ${
        highlight ? 'bg-blue-50' : ''
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        highlight ? 'bg-blue-100' : 'bg-gray-100'
      }`}>
        <Icon className={`w-5 h-5 ${highlight ? 'text-blue-600' : 'text-gray-600'}`} />
      </div>
      <div className="flex-1 text-left">
        <p className={`font-semibold ${highlight ? 'text-blue-600' : 'text-gray-900'}`}>{title}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
    </button>
  );
}



// Loyalty System Helper Functions
function getLoyaltyLevel(points: number): string {
  if (points >= 2000) return 'Platinum';
  if (points >= 1200) return 'Gold';
  if (points >= 600) return 'Silver';
  return 'Bronze';
}

function getNextLevel(currentLevel: string): string {
  const levels = ['Bronze', 'Silver', 'Gold', 'Platinum'];
  const currentIndex = levels.indexOf(currentLevel);
  return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : 'Platinum';
}

function getLoyaltyProgress(points: number): number {
  if (points >= 2000) return 100;
  if (points >= 1200) return ((points - 1200) / 800) * 100;
  if (points >= 600) return ((points - 600) / 600) * 100;
  return (points / 600) * 100;
}

function getPointsToNextLevel(points: number): number {
  if (points >= 2000) return 0;
  if (points >= 1200) return 2000 - points;
  if (points >= 600) return 1200 - points;
  return 600 - points;
}
