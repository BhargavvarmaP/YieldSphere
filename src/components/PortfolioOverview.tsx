import React from 'react';
import { TrendingUp, PieChart, Activity } from 'lucide-react';
import type { PortfolioStats } from '../types';

interface PortfolioOverviewProps {
  stats: PortfolioStats;
}

export function PortfolioOverview({ stats }: PortfolioOverviewProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <PieChart className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600">Total Value</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalValue}</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">24h Change</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.dailyChange}</p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-600">Monthly Yield</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.monthlyYield}</p>
        </div>
        
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <span className="text-sm text-gray-600">Yearly Yield</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.yearlyYield}</p>
        </div>
      </div>
    </div>
  );
}