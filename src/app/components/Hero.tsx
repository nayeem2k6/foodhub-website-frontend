


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiStar,
  FiClock,
  FiMapPin,
  FiSearch,
  FiUser,
  FiCpu,
} from 'react-icons/fi';
import Image from 'next/image';
import api from '../../lib/api';

interface Restaurant {
  _id: string;
  title?: string;
  image?: string;
  location?: string;
  rating?: number;
  price?: number;
}

interface HeroProps {
  className?: string;
}

export default function Hero({ className = '' }: HeroProps) {
  const [featuredRestaurants, setFeaturedRestaurants] = useState<Restaurant[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const slides = [
    {
      title: 'Discover Amazing Restaurants',
      subtitle:
        'Find your perfect dining experience with AI-powered recommendations',
      cta: 'Explore Now',
      ctaLink: '/explore',
      stats: [
        { icon: FiStar, value: '4.8', label: 'Avg Rating' },
        { icon: FiClock, value: '24h', label: 'Response' },
        { icon: FiMapPin, value: '10K+', label: 'Locations' },
      ],
      gradient: 'from-orange-600 via-red-500 to-pink-600',
    },
    {
      title: 'AI Restaurant Assistant',
      subtitle:
        'Get personalized recommendations from our smart AI assistant',
      cta: 'Try AI Chat',
      ctaLink: '/ai-chat',
      stats: [
        { icon: FiStar, value: '1.2M', label: 'Users' },
        { icon: FiClock, value: '50K', label: 'Restaurants' },
        { icon: FiMapPin, value: '98%', label: 'Satisfaction' },
      ],
      gradient: 'from-purple-600 via-blue-500 to-indigo-600',
    },
    {
      title: 'Book Your Table Now',
      subtitle: 'Instant reservations at top-rated restaurants near you',
      cta: 'Book Now',
      ctaLink: '/explore',
      stats: [
        { icon: FiStar, value: '$89', label: 'Avg Price' },
        { icon: FiClock, value: 'Instant', label: 'Booking' },
        { icon: FiMapPin, value: '24/7', label: 'Available' },
      ],
      gradient: 'from-emerald-600 via-green-500 to-teal-600',
    },
  ];

  useEffect(() => {
    fetchFeatured();

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchFeatured = async () => {
    try {
      setLoading(true);

      const response = await api.get('/restaurants?limit=4&sort=-rating');

      console.log('Restaurant API Response:', response.data);

      const restaurants =
        response?.data?.data ||
        response?.data?.restaurants ||
        response?.data ||
        [];

      if (Array.isArray(restaurants)) {
        setFeaturedRestaurants(restaurants.slice(0, 3));
      } else {
        setFeaturedRestaurants([]);
      }
    } catch (error) {
      console.error('Failed to fetch featured restaurants:', error);
      setFeaturedRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const currentSlideData = slides[currentSlide];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      window.location.href = `/explore?search=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  const getSafeImage = (image?: string) => {
    if (!image || typeof image !== 'string' || image.trim() === '') {
      return '/default-food.jpg';
    }

    return image;
  };

  return (
    <section
      className={`relative h-[70vh] lg:h-[80vh] overflow-hidden rounded-3xl mx-4 lg:mx-0 shadow-2xl ${className}`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="Restaurant Hero"
          fill
          priority
          unoptimized
          className="object-cover"
        />

        <div
          className={`absolute inset-0 bg-gradient-to-r ${currentSlideData.gradient} opacity-80`}
        />

        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full px-8 lg:px-16 py-12 lg:py-20 text-white">
        {/* Left */}
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:w-1/2 text-center lg:text-left"
        >
          <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-6">
            {currentSlideData.title}
          </h1>

          <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
            {currentSlideData.subtitle}
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="relative max-w-xl mx-auto lg:mx-0 mb-8"
          >
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search restaurants..."
              className="w-full pl-14 pr-16 py-5 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 text-white placeholder-white/70 focus:outline-none"
            />

            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 p-3 rounded-xl transition"
            >
              <FiArrowRight className="w-5 h-5" />
            </button>
          </form>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <Link
              href={currentSlideData.ctaLink}
              className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
            >
              {currentSlideData.cta}
            </Link>

            <Link
              href="/ai-chat"
              className="border border-white/40 px-8 py-4 rounded-2xl hover:bg-white/10 transition"
            >
              AI Assistant
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
            {currentSlideData.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl min-w-[110px]"
              >
                <stat.icon className="w-6 h-6 mb-2 text-orange-300 mx-auto" />

                <div className="font-black text-xl">{stat.value}</div>

                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden lg:block lg:w-[380px]"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <FiStar className="text-yellow-400" />
              Featured
            </h3>

            {loading ? (
              <div className="space-y-4">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse flex items-center gap-4"
                    >
                      <div className="w-20 h-20 bg-white/20 rounded-2xl" />

                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-white/20 rounded w-3/4" />
                        <div className="h-3 bg-white/20 rounded w-1/2" />
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                {featuredRestaurants.map((restaurant) => (
                  <Link
                    key={restaurant._id}
                    href={`/restaurant/${restaurant._id}`}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/10 transition"
                  >
                    <img
                      src={getSafeImage(restaurant.image)}
                      alt={restaurant.title || 'Restaurant'}
                      className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold line-clamp-1">
                        {restaurant.title || 'Restaurant'}
                      </h4>

                      <p className="text-sm text-white/70 line-clamp-1">
                        {restaurant.location || 'Unknown location'}
                      </p>

                      <div className="flex items-center gap-2 mt-1 text-sm">
                        <span className="text-yellow-400">★</span>

                        <span>{restaurant.rating || 0}</span>

                        <span className="text-white/70">
                          ${restaurant.price || 0}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="mt-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>

            <div className="space-y-3">
              {[
                {
                  label: 'Explore Restaurants',
                  href: '/explore',
                  icon: FiSearch,
                },
                {
                  label: 'AI Chat Assistant',
                  href: '/ai-chat',
                  icon: FiCpu,
                },
                {
                  label: 'Dashboard',
                  href: '/dashboard',
                  icon: FiUser,
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition"
                >
                  <item.icon className="w-5 h-5 text-orange-300" />

                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white"
          animate={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
          transition={{ duration: 5, ease: 'linear' }}
        />
      </div>
    </section>
  );
}