import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  TrendingDown, 
  BarChart2, 
  Activity,
  ArrowRight,
  AlertCircle,
  DollarSign,
  TrendingUp,
  LineChart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';
import { Slider } from '../ui/slider';

interface HedgingStrategy {
  name: string;
  description: string;
  protection: 'High' | 'Medium' | 'Moderate';
  performance: {
    bullMarket: string;
    bearMarket: string;
  };
  composition: {
    asset: string;
    allocation: number;
  }[];
  fee: string;
  minInvestment: number;
  leverageRange: {
    min: number;
    max: number;
  };
  rebalanceFrequency: string;
}

const hedgingStrategies: HedgingStrategy[] = [
  {
    name: 'Dynamic Delta Neutral',
    description: 'Maintains market neutrality through perpetual futures',
    protection: 'High',
    performance: {
      bullMarket: '+8.5%',
      bearMarket: '+4.2%',
    },
    composition: [
      { asset: 'Long ETH', allocation: 50 },
      { asset: 'Short Futures', allocation: 50 },
    ],
    fee: '1.5%',
    minInvestment: 5000,
    leverageRange: { min: 1, max: 3 },
    rebalanceFrequency: 'Daily',
  },
  {
    name: 'Volatility Income',
    description: 'Generates yield from volatility trading',
    protection: 'Medium',
    performance: {
      bullMarket: '+12.4%',
      bearMarket: '+2.8%',
    },
    composition: [
      { asset: 'Options', allocation: 40 },
      { asset: 'Stables', allocation: 60 },
    ],
    fee: '2.0%',
    minInvestment: 10000,
    leverageRange: { min: 1, max: 2 },
    rebalanceFrequency: 'Weekly',
  },
  {
    name: 'Tail Risk Hedge',
    description: 'Protection against extreme market events',
    protection: 'High',
    performance: {
      bullMarket: '+5.2%',
      bearMarket: '+15.6%',
    },
    composition: [
      { asset: 'Put Options', allocation: 30 },
      { asset: 'Inverse ETF', allocation: 20 },
      { asset: 'Stables', allocation: 50 },
    ],
    fee: '2.5%',
    minInvestment: 15000,
    leverageRange: { min: 1, max: 2.5 },
    rebalanceFrequency: 'Monthly',
  },
];

const VolatilityHedging = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<HedgingStrategy | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [leverage, setLeverage] = useState<number>(1);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const metrics = [
    {
      title: 'Total Hedged Value',
      value: '$82.5M',
      change: '+5.2%',
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: 'Average Protection',
      value: '92.4%',
      change: '+2.1%',
      icon: <LineChart className="w-6 h-6" />,
    },
    {
      title: 'Market Volatility',
      value: '45.2%',
      change: '-8.3%',
      icon: <Activity className="w-6 h-6" />,
    },
  ];

  const calculateProtectionAmount = (amount: number, strategy: HedgingStrategy) => {
    const baseProtection = strategy.protection === 'High' ? 0.9 : 
                          strategy.protection === 'Medium' ? 0.75 : 0.6;
    return amount * baseProtection * leverage;
  };

  const calculateFees = (amount: number, strategy: HedgingStrategy) => {
    return amount * (parseFloat(strategy.fee) / 100);
  };

  const handleInvest = () => {
    if (!selectedStrategy || !investmentAmount) return;
    const amount = parseFloat(investmentAmount);
    if (amount < selectedStrategy.minInvestment) return;
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <motion.div
            key={metric.title}
            whileHover={{ scale: 1.02 }}
            className="metric-card"
          >
            <Card className="backdrop-blur-lg bg-white/10 border-none shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-purple-500/20">
                      {metric.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{metric.title}</p>
                      <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
                    </div>
                  </div>
                  <span className={metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                    {metric.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Hedging Strategies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hedgingStrategies.map((strategy) => (
          <motion.div
            key={strategy.name}
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="backdrop-blur-lg bg-white/10 border-none shadow-xl h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-purple-500/20 text-white">
                      <Activity className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-white">{strategy.name}</CardTitle>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    strategy.protection === 'High' ? 'bg-green-500/20 text-green-300' :
                    strategy.protection === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {strategy.protection} Protection
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">{strategy.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Bull Market</p>
                    <p className="text-lg font-semibold text-green-400">
                      {strategy.performance.bullMarket}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Bear Market</p>
                    <p className="text-lg font-semibold text-blue-400">
                      {strategy.performance.bearMarket}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Asset Allocation</p>
                  {strategy.composition.map((item) => (
                    <div key={item.asset} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{item.asset}</span>
                        <span className="text-white">{item.allocation}%</span>
                      </div>
                      <Progress value={item.allocation} className="h-1" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Management Fee</span>
                  <span className="text-white">{strategy.fee}</span>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => setSelectedStrategy(strategy)}
                    >
                      Setup Hedge
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Setup {strategy.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm text-gray-500">Investment Amount (USD)</label>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={investmentAmount}
                          onChange={(e) => setInvestmentAmount(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm text-gray-500">Leverage ({leverage}x)</label>
                        <Slider
                          min={strategy.leverageRange.min}
                          max={strategy.leverageRange.max}
                          step={0.1}
                          value={[leverage]}
                          onValueChange={([value]) => setLeverage(value)}
                        />
                      </div>

                      {parseFloat(investmentAmount) < strategy.minInvestment && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Minimum investment required: ${strategy.minInvestment.toLocaleString()}
                          </AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2 bg-gray-100 p-4 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span>Protection Amount</span>
                          <span>${investmentAmount ? 
                            calculateProtectionAmount(parseFloat(investmentAmount), strategy).toLocaleString() : '0'
                          }</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Management Fee</span>
                          <span>${investmentAmount ? 
                            calculateFees(parseFloat(investmentAmount), strategy).toLocaleString() : '0'
                          }</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Rebalance Frequency</span>
                          <span>{strategy.rebalanceFrequency}</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full"
                        onClick={handleInvest}
                        disabled={!investmentAmount || parseFloat(investmentAmount) < strategy.minInvestment}
                      >
                        Confirm Setup <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && selectedStrategy && (
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Hedge Setup Confirmed</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Your hedging strategy has been successfully configured.</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Strategy Details</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Investment Amount</span>
                    <span>${parseFloat(investmentAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Protection Level</span>
                    <span>{selectedStrategy.protection}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Leverage</span>
                    <span>{leverage}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rebalancing</span>
                    <span>{selectedStrategy.rebalanceFrequency}</span>
                  </div>
                </div>
              </div>
              <Button 
                className="w-full"
                onClick={() => {
                  setShowConfirmation(false);
                  setInvestmentAmount('');
                  setLeverage(1);
                }}
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VolatilityHedging;