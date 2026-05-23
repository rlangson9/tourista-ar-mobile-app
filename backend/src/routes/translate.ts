import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { text, source_language, target_language, context } = req.body;

    if (!text || !source_language || !target_language) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Missing required fields: text, source_language, target_language',
        },
      });
    }

    const TOURI_AI_BASE_URL = process.env.TOURI_AI_BASE_URL || 'http://localhost:8000';

    const touriResponse = await fetch(`${TOURI_AI_BASE_URL}/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        source_language,
        target_language,
        context,
      }),
    });

    if (!touriResponse.ok) {
      const errorData = await touriResponse.json().catch(() => ({}));
      throw new Error(errorData?.detail || 'Touri AI translation failed');
    }

    const result = await touriResponse.json();
    return res.json({
      ...result,
      provider: 'TOURI_AI'
    });
  } catch (error: any) {
    console.error('Translation error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Translation service error',
      },
    });
  }
});

router.post('/batch', async (req, res) => {
  try {
    const { texts, source_language, target_language, context } = req.body;

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Missing or invalid texts array',
        },
      });
    }

    if (!source_language || !target_language) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Missing required fields: source_language, target_language',
        },
      });
    }

    const TOURI_AI_BASE_URL = process.env.TOURI_AI_BASE_URL || 'http://localhost:8000';

    const touriResponse = await fetch(`${TOURI_AI_BASE_URL}/translate/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        texts,
        source_language,
        target_language,
        context,
      }),
    });

    if (!touriResponse.ok) {
      const errorData = await touriResponse.json().catch(() => ({}));
      throw new Error(errorData?.detail || 'Touri AI batch translation failed');
    }

    const data = await touriResponse.json();
    
    res.json({
      success: true,
      original_texts: texts,
      translated_texts: data.results?.map((r: any) => r.translated_text) || texts,
      source_language,
      target_language,
      context: context || 'general',
      count: texts.length,
      provider: 'TOURI_AI'
    });
  } catch (error: any) {
    console.error('Batch translation error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: error.message || 'Translation service error',
      },
    });
  }
});

export default router;
