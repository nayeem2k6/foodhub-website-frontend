
// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import {
//   FiMapPin,
//   FiDollarSign,
//   FiClock,
//   FiHeart,
// } from 'react-icons/fi';

// import api from '../../../lib/api';
// import { Restaurant, Review } from '../../../types';
// import { useAuth } from '../../../context/AuthContext';
// import { toast } from 'react-hot-toast';
// import RestaurantCard from '../../components/RestaurantCard';

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';

// const reviewSchema = z.object({
//   rating: z.number().min(1).max(5),
//   comment: z.string().min(10).max(500),
// });

// type ReviewForm = z.infer<typeof reviewSchema>;

// export default function RestaurantDetails() {
//   const params = useParams();
//   const { user } = useAuth();

//   const [restaurants, setRestaurants] = useState<Restaurant | null>(null);
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [reviewLoading, setReviewLoading] = useState(false);
//   const [relatedRestaurants, setRelatedRestaurants] = useState<Restaurant[]>(
//     []
//   );

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm<ReviewForm>({
//     resolver: zodResolver(reviewSchema),
//     defaultValues: {
//       rating: 5,
//       comment: '',
//     },
//   });

//   const selectedRating = watch('rating');

//   useEffect(() => {
//     if (params?.id) {
//       fetchRestaurant();
//       fetchReviews();
//     }
//   }, [params?.id]);

//   useEffect(() => {
//     if (restaurants?.category) {
//       fetchRelated();
//     }
//   }, [restaurants]);

//   const fetchRestaurant = async () => {
//     try {
//       setLoading(true);

//       const response = await api.get(`/restaurants/${params.id}`);

//       console.log('Restaurant Details:', response.data);

//       const restaurantData =
//         response?.data?.data ||
//         response?.data?.restaurant ||
//         response?.data;

//       setRestaurants(restaurantData);
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to load restaurant');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       const response = await api.get(
//         `/reviews/restaurants/${params.id}`
//       );

//       const reviewsData =
//         response?.data?.data ||
//         response?.data?.reviews ||
//         response?.data ||
//         [];

//       setReviews(Array.isArray(reviewsData) ? reviewsData : []);
//     } catch (error) {
//       console.error(error);
//       setReviews([]);
//     }
//   };

//   const fetchRelated = async () => {
//     try {
//       const response = await api.get(
//         `/restaurants?category=${restaurants?.category}&limit=4`
//       );

//       const related =
//         response?.data?.data ||
//         response?.data?.restaurants ||
//         response?.data ||
//         [];

//       if (Array.isArray(related)) {
//         setRelatedRestaurants(
//           related.filter(
//             (r: Restaurant) => r._id !== restaurants?._id
//           )
//         );
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const onSubmitReview = async (data: ReviewForm) => {
//     if (!user) {
//       toast.error('Please login first');
//       return;
//     }

//     try {
//       setReviewLoading(true);

//       await api.post('/reviews', {
//         ...data,
//         restaurantId: params.id,
//       });

//       toast.success('Review submitted');

//       reset({
//         rating: 5,
//         comment: '',
//       });

//       fetchReviews();
//       fetchRestaurant();
//     } catch (error) {
//       console.error(error);
//       toast.error('Failed to submit review');
//     } finally {
//       setReviewLoading(false);
//     }
//   };

//   const formatRating = (rating?: number) => {
//     const safeRating = Number(rating) || 0;

//     return (
//       '★'.repeat(Math.floor(safeRating)) +
//       '☆'.repeat(5 - Math.floor(safeRating))
//     );
//   };

//   const getSafeImage = (image?: string) => {
//     if (!image || typeof image !== 'string' || image.trim() === '') {
//       return '/default-food.jpg';
//     }

//     return image;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen py-20 px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="h-96 rounded-3xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
//         </div>
//       </div>
//     );
//   }

//   if (!restaurants) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-center px-4">
//         <div>
//           <h1 className="text-4xl font-bold mb-4">
//             Restaurant Not Found
//           </h1>

//           <p className="text-gray-500">
//             This restaurant does not exist.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto space-y-12">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-3xl p-8 lg:p-12 border border-orange-200/30"
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Image */}
//           <div>
//             <Image
//               src={getSafeImage(restaurants?.image)}
//               alt={restaurants?.title || 'Restaurant'}
//               width={700}
//               height={500}
//               unoptimized
//               className="w-full h-96 lg:h-[30rem] rounded-3xl object-cover shadow-2xl"
//             />
//           </div>

//           {/* Info */}
//           <div className="space-y-6">
//             <div className="flex flex-wrap gap-3">
//               <span className="px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 font-semibold">
//                 {restaurants?.category || 'Food'}
//               </span>

//               {(restaurants?.cuisine || []).map(
//                 (item: string, index: number) => (
//                   <span
//                     key={index}
//                     className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow"
//                   >
//                     {item}
//                   </span>
//                 )
//               )}
//             </div>

//             <h1 className="text-4xl lg:text-5xl font-black">
//               {restaurants?.title}
//             </h1>

//             <div className="flex flex-wrap gap-6 text-lg">
//               <div className="flex items-center gap-2">
//                 <span className="text-yellow-400">
//                   {formatRating(restaurants?.rating)}
//                 </span>

//                 <span>{restaurants?.rating || 0}</span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <FiMapPin className="text-orange-500" />

//                 <span>
//                   {restaurants?.location || 'Unknown location'}
//                 </span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <FiDollarSign className="text-green-500" />

//                 <span>${restaurants?.price || 0}</span>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-4 pt-4">
//               <button className="btn-primary px-8 py-4 flex items-center gap-2">
//                 <FiHeart />
//                 <span>Add to Favorites</span>
//               </button>

//               <button className="btn-secondary px-8 py-4">
//                 Book Table
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//         {/* Left */}
//         <div className="lg:col-span-2 space-y-8">
//           {/* About */}
//           <div className="card">
//             <h2 className="text-3xl font-bold mb-6">
//               About {restaurants?.title}
//             </h2>

//             <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
//               {restaurants?.description ||
//                 'No description available.'}
//             </p>
//           </div>

//           {/* Reviews */}
//           <div className="card">
//             <div className="flex items-center justify-between mb-8">
//               <h2 className="text-3xl font-bold">
//                 Reviews ({reviews.length})
//               </h2>

//               <div className="flex items-center gap-2">
//                 <span className="text-yellow-400 text-xl">
//                   {formatRating(restaurants?.rating)}
//                 </span>

//                 <span className="font-bold">
//                   {restaurants?.rating || 0}
//                 </span>
//               </div>
//             </div>

//             {/* Review Form */}
//             {user && (
//               <form
//                 onSubmit={handleSubmit(onSubmitReview)}
//                 className="space-y-4 mb-10 bg-gray-50 dark:bg-gray-900/40 p-6 rounded-3xl"
//               >
//                 {/* Rating */}
//                 <div>
//                   <label className="block font-semibold mb-3">
//                     Rating
//                   </label>

//                   <div className="flex gap-2">
//                     {[1, 2, 3, 4, 5].map((rating) => (
//                       <button
//                         key={rating}
//                         type="button"
//                         onClick={() =>
//                           setValue('rating', rating)
//                         }
//                         className={`text-3xl transition ${
//                           selectedRating >= rating
//                             ? 'text-yellow-400'
//                             : 'text-gray-300'
//                         }`}
//                       >
//                         ★
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Comment */}
//                 <div>
//                   <textarea
//                     {...register('comment')}
//                     rows={5}
//                     placeholder="Write your review..."
//                     className="w-full p-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
//                   />

//                   {errors.comment && (
//                     <p className="text-red-500 text-sm mt-2">
//                       {errors.comment.message}
//                     </p>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={reviewLoading}
//                   className="btn-primary w-full py-4"
//                 >
//                   {reviewLoading
//                     ? 'Submitting...'
//                     : 'Submit Review'}
//                 </button>
//               </form>
//             )}

//             {/* Reviews List */}
//             <div className="space-y-6">
//               {reviews.length === 0 ? (
//                 <div className="text-center py-10 text-gray-500">
//                   No reviews yet.
//                 </div>
//               ) : (
//                 reviews.map((review) => (
//                   <div
//                     key={review._id}
//                     className="flex gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/40"
//                   >
//                     <img
//                       src={
//                         review?.userId?.avatar ||
//                         '/default-avatar.png'
//                       }
//                       alt={
//                         review?.userId?.name || 'User'
//                       }
//                       className="w-14 h-14 rounded-2xl object-cover"
//                     />

//                     <div className="flex-1">
//                       <div className="flex items-center gap-3 mb-2">
//                         <h4 className="font-bold">
//                           {review?.userId?.name ||
//                             'Anonymous'}
//                         </h4>

//                         <div className="text-yellow-400">
//                           {'★'.repeat(review.rating)}
//                         </div>
//                       </div>

//                       <p className="text-gray-600 dark:text-gray-300">
//                         {review.comment}
//                       </p>

//                       <p className="text-sm text-gray-400 mt-2">
//                         {review?.createdAt
//                           ? new Date(
//                               review.createdAt
//                             ).toLocaleDateString()
//                           : ''}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-8">
//           {/* Quick Info */}
//           <div className="card sticky top-24">
//             <h3 className="text-2xl font-bold mb-6">
//               Quick Info
//             </h3>

//             <div className="space-y-4">
//               <div className="flex gap-3 p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/10">
//                 <FiDollarSign className="text-green-500 text-2xl" />

//                 <div>
//                   <p className="font-bold">
//                     ${restaurants?.price || 0}
//                   </p>

//                   <p className="text-sm text-gray-500">
//                     Average Price
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10">
//                 <FiMapPin className="text-blue-500 text-2xl" />

//                 <div>
//                   <p className="font-bold">
//                     {restaurants?.location}
//                   </p>

//                   <p className="text-sm text-gray-500">
//                     Location
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-900/10">
//                 <FiClock className="text-green-500 text-2xl" />

//                 <div>
//                   <p className="font-bold">Open Now</p>

//                   <p className="text-sm text-gray-500">
//                     Mon-Sun 11AM-11PM
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Related */}
//           <div className="card">
//             <h3 className="text-2xl font-bold mb-6">
//               Related Restaurants
//             </h3>

