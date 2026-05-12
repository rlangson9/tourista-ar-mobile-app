import { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { HomeScreen } from './components/HomeScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { TourDetails } from './components/TourDetails';
import { ARExperience } from './components/ARExperience';
import { BookingFlow } from './components/BookingFlow';
import { ProfileScreen } from './components/ProfileScreen';
import { BookingsScreen } from './components/BookingsScreen';
import { PartnerDashboard } from './components/PartnerDashboard';
import { SupplierDashboard } from './components/SupplierDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { TradeProductDetail } from './components/TradeProductDetail';
import { SourcingRequestFlow } from './components/SourcingRequestFlow';
import { AIAssistant } from './components/AIAssistant';
import { CustomTourRequest } from './components/CustomTourRequest';

export type Screen =
  | 'onboarding'
  | 'home'
  | 'explore'
  | 'tour-details'
  | 'ar-experience'
  | 'booking'
  | 'bookings'
  | 'profile'
  | 'partner-dashboard'
  | 'supplier-dashboard'
  | 'admin-dashboard'
  | 'trade-product-detail'
  | 'sourcing-request'
  | 'custom-tour-request';

export type AppMode = 'tourism' | 'trade';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [userType, setUserType] = useState<'traveler' | 'partner' | 'admin' | 'supplier'>('traveler');
  const [appMode, setAppMode] = useState<AppMode>('tourism');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  const handleNavigate = (screen: Screen, itemId?: string) => {
    if (itemId) {
      if (screen === 'tour-details') setSelectedTourId(itemId);
      if (screen === 'trade-product-detail') setSelectedProductId(itemId);
    }
    setCurrentScreen(screen);
  };

  const handleOnboardingComplete = () => {
    setHasCompletedOnboarding(true);
    setCurrentScreen('home');
  };

  const switchToPartnerDashboard = () => {
    setUserType('partner');
    setCurrentScreen('partner-dashboard');
  };

  const switchToSupplierDashboard = () => {
    setUserType('supplier');
    setCurrentScreen('supplier-dashboard');
  };

  const switchToAdminDashboard = () => {
    setUserType('admin');
    setCurrentScreen('admin-dashboard');
  };

  const switchToTravelerApp = () => {
    setUserType('traveler');
    setCurrentScreen('home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Quick switch for demo purposes */}
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
        <button
          onClick={switchToAdminDashboard}
          className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
        >
          Admin
        </button>
      </div>

      {/* Render current screen */}
      {userType === 'partner' && (
        <PartnerDashboard onNavigate={handleNavigate} />
      )}

      {userType === 'supplier' && (
        <SupplierDashboard onNavigate={handleNavigate} />
      )}

      {userType === 'admin' && (
        <AdminDashboard onNavigate={handleNavigate} />
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
            />
          )}

          {currentScreen === 'bookings' && (
            <BookingsScreen onNavigate={handleNavigate} />
          )}

          {/* AI Assistant - Floating Button */}
          <AIAssistant 
            isOpen={showAIAssistant}
            onToggle={() => setShowAIAssistant(!showAIAssistant)}
            appMode={appMode}
          />
        </>
      )}
    </div>
  );
}