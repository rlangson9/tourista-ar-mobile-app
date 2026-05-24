import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Award, Coins, Gift, ChevronRight, Check, ArrowRight, Sparkles, Zap, Crown } from 'lucide-react';

interface LoyaltyLevel {
  name: string;
  minPoints: number;
  maxPoints: number;
  icon: string;
  color: string;
  benefits: string[];
  discount: number;
  commissionReduction: number;
}

const loyaltyLevels: LoyaltyLevel[] = [
  {
    name: 'Bronze',
    minPoints: 0,
    maxPoints: 999,
    icon: 'star',
    color: 'bg-amber-500',
    benefits: ['Basic support', 'Standard booking priority', 'Monthly newsletter'],
    discount: 0,
    commissionReduction: 0
  },
  {
    name: 'Silver',
    minPoints: 1000,
    maxPoints: 4999,
    icon: 'award',
    color: 'bg-gray-400',
    benefits: ['Priority support', '10% travel discount', 'Early access to tours', 'Exclusive promotions'],
    discount: 10,
    commissionReduction: 5
  },
  {
    name: 'Gold',
    minPoints: 5000,
    maxPoints: 14999,
    icon: 'coins',
    color: 'bg-yellow-500',
    benefits: ['VIP support', '15% travel discount', 'Free AR premium access', 'Personalized recommendations', 'Priority supplier matching'],
    discount: 15,
    commissionReduction: 10
  },
  {
    name: 'Platinum',
    minPoints: 15000,
    maxPoints: Infinity,
    icon: 'crown',
    color: 'bg-purple-500',
    benefits: ['Dedicated account manager', '25% travel discount', 'Unlimited AR premium access', 'Exclusive trade opportunities', 'Zero commission on sourcing', 'Priority dispute resolution'],
    discount: 25,
    commissionReduction: 100
  }
];

interface RewardOption {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  type: 'discount' | 'commission' | 'ar_access';
  value: number;
  valueType: 'percentage' | 'days';
  icon: typeof Gift;
}

const rewardOptions: RewardOption[] = [
  {
    id: 'travel-discount-10',
    name: '10% Travel Discount',
    description: 'Get 10% off your next tour booking',
    pointsRequired: 500,
    type: 'discount',
    value: 10,
    valueType: 'percentage',
    icon: Gift
  },
  {
    id: 'travel-discount-25',
    name: '25% Travel Discount',
    description: 'Get 25% off any tour booking',
    pointsRequired: 1200,
    type: 'discount',
    value: 25,
    valueType: 'percentage',
    icon: Gift
  },
  {
    id: 'commission-reduction',
    name: '50% Commission Reduction',
    description: 'Reduce sourcing commission by 50%',
    pointsRequired: 800,
    type: 'commission',
    value: 50,
    valueType: 'percentage',
    icon: Coins
  },
  {
    id: 'ar-premium-7',
    name: '7-Day AR Premium',
    description: 'Access premium AR features for 7 days',
    pointsRequired: 300,
    type: 'ar_access',
    value: 7,
    valueType: 'days',
    icon: Zap
  },
  {
    id: 'ar-premium-30',
    name: '30-Day AR Premium',
    description: 'Access premium AR features for 30 days',
    pointsRequired: 1000,
    type: 'ar_access',
    value: 30,
    valueType: 'days',
    icon: Zap
  }
];

interface PointsHistory {
  id: string;
  type: 'earned' | 'spent' | 'expired';
  amount: number;
  description: string;
  date: string;
  relatedItem?: string;
}

interface LoyaltyPointsProps {
  initialPoints?: number;
  onBack?: () => void;
}

