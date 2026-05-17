import { useState, useEffect } from 'react';
import { Onboarding } from './components/Onboarding';
import { HomeScreen } from './components/HomeScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { TourDetails } from './components/TourDetails';
import { ARExperience } from './components/ARExperience';
import { BookingFlow } from './components/BookingFlow';
import { ProfileScreen } from './components/ProfileScreen';
import { About } from './components/About';
import { BookingsScreen } from './components/BookingsScreen';
import { PartnerDashboard } from './components/PartnerDashboard';
import { SupplierDashboard } from './components/SupplierDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { TradeProductDetail } from './components/TradeProductDetail';
import { SourcingRequestFlow } from './components/SourcingRequestFlow';
import { AIAssistant } from './components/AIAssistant';
import { CustomTourRequest } from './components/CustomTourRequest';
import { GroupBookingForm } from './components/GroupBookingForm';
import { BulkOrdering } from './components/BulkOrdering';
import { NegotiationTool } from './components/NegotiationTool';
import { MessageScreen } from './components/MessageScreen';
import { ProductDiscovery } from './components/ProductDiscovery';
import { Toaster } from './components/ui/sonner';

export type Screen =
  | 'onboarding'
  | 'home'
  | 'explore'
  | 'tour-details'
  | 'ar-experience'
  | 'booking'
  | 'bookings'
  | 'profile'
  | 'about'
  | 'partner-dashboard'
  | 'supplier-dashboard'
  | 'admin-dashboard'
  | 'admin-login'
  | 'trade-product-detail'
  | 'sourcing-request'
  | 'custom-tour-request'
  | 'group-booking-form'
  | 'bulk-ordering'
  | 'negotiation-tool'
  | 'message'
  | 'product-discovery';

