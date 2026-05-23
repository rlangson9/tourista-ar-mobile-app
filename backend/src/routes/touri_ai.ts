import express from 'express';

const router = express.Router();
const TOURI_AI_BASE_URL = process.env.TOURI_AI_BASE_URL || 'http://localhost:8000';

// Helper function to make TOURI AI requests
async function touriAiRequest(endpoint: string, method: string = 'POST', body?: any) {
  try {
    const options: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(`${TOURI_AI_BASE_URL}${endpoint}`, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `TOURI AI request failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('TOURI AI Request Error:', error);
    throw error;
  }
}

// Health check
router.get('/health', async (req, res) => {
  try {
    const result = await touriAiRequest('/health', 'GET');
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      provider: 'TOURI_AI',
      error: 'TOURI AI service not available',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// System info
router.get('/info', async (req, res) => {
  try {
    const result = await touriAiRequest('/info', 'GET');
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      provider: 'TOURI_AI',
      error: 'TOURI AI service not available',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Translation (already exists in translate.ts, but including for completeness)
router.post('/translate', async (req, res) => {
  try {
    const result = await touriAiRequest('/translate', 'POST', req.body);
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Translation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Batch translation
router.post('/translate/batch', async (req, res) => {
  try {
    const result = await touriAiRequest('/translate/batch', 'POST', req.body);
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Batch translation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// User registration for matching
router.post('/users/register', async (req, res) => {
  try {
    const result = await touriAiRequest('/users/register', 'POST', req.body);
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'User registration failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Product registration for matching
router.post('/products/register', async (req, res) => {
  try {
    const result = await touriAiRequest('/products/register', 'POST', req.body);
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Product registration failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Find matches
router.post('/matching/find', async (req, res) => {
  try {
    const result = await touriAiRequest('/matching/find', 'POST', req.body);
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Matching failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get recommendations
router.post('/recommendations', async (req, res) => {
  try {
    const result = await touriAiRequest('/recommendations', 'POST', req.body);
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Recommendations failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Risk assessment
router.post('/risk/assess', async (req, res) => {
  try {
    const result = await touriAiRequest('/risk/assess', 'POST', req.body);
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Risk assessment failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Payment recommendations
router.get('/payment/recommend', async (req, res) => {
  try {
    const { amount, buyer_country, seller_country } = req.query;
    const result = await touriAiRequest(
      `/payment/recommend?amount=${amount}&buyer_country=${buyer_country}&seller_country=${seller_country}`,
      'GET'
    );
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Payment recommendation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// AR Scene Recognition
router.post('/ar/recognize', async (req, res) => {
  try {
    const result = await touriAiRequest('/ar/recognize', 'POST', req.body);
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'AR recognition failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// AR Product Preview
router.get('/ar/product/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;
    const { language = 'en' } = req.query;
    const result = await touriAiRequest(`/ar/product/${product_id}?language=${language}`, 'GET');
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Product preview failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// AR Tourism Experience
router.get('/ar/tourism/:spot_id', async (req, res) => {
  try {
    const { spot_id } = req.params;
    const { language = 'en' } = req.query;
    const result = await touriAiRequest(`/ar/tourism/${spot_id}?language=${language}`, 'GET');
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Tourism experience failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Supported languages
router.get('/supported/languages', async (req, res) => {
  try {
    const result = await touriAiRequest('/supported/languages', 'GET');
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get supported languages',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Supported regions
router.get('/supported/regions', async (req, res) => {
  try {
    const result = await touriAiRequest('/supported/regions', 'GET');
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get supported regions',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Trade insights
router.get('/trade/insights/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const result = await touriAiRequest(`/trade/insights/${category}`, 'GET');
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get trade insights',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Seasonal pricing
router.get('/seasonal/pricing/:product_category', async (req, res) => {
  try {
    const { product_category } = req.params;
    const { month } = req.query;
    let url = `/seasonal/pricing/${product_category}`;
    if (month) {
      url += `?month=${month}`;
    }
    const result = await touriAiRequest(url, 'GET');
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get seasonal pricing',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Market opportunity analysis
router.get('/market/opportunity/:product_category/:country', async (req, res) => {
  try {
    const { product_category, country } = req.params;
    const result = await touriAiRequest(`/market/opportunity/${product_category}/${country}`, 'GET');
    res.json({
      success: true,
      provider: 'TOURI_AI',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get market opportunity',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
