import express from 'express';

const router = express.Router();

interface UserLoyalty {
  userId: string;
  points: number;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  totalEarned: number;
  totalRedeemed: number;
  activeBenefits: string[];
}

interface PointsHistory {
  id: string;
  type: 'earned' | 'spent' | 'expired';
  amount: number;
  description: string;
  date: string;
  relatedItem?: string;
}

interface RewardOption {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
  type: 'discount' | 'commission' | 'ar_access';
  value: number;
  valueType: 'percentage' | 'days';
}

const loyaltyLevels = [
  { name: 'bronze', minPoints: 0, maxPoints: 999 },
  { name: 'silver', minPoints: 1000, maxPoints: 4999 },
  { name: 'gold', minPoints: 5000, maxPoints: 14999 },
  { name: 'platinum', minPoints: 15000, maxPoints: Infinity },
];

const rewardOptions: RewardOption[] = [
  {
    id: 'travel-discount-10',
    name: '10% Travel Discount',
    description: 'Get 10% off your next tour booking',
    pointsRequired: 500,
    type: 'discount',
    value: 10,
    valueType: 'percentage',
  },
  {
    id: 'travel-discount-25',
    name: '25% Travel Discount',
    description: 'Get 25% off any tour booking',
    pointsRequired: 1200,
    type: 'discount',
    value: 25,
    valueType: 'percentage',
  },
  {
    id: 'commission-reduction',
    name: '50% Commission Reduction',
    description: 'Reduce sourcing commission by 50%',
    pointsRequired: 800,
    type: 'commission',
    value: 50,
    valueType: 'percentage',
  },
  {
    id: 'ar-premium-7',
    name: '7-Day AR Premium',
    description: 'Access premium AR features for 7 days',
    pointsRequired: 300,
    type: 'ar_access',
    value: 7,
    valueType: 'days',
  },
  {
    id: 'ar-premium-30',
    name: '30-Day AR Premium',
    description: 'Access premium AR features for 30 days',
    pointsRequired: 1000,
    type: 'ar_access',
    value: 30,
    valueType: 'days',
  },
];

const userLoyaltyData: Record<string, UserLoyalty> = {
  'user-1': {
    userId: 'user-1',
    points: 2350,
    level: 'silver',
    totalEarned: 3950,
    totalRedeemed: 1600,
    activeBenefits: ['10% travel discount', 'Priority support', 'Early access to tours'],
  },
};

const pointsHistoryData: Record<string, PointsHistory[]> = {
  'user-1': [
    {
      id: '1',
      type: 'earned',
      amount: 500,
      description: 'Tour booking completed',
      date: '2026-03-15',
      relatedItem: 'Victoria Falls Adventure',
    },
    {
      id: '2',
      type: 'earned',
      amount: 200,
      description: 'Referral bonus',
      date: '2026-03-14',
      relatedItem: 'Referral: Wei Chen',
    },
    {
      id: '3',
      type: 'spent',
      amount: -300,
      description: 'Redeemed for AR Premium',
      date: '2026-03-10',
    },
    {
      id: '4',
      type: 'earned',
      amount: 800,
      description: 'Trade deal completed',
      date: '2026-03-08',
      relatedItem: 'Electronics shipment',
    },
    {
      id: '5',
      type: 'earned',
      amount: 150,
      description: 'Profile completion bonus',
      date: '2026-03-01',
    },
  ],
};

function getLevel(points: number): string {
  const level = loyaltyLevels.find(l => points >= l.minPoints && points <= l.maxPoints);
  return level?.name || 'bronze';
}

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const loyalty = userLoyaltyData[userId] || {
      userId,
      points: 0,
      level: 'bronze',
      totalEarned: 0,
      totalRedeemed: 0,
      activeBenefits: [],
    };

    res.json({
      success: true,
      data: loyalty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

router.get('/:userId/history', async (req, res) => {
  try {
    const { userId } = req.params;
    const history = pointsHistoryData[userId] || [];

    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

router.post('/:userId/earn', async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, description, relatedItem } = req.body;

    if (!userLoyaltyData[userId]) {
      userLoyaltyData[userId] = {
        userId,
        points: 0,
        level: 'bronze',
        totalEarned: 0,
        totalRedeemed: 0,
        activeBenefits: [],
      };
      pointsHistoryData[userId] = [];
    }

    userLoyaltyData[userId].points += amount;
    userLoyaltyData[userId].totalEarned += amount;
    userLoyaltyData[userId].level = getLevel(userLoyaltyData[userId].points) as any;

    const newHistory: PointsHistory = {
      id: `activity-${Date.now()}`,
      type: 'earned',
      amount,
      description,
      date: new Date().toISOString().split('T')[0],
      relatedItem,
    };

    pointsHistoryData[userId].unshift(newHistory);

    res.json({
      success: true,
      data: userLoyaltyData[userId],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

router.post('/:userId/redeem', async (req, res) => {
  try {
    const { userId } = req.params;
    const { rewardId } = req.body;

    if (!userLoyaltyData[userId]) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    const reward = rewardOptions.find(r => r.id === rewardId);
    if (!reward) {
      return res.status(404).json({
        success: false,
        error: 'Reward not found',
      });
    }

    if (userLoyaltyData[userId].points < reward.pointsRequired) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient points',
      });
    }

    userLoyaltyData[userId].points -= reward.pointsRequired;
    userLoyaltyData[userId].totalRedeemed += reward.pointsRequired;
    userLoyaltyData[userId].level = getLevel(userLoyaltyData[userId].points) as any;

    const newHistory: PointsHistory = {
      id: `activity-${Date.now()}`,
      type: 'spent',
      amount: -reward.pointsRequired,
      description: `Redeemed: ${reward.name}`,
      date: new Date().toISOString().split('T')[0],
    };

    if (!pointsHistoryData[userId]) {
      pointsHistoryData[userId] = [];
    }
    pointsHistoryData[userId].unshift(newHistory);

    res.json({
      success: true,
      data: {
        loyalty: userLoyaltyData[userId],
        reward,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

router.get('/rewards', async (_req, res) => {
  try {
    res.json({
      success: true,
      data: rewardOptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

router.get('/levels', async (_req, res) => {
  try {
    res.json({
      success: true,
      data: loyaltyLevels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

export default router;
