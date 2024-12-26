import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  Wallet, Clock, TrendingUp, Lock, 
  AlertCircle, ChevronDown, Search
} from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardContent 
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../ui/alert";

// Types
interface BondOffer {
  id: string;
  name: string;
  yield: string;
  term: string;
  minimumInvestment: string;
  collateral: string;
  collateralRatio: string;
  totalSupply: string;
  remainingSupply: string;
  risk: 'Low' | 'Medium' | 'High';
}

// Mock data
const bondOffers: BondOffer[] = [
  {
    id: '1',
    name: 'Stablecoin Yield Bond',
    yield: '8.5% APY',
    term: '90 days',
    minimumInvestment: '1,000 USDC',
    collateral: 'ETH',
    collateralRatio: '150%',
    totalSupply: '1,000,000 USDC',
    remainingSupply: '245,000 USDC',
    risk: 'Low',
  },
  {
    id: '2',
    name: 'Blue Chip Crypto Bond',
    yield: '12.4% APY',
    term: '180 days',
    minimumInvestment: '5,000 USDC',
    collateral: 'BTC/ETH',
    collateralRatio: '130%',
    totalSupply: '2,000,000 USDC',
    remainingSupply: '820,000 USDC',
    risk: 'Medium',
  },
  {
    id: '3',
    name: 'DeFi Protocol Bond',
    yield: '15.8% APY',
    term: '365 days',
    minimumInvestment: '10,000 USDC',
    collateral: 'UNI/AAVE',
    collateralRatio: '200%',
    totalSupply: '5,000,000 USDC',
    remainingSupply: '1,250,000 USDC',
    risk: 'High',
  },
];

// Purchase Dialog Component
const PurchaseDialog = ({ bond }: { bond: BondOffer }) => {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Purchase {bond.name}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount (USDC)</label>
          <Input
            type="number"
            placeholder={`Min. ${bond.minimumInvestment}`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Make sure you have sufficient USDC in your wallet. This transaction cannot be reversed.
          </AlertDescription>
        </Alert>
        <Button 
          className="w-full" 
          onClick={handlePurchase}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Confirm Purchase'}
        </Button>
      </div>
    </DialogContent>
  );
};

// Bond Card Component
const BondCard = ({ bond }: { bond: BondOffer }) => {
  const cardRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const supplyPercentage = (parseInt(bond.remainingSupply.replace(/[^0-9]/g, '')) / 
      parseInt(bond.totalSupply.replace(/[^0-9]/g, ''))) * 100;

    gsap.fromTo(progressRef.current,
      { width: '0%' },
      { 
        width: `${supplyPercentage}%`,
        duration: 1.5,
        ease: 'power2.out'
      }
    );
  }, [bond]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full"
    >
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-6">
            <Wallet className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{bond.name}</h3>
              <p className="text-green-600 font-medium">{bond.yield}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">Term: {bond.term}</span>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Min. Investment</span>
                <span className="text-sm font-medium">{bond.minimumInvestment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Collateral</span>
                <span className="text-sm font-medium">{bond.collateral}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Collateral Ratio</span>
                <span className="text-sm font-medium">{bond.collateralRatio}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Supply Remaining</p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full bg-blue-600 rounded-full"
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-600">
                  {bond.remainingSupply} left
                </span>
                <span className="text-xs text-gray-600">
                  of {bond.totalSupply}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-sm ${
                bond.risk === 'Low' ? 'bg-green-100 text-green-600' :
                bond.risk === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                {bond.risk} Risk
              </span>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full mt-4">
                Purchase Bond
              </Button>
            </DialogTrigger>
            <PurchaseDialog bond={bond} />
          </Dialog>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Main Component
export default function DecentralizedBonds() {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }, []);

  const filteredBonds = bondOffers.filter(bond => {
    const matchesSearch = bond.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'all' || bond.risk.toLowerCase() === riskFilter.toLowerCase();
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div ref={headerRef} className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Decentralized Bonds</h2>
            <p className="text-gray-600 mt-1">Fixed-yield instruments backed by crypto collateral</p>
          </div>
          <Lock className="w-6 h-6 text-blue-600" />
        </div>

        <div className="flex gap-4 flex-col sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              className="pl-9"
              placeholder="Search bonds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risks</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBonds.map((bond) => (
            <BondCard key={bond.id} bond={bond} />
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}