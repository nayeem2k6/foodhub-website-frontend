'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiUsers, FiAward, FiCheckCircle } from 'react-icons/fi';

const features = [
  {
    icon: FiCheckCircle,
    title: 'AI-Powered Discovery',
    description: 'Smart recommendations using advanced AI to match your taste preferences perfectly.'
  },
  {
    icon: FiUsers,
    title: 'Trusted by Millions',
    description: 'Join 1.2M+ happy users who discover amazing restaurants every day.'
  },
  {
    icon: FiAward,
    title: 'Verified Listings',
    description: 'All restaurants are verified and rated by real customers for authenticity.'
  }
];

export default function About() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent mb-6">
            About FoodHub
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Revolutionizing how you discover, book, and experience the world's best restaurants with cutting-edge AI technology.
          </p>
        </motion.section>

        {/* Features */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-10 rounded-3xl text-center group hover:shadow-2xl hover:-translate-y-4 transition-all duration-700"
            >
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500">
                <feature.icon className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {feature.title}
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { value: '1.2M+', label: 'Happy Users', icon: '👥' },
            { value: '50K+', label: 'Restaurants', icon: '🍽️' },
            { value: '98%', label: 'Satisfaction', icon: '⭐' },
            { value: '24/7', label: 'Support', icon: '🛡️' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-12 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 hover:shadow-3xl hover:scale-105 transition-all duration-700 group"
            >
              <div className="text-5xl lg:text-6xl mb-6 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
                {stat.value}
              </div>
              <div className="text-xl font-bold text-gray-700 dark:text-gray-300">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-20 lg:p-32 rounded-3xl shadow-2xl max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-black mb-8">
              Ready to discover <br />
              <span className="text-orange-200">amazing restaurants</span>?
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <Link href="/explore" className="btn-primary text-xl py-6 px-12 shadow-2xl hover:shadow-3xl">
                Start Exploring
              </Link>
              <Link href="/ai-chat" className="btn-secondary text-xl py-6 px-12 border-2 border-white/50 hover:bg-white/20 backdrop-blur-sm">
                Try AI Assistant
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}