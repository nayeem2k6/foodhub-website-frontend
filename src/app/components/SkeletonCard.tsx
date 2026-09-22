
'use client'
import { motion } from 'framer-motion';

const SkeletonCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, }}
      className="card overflow-hidden bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 animate-pulse shadow-lg"
    >
      {/* Skeleton Image */}
      <div className="h-[220px] bg-gradient-to-r from-gray-300 via-white to-gray-300 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 rounded-t-3xl" />

      {/* Skeleton Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-6 bg-gradient-to-r from-gray-300 via-white to-gray-300 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 rounded-lg w-4/5" />
        
        {/* Category badges */}
        <div className="flex flex-wrap gap-2">
          {Array(2).fill(0).map((_, i) => (
            <div
              key={i}
              className="h-6 w-20 bg-gradient-to-r from-gray-300 via-white to-gray-300 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 rounded-full"
            />
          ))}
        </div>

        {/* Meta info */}
        <div className="space-y-2">
          <div className="flex items-center space-x-6">
            <div className="h-4 w-16 bg-gradient-to-r from-gray-300 via-white to-gray-300 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 rounded" />
            <div className="h-4 w-20 bg-gradient-to-r from-gray-300 via-white to-gray-300 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 rounded" />
          </div>
        </div>

        {/* Rating skeleton */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex space-x-1">
            {Array(5).fill(0).map((_, i) => (
              <div
                key={i}
                className="w-5 h-5 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"
              />
            ))}
          </div>
          <div className="h-5 w-10 bg-gradient-to-r from-gray-300 via-white to-gray-300 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 rounded-full ml-2" />
        </div>

        {/* Button skeleton */}
        <div className="h-12 bg-gradient-to-r from-gray-300 via-white to-gray-300 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 rounded-2xl" />
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
    </motion.div>
  );
};

export default SkeletonCard;