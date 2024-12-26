import { API_BASE_URL } from '../../config/api';
import type { MarketOverview, MarketStats, AssetPrice } from '../../types/market';

export const marketService = {
  async getMarketOverview(): Promise<MarketOverview> {
    const response = await fetch(`${API_BASE_URL}/market/overview`);
    return response.json();
  },

  async getAssetPrices(symbols: string[]): Promise<AssetPrice[]> {
    const response = await fetch(`${API_BASE_URL}/market/prices?symbols=${symbols.join(',')}`);
    return response.json();
  },

  async getMarketStats(): Promise<MarketStats> {
    const response = await fetch(`${API_BASE_URL}/market/stats`);
    return response.json();
  }
};