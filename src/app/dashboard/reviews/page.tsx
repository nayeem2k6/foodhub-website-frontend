'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
import DashboardHeader from '../../components/DashboardHeader';
import DashboardSidebar from '../../components/DashboardSidebar';
import api from '../../../lib/api';
import { toast } from 'react-hot-toast';

interface Review {
  _id: string;
  rating: number;
  comment: string;
  restaurantId: {
    title: string;
    image: string;
  };
  createdAt: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

const fetchReviews = async () => {
  try {
    setLoading(true);

    const { data } = await api.get('/reviews');

    console.log('========== REVIEW API ==========');
    console.log(data);
    console.log('REVIEWS:', data.data);
    console.log('FIRST REVIEW:', data.data?.[0]);
    console.log(
      'RESTAURANT:',
      data.data?.[0]?.restaurantId
    );
    console.log(
      'IMAGE:',
      data.data?.[0]?.restaurantId?.image
    );
    console.log('================================');

    setReviews(data.data || []);
  } catch (error) {
    console.error('Review API Error:', error);
    toast.error('Failed to load reviews');
  } finally {
    setLoading(false);
  }
};


  // const fetchReviews = async () => {
  //   try {
  //     setLoading(true);
  //     // Note: This would typically fetch user's reviews
  //     const { data } = await api.get('/reviews');
  //     setReviews(data.data || []);
  //   } catch (error) {
  //     toast.error('Failed to load reviews');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const deleteReview = async (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      try {
        await api.delete(`/reviews/${id}`);
        toast.success('Review deleted successfully');
        fetchReviews();
      } catch (error) {
        toast.error('Failed to delete review');
      }
    }
  };

  const filteredReviews = reviews.filter(review =>
    review.restaurantId.title.toLowerCase().includes(search.toLowerCase()) ||
    review.comment.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start justify-between gap-6"
            >
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  My Reviews
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                  Your restaurant reviews and ratings
                </p>
              </div>
              <div className="flex items-center space-x-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-lg">
                <FiSearch className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search your reviews..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-lg placeholder-gray-500"
                />
              </div>
            </motion.div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(6).fill(0).map((_, i) => (
                  <div key={i} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-xl animate-pulse">
                    <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl mb-6" />
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full mb-4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full mb-2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4" />
                  </div>
                ))}
              </div>
            ) : filteredReviews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-32"
              >
                <FiStar className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-8 opacity-50" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No reviews yet</h3>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  Your reviews will appear here once you rate some restaurants.
                </p>
                <a href="/explore" className="btn-primary px-12 py-4 text-xl inline-flex items-center space-x-3">
                  <span>Start Exploring</span>
                </a>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredReviews.map((review, index) => (
                  <motion.div
                    key={review._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                  >
                    {/* Restaurant Image */}
                    <div className="relative mb-6">
                      <img
                        src={review.restaurantId?.image}
                        alt={review.restaurantId?.title}
                        width={400}
                        height={240}
                        className="w-full h-48 object-cover rounded-2xl shadow-lg group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 px-3 py-1 rounded-full shadow-lg">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Restaurant Name */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {review.restaurantId.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="flex text-2xl">
                        {Array.from({ length: 5 }, (_, i) => (
                          <FiStar
                            key={i}
                            className={`w-8 h-8 ${
                              i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                        {review.rating}/5
                      </span>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 line-clamp-4">
                      {review.comment}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-all">
                          <FiEdit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteReview(review._id)}
                          className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <button className="btn-secondary px-6 py-2 text-sm">
                        View Restaurant
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="text-center p-10 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 rounded-3xl">
                <div className="text-4xl mb-4">★</div>
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                  {reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0 | 0}.0
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Average Rating</div>
              </div>
              <div className="text-center p-10 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 rounded-3xl">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FiStar className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {reviews.length}
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Reviews</div>
              </div>
              <div className="text-center p-10 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 rounded-3xl">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl font-bold text-white">★</span>
                </div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {reviews.filter(r => r.rating >= 4).length}
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">5-Star Reviews</div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}