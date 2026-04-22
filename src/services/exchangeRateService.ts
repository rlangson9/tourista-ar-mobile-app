const OPEN_EXCHANGE_RATES_API_URL = 'https://openexchangerates.org/api/latest.json'

export interface ExchangeRateData {
  base: string
  rates: Record<string, number>
  timestamp: number
}

let cachedRates: ExchangeRateData | null = null
let lastFetchTime = 0
const CACHE_DURATION = 3600000 // 1 hour in milliseconds

export const fetchExchangeRates = async (apiKey: string, baseCurrency: string = 'USD'): Promise<ExchangeRateData> => {
  const now = Date.now()
  
  if (cachedRates && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedRates
  }

  try {
    const url = `${OPEN_EXCHANGE_RATES_API_URL}?app_id=${apiKey}&base=${baseCurrency}`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch exchange rates: ${response.status}`)
    }

    const data = await response.json()
    cachedRates = data
    lastFetchTime = now
    
    return data
  } catch (error) {
    console.error('Error fetching exchange rates:', error)
    
    if (cachedRates) {
      return cachedRates
    }
    
    throw error
  }
}

export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number>
): number => {
  if (fromCurrency === toCurrency) return amount
  
  const fromRate = rates[fromCurrency] || 1
  const toRate = rates[toCurrency] || 1
  
  return (amount / fromRate) * toRate
}

export const formatCurrency = (
  amount: number,
  currencyCode: string,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}
