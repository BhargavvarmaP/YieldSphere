import React from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiTrendingUp, FiActivity, FiGlobe } from 'react-icons/fi';
import { StatsCard } from '../components/cards/StatsCard';
import { PortfolioChart } from '../components/charts/PortfolioChart';

const MarketOverview: React.FC = () => {
  const marketMetrics = [
    {
      title: 'Market Cap',
      value: 2.5,
      suffix: 'T',
      change: 3.2,
      icon: <FiDollarSign size={24} />,
    },
    {
      title: 'Volume 24h',
      value: 125.8,
      suffix: 'B',
      change: 5.6,
      icon: <FiActivity size={24} />,
    },
    {
      title: 'Global Index',
      value: 4218,
      change: -1.2,
      icon: <FiGlobe size={24} />,
    },
    {
      title: 'Volatility',
      value: 15.4,
      suffix: '%',
      change: 2.1,
      icon: <FiTrendingUp size={24} />,
    },
  ];

  const marketNews = [
    {
      title: 'Fed Announces New Interest Rate Decision',
      source: 'Financial Times',
      time: '2 hours ago',
      impact: 'High',
      category: 'Monetary Policy',
    },
    {
      title: 'Tech Stocks Rally on Strong Earnings',
      source: 'Bloomberg',
      time: '4 hours ago',
      impact: 'Medium',
      category: 'Stocks',
    },
    {
      title: 'Global Markets React to Economic Data',
      source: 'Reuters',
      time: '6 hours ago',
      impact: 'Medium',
      category: 'Global Markets',
    },
    {
      title: 'Cryptocurrency Market Shows Recovery Signs',
      source: 'CoinDesk',
      time: '8 hours ago',
      impact: 'Low',
      category: 'Crypto',
    },
  ];

  const topMovers = [
    { symbol: 'AAPL', name: 'Apple Inc.', change: 3.45, price: 178.25 },
    { symbol: 'TSLA', name: 'Tesla Inc.', change: -2.18, price: 242.80 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', change: 1.92, price: 332.15 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', change: 2.34, price: 125.90 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', change: -1.56, price: 142.35 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 space-y-6"
    >
      {/* Market Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketMetrics.map((metric) => (
          <StatsCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Market Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Market Performance</h2>
        <PortfolioChart data={[]} /> {/* Add your market data here */}
      </div>

      {/* Market News and Top Movers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market News */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Market News</h2>
          <div className="space-y-4">
            {marketNews.map((news) => (
              <div
                key={news.title}
                className="border-l-4 border-blue-500 pl-4 py-2"
              >
                <h3 className="font-medium text-gray-900">{news.title}</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                  <span>{news.source}</span>
                  <span>•</span>
                  <span>{news.time}</span>
                  <span>•</span>
                  <span className="text-blue-600">{news.category}</span>
                </div>
                <span className={`text-sm font-medium ${
                  news.impact === 'High'
                    ? 'text-red-600'
                    : news.impact === 'Medium'
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}>
                  {news.impact} Impact
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Movers */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Top Movers</h2>
          <div className="space-y-4">
            {topMovers.map((stock) => (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{stock.symbol}</h3>
                  <p className="text-sm text-gray-500">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${stock.price}</p>
                  <p className={`text-sm ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stock.change >= 0 ? '+' : ''}{stock.change}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Sectors */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Sector Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Technology', change: 2.5, volume: '125B' },
            { name: 'Healthcare', change: -1.2, volume: '85B' },
            { name: 'Finance', change: 1.8, volume: '95B' },
            { name: 'Energy', change: 3.2, volume: '75B' },
            { name: 'Consumer', change: -0.8, volume: '65B' },
            { name: 'Materials', change: 1.5, volume: '45B' },
          ].map((sector) => (
            <div
              key={sector.name}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <h3 className="font-medium text-gray-900">{sector.name}</h3>
              <div className="mt-2 flex justify-between items-center">
                <span className={`text-sm font-medium ${
                  sector.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {sector.change >= 0 ? '+' : ''}{sector.change}%
                </span>
                <span className="text-sm text-gray-500">
                  Vol: ${sector.volume}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MarketOverview;
