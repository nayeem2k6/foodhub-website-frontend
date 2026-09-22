// 'use client';
// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { FiArrowRight, FiStar, FiClock, FiMapPin } from 'react-icons/fi';
// import RestaurantCard from './components/RestaurantCard';
// import SkeletonCard from './components/SkeletonCard';
// import api from '../lib/api';
// import { Restaurant } from '../types';
// import { toast } from 'react-hot-toast';

// export default function Home() {
//   const [popularRestaurants, setPopularRestaurants] = useState<Restaurant[]>([]);
//   const [categories] = useState([
//     'Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese', 'American'
//   ]);
//   const [stats] = useState({
//     restaurants: 1250,
//     cuisines: 45,
//     cities: 120,
//     reviews: 45000
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPopularRestaurants();
//   }, []);

//   const fetchPopularRestaurants = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get('/restaurants?page=1&limit=8&sort=-rating');
//       setPopularRestaurants(data.data);
//     } catch (error) {
//       toast.error('Failed to load restaurants');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-20 py-12">
//       {/* Hero Section */}
//       <section className="relative h-[70vh] lg:h-[65vh] overflow-hidden rounded-3xl mx-4 lg:mx-0">
//         <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-orange-500/80 to-pink-500/80" />
//         <Image
//           src="/hero-restaurant.jpg"
//           alt="Food Hero"
//           fill
//           className="object-cover"
//         />
        
//         <div className="absolute inset-0 bg-black/40" />
        
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative z-10 flex flex-col lg:flex-row items-center justify-between h-full px-8 lg:px-16 text-white"
//         >
//           <div className="text-center lg:text-left lg:max-w-lg space-y-8 lg:mb-0">
//             <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent leading-tight">
//               Discover <br />
//               <span className="text-orange-200">Amazing</span> Restaurants
//             </h1>
//             <p className="text-xl lg:text-2xl text-gray-200 max-w-2xl mx-auto lg:mx-0">
//               Find the best restaurants near you with AI-powered recommendations
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//               <Link href="/explore" className="btn-primary text-lg py-4 px-12 max-w-sm">
//                 Explore Now
//               </Link>
//               <Link href="/ai-chat" className="btn-secondary text-lg py-4 px-12 max-w-sm">
//                 AI Assistant
//               </Link>
//             </div>
//           </div>
          
//           <div className="hidden lg:block lg:w-1/3">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//             >
//               <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 border border-white/30">
//                 <div className="grid grid-cols-2 gap-6">
//                   <div className="text-center space-y-3">
//                     <FiStar className="w-12 h-12 text-yellow-400 mx-auto" />
//                     <div>
//                       <div className="text-2xl font-bold text-white">4.8</div>
//                       <div className="text-sm text-gray-200">Avg Rating</div>
//                     </div>
//                   </div>
//                   <div className="text-center space-y-3">
//                     <FiClock className="w-12 h-12 text-orange-400 mx-auto" />
//                     <div>
//                       <div className="text-2xl font-bold text-white">24h</div>
//                       <div className="text-sm text-gray-200">Response Time</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </section>

//       {/* Categories */}
//       <section className="px-4 max-w-7xl mx-auto">
//         <motion.h2 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           className="text-3xl lg:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
//         >
//           Popular Cuisines
//         </motion.h2>
        
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
//           {categories.map((category, index) => (
//             <motion.div
//               key={category}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.1 }}
//               whileHover={{ scale: 1.05, y: -5 }}
//             >
//               <Link
//                 href={`/explore?category=${category.toLowerCase()}`}
//                 className="group block p-6 rounded-3xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 text-center h-full"
//               >
//                 <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
//                   <span className="text-2xl">🍽️</span>
//                 </div>
//                 <h3 className="font-semibold text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
//                   {category}
//                 </h3>
//               </Link>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* Popular Restaurants */}
//       <section className="px-4 max-w-7xl mx-auto">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
//           <motion.h2 
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
//           >
//             Most Popular
//           </motion.h2>
//           <Link href="/explore" className="btn-secondary">
//             View All <FiArrowRight className="inline ml-2" />
//           </Link>
//         </div>

