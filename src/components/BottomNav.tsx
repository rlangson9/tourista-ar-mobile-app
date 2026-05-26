import { Home, Compass, Sparkles, Calendar, User } from 'lucide-react';
import type { Screen } from '../App';
import { useLanguage } from '../i18n/LanguageContext';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: Screen, itemId?: string) => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const { t } = useLanguage();
  const items = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'explore', label: t('nav.explore'), icon: Compass },
    { id: 'ar-experience', label: 'AR', icon: Sparkles, isCenter: true },
    { id: 'bookings', label: t('nav.bookings'), icon: Calendar },
    { id: 'profile', label: t('nav.profile'), icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center justify-around py-2 relative">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as Screen)}
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
              >
                <Icon className="w-7 h-7 text-white" />
              </button>
            );
          }
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as Screen)}
              className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
