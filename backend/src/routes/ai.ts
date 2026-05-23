import express from 'express';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { messages, mode } = req.body;

    const apiKey = process.env.AI_API_KEY;
    const baseUrl = process.env.AI_BASE_URL || 'https://api.deepseek.com/v1';

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'AI API key not configured. Add AI_API_KEY to your .env file.',
      });
    }

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        max_tokens: 400,
        messages,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `DeepSeek API error ${response.status}`);
    }

    const data = await response.json();
    const responseContent = data.choices?.[0]?.message?.content ?? 'Sorry, I could not generate a response.';

    res.json({
      success: true,
      response: responseContent,
      source: 'deepseek',
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