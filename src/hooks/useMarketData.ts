import { useState, useEffect } from 'react';
import { marketService } from '../services/api/marketService';
import type { MarketOverview, AssetPrice } from '../types/market';

export const useMarketData = () => {
  const [marketData, setMarketData] = useState<MarketOverview | null>(null);
  const [prices, setPrices] = useState<AssetPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const data = await marketService.getMarketOverview();
        setMarketData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch market data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return { marketData, prices, isLoading, error };
};