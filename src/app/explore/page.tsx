'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import RestaurantCard from '../components/RestaurantCard';
import SkeletonCard from '../components/SkeletonCard';
import api from '../../lib/api';
import { Restaurant } from '../../types';
import { toast } from 'react-hot-toast';

export default function Explore() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    priceMin: searchParams.get('priceMin') || '',
    priceMax: searchParams.get('priceMax') || '',
    rating: searchParams.get('rating') || '',
  });
  const [sort, setSort] = useState(searchParams.get('sort') || '-rating');
  const limit = 12;

  const categories = ['Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese', 'American'];

  const fetchRestaurants = useCallback(async (currentPage = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.category && { category: filters.category }),
        ...(filters.priceMin && { priceMin: filters.priceMin }),
        ...(filters.priceMax && { priceMax: filters.priceMax }),
        ...(filters.rating && { rating: filters.rating }),
        sort
      });

      const { data } = await api.get(`/restaurants?${params}`);
      if (currentPage === 1) {
        setRestaurants(data.data);
      } else {
        setRestaurants(prev => [...prev, ...data.data]);
      }
      setTotal(data.meta?.total || 0);
    } catch (error) {
      toast.error('Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  }, [filters, sort, limit]);

  useEffect(() => {
    fetchRestaurants(1);
  }, [fetchRestaurants]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
    router.push(`/explore?${new URLSearchParams({ ...filters, [key]: value, page: '1', sort }).toString()}`);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setPage(1);
    router.push(`/explore?${new URLSearchParams({ ...Object.fromEntries(searchParams), sort: newSort, page: '1' }).toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    router.push(`/explore?${new URLSearchParams({ ...filters, page: '1', sort }).toString()}`);
  };

  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Explore Restaurants
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Find your perfect dining experience with advanced filters and AI recommendations
        </p>
      </motion.div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Filters Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl"
        >
          <div className="space-y-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <FiSearch className="w-5 h-5 mr-2" />
                Search Restaurants
              </label>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  placeholder="Italian pasta, sushi near me..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-900/20 transition-all duration-300 bg-white/50 dark:bg-gray-900/50"
                />
                <FiSearch className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </form>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                <FiFilter className="w-5 h-5 mr-2" />
                Category
              </label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterChange('category', category)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-300 border-2 ${
                      filters.category === category
                        ? 'border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-500/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-500/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Price Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin}
                  onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                  className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-orange-500 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax}
                  onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                  className="p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Minimum Rating
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleFilterChange('rating', rating.toString())}
                    className={`p-3 rounded-xl transition-all ${
                      filters.rating === rating.toString()
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-500/20'
                    }`}
                  >
                    {rating}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setFilters({ search: '', category: '', priceMin: '', priceMax: '', rating: '' });
                setSort('-rating');
                router.push('/explore');
              }}
              className="w-full btn-secondary"
            >
              Clear All Filters
            </button>
          </div>
        </motion.div>

        {/* Restaurants Grid */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Sort & Results */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 shadow-xl">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Showing {Math.min(restaurants.length, total)} of {total} restaurants</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort by:</span>
              {[
                { value: '-rating', label: 'Top Rated', icon: FiArrowDown },
                { value: 'price', label: 'Price Low-High', icon: FiArrowUp },
                { value: '-price', label: 'Price High-Low', icon: FiArrowDown },
                { value: '-createdAt', label: 'Newest', icon: FiArrowDown }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-xl transition-all ${
                    sort === option.value
                      ? 'bg-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-orange-500/20'
                  }`}
                >
                  <option.icon className="w-4 h-4" />
                  <span className="text-sm">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>

          {/* Load More / Pagination */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
              {Array(8).fill(0).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {total > restaurants.length && !loading && (
            <div className="text-center">
              <button
                onClick={() => {
                  const nextPage = page + 1;
                  setPage(nextPage);
                  fetchRestaurants(nextPage);
                }}
                className="btn-primary px-12 py-4 text-lg"
                disabled={loading}
              >
                Load More Restaurants
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}