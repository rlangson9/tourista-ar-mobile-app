import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, BookOpen, Globe, Sparkles, Users, Utensils, Palette, MessageCircle, ShieldAlert, ChevronDown, ChevronUp, ClipboardList, PartyPopper, Lightbulb, Languages, Flag, Star, Gift, Smile, User, Coffee, Heart, Flame, Home, UtensilsCrossed, Coins, Building, Tent } from 'lucide-react';
import { getCulturalData, Holiday, CustomNote } from '../services/culturalLocalizationService';

interface CulturalLocalizationProps {
  country: string;
}

export function CulturalLocalization({ country }: CulturalLocalizationProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'holidays' | 'customs' | 'language' | 'facts'>('overview');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    greetings: true,
    etiquette: false,
    dining: false,
    dress: false,
    communication: false,
    safety: false
  });

  const culturalData = getCulturalData(country);

  if (!culturalData) {
    return null;
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getHolidayIcon = (type: string) => {
    switch (type) {
      case 'national': return Flag;
      case 'religious': return Star;
      case 'cultural': return PartyPopper;
      default: return Calendar;
    }
  };

  const getCustomNoteIcon = (emoji: string) => {
    const iconMap: Record<string, any> = {
      '🤝': Users,
      '🥢': UtensilsCrossed,
      '🎁': Gift,
      '👔': Palette,
      '😊': Smile,
      '🛕': Building,
      '👋': Users,
      '👴': User,
      '🍛': Utensils,
      '👗': Palette,
      '🦁': ShieldAlert,
      '⏰': Calendar,
      '❤️': Heart,
      '🔥': Flame,
      '🤗': Users,
      '🗣️': MessageCircle,
      '🦒': ShieldAlert,
      '🏠': Home,
      '🍽️': UtensilsCrossed,
      '💬': MessageCircle,
      '🦏': ShieldAlert,
      '✋': Users,
      '🍵': Coffee,
      '🌙': Sparkles,
      '🕌': Building,
      '💰': Coins,
      '🏛️': Building,
      '⛺': Tent
    };
    return iconMap[emoji] || Sparkles;
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Globe className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-bold">Cultural Guide</h2>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 border-b border-gray-100">
        {[
          { id: 'overview', icon: ClipboardList, label: 'Overview' },
          { id: 'holidays', icon: Calendar, label: 'Holidays' },
          { id: 'customs', icon: BookOpen, label: 'Customs' },
          { id: 'language', icon: Languages, label: 'Language' },
          { id: 'facts', icon: Lightbulb, label: 'Fun Facts' }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <p className="text-gray-600 text-sm">
              Discover essential cultural information for your trip to {country}. 
              Learn about local holidays, customs, language tips, and more!
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <Calendar className="w-5 h-5 text-purple-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Upcoming Holidays</p>
                <p className="font-bold text-purple-600">{culturalData.holidays.length}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <BookOpen className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">Customs Notes</p>
                <p className="font-bold text-blue-600">{culturalData.customs.length}</p>
              </div>
            </div>

            <div className="bg-amber-50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h3 className="font-semibold text-sm text-amber-800">Pro Tip</h3>
              </div>
              <p className="text-xs text-amber-700">
                Respect and understanding go a long way! Take time to learn a few 
                local phrases - it will be greatly appreciated.
              </p>
            </div>
          </motion.div>
        )}

        {activeTab === 'holidays' && (
          <motion.div
            key="holidays"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <h3 className="font-semibold text-sm text-gray-600 mb-3">Local Holidays & Celebrations</h3>
            {culturalData.holidays.map((holiday: Holiday, idx: number) => {
              const HolidayIcon = getHolidayIcon(holiday.type);
              return (
                <div key={idx} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <HolidayIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{holiday.name}</h4>
                      <p className="text-xs text-purple-600 font-medium">{holiday.date}</p>
                      <p className="text-sm text-gray-600 mt-1">{holiday.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'customs' && (
          <motion.div
            key="customs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <h3 className="font-semibold text-sm text-gray-600 mb-3">Local Customs & Etiquette</h3>
            
            {['greetings', 'etiquette', 'dining', 'dress', 'communication', 'safety'].map(category => {
              const categoryCustoms = culturalData.customs.filter(c => c.category === category);
              if (categoryCustoms.length === 0) return null;
              
              const categoryIcons: Record<string, any> = {
                greetings: Users,
                etiquette: BookOpen,
                dining: Utensils,
                dress: Palette,
                communication: MessageCircle,
                safety: ShieldAlert
              };
              
              const categoryNames: Record<string, string> = {
                greetings: 'Greetings',
                etiquette: 'Etiquette',
                dining: 'Dining',
                dress: 'Dress Code',
                communication: 'Communication',
                safety: 'Safety & Respect'
              };
              
              const Icon = categoryIcons[category];
              
              return (
                <div key={category} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleSection(category)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Icon className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="font-semibold text-sm">{categoryNames[category]}</span>
                    </div>
                    {expandedSections[category] ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections[category] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 space-y-3">
                          {categoryCustoms.map((custom: CustomNote, idx: number) => {
                            const CustomIcon = getCustomNoteIcon(custom.icon);
                            return (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
                                  <CustomIcon className="w-4 h-4 text-purple-600" />
                                </div>
                                <div>
                                  <h5 className="font-medium text-sm text-gray-900">{custom.title}</h5>
                                  <p className="text-xs text-gray-600 mt-1">{custom.description}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        )}

        {activeTab === 'language' && (
          <motion.div
            key="language"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <h3 className="font-semibold text-sm text-gray-600 mb-3">Language Tips</h3>
            <div className="space-y-2">
              {culturalData.languageTips.map((tip: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 bg-blue-50 rounded-xl p-3">
                  <Globe className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'facts' && (
          <motion.div
            key="facts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            <h3 className="font-semibold text-sm text-gray-600 mb-3">Fun & Interesting Facts</h3>
            <div className="space-y-2">
              {culturalData.funFacts.map((fact: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 bg-amber-50 rounded-xl p-3">
                  <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">{fact}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
