import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, ChartBar, Lock, Coins, Settings } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Enterprise-Grade Security',
    description: 'Multi-layered security architecture with institutional-grade protection for your assets.',
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    icon: Zap,
    title: 'Lightning-Fast Execution',
    description: 'Optimized smart contracts ensure rapid deployment of your investment strategies.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: ChartBar,
    title: 'Advanced Analytics',
    description: 'Real-time performance metrics and detailed portfolio analysis at your fingertips.',
    gradient: 'from-pink-500 to-red-500'
  },
  {
    icon: Lock,
    title: 'Risk Management',
    description: 'Sophisticated risk assessment tools and automated protection mechanisms.',
    gradient: 'from-red-500 to-orange-500'
  },
  {
    icon: Coins,
    title: 'Yield Optimization',
    description: 'AI-powered strategies to maximize returns across multiple DeFi protocols.',
    gradient: 'from-orange-500 to-yellow-500'
  },
  {
    icon: Settings,
    title: 'Custom Strategies',
    description: 'Create and deploy personalized investment strategies tailored to your goals.',
    gradient: 'from-yellow-500 to-green-500'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export function Features() {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl text-gray-400"
          >
            Everything you need to maximize your DeFi potential
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-all duration-500 blur`} />
              <div className="relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-2.5 mb-6`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}