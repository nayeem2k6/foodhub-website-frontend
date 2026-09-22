



'use client';

import { useEffect, useState } from 'react';
import api from '../../lib/api';
import Image from 'next/image';
import Link from 'next/link';

interface Restaurant {
  _id: string;
  title: string;
  description: string;
  image?: string;
  price: number;
  location: string;
  category: string;
  cuisine?: string[];
  rating: number;
}

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await api.get('/restaurants');
      setRestaurants(res.data.data || []);
    } catch (error) {
      console.log('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImage = (img?: string) => {
    if (!img) return '/default-food.jpg';
    return img;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🍽️ Restaurants</h1>

      {loading ? (
        <p>Loading...</p>
      ) : restaurants.length === 0 ? (
        <p>No restaurants found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              {/* IMAGE */}
              <div className="relative w-full h-48">
                <Image
                  src={getImage(item.image)}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-bold">{item.title}</h2>

                <p className="text-gray-500 text-sm">
                  {item.description?.slice(0, 80) || 'No description'}...
                </p>

                {/* CATEGORY */}
                <span className="inline-block px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded">
                  {item.category}
                </span>

                {/* CUISINE */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {(item.cuisine || []).map((c, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* INFO */}
                <div className="flex justify-between mt-3 text-sm">
                  <span>📍 {item.location}</span>
                  <span>💰 ${item.price}</span>
                  <span>⭐ {item.rating || 0}</span>
                </div>

                {/* BUTTON */}
                <Link
                  href={`/restaurants/${item._id}`}
                  className="block mt-4 text-center bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}