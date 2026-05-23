import express from 'express';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { messages, mode } = req.body;

    const TOURI_AI_BASE_URL = process.env.TOURI_AI_BASE_URL || 'http://localhost:8000';

    const response = await fetch(`${TOURI_AI_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: req.headers['x-user-id'] || 'anonymous',
        messages,
        mode: mode || 'general',
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.detail || `Touri AI API error ${response.status}`);
    }

    const data = await response.json();
    
    res.json({
      success: true,
      response: data.response,
      intent: data.intent,
      confidence: data.confidence,
      suggestions: data.suggestions,
      related_actions: data.related_actions,
      language_detected: data.language_detected,
      source: 'touri_ai',
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
});

export default router;
