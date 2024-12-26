import React from 'react';
import { motion } from 'framer-motion';
import { usePrivy } from '@privy-io/react-auth';
import { Button } from '../common/Button';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  const { login, authenticated } = usePrivy();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 md:p-12 rounded-3xl overflow-hidden">
          {/* Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10" />
          
          {/* Glass Background */}
          <div className="absolute inset-[2px] bg-gray-900/90 backdrop-blur-xl rounded-3xl" />

          <div className="relative text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Ready to Maximize
              </span>
              <br />
              <span className="text-white">Your DeFi Returns?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-xl text-gray-400"
            >
              Join thousands of investors already using YieldSphere to optimize their DeFi portfolio.
              Start earning better yields today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            >
              {!authenticated && (
                <Button
                  onClick={() => login()}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              )}
              <Button
                variant="outline"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl border-2 border-purple-500/50 text-white hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:scale-105"
              >
                View Documentation
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4"
            >
              {[
                { value: '99.9%', label: 'Uptime' },
                { value: '$10M+', label: 'Total Volume' },
                { value: '15+', label: 'Supported Protocols' },
                { value: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
