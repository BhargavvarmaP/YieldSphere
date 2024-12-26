export interface MarketStats {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  totalAssets: number;
  gainers24h: number;
  losers24h: number;
  timestamp: string;
}

export interface MarketTrend {
  interval: '1h' | '24h' | '7d' | '30d' | '1y';
  change: number;
  volume: number;
  volatility: number;
}

export interface PricePoint {
  timestamp: string;
  price: number;
  volume: number;
}

export interface AssetPrice {
  id: string;
  symbol: string;
  price: number;
  high24h: number;
  low24h: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  lastUpdated: string;
}

export interface MarketNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  imageUrl?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  relatedAssets: string[];
  publishedAt: string;
}

export interface MarketSector {
  id: string;
  name: string;
  marketCap: number;
  volume24h: number;
  change24h: number;
  dominance: number;
  trend: MarketTrend[];
}

export interface TopMover {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  sparkline: number[];
}

export interface MarketFilters {
  search?: string;
  type?: 'crypto' | 'stock' | 'commodity' | 'forex';
  sector?: string;
  minPrice?: number;
  maxPrice?: number;
  minMarketCap?: number;
  maxMarketCap?: number;
  minVolume?: number;
  maxVolume?: number;
  sortBy?: 'price' | 'marketCap' | 'volume' | 'change';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface MarketOverview {
  stats: MarketStats;
  trends: Record<string, MarketTrend>;
  topGainers: TopMover[];
  topLosers: TopMover[];
  mostVolume: TopMover[];
  sectors: MarketSector[];
  news: MarketNews[];
  lastUpdated: string;
}

export interface PriceAlert {
  id: string;
  userId: string;
  assetId: string;
  type: 'above' | 'below';
  price: number;
  triggered: boolean;
  createdAt: string;
  triggeredAt?: string;
}

export interface WatchlistItem {
  id: string;
  userId: string;
  assetId: string;
  addedAt: string;
  alerts: PriceAlert[];
  notes?: string;
}