export function LoyaltyPoints({ initialPoints = 2350, onBack }: LoyaltyPointsProps) {
  const [points, setPoints] = useState(initialPoints);
  const [showConversion, setShowConversion] = useState(false);
  const [selectedReward, setSelectedReward] = useState<RewardOption | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [recentActivity, setRecentActivity] = useState<PointsHistory[]>([
    {
      id: '1',
      type: 'earned',
      amount: 500,
      description: 'Tour booking completed',
      date: '2026-03-15',
      relatedItem: 'Victoria Falls Adventure'
    },
    {
      id: '2',
      type: 'earned',
      amount: 200,
      description: 'Referral bonus',
      date: '2026-03-14',
      relatedItem: 'Referral: Wei Chen'
    },
    {
      id: '3',
      type: 'spent',
      amount: -300,
      description: 'Redeemed for AR Premium',
      date: '2026-03-10'
    },
    {
      id: '4',
      type: 'earned',
      amount: 800,
      description: 'Trade deal completed',
      date: '2026-03-08',
      relatedItem: 'Electronics shipment'
    },
    {
      id: '5',
      type: 'earned',
      amount: 150,
      description: 'Profile completion bonus',
      date: '2026-03-01'
    }
  ]);

  const currentLevel = loyaltyLevels.find(
    level => points >= level.minPoints && points <= level.maxPoints
  ) || loyaltyLevels[0];

  const nextLevel = loyaltyLevels.find(level => points < level.minPoints);
  const pointsToNextLevel = nextLevel ? nextLevel.minPoints - points : 0;
  const progressToNextLevel = nextLevel 
    ? ((points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100 
    : 100;

  const handleConvertPoints = (reward: RewardOption) => {
    if (points >= reward.pointsRequired) {
      setSelectedReward(reward);
      setShowConfirmModal(true);
    }
  };

  const confirmConversion = () => {
    if (selectedReward) {
      setPoints(prev => prev - selectedReward.pointsRequired);
      setRecentActivity(prev => [{
        id: `activity-${Date.now()}`,
        type: 'spent',
        amount: -selectedReward.pointsRequired,
        description: `Redeemed: ${selectedReward.name}`,
        date: new Date().toISOString().split('T')[0]
      }, ...prev]);
      setShowConfirmModal(false);
      setSelectedReward(null);
      setShowConversion(false);
    }
  };

  const getLevelIcon = (level: LoyaltyLevel) => {
    switch (level.icon) {
      case 'star': return <Star className="w-6 h-6" />;
      case 'award': return <Award className="w-6 h-6" />;
      case 'coins': return <Coins className="w-6 h-6" />;
      case 'crown': return <Crown className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  const getActivityColor = (type: PointsHistory['type']) => {
    switch (type) {
      case 'earned': return 'text-green-600 bg-green-50';
      case 'spent': return 'text-blue-600 bg-blue-50';
      case 'expired': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="p-6">
          <div className="flex items-center gap-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-white/10 rounded-full transition"
              >
                <ChevronRight className="w-6 h-6 rotate-180" />
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold">Points & Rewards</h1>
              <p className="text-blue-100 text-sm">Track your loyalty benefits</p>
            </div>
          </div>
        </div>

        {/* Points Display */}
        <div className="px-6 pb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Your Points</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">{points.toLocaleString()}</span>
                  <span className="text-lg">points</span>
                </div>
              </div>
              <div className={`w-16 h-16 ${currentLevel.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                {getLevelIcon(currentLevel)}
              </div>
            </div>
            
            {/* Level Badge */}
            <div className="mt-4 flex items-center gap-3">
              <span className={`px-4 py-2 ${currentLevel.color} bg-opacity-20 rounded-full text-sm font-bold`}>
                {currentLevel.name} Member
              </span>
              {nextLevel && (
                <span className="text-blue-100 text-sm">
                  {pointsToNextLevel.toLocaleString()} points to {nextLevel.name}
                </span>
              )}
            </div>

            {/* Progress Bar */}
            {nextLevel && (
              <div className="mt-4">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToNextLevel}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full ${currentLevel.color}`}
                  />
                </div>
                <div className="flex justify-between text-xs text-blue-100 mt-1">
                  <span>{currentLevel.name}</span>
                  <span>{nextLevel.name}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-gray-500 text-sm mb-1">Total Earned</p>
            <p className="text-2xl font-bold text-green-600">3,950</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-gray-500 text-sm mb-1">Redeemed</p>
            <p className="text-2xl font-bold text-blue-600">1,600</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-gray-500 text-sm mb-1">Active Benefits</p>
            <p className="text-2xl font-bold text-purple-600">3</p>
          </div>
        </div>

        {/* Current Level Benefits */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 ${currentLevel.color} rounded-xl flex items-center justify-center text-white`}>
              {getLevelIcon(currentLevel)}
            </div>
            <div>
              <h2 className="font-bold text-lg">{currentLevel.name} Benefits</h2>
              <p className="text-sm text-gray-500">Enjoy these exclusive perks</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {currentLevel.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Convert Points Button */}
        <motion.button
          onClick={() => setShowConversion(!showConversion)}
          className="w-full bg-orange-500 rounded-2xl p-6 shadow-lg hover:shadow-xl transition flex items-center justify-between"
          style={{ color: '#f0f0f0' }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3" style={{ color: '#fe9a00' }}>
            <Sparkles className="w-6 h-6" style={{ color: '#fe9a00' }} />
            <div className="text-left">
              <h3 className="font-bold text-lg" style={{ color: '#fe9a00' }}>Redeem Points</h3>
              <p className="text-sm" style={{ color: '#434c5d' }}>Convert points to discounts & rewards</p>
            </div>
          </div>
          <ChevronRight className={`w-6 h-6 transition-transform ${showConversion ? 'rotate-90' : ''}`} style={{ color: '#fe9a00' }} />
        </motion.button>

        {/* Conversion Options */}
        <AnimatePresence>
          {showConversion && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold mb-4">Choose a Reward</h3>
                <div className="space-y-3">
                  {rewardOptions.map((reward) => {
                    const Icon = reward.icon;
                    const canAfford = points >= reward.pointsRequired;
                    
                    return (
                      <motion.button
                        key={reward.id}
                        onClick={() => handleConvertPoints(reward)}
                        disabled={!canAfford}
                        className={`w-full p-4 rounded-xl border-2 transition flex items-center gap-4 ${
                          canAfford 
                            ? 'border-blue-200 hover:border-blue-400 hover:bg-blue-50' 
                            : 'border-gray-200 opacity-50 cursor-not-allowed'
                        }`}
                        whileTap={canAfford ? { scale: 0.98 } : {}}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          canAfford ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-6 h-6 ${canAfford ? 'text-blue-600' : 'text-gray-400'}`} />
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-semibold">{reward.name}</h4>
                          <p className="text-sm text-gray-500">{reward.description}</p>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${canAfford ? 'text-blue-600' : 'text-gray-400'}`}>
                            {reward.pointsRequired} pts
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Points History */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-gray-50"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  activity.type === 'earned' ? 'bg-green-500' :
                  activity.type === 'spent' ? 'bg-blue-500' : 'bg-red-500'
                }`}>
                  {activity.type === 'earned' ? '+' : '-'}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.description}</p>
                  {activity.relatedItem && (
                    <p className="text-sm text-gray-500">{activity.relatedItem}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className={`font-bold ${getActivityColor(activity.type)}`}>
                    {activity.type === 'earned' ? '+' : ''}{activity.amount}
                  </p>
                  <p className="text-xs text-gray-400">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Earn Points */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
          <h3 className="font-bold text-lg mb-4">How to Earn Points</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <div>
                <p className="font-medium">Book Tours</p>
                <p className="text-sm text-gray-600">Earn 100-500 points per booking</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <div>
                <p className="font-medium">Complete Trade Deals</p>
                <p className="text-sm text-gray-600">Earn 200-1000 points per deal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <div>
                <p className="font-medium">Refer Friends</p>
                <p className="text-sm text-gray-600">Earn 200 points per referral</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && selectedReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowConfirmModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-sm w-full"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gift className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Confirm Redemption</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to redeem <strong>{selectedReward.pointsRequired} points</strong> for:
                </p>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <p className="font-bold text-lg">{selectedReward.name}</p>
                  <p className="text-sm text-gray-500">{selectedReward.description}</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-blue-900">
                    <strong>Points balance after redemption:</strong> {(points - selectedReward.pointsRequired).toLocaleString()} points
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmConversion}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    Confirm
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LoyaltyPoints;
