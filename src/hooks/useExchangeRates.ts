import { useState, useEffect } from 'react';
import axios from 'axios';
import { ExchangeRate } from '../types';

const API_KEY = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

export const useExchangeRates = () => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    if (!API_KEY) {
      setError('Exchange Rate API key is not configured');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/${API_KEY}/latest/USD`);
      const conversionRates = response.data.conversion_rates;
      
      const formattedRates: ExchangeRate[] = Object.entries(conversionRates)
        .map(([code, rate]) => ({
          code,
          rate: rate as number,
        }))
        .sort((a, b) => a.code.localeCompare(b.code));

      setRates(formattedRates);
    } catch (err) {
      setError('Failed to fetch exchange rates. Please try again later.');
      console.error('Exchange rate fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const convertAmount = (amount: number, fromCurrency: string, toCurrency: string): number => {
    const fromRate = rates.find(rate => rate.code === fromCurrency)?.rate || 1;
    const toRate = rates.find(rate => rate.code === toCurrency)?.rate || 1;
    
    return (amount / fromRate) * toRate;
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return {
    rates,
    loading,
    error,
    convertAmount,
    refreshRates: fetchRates,
  };
}; 