import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from '../common/Button';

export function Hero() {
  const { login, authenticated } = usePrivy();
  const sphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sphereRef.current) {
      gsap.to(sphereRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-b from-blue-900/20 via-gray-900 to-black" />
        <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      {/* 3D Sphere */}
      <div 
        ref={sphereRef}
        className="absolute right-0 md:right-20 top-1/2 -translate-y-1/2 w-96 h-96 opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
          borderRadius: '50%',
          boxShadow: '0 0 100px rgba(255, 255, 255, 0.1)',
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Maximize Your DeFi
              </span>
              <span className="block text-white mt-2">
                Yield Potential
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-xl md:text-2xl text-gray-300"
          >
            Intelligent yield optimization strategies powered by advanced algorithms. 
            Your gateway to professional-grade DeFi investing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex justify-center gap-4"
          >
            {!authenticated && (
              <Button
                onClick={() => login()}
                className="px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
              >
                Start Investing Now
              </Button>
            )}
            <Button
              variant="outline"
              className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-purple-500/50 text-white hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {[
              { label: 'Total Value Locked', value: '$1.2B+' },
              { label: 'Active Users', value: '50K+' },
              { label: 'Average APY', value: '12.8%' },
              { label: 'Supported Chains', value: '10+' }
            ].map((stat, index) => (
              <div key={index} className="px-4">
                <dt className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </dt>
                <dd className="text-sm text-gray-400">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}