export type AppMode = 'tourism' | 'trade';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [userType, setUserType] = useState<'traveler' | 'partner' | 'admin' | 'supplier'>('traveler');
  const [appMode, setAppMode] = useState<AppMode>('tourism');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [hasSelectedRole, setHasSelectedRole] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const [selectedPartnerName, setSelectedPartnerName] = useState<string | null>(null);
  const [previousScreen, setPreviousScreen] = useState<Screen>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');
  const [language, setLanguage] = useState<string>('en');

  // Check for admin login URL on initial load
  useEffect(() => {
    const checkAdminPath = () => {
      const path = window.location.pathname;
      // Check if accessing admin portal via path
      // For production: touristaadmin.com/admin-portal
      // For development: localhost/admin-portal, 127.0.0.1/admin-portal, or any IP/admin-portal
      if (path === '/admin-portal') {
        setCurrentScreen('admin-login');
      }
    };
    checkAdminPath();
  }, []);

  // Listen for openAIAssistant custom event from other components
  useEffect(() => {
    const handleOpenAIAssistant = () => {
      setShowAIAssistant(true);
    };

    window.addEventListener('openAIAssistant', handleOpenAIAssistant);
    return () => {
      window.removeEventListener('openAIAssistant', handleOpenAIAssistant);
    };
  }, []);

  const handleNavigate = (screen: Screen, itemId?: string, partnerName?: string, partnerId?: string) => {
    if (screen === 'message') {
      setPreviousScreen(currentScreen);
    }
    if (itemId) {
      if (screen === 'tour-details') setSelectedTourId(itemId);
      if (screen === 'trade-product-detail') setSelectedProductId(itemId);
    }
    if (screen === 'message' && partnerName && partnerId) {
      setSelectedPartnerName(partnerName);
      setSelectedPartnerId(partnerId);
    }
    setCurrentScreen(screen);
  };

  const handleOnboardingComplete = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setHasCompletedOnboarding(true);
    setCurrentScreen('home');
  };

  const switchToPartnerDashboard = () => {
    setUserType('partner');
    setCurrentScreen('partner-dashboard');
    setHasSelectedRole(true);
  };

  const switchToSupplierDashboard = () => {
    setUserType('supplier');
    setCurrentScreen('supplier-dashboard');
    setHasSelectedRole(true);
  };



  const switchToTravelerApp = () => {
    setUserType('traveler');
    setCurrentScreen('home');
    setHasSelectedRole(true);
  };

  const handleAdminLogin = (password: string) => {
    // In a real app, this would validate against a secure backend
    // For demo purposes, we'll use a simple password check
    const ADMIN_PASSWORD = 'secure-admin-password-2026';
    
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setAdminLoginError('');
      setCurrentScreen('admin-dashboard');
    } else {
      setAdminLoginError('Invalid password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentScreen('admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Quick switch for demo purposes - only show after onboarding and role selection */}
      {hasCompletedOnboarding && hasSelectedRole && (
        <div className="fixed top-2 right-2 z-50 flex gap-2">
          <button
            onClick={switchToTravelerApp}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
          >
            User App
          </button>
          <button
            onClick={switchToPartnerDashboard}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
          >
            Partner
          </button>
          <button
            onClick={switchToSupplierDashboard}
            className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
          >
            Supplier
          </button>
        </div>
      )}

      {/* Render current screen */}
      {userType === 'partner' && (
        <PartnerDashboard onNavigate={handleNavigate} />
      )}

      {userType === 'supplier' && (
        <SupplierDashboard onNavigate={handleNavigate} />
      )}

      {/* Admin Login Screen */}
      {currentScreen === 'admin-login' && (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Admin Portal</h2>
              <p className="mt-2 text-sm text-gray-600">Enter password to access admin dashboard</p>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAdminLogin(adminPassword);
            }}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              
              {adminLoginError && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {adminLoginError}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Dashboard - only accessible after authentication */}
      {currentScreen === 'admin-dashboard' && isAdminAuthenticated && (
        <AdminDashboard onNavigate={handleNavigate} onLogout={handleAdminLogout} />
      )}

      {userType === 'traveler' && (
        <>
          {currentScreen === 'onboarding' && (
            <Onboarding onComplete={handleOnboardingComplete} />
          )}

          {currentScreen === 'home' && (
            <HomeScreen 
              onNavigate={handleNavigate} 
              onSwitchToPartner={switchToPartnerDashboard}
              appMode={appMode}
              onModeChange={setAppMode}
              isAssistantOpen={showAIAssistant}
              onToggleAssistant={() => setShowAIAssistant(!showAIAssistant)}
              darkMode={false}
              onToggleDarkMode={() => {}}
            />
          )}

          {currentScreen === 'explore' && (
            <ExploreScreen onNavigate={handleNavigate} appMode={appMode} />
          )}

          {currentScreen === 'tour-details' && (
            <TourDetails 
              tourId={selectedTourId} 
              onNavigate={handleNavigate} 
            />
          )}

          {currentScreen === 'trade-product-detail' && (
            <TradeProductDetail
              productId={selectedProductId}
              onNavigate={handleNavigate}
            />
          )}

          {currentScreen === 'sourcing-request' && (
            <SourcingRequestFlow onNavigate={handleNavigate} />
          )}

          {currentScreen === 'custom-tour-request' && (
            <CustomTourRequest onNavigate={handleNavigate} />
          )}

          {currentScreen === 'group-booking-form' && (
            <GroupBookingForm onNavigate={handleNavigate} />
          )}

          {currentScreen === 'bulk-ordering' && (
            <BulkOrdering onNavigate={handleNavigate} />
          )}

          {currentScreen === 'negotiation-tool' && (
            <NegotiationTool onNavigate={handleNavigate} />
          )}

          {currentScreen === 'product-discovery' && (
            <ProductDiscovery onNavigate={handleNavigate} />
          )}

          {currentScreen === 'message' && (
            <MessageScreen 
              onNavigate={handleNavigate} 
              partnerId={selectedPartnerId || undefined}
              partnerName={selectedPartnerName || undefined}
              previousScreen={previousScreen}
              productId={selectedProductId || undefined}
              tourId={selectedTourId || undefined}
            />
          )}

          {currentScreen === 'booking' && (
            <BookingFlow 
              tourId={selectedTourId} 
              onNavigate={handleNavigate} 
            />
          )}

          {currentScreen === 'ar-experience' && (
            <ARExperience 
              tourId={selectedTourId} 
              onNavigate={handleNavigate} 
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen 
              onNavigate={handleNavigate}
              onSwitchToPartner={switchToPartnerDashboard}
              appMode={appMode}
              onModeChange={setAppMode}
              language={language}
              currency="USD"
              onLanguageChange={setLanguage}
              onCurrencyChange={() => {}}
              darkMode={false}
              onToggleDarkMode={() => {}}
            />
          )}

          {currentScreen === 'about' && (
            <About 
              onNavigate={handleNavigate}
              language={language}
            />
          )}

          {currentScreen === 'bookings' && (
            <BookingsScreen 
              onNavigate={handleNavigate}
              appMode={appMode}
            />
          )}

          {/* AI Assistant - Floating Button - Only show when user has completed onboarding */}
          {hasCompletedOnboarding && (
            <AIAssistant 
              isOpen={showAIAssistant}
              onToggle={() => setShowAIAssistant(!showAIAssistant)}
              appMode={appMode}
            />
          )}
          <Toaster />
        </>
      )}
    </div>
  );
}