


'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FiMapPin,
  FiDollarSign,
  FiArrowRight,
  FiHeart,
} from 'react-icons/fi';

import { Restaurant } from '../../types';
import { cn } from '../../lib/utils';

interface RestaurantCardProps {
  restaurant: Restaurant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RestaurantCard = ({
  restaurant,
  size = 'md',
  className = '',
}: RestaurantCardProps) => {
  const sizeClasses = {
    sm: 'h-64 p-4 text-sm',
    md: 'h-80 p-6',
    lg: 'h-96 p-8',
  };

  const formatRating = (rating?: number) => {
    const safeRating = Number(rating) || 0;

    return (
      '★'.repeat(Math.floor(safeRating)) +
      '☆'.repeat(5 - Math.floor(safeRating))
    );
  };

  const getSafeImage = (image?: string) => {
    if (!image || typeof image !== 'string' || image.trim() === '') {
      return '/default-food.jpg';
    }

    return image;
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={cn(
        'card group cursor-pointer overflow-hidden relative',
        sizeClasses[size],
        className
      )}
    >
      {/* Image */}
      <div className="relative h-[200px] md:h-[240px] lg:h-[280px] mb-4 overflow-hidden rounded-2xl">
        <Image
          src={getSafeImage(restaurant?.image)}
          alt={restaurant?.title || 'Restaurant'}
          fill
          unoptimized
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Heart Button */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-12 h-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-xl flex items-center justify-center">
            <FiHeart className="w-6 h-6 text-red-500" />
          </button>
        </div>

        {/* Rating */}
        <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-3 py-2 rounded-2xl shadow-lg border border-white/50">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400 text-lg">
              {formatRating(restaurant?.rating)}
            </span>

            <span className="text-sm font-bold text-gray-900 dark:text-white ml-1">
              {restaurant?.rating || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Title */}
        <div>
          <Link href={`/restaurant/${restaurant?._id || ''}`}>
            <h3 className="font-bold text-lg lg:text-xl line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors h-12 lg:h-14">
              {restaurant?.title || 'Restaurant'}
            </h3>
          </Link>

          {/* Cuisine */}
          <div className="flex flex-wrap gap-2 mt-2">
            {(restaurant?.cuisine || [])
              .slice(0, 2)
              .map((cuisine: string) => (
                <span
                  key={cuisine}
                  className="px-3 py-1 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/50 dark:to-pink-900/50 text-xs font-semibold text-orange-700 dark:text-orange-300 rounded-full"
                >
                  {cuisine}
                </span>
              ))}

            {(restaurant?.cuisine || []).length > 2 && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 rounded-full">
                +{(restaurant?.cuisine || []).length - 2} more
              </span>
            )}
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <FiDollarSign className="w-4 h-4" />
              <span>${restaurant?.price || 0}</span>
            </div>

            <div className="flex items-center space-x-1">
              <FiMapPin className="w-4 h-4" />
              <span>{restaurant?.location || 'Unknown'}</span>
            </div>
          </div>

          <span className="font-semibold text-orange-600 dark:text-orange-400">
            {restaurant?.category || 'Food'}
          </span>
        </div>

        {/* Button */}
        <Link
          href={`/restaurants/${restaurant?._id || ''}`}
          className="absolute bottom-4 right-4 left-4 btn-primary group-hover:bg-orange-600 transition-all transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
        >
          <span className="flex items-center justify-center space-x-2">
            <span>View Details</span>

            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        {/* Creator */}
        <div className="flex items-center space-x-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <img
            src={
              restaurant?.createdBy?.avatar || '/default-avatar.png'
            }
            alt={restaurant?.createdBy?.name || 'User'}
            className="w-8 h-8 rounded-full border-2 border-white shadow-md object-cover"
          />

          <span className="text-xs text-gray-500 dark:text-gray-400">
            by {restaurant?.createdBy?.name || 'Anonymous'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;