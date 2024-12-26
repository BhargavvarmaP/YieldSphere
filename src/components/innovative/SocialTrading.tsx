import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, TrendingUp, Star } from 'lucide-react';

interface Trader {
  name: string;
  rank: number;
  performance: {
    daily: string;
    monthly: string;
    yearly: string;
  };
  followers: number;
  aum: string;
  strategy: string;
  risk: 'Low' | 'Medium' | 'High';
}

const topTraders: Trader[] = [
  {
    name: 'Alex Thompson',
    rank: 1,
    performance: {
      daily: '+2.8%',
      monthly: '+15.4%',
      yearly: '+124.5%',
    },
    followers: 2547,
    aum: '$12.5M',
    strategy: 'Momentum Trading',
    risk: 'Medium',
  },
  {
    name: 'Sarah Chen',
    rank: 2,
    performance: {
      daily: '+1.9%',
      monthly: '+12.8%',
      yearly: '+98.3%',
    },
    followers: 1893,
    aum: '$8.2M',
    strategy: 'Value Investing',
    risk: 'Low',
  },
  {
    name: 'Michael Rodriguez',
    rank: 3,
    performance: {
      daily: '+3.5%',
      monthly: '+18.2%',
      yearly: '+156.7%',
    },
    followers: 1654,
    aum: '$6.7M',
    strategy: 'Swing Trading',
    risk: 'High',
  },
];

export function SocialTrading() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Social Trading</h2>
          <p className="text-gray-600 mt-1">Copy top-performing traders automatically</p>
        </div>
        <Users className="w-6 h-6 text-blue-600" />
      </div>

      <div className="space-y-6">
        {topTraders.map((trader) => (
          <motion.div
            key={trader.name}
            className="bg-gray-50 rounded-lg p-6"
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-600">
                      {trader.name.charAt(0)}
                    </span>
                  </div>
                  {trader.rank <= 3 && (
                    <Award 
                      className={`w-5 h-5 absolute -top-2 -right-2 ${
                        trader.rank === 1 ? 'text-yellow-500' :
                        trader.rank === 2 ? 'text-gray-400' :
                        'text-amber-600'
                      }`}
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{trader.name}</h3>
                  <p className="text-sm text-gray-600">{trader.strategy}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">AUM</p>
                <p className="font-semibold text-gray-900">{trader.aum}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Daily</p>
                <p className="font-semibold text-green-600">{trader.performance.daily}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Monthly</p>
                <p className="font-semibold text-green-600">{trader.performance.monthly}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Yearly</p>
                <p className="font-semibold text-green-600">{trader.performance.yearly}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">{trader.followers} followers</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                trader.risk === 'Low' ? 'bg-green-100 text-green-600' :
                trader.risk === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                {trader.risk} Risk
              </span>
            </div>

            <motion.button
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              whileTap={{ scale: 0.98 }}
            >
              <Star className="w-4 h-4" />
              Copy Trader
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}