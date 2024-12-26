import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  TrendingUp, 
  Gamepad, 
  Brain, 
  Wallet, 
  BarChart2,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ThemeData {
  name: string;
  icon: React.ReactNode;
  tvl: string;
  apy: string;
  tokens: string[];
  performance24h: string;
  allocation: {
    token: string;
    weight: number;
  }[];
  minInvestment: number;
  risk: 'Low' | 'Medium' | 'High';
}

const thematicPools: ThemeData[] = [
  {
    name: 'DeFi Protocols',
    icon: <Layers className="w-6 h-6" />,
    tvl: '$45.2M',
    apy: '18.5%',
    tokens: ['UNI', 'AAVE', 'MKR', 'COMP'],
    performance24h: '+2.8%',
    allocation: [
      { token: 'UNI', weight: 35 },
      { token: 'AAVE', weight: 25 },
      { token: 'MKR', weight: 20 },
      { token: 'COMP', weight: 20 },
    ],
    minInvestment: 1000,
    risk: 'Medium',
  },
  {
    name: 'GameFi',
    icon: <Gamepad className="w-6 h-6" />,
    tvl: '$28.7M',
    apy: '22.3%',
    tokens: ['AXS', 'SAND', 'MANA', 'ENJ'],
    performance24h: '+4.2%',
    allocation: [
      { token: 'AXS', weight: 30 },
      { token: 'SAND', weight: 30 },
      { token: 'MANA', weight: 20 },
      { token: 'ENJ', weight: 20 },
    ],
    minInvestment: 500,
    risk: 'High',
  },
  {
    name: 'AI Tokens',
    icon: <Brain className="w-6 h-6" />,
    tvl: '$32.1M',
    apy: '25.7%',
    tokens: ['OCEAN', 'FET', 'AGIX', 'NMR'],
    performance24h: '+5.6%',
    allocation: [
      { token: 'OCEAN', weight: 35 },
      { token: 'FET', weight: 25 },
      { token: 'AGIX', weight: 25 },
      { token: 'NMR', weight: 15 },
    ],
    minInvestment: 750,
    risk: 'High',
  },
];

const ThematicPool = () => {
  const [selectedPool, setSelectedPool] = useState<ThemeData | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const metrics = [
    {
      title: 'Total Value Locked',
      value: '$106M',
      change: '+12.5%',
      icon: <Wallet className="w-6 h-6" />,
    },
    {
      title: 'Average APY',
      value: '22.2%',
      change: '+3.8%',
      icon: <BarChart2 className="w-6 h-6" />,
    },
    {
      title: '24h Volume',
      value: '$2.8M',
      change: '+15.3%',
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  const handleInvest = () => {
    if (!selectedPool || !investmentAmount) return;
    const amount = parseFloat(investmentAmount);
    if (amount < selectedPool.minInvestment) return;
    setShowConfirmation(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
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
                    <div className="p-3 rounded-lg bg-blue-500/20">
                      {metric.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{metric.title}</p>
                      <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
                    </div>
                  </div>
                  <span className="text-green-400">{metric.change}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Thematic Pools */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {thematicPools.map((pool) => (
          <motion.div
            key={pool.name}
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <Card className="backdrop-blur-lg bg-white/10 border-none shadow-xl h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-500/20 text-white">
                      {pool.icon}
                    </div>
                    <CardTitle className="text-white">{pool.name}</CardTitle>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    pool.risk === 'High' ? 'bg-red-500/20 text-red-300' :
                    pool.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>
                    {pool.risk} Risk
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">TVL</p>
                    <p className="text-lg font-semibold text-white">{pool.tvl}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">APY</p>
                    <p className="text-lg font-semibold text-green-400">{pool.apy}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">24h Change</p>
                    <p className="text-lg font-semibold text-green-400">{pool.performance24h}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">Min. Investment</p>
                    <p className="text-lg font-semibold text-white">${pool.minInvestment}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Token Allocation</p>
                  {pool.allocation.map((token) => (
                    <div key={token.token} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{token.token}</span>
                        <span className="text-white">{token.weight}%</span>
                      </div>
                      <Progress value={token.weight} className="h-1" />
                    </div>
                  ))}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => setSelectedPool(pool)}
                    >
                      Invest Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Invest in {pool.name}</DialogTitle>
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
                      {parseFloat(investmentAmount) < pool.minInvestment && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Minimum investment required: ${pool.minInvestment}
                          </AlertDescription>
                        </Alert>
                      )}
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Expected Returns (Annual)</p>
                        <p className="text-lg font-semibold">
                          ${investmentAmount ? (parseFloat(investmentAmount) * parseFloat(pool.apy) / 100).toFixed(2) : '0.00'}
                        </p>
                      </div>
                      <Button 
                        className="w-full"
                        onClick={handleInvest}
                        disabled={!investmentAmount || parseFloat(investmentAmount) < pool.minInvestment}
                      >
                        Confirm Investment <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Investment Confirmed</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Your investment of ${investmentAmount} in {selectedPool?.name} has been confirmed.</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">Transaction Details</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Amount</span>
                    <span>${investmentAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected APY</span>
                    <span>{selectedPool?.apy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pool</span>
                    <span>{selectedPool?.name}</span>
                  </div>
                </div>
              </div>
              <Button 
                className="w-full"
                onClick={() => {
                  setShowConfirmation(false);
                  setInvestmentAmount('');
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

export default ThematicPool;