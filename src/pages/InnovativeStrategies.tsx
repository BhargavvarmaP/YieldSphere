import React from 'react';
import { motion } from 'framer-motion';
import  ThematicPool  from '../components/innovative/ThematicPool';
import { DynamicYieldFund } from '../components/innovative/DynamicYieldFund';
import { OptionsStrategies } from '../components/innovative/OptionsStrategies';
import { SocialTrading } from '../components/innovative/SocialTrading';
import { MultiChainIndex } from '../components/innovative/MultiChainIndex';
import { RealWorldAssets } from '../components/innovative/RealWorldAssets';
import  VolatilityHedging  from '../components/innovative/VolatilityHedging';
import  DecentralizedBonds  from '../components/innovative/DecentralizedBonds';
import { ESGIndex } from '../components/innovative/ESGIndex';

export function InnovativeStrategies() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Innovative Investment Strategies
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our cutting-edge investment opportunities powered by advanced DeFi protocols
          </p>
        </motion.div>

        <div className="space-y-8">
          <ThematicPool />
          <DynamicYieldFund />
          <OptionsStrategies />
          <SocialTrading />
          <MultiChainIndex />
          <RealWorldAssets />
          <VolatilityHedging />
          <DecentralizedBonds />
          <ESGIndex />
        </div>
      </div>
    </div>
  );
}