//             <div className="space-y-4">
//               {relatedRestaurants.length === 0 ? (
//                 <p className="text-gray-500">
//                   No related restaurants found.
//                 </p>
//               ) : (
//                 relatedRestaurants.map((related) => (
//                   <RestaurantCard
//                     key={related._id}
//                     restaurant={related}
//                     size="sm"
//                   />
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiHeart,
} from 'react-icons/fi';

import api from '../../../lib/api';
import { Restaurant, Review } from '../../../types';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import RestaurantCard from '../../components/RestaurantCard';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10).max(500),
});

type ReviewForm = z.infer<typeof reviewSchema>;

export default function RestaurantDetails() {
  const params = useParams();
  const { user } = useAuth();

  const [restaurants, setRestaurants] =
    useState<Restaurant | null>(null);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [reviewLoading, setReviewLoading] =
    useState(false);

  const [bookingLoading, setBookingLoading] =
    useState(false);

  const [relatedRestaurants, setRelatedRestaurants] =
    useState<Restaurant[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      comment: '',
    },
  });

  const selectedRating = watch('rating');

  useEffect(() => {
    if (params?.id) {
      fetchRestaurant();
      fetchReviews();
    }
  }, [params?.id]);

  useEffect(() => {
    if (restaurants?.category) {
      fetchRelated();
    }
  }, [restaurants]);

  const fetchRestaurant = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/restaurants/${params.id}`
      );

      const restaurantData =
        response?.data?.data ||
        response?.data?.restaurant ||
        response?.data;

      setRestaurants(restaurantData);
    } catch (error) {
      console.error(error);

      toast.error('Failed to load restaurant');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await api.get(
        `/reviews/restaurants/${params.id}`
      );

      const reviewsData =
        response?.data?.data ||
        response?.data?.reviews ||
        response?.data ||
        [];

      setReviews(
        Array.isArray(reviewsData)
          ? reviewsData
          : []
      );
    } catch (error) {
      console.error(error);

      setReviews([]);
    }
  };

  const fetchRelated = async () => {
    try {
      const response = await api.get(
        `/restaurants?category=${restaurants?.category}&limit=4`
      );

      const related =
        response?.data?.data ||
        response?.data?.restaurants ||
        response?.data ||
        [];

      if (Array.isArray(related)) {
        setRelatedRestaurants(
          related.filter(
            (r: Restaurant) =>
              r._id !== restaurants?._id
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitReview = async (
    data: ReviewForm
  ) => {
    if (!user) {
      toast.error('Please login first');

      return;
    }

    try {
      setReviewLoading(true);

      await api.post('/reviews', {
        ...data,
        restaurantId: params.id,
      });

      toast.success('Review submitted');

      reset({
        rating: 5,
        comment: '',
      });

      fetchReviews();
      fetchRestaurant();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          'Failed to submit review'
      );
    } finally {
      setReviewLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      toast.error('Please login first');

      return;
    }

    try {
      setBookingLoading(true);

      const response = await api.post(
        '/bookings',
        {
          restaurantId: params.id,
          quantity: 1,
        }
      );

      console.log(response.data);

      toast.success(
        response?.data?.message ||
          'Booking successful'
      );
    } catch (error: any) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          'Booking failed'
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const formatRating = (rating?: number) => {
    const safeRating = Number(rating) || 0;

    return (
      '★'.repeat(Math.floor(safeRating)) +
      '☆'.repeat(
        5 - Math.floor(safeRating)
      )
    );
  };

  const getSafeImage = (
    image?: string
  ) => {
    if (
      !image ||
      typeof image !== 'string' ||
      image.trim() === ''
    ) {
      return '/default-food.jpg';
    }

    return image;
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="h-96 rounded-3xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!restaurants) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Restaurant Not Found
          </h1>

          <p className="text-gray-500">
            This restaurant does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-3xl p-8 lg:p-12 border border-orange-200/30"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <Image
              src={getSafeImage(
                restaurants?.image
              )}
              alt={
                restaurants?.title ||
                'Restaurant'
              }
              width={700}
              height={500}
              unoptimized
              className="w-full h-96 lg:h-[30rem] rounded-3xl object-cover shadow-2xl"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 font-semibold">
                {restaurants?.category ||
                  'Food'}
              </span>

              {(restaurants?.cuisine || []).map(
                (
                  item: string,
                  index: number
                ) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow"
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <h1 className="text-4xl lg:text-5xl font-black">
              {restaurants?.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">
                  {formatRating(
                    restaurants?.rating
                  )}
                </span>

                <span>
                  {restaurants?.rating ||
                    0}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FiMapPin className="text-orange-500" />

                <span>
                  {restaurants?.location ||
                    'Unknown location'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <FiDollarSign className="text-green-500" />

                <span>
                  $
                  {restaurants?.price ||
                    0}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button className="btn-primary px-8 py-4 flex items-center gap-2">
                <FiHeart />

                <span>
                  Add to Favorites
                </span>
              </button>

              <button
                onClick={handleBooking}
                disabled={bookingLoading}
                className="btn-secondary px-8 py-4"
              >
                {bookingLoading
                  ? 'Booking...'
                  : 'Book Table'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <div className="card">
            <h2 className="text-3xl font-bold mb-6">
              About{' '}
              {restaurants?.title}
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {restaurants?.description ||
                'No description available.'}
            </p>
          </div>

          {/* Reviews */}
          <div className="card">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">
                Reviews (
                {reviews.length})
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-xl">
                  {formatRating(
                    restaurants?.rating
                  )}
                </span>

                <span className="font-bold">
                  {restaurants?.rating ||
                    0}
                </span>
              </div>
            </div>

            {/* Review Form */}
            {user && (
              <form
                onSubmit={handleSubmit(
                  onSubmitReview
                )}
                className="space-y-4 mb-10 bg-gray-50 dark:bg-gray-900/40 p-6 rounded-3xl"
              >
                {/* Rating */}
                <div>
                  <label className="block font-semibold mb-3">
                    Rating
                  </label>

                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(
                      (rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() =>
                            setValue(
                              'rating',
                              rating
                            )
                          }
                          className={`text-3xl transition ${
                            selectedRating >=
                            rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <textarea
                    {...register(
                      'comment'
                    )}
                    rows={5}
                    placeholder="Write your review..."
                    className="w-full p-4 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />

                  {errors.comment && (
                    <p className="text-red-500 text-sm mt-2">
                      {
                        errors.comment
                          .message
                      }
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={
                    reviewLoading
                  }
                  className="btn-primary w-full py-4"
                >
                  {reviewLoading
                    ? 'Submitting...'
                    : 'Submit Review'}
                </button>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No reviews yet.
                </div>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review._id}
                    className="flex gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/40"
                  >
                    <img
                      src={
                        review?.userId
                          ?.avatar ||
                        '/default-avatar.png'
                      }
                      alt={
                        review?.userId
                          ?.name ||
                        'User'
                      }
                      className="w-14 h-14 rounded-2xl object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold">
                          {review?.userId
                            ?.name ||
                            'Anonymous'}
                        </h4>

                        <div className="text-yellow-400">
                          {'★'.repeat(
                            review.rating
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300">
                        {review.comment}
                      </p>

                      <p className="text-sm text-gray-400 mt-2">
                        {review?.createdAt
                          ? new Date(
                              review.createdAt
                            ).toLocaleDateString()
                          : ''}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Quick Info */}
          <div className="card sticky top-24">
            <h3 className="text-2xl font-bold mb-6">
              Quick Info
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3 p-4 rounded-2xl bg-orange-50 dark:bg-orange-900/10">
                <FiDollarSign className="text-green-500 text-2xl" />

                <div>
                  <p className="font-bold">
                    $
                    {restaurants?.price ||
                      0}
                  </p>

                  <p className="text-sm text-gray-500">
                    Average Price
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10">
                <FiMapPin className="text-blue-500 text-2xl" />

                <div>
                  <p className="font-bold">
                    {
                      restaurants?.location
                    }
                  </p>

                  <p className="text-sm text-gray-500">
                    Location
                  </p>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-2xl bg-green-50 dark:bg-green-900/10">
                <FiClock className="text-green-500 text-2xl" />

                <div>
                  <p className="font-bold">
                    Open Now
                  </p>

                  <p className="text-sm text-gray-500">
                    Mon-Sun 11AM-11PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related */}
          <div className="card">
            <h3 className="text-2xl font-bold mb-6">
              Related Restaurants
            </h3>

            <div className="space-y-4">
              {relatedRestaurants.length ===
              0 ? (
                <p className="text-gray-500">
                  No related restaurants
                  found.
                </p>
              ) : (
                relatedRestaurants.map(
                  (related) => (
                    <RestaurantCard
                      key={
                        related._id
                      }
                      restaurant={
                        related
                      }
                      size="sm"
                    />
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  }
    