export interface VamboClientConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface TTSOptions {
  text: string;
  language: string;
  voice?: string;
}

export interface TranslateBatchOptions {
  texts: string[];
  source: string;
  target: string;
}

export class VamboClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(config: VamboClientConfig) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl || 'https://api.vambo.ai/v1';
  }

  private getHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  async tts(options: TTSOptions): Promise<{ save: (path: string) => Promise<void>; buffer: Buffer }> {
    const response = await fetch(`${this.baseUrl}/tts`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        text: options.text,
        language: options.language,
        voice: options.voice || 'female-1',
      }),
    });

    if (!response.ok) {
      throw new Error(`Vambo TTS API error: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const bufferData = Buffer.from(buffer);

    return {
      async save(path: string): Promise<void> {
        const fs = await import('fs');
        fs.writeFileSync(path, bufferData);
      },
      buffer: bufferData,
    };
  }

  async translateBatch(options: TranslateBatchOptions): Promise<string[]> {
    const response = await fetch(`${this.baseUrl}/translate/batch`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        texts: options.texts,
        source: options.source,
        target: options.target,
      }),
    });

    if (!response.ok) {
      throw new Error(`Vambo Translate API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.results || data.translations || [];
  }

  async translate(text: string, source: string, target: string): Promise<string> {
    const results = await this.translateBatch({
      texts: [text],
      source,
      target,
    });
    return results[0] || text;
  }
}

export const getVamboClient = (): VamboClient | null => {
  const apiKey = import.meta.env.VITE_VAMBO_API_KEY;
  if (!apiKey) {
    console.warn('Vambo API key not configured. African language features may be limited.');
    return null;
  }
  return new VamboClient({ apiKey });
};

export const SUPPORTED_AFRICAN_LANGUAGES = [
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'sn', name: 'Shona', nativeName: 'Shona' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
  { code: 'bm', name: 'Bambara', nativeName: 'Bambara' },
  { code: 'rw', name: 'Kinyarwanda', nativeName: 'Kinyarwanda' },
  { code: 'ny', name: 'Chichewa', nativeName: 'Chichewa' },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa' },
];

export const isAfricanLanguage = (languageCode: string): boolean => {
  return SUPPORTED_AFRICAN_LANGUAGES.some(lang => lang.code === languageCode);
};