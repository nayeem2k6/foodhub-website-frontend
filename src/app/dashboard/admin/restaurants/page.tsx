
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FiPlus, FiSearch, FiEdit, FiTrash2, FiEye, 
  FiFilter, FiGrid, FiList, FiChevronDown, 
  FiMapPin
} from 'react-icons/fi';
import DashboardHeader from '../../../components/DashboardHeader';
import DashboardSidebar from '../../../components/DashboardSidebar';
import api from '../../../../lib/api';
import { Restaurant } from '../../../../types';
import { toast } from 'react-hot-toast';

export default function AdminRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/restaurants');
      setRestaurants(data.data);
    } catch (error) {
      toast.error('Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  };

  const bulkDelete = async () => {
    if (selected.length === 0) {
      toast.error('Please select restaurants to delete');
      return;
    }
    
    if (confirm(`Delete ${selected.length} selected restaurants? This action cannot be undone.`)) {
      try {
        // Bulk delete implementation
        for (const id of selected) {
          await api.delete(`/restaurants/${id}`);
        }
        toast.success(`${selected.length} restaurants deleted successfully`);
        setSelected([]);
        fetchRestaurants();
      } catch (error) {
        toast.error('Failed to delete restaurants');
      }
    }
  };

  const deleteRestaurant = async (id: string) => {
    if (confirm('Delete this restaurant? This action cannot be undone.')) {
      try {
        await api.delete(`/restaurants/${id}`);
        toast.success('Restaurant deleted successfully');
        fetchRestaurants();
      } catch (error) {
        toast.error('Failed to delete restaurant');
      }
    }
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch = restaurant.title.toLowerCase().includes(search.toLowerCase()) ||
                         restaurant.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !filterCategory || restaurant.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(restaurants.map((r: Restaurant) => r.category)));

  const getStatusColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50';
    if (rating >= 4) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/50';
    return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
  };

  const SkeletonRow = () => (
    <tr className="h-24">
      <td className="p-6">
        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
      </td>
      <td className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-2xl animate-pulse" />
          <div>
            <div className="h-5 w-48 bg-gray-300 dark:bg-gray-600 rounded animate-pulse mb-2" />
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </td>
      <td className="p-6">
        <div className="h-10 w-24 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
      </td>
      <td className="p-6">
        <div className="flex items-center space-x-1">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
          ))}
        </div>
      </td>
      <td className="p-6">
        <div className="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
      </td>
      <td className="p-6">
        <div className="h-10 w-24 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
      </td>
      <td className="p-6">
        <div className="flex space-x-2">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse" />
          ))}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-2xl">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Restaurant Management
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                  Manage all {restaurants.length} restaurants on the platform
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {/* Search */}
                <div className="relative flex-1 min-w-[300px] max-w-md">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search restaurants by name or description..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 bg-white/80 dark:bg-gray-800/80 shadow-sm transition-all duration-300"
                  />
                </div>

                {/* View Toggle */}
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded-xl transition-all ${
                      viewMode === 'table'
                        ? 'bg-white dark:bg-gray-700 shadow-md text-purple-600 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-purple-600'
                    }`}
                  >
                    <FiList className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-xl transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-gray-700 shadow-md text-purple-600 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-purple-600'
                    }`}
                  >
                    <FiGrid className="w-5 h-5" />
                  </button>
                </div>

                {/* Actions */}
                <Link href="/dashboard/admin/restaurants/new" className="btn-primary px-8 py-4 text-lg flex items-center space-x-2 shadow-xl hover:shadow-2xl">
                  <FiPlus className="w-5 h-5" />
                  <span>Add New</span>
                </Link>
                
                {selected.length > 0 && (
                  <button
                    onClick={bulkDelete}
                    className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center space-x-2 text-lg active:scale-95"
                  >
                    <FiTrash2 className="w-5 h-5" />
                    <span>Delete {selected.length}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 shadow-xl flex flex-wrap items-center gap-4">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Filter by category:</span>
              <div className="flex flex-wrap gap-2 flex-1">
                <button
                  onClick={() => setFilterCategory('')}
                  className={`px-4 py-2 rounded-2xl font-semibold transition-all ${
                    !filterCategory
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  All ({restaurants.length})
                </button>
                {categories.map((category) => {
                  const count = restaurants.filter((r: Restaurant) => r.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setFilterCategory(category)}
                      className={`px-4 py-2 rounded-2xl font-semibold transition-all ${
                        filterCategory === category
                          ? 'bg-purple-500 text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredRestaurants.length} of {restaurants.length} restaurants
              </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {viewMode === 'table' ? (
                <motion.div
                  key="table"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                        <tr>
                          <th className="p-6 text-left">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={selected.length === filteredRestaurants.length && filteredRestaurants.length > 0}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelected(filteredRestaurants.map((r: Restaurant) => r._id));
                                  } else {
                                    setSelected([]);
                                  }
                                }}
                                className="w-5 h-5 text-purple-600 rounded border-white/50 focus:ring-white"
                              />
                              <span className="font-semibold">Select All</span>
                            </label>
                          </th>
                          <th className="p-6 text-left font-semibold">Restaurant</th>
                          <th className="p-6 text-left font-semibold">Category</th>
                          <th className="p-6 text-left font-semibold">Rating</th>
                          <th className="p-6 text-left font-semibold">Price</th>
                          <th className="p-6 text-left font-semibold">Location</th>
                          <th className="p-6 text-left font-semibold">Created</th>
                          <th className="p-6 text-left font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                        {loading ? (
                          Array(5).fill(0).map((_, i) => <SkeletonRow key={i} />)
                        ) : filteredRestaurants.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="p-20 text-center">
                              <FiSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                No restaurants found
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 mb-8">
                                Try adjusting your search or filters
                              </p>
                            </td>
                          </tr>
                        ) : (
                          filteredRestaurants.map((restaurant) => (
                            <tr
                              key={restaurant._id}
                              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors h-20 border-b border-gray-100 dark:border-gray-800"
                            >
                              {/* Select */}
                              <td className="p-6">
                                <input
                                  type="checkbox"
                                  checked={selected.includes(restaurant._id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelected([...selected, restaurant._id]);
                                    } else {
                                      setSelected(selected.filter(id => id !== restaurant._id));
                                    }
                                  }}
                                  className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                                />
                              </td>

                              {/* Restaurant */}
                              <td className="p-6 max-w-md">
                                <div className="flex items-center space-x-4 group">
                                  <Image
                                    src={restaurant.image}
                                    alt={restaurant.title}
                                    width={60}
                                    height={60}
                                    className="w-14 h-14 rounded-2xl object-cover shadow-md flex-shrink-0 group-hover:scale-105 transition-transform"
                                  />
                                  <div className="min-w-0 flex-1">
                                    <Link
                                      href={`/dashboard/admin/restaurants/${restaurant._id}`}
                                      className="font-semibold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors line-clamp-1"
                                    >
                                      {restaurant.title}
                                    </Link>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                                      {restaurant.description}
                                    </p>
                                  </div>
                                </div>
                              </td>

                              {/* Category */}
                              <td className="p-6">
                                <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 text-purple-800 dark:text-purple-200 rounded-full text-sm font-semibold">
                                  {restaurant.category}
                                </span>
                              </td>

                              {/* Rating */}
                              <td className="p-6">
                                <div className={`flex items-center space-x-1 px-3 py-2 rounded-full text-sm font-semibold ${getStatusColor(restaurant.rating)}`}>
                                  <span className="text-lg">★</span>
                                  <span>{restaurant.rating}</span>
                                </div>
                              </td>

                              {/* Price */}
                              <td className="p-6">
                                <div className="font-bold text-lg text-green-600 dark:text-green-400">
                                  ${restaurant.price}
                                </div>
                              </td>

                              {/* Location */}
                              <td className="p-6">
                                <div className="flex items-center space-x-2 text-sm">
                                  <FiMapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                  <span className="font-medium text-gray-900 dark:text-white truncate max-w-[150px]">
                                    {restaurant.location}
                                  </span>
                                </div>
                              </td>

                              {/* Created */}
                              <td className="p-6">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {new Date(restaurant.createdAt).toLocaleDateString()}
                                </div>
                              </td>

                              {/* Actions */}
                              <td className="p-6">
                                <div className="flex items-center space-x-2">
                                  <Link
                                    href={`/restaurant/${restaurant._id}`}
                                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all group"
                                    title="View"
                                  >
                                    <FiEye className="w-5 h-5 group-hover:scale-110" />
                                  </Link>
                                  <Link
                                    href={`/dashboard/admin/restaurants/${restaurant._id}/edit`}
                                    className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl transition-all group"
                                    title="Edit"
                                  >
                                    <FiEdit className="w-5 h-5 group-hover:scale-110" />
                                  </Link>
                                  <button
                                    onClick={() => deleteRestaurant(restaurant._id)}
                                    className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all group"
                                    title="Delete"
                                  >
                                    <FiTrash2 className="w-5 h-5 group-hover:scale-110" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Table Footer */}
                  {filteredRestaurants.length > 0 && (
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 px-6 py-4 border-t border-gray-200/50">
                      <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                        <span>
                          Showing <strong>{filteredRestaurants.length}</strong> of <strong>{restaurants.length}</strong> restaurants
                        </span>
                        <div className="flex items-center space-x-2">
                          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Previous
                          </button>
                          <span className="px-4 py-2 font-semibold">1 of 1</span>
                          <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {loading ? (
                    Array(8).fill(0).map((_, i) => (
                      <div key={i} className="card h-80 animate-pulse">
                        <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-2xl" />
                        <div className="space-y-3 mt-4">
                          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-lg w-3/4" />
                          <div className="flex gap-2">
                            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
                            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
                          </div>
                          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                        </div>
                      </div>
                    ))
                  ) : filteredRestaurants.length === 0 ? (
                    <div className="col-span-full text-center py-20">
                      <FiSearch className="w-24 h-24 text-gray-400 mx-auto mb-8" />
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        No restaurants match your criteria
                      </h3>
                      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
                        Try adjusting your search terms or filters to find what you're looking for.
                      </p>
                      <button 
                        onClick={() => {
                          setSearch('');
                          setFilterCategory('');
                        }}
                        className="btn-primary px-8 py-4 text-lg"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  ) : (
                    filteredRestaurants.map((restaurant) => (
                      <motion.div
                        key={restaurant._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card group hover:shadow-2xl"
                      >
                        <Image
                          src={restaurant.image}
                          alt={restaurant.title}
                          width={400}
                          height={240}
                          className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500 mb-4"
                        />
                        <div className="space-y-3">
                          <h3 className="font-bold text-xl line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {restaurant.title}
                          </h3>
                          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-xs font-semibold">
                              {restaurant.category}
                            </span>
                            <div className="flex items-center space-x-1">
                              <span className="text-yellow-400 text-lg">★</span>
                              <span>{restaurant.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <span className="font-bold text-lg text-green-600 dark:text-green-400">
                              ${restaurant.price}
                            </span>
                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Link href={`/restaurant/${restaurant._id}`} className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl">
                                <FiEye className="w-5 h-5 text-blue-500" />
                              </Link>
                              <Link href={`/dashboard/admin/restaurants/${restaurant._id}/edit`} className="p-2 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl">
                                <FiEdit className="w-5 h-5 text-orange-500" />
                              </Link>
                              <button onClick={() => deleteRestaurant(restaurant._id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl">
                                <FiTrash2 className="w-5 h-5 text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}