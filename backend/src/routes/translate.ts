import express from 'express';

const router = express.Router();

// Translation endpoint with context support
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
    const AI_API_KEY = process.env.AI_API_KEY;
    const AI_BASE_URL = process.env.AI_BASE_URL || 'https://api.deepseek.com/v1';

    // Try TOURI AI Model first
    try {
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

      if (touriResponse.ok) {
        const result = await touriResponse.json();
        return res.json({
          ...result,
          provider: 'TOURI_AI'
        });
      }
    } catch (touriError) {
      console.log('TOURI AI not available, falling back to DeepSeek:', touriError);
    }

    // Fallback to DeepSeek
    if (!AI_API_KEY) {
      return res.status(503).json({
        success: false,
        error: {
          message: 'AI translation service not configured',
        },
      });
    }

    // Build context-aware prompt for better translation
    const contextPrompt = context === 'trade' 
      ? 'You are a professional trade and business translator. Focus on accurate business terminology.'
      : context === 'travel'
      ? 'You are a travel and tourism translator. Focus on location names and travel-related terms.'
      : 'You are a professional translator.';

    const systemPrompt = `${contextPrompt}
Translate the following text from ${source_language} to ${target_language}.
Return ONLY the translated text, nothing else.
If the source and target languages are the same, return the original text.`;

    const response = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        max_tokens: 500,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: text },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'AI translation failed');
    }

    const data = await response.json();
    const translatedText = data.choices?.[0]?.message?.content?.trim() || text;

    // Detect business terms in the translated text
    const businessTerms = detectBusinessTerms(translatedText, target_language);

    res.json({
      success: true,
      original_text: text,
      translated_text: translatedText,
      source_language,
      target_language,
      context: context || 'general',
      confidence: businessTerms.length > 0 ? 0.95 : 0.90,
      business_terms_found: businessTerms,
      needs_review: businessTerms.length === 0 && context === 'trade',
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

// Batch translation endpoint
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

    const AI_API_KEY = process.env.AI_API_KEY;
    const AI_BASE_URL = process.env.AI_BASE_URL || 'https://api.deepseek.com/v1';

    if (!AI_API_KEY) {
      return res.status(503).json({
        success: false,
        error: {
          message: 'AI translation service not configured',
        },
      });
    }

    const contextPrompt = context === 'trade'
      ? 'You are a professional trade and business translator. Translate the following array of texts from ' + source_language + ' to ' + target_language + '. Return ONLY a JSON array of translated strings, nothing else.'
      : 'You are a professional translator. Translate the following array of texts from ' + source_language + ' to ' + target_language + '. Return ONLY a JSON array of translated strings, nothing else.';

    const response = await fetch(`${AI_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        max_tokens: 1000,
        messages: [
          { role: 'system', content: contextPrompt },
          { role: 'user', content: JSON.stringify(texts) },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'AI translation failed');
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim() || '[]';

    let translatedTexts;
    try {
      // Try to parse as JSON array
      translatedTexts = JSON.parse(content);
      if (!Array.isArray(translatedTexts)) {
        translatedTexts = texts;
      }
    } catch {
      // If parsing fails, return original texts
      translatedTexts = texts;
    }

    res.json({
      success: true,
      original_texts: texts,
      translated_texts: translatedTexts,
      source_language,
      target_language,
      context: context || 'general',
      count: texts.length,
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

// Helper function to detect business terms
function detectBusinessTerms(text: string, language: string): string[] {
  const businessTerms: Record<string, string[]> = {
    zh: ['价格', '报价', '订单', '合同', '供应商', '采购', '质量', '批发', '贸易', '物流', '海关', '关税', '运输', '包装', '样品', '规格', '交货', '付款', '美元', '人民币'],
    en: ['price', 'quote', 'order', 'contract', 'supplier', 'sourcing', 'quality', 'wholesale', 'trade', 'logistics', 'customs', 'shipping', 'packaging', 'sample', 'specs', 'delivery', 'payment', 'MOQ', 'FOB', 'CIF'],
  };

  const terms = businessTerms[language] || businessTerms.en;
  return terms.filter(term => text.includes(term));
}

export default router;
