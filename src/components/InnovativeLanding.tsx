import React, { useEffect, useRef, useState } from 'react';
import { motion, useViewportScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Zap, ShieldCheck, Rocket, Layers, TrendingUp, PieChart, 
  Globe, Cloud, Cpu, Network, Leaf, Users 
} from 'lucide-react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const YieldSphereLanding: React.FC = () => {
  const { scrollYProgress } = useViewportScroll();
  const heroRef = useRef(null);
  const indexTokensRef = useRef(null);
  const innovativeFeaturesRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const indexTokenTypes = [
    {
      title: 'Low-Risk Index Token',
      allocation: '70% Stablecoins, 20% Blue-Chip, 10% Altcoins',
      icon: ShieldCheck,
      color: 'text-green-400',
      description: 'Designed for conservative investors seeking stable, low-volatility returns.'
    },
    {
      title: 'Medium-Risk Index Token',
      allocation: '40% Stablecoins, 40% Blue-Chip, 20% Altcoins',
      icon: Layers,
      color: 'text-blue-400',
      description: 'Balanced approach for investors seeking growth with moderate risk.'
    },
    {
      title: 'High-Risk Index Token',
      allocation: '20% Stablecoins, 30% Blue-Chip, 50% Altcoins',
      icon: Rocket,
      color: 'text-yellow-400',
      description: 'Aggressive strategy for investors targeting high potential returns.'
    }
  ];

  const innovativeFeatures = [
    {
      icon: Globe,
      title: 'Multi-Chain Index Funds',
      description: 'Diversified exposure across Ethereum, Solana, Polygon, and other leading blockchains.'
    },
    {
      icon: Cpu,
      title: 'AI-Driven Predictive Indices',
      description: 'Machine learning models dynamically adjust fund allocations based on real-time market predictions.'
    },
    {
      icon: Leaf,
      title: 'Community-Governed ESG Index',
      description: 'Invest in environmentally and socially responsible blockchain projects.'
    },
    {
      icon: Cloud,
      title: 'Decentralized Thematic Pools',
      description: 'Targeted investment in emerging sectors like DeFi, GameFi, and AI tokens.'
    }
  ];

  const testimonials = [
    { 
      name: 'Alice Johnson', 
      role: 'DeFi Strategist', 
      content: 'YieldSphere\'s multi-tier index tokens have revolutionized my approach to crypto investments, offering unparalleled risk management.', 
      avatar: '/api/placeholder/80/80' 
    },
    { 
      name: 'John Doe', 
      role: 'Blockchain Entrepreneur', 
      content: 'The platform\'s AI-driven predictive indices and dynamic rebalancing have consistently outperformed traditional investment strategies.', 
      avatar: '/api/placeholder/80/80' 
    },
    { 
      name: 'Emma Wilson', 
      role: 'Crypto Analyst', 
      content: 'YieldSphere\'s innovative approach to decentralized finance provides a comprehensive, transparent, and technologically advanced investment solution.', 
      avatar: '/api/placeholder/80/80' 
    }
  ];

  const gradientBackground = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6, 1],
    [
      'linear-gradient(135deg, #1e40af, #4338ca, #7e22ce)',
      'linear-gradient(135deg, #2563eb, #6366f1, #8b5cf6)',
      'linear-gradient(135deg, #3b82f6, #10b981, #22d3ee)',
      'linear-gradient(135deg, #1e40af, #4338ca, #7e22ce)'
    ]
  );

  useEffect(() => {
    const heroElements = gsap.utils.toArray('.hero-element');
    const indexTokenCards = gsap.utils.toArray('.index-token-card');
    const innovativeFeatureCards = gsap.utils.toArray('.innovative-feature-card');

    // Hero section animations
    gsap.fromTo(
      heroElements,
      { y: 100, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: 'power4.out'
      }
    );

    // Index tokens animation
    gsap.fromTo(
      indexTokenCards,
      { opacity: 0, x: -100, rotateY: 30 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 1.2,
        stagger: 0.4,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: indexTokensRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Innovative features animation
    gsap.fromTo(
      innovativeFeatureCards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: innovativeFeaturesRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <motion.div 
      style={{ background: gradientBackground }} 
      className="min-h-screen text-white overflow-x-hidden relative"
    >
      <Particles
        options={{
          particles: {
            color: { value: ['#ffffff', '#3b82f6', '#10b981'] },
            links: { 
              enable: true, 
              distance: 150, 
              color: '#ffffff', 
              opacity: 0.3 
            },
            move: { 
              enable: true, 
              speed: 1,
              direction: 'top',
              outModes: 'out'
            },
            number: { value: 75 },
            opacity: { value: 0.5 },
            size: { value: { min: 1, max: 3 } },
          }
        }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          className="hero-element text-6xl md:text-8xl font-bold mb-8 text-yellow-300 tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          YieldSphere
        </motion.h1>
        
        <motion.p 
          className="hero-element text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          A Comprehensive Decentralized Investment Platform Offering Intelligent, Risk-Tiered Index Tokens with Advanced Yield Optimization
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="hero-element px-10 py-4 bg-yellow-400 text-blue-900 rounded-full font-bold text-lg"
        >
          Explore Investment Strategies
        </motion.button>
      </section>

      {/* Index Tokens Section */}
      <section ref={indexTokensRef} className="py-24 bg-gray-900/50 backdrop-blur-lg">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Multi-Tier Index Token Offerings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {indexTokenTypes.map((token, index) => {
              const TokenIcon = token.icon;
              return (
                <motion.div 
                  key={index} 
                  className={`index-token-card p-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 ${token.color} bg-gray-800`}
                  initial={{ opacity: 0, x: -100, rotateY: 50 }}
                  whileHover={{ scale: 1.05, rotateY: 0 }}
                >
                  <TokenIcon className="w-16 h-16 mb-6 mx-auto" />
                  <h3 className="text-2xl font-bold text-center mb-4">{token.title}</h3>
                  <p className="text-center text-gray-300 mb-4">{token.description}</p>
                  <p className="text-center text-sm text-gray-400">Asset Allocation: {token.allocation}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovative Features Section */}
      <section ref={innovativeFeaturesRef} className="py-24 bg-gray-900/70 backdrop-blur-lg">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Groundbreaking Investment Innovations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {innovativeFeatures.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div 
                  key={index} 
                  className="innovative-feature-card p-8 rounded-2xl bg-gray-800 shadow-2xl transform transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <FeatureIcon className="w-12 h-12 mb-6 text-blue-400" />
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-900/70 backdrop-blur-lg">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">What Our Users Say</h2>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTestimonial} 
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-2xl italic mb-8">
                "{testimonials[activeTestimonial].content}"
              </p>
              
              <div className="flex items-center justify-center mb-6">
                <img 
                  src={testimonials[activeTestimonial].avatar} 
                  alt={testimonials[activeTestimonial].name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p className="font-bold text-lg">{testimonials[activeTestimonial].name}</p>
                  <p className="text-gray-400">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center space-x-4 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                  activeTestimonial === index ? 'bg-yellow-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900/50 backdrop-blur-lg text-center">
        <p className="text-gray-300"> 2024 YieldSphere. Pioneering Intelligent Decentralized Finance.</p>
      </footer>
    </motion.div>
  );
};

export default YieldSphereLanding;