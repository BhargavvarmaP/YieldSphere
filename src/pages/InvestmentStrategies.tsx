import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Target,
  DollarSign,
  Clock,
  Shield,
  BarChart2,
  Zap,
  Rocket,
} from 'lucide-react';

const InvestmentStrategies = () => {
  const chartRef = useRef(null);

  const strategies = [
    {
      title: 'Conservative',
      icon: <Shield className="w-6 h-6" />,
      description: 'Low-risk, stable returns focused on capital preservation',
      allocation: [
        { asset: 'Bonds', percentage: 60 },
        { asset: 'Blue-chip Stocks', percentage: 20 },
        { asset: 'Cash', percentage: 15 },
        { asset: 'Alternative', percentage: 5 },
      ],
      expectedReturn: '5-8%',
      riskLevel: 'Low',
      color: 'bg-blue-500',
    },
    {
      title: 'Balanced',
      icon: <BarChart2 className="w-6 h-6" />,
      description: 'Moderate risk with balanced growth and income',
      allocation: [
        { asset: 'Stocks', percentage: 50 },
        { asset: 'Bonds', percentage: 30 },
        { asset: 'Real Estate', percentage: 10 },
        { asset: 'Alternative', percentage: 10 },
      ],
      expectedReturn: '8-12%',
      riskLevel: 'Medium',
      color: 'bg-green-500',
    },
    {
      title: 'Growth',
      icon: <Zap className="w-6 h-6" />,
      description: 'Higher risk focused on capital appreciation',
      allocation: [
        { asset: 'Growth Stocks', percentage: 70 },
        { asset: 'Bonds', percentage: 15 },
        { asset: 'Commodities', percentage: 10 },
        { asset: 'Cash', percentage: 5 },
      ],
      expectedReturn: '12-15%',
      riskLevel: 'High',
      color: 'bg-purple-500',
    },
    {
      title: 'Aggressive',
      icon: <Rocket className="w-6 h-6" />,
      description: 'Maximum growth potential with high volatility',
      allocation: [
        { asset: 'Small-cap Stocks', percentage: 50 },
        { asset: 'Emerging Markets', percentage: 25 },
        { asset: 'Cryptocurrencies', percentage: 15 },
        { asset: 'Options/Futures', percentage: 10 },
      ],
      expectedReturn: '15%+',
      riskLevel: 'Very High',
      color: 'bg-red-500',
    },
  ];

  const metrics = [
    {
      title: 'Target Return',
      value: 12.5,
      suffix: '%',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Current Return',
      value: 10.8,
      suffix: '%',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-green-500',
    },
    {
      title: 'AUM',
      value: 1250000,
      prefix: '$',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-purple-500',
    },
    {
      title: 'Avg Hold Time',
      value: 145,
      suffix: ' days',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-orange-500',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.metric-card', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, chartRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={chartRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 space-y-6"
    >
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <motion.div
            key={metric.title}
            className="metric-card"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Card className="backdrop-blur-lg bg-white/10 border-none shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${metric.color}`}>
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{metric.title}</p>
                    <h3 className="text-2xl font-bold text-white">
                      {metric.prefix}
                      {metric.value.toLocaleString()}
                      {metric.suffix}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Strategy Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {strategies.map((strategy, index) => (
          <motion.div
            key={strategy.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Card className="backdrop-blur-lg bg-white/10 border-none shadow-xl h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${strategy.color}`}>
                      {strategy.icon}
                    </div>
                    <CardTitle className="text-white">
                      {strategy.title}
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="text-white">
                    {strategy.riskLevel}
                  </Badge>
                </div>
                <p className="text-gray-400 mt-2">{strategy.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {strategy.allocation.map((asset) => (
                    <div key={asset.asset} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{asset.asset}</span>
                        <span className="text-white">{asset.percentage}%</span>
                      </div>
                      <Progress value={asset.percentage} className="h-2" />
                    </div>
                  ))}
                  <div className="pt-4">
                    <div className="flex justify-between text-sm mb-4">
                      <span className="text-gray-400">Expected Return</span>
                      <span className="text-white">
                        {strategy.expectedReturn}
                      </span>
                    </div>
                    <Button className={`w-full ${strategy.color}`}>
                      Apply Strategy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InvestmentStrategies;