//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {Array(8).fill(0).map((_, i) => (
//               <SkeletonCard key={i} />
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {popularRestaurants.map((restaurant, index) => (
//               <motion.div
//                 key={restaurant._id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <RestaurantCard restaurant={restaurant} />
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Stats */}
//       <section className="px-4 max-w-7xl mx-auto">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12">
//           {Object.entries(stats).map(([key, value], index) => (
//             <motion.div
//               key={key}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.1 }}
//               className="text-center p-8 rounded-3xl bg-gradient-to-br from-white/50 to-orange-50/50 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-xl border border-white/30 shadow-2xl hover:scale-105 transition-all duration-500"
//             >
//               <div className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 mb-4">
//                 {value.toLocaleString()}
//               </div>
//               <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 capitalize">
//                 {key}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="px-4 max-w-4xl mx-auto text-center">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-16 lg:p-24 rounded-3xl shadow-2xl"
//         >
//           <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
//             Ready to discover <br />
//             <span className="text-orange-200">your next favorite</span> restaurant?
//           </h2>
//           <Link href="/explore" className="btn-primary text-xl py-5 px-16 inline-block">
//             Start Exploring
//           </Link>
//         </motion.div>
//       </section>
//     </div>
//   );
// }


'use client';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import api from '../lib/api';
import { Restaurant } from '../types';
import { toast } from 'react-hot-toast';
import { FiArrowRight, FiStar, FiClock, FiMapPin, FiSearch } from 'react-icons/fi';
import Hero from './components/Hero';
import SkeletonCard from './components/SkeletonCard';
import RestaurantCard from './components/RestaurantCard';

export default function Home() {
  const [popularRestaurants, setPopularRestaurants] = useState<Restaurant[]>([]);
  const [categories] = useState([
    { name: 'Italian', icon: '🍝', slug: 'italian' },
    { name: 'Chinese', icon: '🥡', slug: 'chinese' },
    { name: 'Indian', icon: '🍛', slug: 'indian' },
    { name: 'Mexican', icon: '🌮', slug: 'mexican' },
    { name: 'Japanese', icon: '🍣', slug: 'japanese' },
    { name: 'American', icon: '🍔', slug: 'american' },
    { name: 'Vegan', icon: '🥗', slug: 'vegan' },
    { name: 'Dessert', icon: '🍰', slug: 'dessert' }
  ]);
  const [stats] = useState({
    restaurants: 1250,
    cuisines: 45,
    cities: 120,
    reviews: 45000
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularRestaurants();
  }, []);

  const fetchPopularRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/restaurants?page=1&limit=8&sort=-rating');
      setPopularRestaurants(data.data);
    } catch (error) {
      toast.error('Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="space-y-24 py-0">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Categories */}
      <section className="px-4 max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-black text-center mb-20 bg-gradient-to-r from-gray-900 via-gray-700 to-black bg-clip-text text-transparent drop-shadow-lg"
        >
          Explore by Cuisine
        </motion.h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.1, y: -10 }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link
                href={`/explore?category=${category.slug}`}
                className="group relative block h-32 lg:h-40 overflow-hidden rounded-3xl glass shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-700 border-0 hover:border-orange-300/50 backdrop-blur-xl"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center z-10 p-8">
                  <span className="text-4xl lg:text-5xl group-hover:scale-125 transition-transform duration-500">
                    {category.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-bold text-xl lg:text-2xl text-white drop-shadow-lg group-hover:text-orange-300 transition-colors">
                    {category.name}
                  </h3>
                </div>

                {/* Hover Arrow */}
                <motion.div
                  className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg"
                  whileHover={{ scale: 1.2, rotate: 90 }}
                >
                  <FiArrowRight className="w-6 h-6 text-white" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Popular Restaurants */}
      <section className="px-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16 gap-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-black bg-clip-text text-transparent drop-shadow-lg"
          >
            Most Popular Right Now
          </motion.h2>
          <Link 
            href='/explore'
            className="btn-primary px-10 py-4 text-xl shadow-xl hover:shadow-2xl flex items-center space-x-3 group"
          >
            <span>View All Restaurants</span>
            <FiArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array(8).fill(0).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {popularRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* 4. Stats Section */}
      <section className="px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {Object.entries(stats).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden bg-gradient-to-br from-white/80 via-orange-50/80 to-pink-50/80 dark:from-gray-800/80 dark:via-gray-700/80 dark:to-gray-600/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-700 border border-white/50 hover:border-orange-200/50 cursor-default"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-pink-400/20 animate-pulse" />
              </div>

              {/* Icon */}
              <div className="relative z-10 w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 border-4 border-white/50">
                <span className="text-3xl">⭐</span>
              </div>

              {/* Value */}
              <motion.div 
                className="relative z-10 text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl mb-4">
                  {value.toLocaleString()}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white capitalize tracking-wide">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. Newsletter CTA */}
      <section className="px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-12 lg:p-20 rounded-4xl shadow-2xl text-center relative overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10" />
          
          <motion.div 
            className="relative z-10 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black bg-gradient-to-r from-gray-900 via-orange-600 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl">
                Stay Updated
              </h2>
              <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Get the latest restaurant news, exclusive deals, and AI recommendations directly to your inbox.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-8 py-6 text-lg rounded-3xl border-2 border-gray-200/50 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl shadow-xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100/50 transition-all duration-500 pl-14 pr-20"
                />
                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-2xl shadow-xl hover:shadow-2xl font-bold text-lg transition-all duration-500 hover:scale-105 active:scale-95 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                ✓ No spam. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}