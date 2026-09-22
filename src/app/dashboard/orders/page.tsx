// 'use client';
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FiSearch, FiFilter, FiDownload, FiTrash2, FiEdit, FiShoppingBag } from 'react-icons/fi';
// import api from '../../../lib/api';
// import { toast } from 'react-hot-toast';
// import DashboardHeader from '../../components/DashboardHeader';
// import DashboardSidebar from '../../components/DashboardSidebar';

// interface Booking {
//   _id: string;
//   restaurantId: {
//     title: string;
//     image: string;
//     price: number;
//   };
//   quantity: number;
//   price: number;
//   status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
//   createdAt: string;
// }

// export default function OrdersPage() {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get('/bookings');
//       setBookings(data.data);
//     } catch (error) {
//       toast.error('Failed to load bookings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (id: string, status: Booking['status']) => {
//     try {
//       await api.patch(`/bookings/${id}`, { status });
//       toast.success('Booking status updated');
//       fetchBookings();
//     } catch (error) {
//       toast.error('Failed to update status');
//     }
//   };

//   const cancelBooking = async (id: string) => {
//     if (confirm('Are you sure you want to cancel this booking?')) {
//       await updateStatus(id, 'CANCELLED');
//     }
//   };

//   const filteredBookings = bookings.filter(booking => {
//     const matchesFilter = filter === 'all' || booking.status.toLowerCase() === filter;
//     const matchesSearch = booking.restaurantId.title.toLowerCase().includes(search.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';
//       case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';
//       case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';
//       default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex">
//       <DashboardSidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <DashboardHeader />
//         <main className="flex-1 overflow-y-auto p-8">
//           <div className="max-w-7xl mx-auto space-y-8">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
//             >
//               <div>
//                 <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
//                   My Bookings
//                 </h1>
//                 <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
//                   Manage your restaurant reservations
//                 </p>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <div className="relative">
//                   <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search bookings..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="pl-12 pr-4 py-3 w-80 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 bg-white/80 dark:bg-gray-800/80"
//                   />
//                 </div>
//                 <button className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-2xl transition-colors">
//                   <FiDownload className="w-5 h-5" />
//                 </button>
//               </div>
//             </motion.div>

//             {/* Filters */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl flex flex-wrap gap-3"
//             >
//               {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((status) => (
//                 <button
//                   key={status}
//                   onClick={() => setFilter(status)}
//                   className={`px-6 py-2 rounded-2xl font-semibold transition-all duration-300 ${
//                     filter === status
//                       ? 'bg-orange-500 text-white shadow-lg transform scale-105'
//                       : 'bg-gray-100 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-orange-900/30 text-gray-700 dark:text-gray-300 hover:text-orange-600'
//                   }`}
//                 >
//                   {status.charAt(0).toUpperCase() + status.slice(1)}
//                   {status !== 'all' && ` (${bookings.filter(b => b.status.toLowerCase() === status).length})`}
//                 </button>
//               ))}
//             </motion.div>

//             {/* Bookings Table */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
//             >
//               {loading ? (
//                 <div className="p-12 text-center">
//                   <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//                   <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading bookings...</p>
//                 </div>
//               ) : filteredBookings.length === 0 ? (
//                 <div className="p-20 text-center">
//                   <FiShoppingBag className="w-20 h-20 text-gray-400 mx-auto mb-6" />
//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No bookings found</h3>
//                   <p className="text-gray-600 dark:text-gray-400 mb-8">Your bookings will appear here.</p>
//                   <a href="/explore" className="btn-primary px-8 py-3 text-lg">
//                     Book Now
//                   </a>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50">
//                         <th className="px-8 py-6 text-left text-lg font-bold text-gray-900 dark:text-white">Restaurant</th>
//                         <th className="px-6 py-6 text-left text-lg font-bold text-gray-900 dark:text-white">Date</th>
//                         <th className="px-6 py-6 text-left text-lg font-bold text-gray-900 dark:text-white">Amount</th>
//                         <th className="px-6 py-6 text-left text-lg font-bold text-gray-900 dark:text-white">Status</th>
//                         <th className="px-6 py-6 text-left text-lg font-bold text-gray-900 dark:text-white">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
//                       <AnimatePresence>
//                         {filteredBookings.map((booking) => (
//                           <motion.tr
//                             key={booking._id}
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             exit={{ opacity: 0, x: 20 }}
//                             className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
//                           >
//                             <td className="px-8 py-6">
//                               <div className="flex items-center space-x-4">
//                                 <Image
//                                   src={booking.restaurantId.image}
//                                   alt={booking.restaurantId.title}
//                                   width={60}
//                                   height={60}
//                                   className="w-16 h-16 rounded-2xl object-cover shadow-md"
//                                 />
//                                 <div>
//                                   <div className="font-semibold text-gray-900 dark:text-white">
//                                     {booking.restaurantId.title}
//                                   </div>
//                                   <div className="text-sm text-gray-600 dark:text-gray-400">
//                                     {booking.quantity} person{booking.quantity > 1 ? 's' : ''}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-6 py-6">
//                               <div className="font-semibold text-gray-900 dark:text-white">
//                                 {new Date(booking.createdAt).toLocaleDateString()}
//                               </div>
//                               <div className="text-sm text-gray-600 dark:text-gray-400">
//                                 {new Date(booking.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                               </div>
//                             </td>
//                             <td className="px-6 py-6">
//                               <div className="text-2xl font-bold text-green-600 dark:text-green-400">
//                                 ${booking.price.toLocaleString()}
//                               </div>
//                             </td>
//                             <td className="px-6 py-6">
//                               <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
//                                 {booking.status}
//                               </span>
//                             </td>
//                             <td className="px-6 py-6">
//                               <div className="flex items-center space-x-2">
//                                 <button className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl transition-all">
//                                   <FiEdit className="w-5 h-5" />
//                                 </button>
//                                 {booking.status !== 'CANCELLED' && (
//                                   <button
//                                     onClick={() => cancelBooking(booking._id)}
//                                     className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
//                                   >
//                                     <FiTrash2 className="w-5 h-5" />
//                                   </button>
//                                 )}
//                               </div>
//                             </td>
//                           </motion.tr>
//                         ))}
//                       </AnimatePresence>
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </motion.div>

//             {/* Pagination */}
//             {filteredBookings.length > 0 && (
//               <div className="flex items-center justify-between pt-8">
//                 <div className="text-sm text-gray-700 dark:text-gray-400">
//                   Showing <span className="font-semibold">{filteredBookings.length}</span> of{' '}
//                   <span className="font-semibold">{bookings.length}</span> bookings
//                 </div>
//                 <div className="flex space-x-2">
//                   <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl transition-colors">
//                     Previous
//                   </button>
//                   <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors font-semibold">
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }





// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';

// import {
//   FiSearch,
//   FiDownload,
//   FiTrash2,
//   FiEdit,
//   FiShoppingBag,
// } from 'react-icons/fi';

// import api from '../../../lib/api';

// import { toast } from 'react-hot-toast';

// import DashboardHeader from '../../components/DashboardHeader';
// import DashboardSidebar from '../../components/DashboardSidebar';

// interface Booking {
//   _id: string;

//   restaurantId: {
//     title: string;
//     image: string;
//     price: number;
//   };

//   quantity: number;
//   price: number;

//   status:
//     | 'PENDING'
//     | 'CONFIRMED'
//     | 'CANCELLED';

//   createdAt: string;
// }

// export default function OrdersPage() {
//   const [bookings, setBookings] =
//     useState<Booking[]>([]);

//   const [loading, setLoading] =
//     useState(false);

//   const [filter, setFilter] =
//     useState<
//       | 'all'
//       | 'pending'
//       | 'confirmed'
//       | 'cancelled'
//     >('all');

//   const [search, setSearch] =
//     useState('');

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       setLoading(true);

//       const { data } =
//         await api.get('/bookings');

//       setBookings(data.data || []);
//     } catch (error) {
//       console.error(error);

//       toast.error(
//         'Failed to load bookings'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (
//     id: string,
//     status: Booking['status']
//   ) => {
//     try {
//       await api.patch(
//         `/bookings/${id}`,
//         {
//           status,
//         }
//       );

//       toast.success(
//         'Booking status updated'
//       );

//       fetchBookings();
//     } catch (error) {
//       console.error(error);

//       toast.error(
//         'Failed to update status'
//       );
//     }
//   };

//   const cancelBooking = async (
//     id: string
//   ) => {
//     const confirmDelete =
//       window.confirm(
//         'Are you sure you want to cancel this booking?'
//       );

//     if (!confirmDelete) return;

//     await updateStatus(
//       id,
//       'CANCELLED'
//     );
//   };

//   const filteredBookings =
//     bookings.filter((booking) => {
//       const matchesFilter =
//         filter === 'all' ||
//         booking.status.toLowerCase() ===
//           filter;

//       const matchesSearch =
//         booking.restaurantId.title
//           .toLowerCase()
//           .includes(
//             search.toLowerCase()
//           );

//       return (
//         matchesFilter &&
//         matchesSearch
//       );
//     });

//   const getStatusColor = (
//     status: string
//   ) => {
//     switch (
//       status.toLowerCase()
//     ) {
//       case 'confirmed':
//         return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';

//       case 'pending':
//         return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';

//       case 'cancelled':
//         return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';

//       default:
//         return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex">
//       <DashboardSidebar />

//       <div className="flex-1 flex flex-col overflow-hidden">
//         <DashboardHeader />

//         <main className="flex-1 overflow-y-auto p-8">
//           <div className="max-w-7xl mx-auto space-y-8">
//             {/* Header */}
//             <motion.div
//               initial={{
//                 opacity: 0,
//                 y: 20,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
//             >
//               <div>
//                 <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
//                   My Bookings
//                 </h1>

//                 <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
//                   Manage your restaurant
//                   reservations
//                 </p>
//               </div>

//               <div className="flex items-center space-x-4">
//                 {/* Search */}
//                 <div className="relative">
//                   <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

//                   <input
//                     type="text"
//                     placeholder="Search bookings..."
//                     value={search}
//                     onChange={(e) =>
//                       setSearch(
//                         e.target.value
//                       )
//                     }
//                     className="pl-12 pr-4 py-3 w-80 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 bg-white/80 dark:bg-gray-800/80"
//                   />
//                 </div>

//                 {/* Export */}
//                 <button className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-2xl transition-colors">
//                   <FiDownload className="w-5 h-5" />
//                 </button>
//               </div>
//             </motion.div>

//             {/* Filters */}
//             <motion.div
//               initial={{
//                 opacity: 0,
//                 y: 10,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl flex flex-wrap gap-3"
//             >
//               {(
//                 [
//                   'all',
//                   'pending',
//                   'confirmed',
//                   'cancelled',
//                 ] as const
//               ).map((status) => (
//                 <button
//                   key={status}
//                   onClick={() =>
//                     setFilter(status)
//                   }
//                   className={`px-6 py-2 rounded-2xl font-semibold transition-all duration-300 ${
//                     filter === status
//                       ? 'bg-orange-500 text-white shadow-lg scale-105'
//                       : 'bg-gray-100 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-orange-900/30 text-gray-700 dark:text-gray-300 hover:text-orange-600'
//                   }`}
//                 >
//                   {status
//                     .charAt(0)
//                     .toUpperCase() +
//                     status.slice(1)}

//                   {status !==
//                     'all' &&
//                     ` (${
//                       bookings.filter(
//                         (b) =>
//                           b.status.toLowerCase() ===
//                           status
//                       ).length
//                     })`}
//                 </button>
//               ))}
//             </motion.div>

//             {/* Table */}
//             <motion.div
//               initial={{
//                 opacity: 0,
//                 y: 20,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
//             >
//               {loading ? (
//                 <div className="p-12 text-center">
//                   <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>

//                   <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
//                     Loading bookings...
//                   </p>
//                 </div>
//               ) : filteredBookings.length ===
//                 0 ? (
//                 <div className="p-20 text-center">
//                   <FiShoppingBag className="w-20 h-20 text-gray-400 mx-auto mb-6" />

//                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//                     No bookings found
//                   </h3>

//                   <p className="text-gray-600 dark:text-gray-400 mb-8">
//                     Your bookings will
//                     appear here.
//                   </p>

//                   <a
//                     href="/restaurants"
//                     className="btn-primary px-8 py-3 text-lg"
//                   >
//                     Book Now
//                   </a>
//                 </div>
//               ) : (
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50">
//                         <th className="px-8 py-6 text-left text-lg font-bold text-gray-900 dark:text-white">
//                           Restaurant
//                         </th>

//                         <th className="px-6 py-6 text-left text-lg font-bold text-gray-900 dark:text-white">
//                           Date
//                         </th>

//                         <th className="px-6 py-6 text-left text-lg font-bold text-gray-900 dark:text-white">
//                           Amount
//                         </th>

//                         <th className="px-6 py-6 text-left text-lg font-bold text-gray-900 dark:text-white">
//                           Status
//                         </th>

//                         <th className="px-6 py-6 text-left text-lg font-bold text-gray-900 dark:text-white">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
//                       <AnimatePresence>
//                         {filteredBookings.map(
//                           (booking) => (
//                             <motion.tr
//                               key={
//                                 booking._id
//                               }
//                               initial={{
//                                 opacity: 0,
//                                 x: -20,
//                               }}
//                               animate={{
//                                 opacity: 1,
//                                 x: 0,
//                               }}
//                               exit={{
//                                 opacity: 0,
//                                 x: 20,
//                               }}
//                               className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
//                             >
//                               {/* Restaurant */}
//                               <td className="px-8 py-6">
//                                 <div className="flex items-center space-x-4">
//                                   <Image
//                                     src={
//                                       booking
//                                         ?.restaurantId
//                                         ?.image ||
//                                       '/default-food.jpg'
//                                     }
//                                     alt={
//                                       booking
//                                         ?.restaurantId
//                                         ?.title ||
//                                       'Restaurant'
//                                     }
//                                     width={
//                                       60
//                                     }
//                                     height={
//                                       60
//                                     }
//                                     unoptimized
//                                     className="w-16 h-16 rounded-2xl object-cover shadow-md"
//                                   />

//                                   <div>
//                                     <div className="font-semibold text-gray-900 dark:text-white">
//                                       {
//                                         booking
//                                           .restaurantId
//                                           .title
//                                       }
//                                     </div>

//                                     <div className="text-sm text-gray-600 dark:text-gray-400">
//                                       {
//                                         booking.quantity
//                                       }{' '}
//                                       person
//                                       {booking.quantity >
//                                       1
//                                         ? 's'
//                                         : ''}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </td>

//                               {/* Date */}
//                               <td className="px-6 py-6">
//                                 <div className="font-semibold text-gray-900 dark:text-white">
//                                   {new Date(
//                                     booking.createdAt
//                                   ).toLocaleDateString()}
//                                 </div>

//                                 <div className="text-sm text-gray-600 dark:text-gray-400">
//                                   {new Date(
//                                     booking.createdAt
//                                   ).toLocaleTimeString(
//                                     [],
//                                     {
//                                       hour:
//                                         '2-digit',
//                                       minute:
//                                         '2-digit',
//                                     }
//                                   )}
//                                 </div>
//                               </td>

//                               {/* Price */}
//                               <td className="px-6 py-6">
//                                 <div className="text-2xl font-bold text-green-600 dark:text-green-400">
//                                   $
//                                   {booking.price.toLocaleString()}
//                                 </div>
//                               </td>

//                               {/* Status */}
//                               <td className="px-6 py-6">
//                                 <span
//                                   className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
//                                     booking.status
//                                   )}`}
//                                 >
//                                   {
//                                     booking.status
//                                   }
//                                 </span>
//                               </td>

//                               {/* Actions */}
//                               <td className="px-6 py-6">
//                                 <div className="flex items-center space-x-2">
//                                   <button className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl transition-all">
//                                     <FiEdit className="w-5 h-5" />
//                                   </button>

//                                   {booking.status !==
//                                     'CANCELLED' && (
//                                     <button
//                                       onClick={() =>
//                                         cancelBooking(
//                                           booking._id
//                                         )
//                                       }
//                                       className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
//                                     >
//                                       <FiTrash2 className="w-5 h-5" />
//                                     </button>
//                                   )}
//                                 </div>
//                               </td>
//                             </motion.tr>
//                           )
//                         )}
//                       </AnimatePresence>
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//             </motion.div>

//             {/* Footer */}
//             {filteredBookings.length >
//               0 && (
//               <div className="flex items-center justify-between pt-8">
//                 <div className="text-sm text-gray-700 dark:text-gray-400">
//                   Showing{' '}
//                   <span className="font-semibold">
//                     {
//                       filteredBookings.length
//                     }
//                   </span>{' '}
//                   of{' '}
//                   <span className="font-semibold">
//                     {bookings.length}
//                   </span>{' '}
//                   bookings
//                 </div>

//                 <div className="flex space-x-2">
//                   <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl transition-colors">
//                     Previous
//                   </button>

//                   <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors font-semibold">
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import {
  FiSearch,
  FiDownload,
  FiTrash2,
  FiEdit,
  FiShoppingBag,
  FiCheck,
} from 'react-icons/fi';

import api from '../../../lib/api';

import { toast } from 'react-hot-toast';

import DashboardHeader from '../../components/DashboardHeader';
import DashboardSidebar from '../../components/DashboardSidebar';

interface Booking {
  _id: string;

  restaurantId: {
    title: string;
    image: string;
    price: number;
  };

  quantity: number;
  price: number;

  status:
    | 'PENDING'
    | 'CONFIRMED'
    | 'CANCELLED';

  createdAt: string;
}

export default function OrdersPage() {
  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [filter, setFilter] =
    useState<
      | 'all'
      | 'pending'
      | 'confirmed'
      | 'cancelled'
    >('all');

  const [search, setSearch] =
    useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const { data } =
        await api.get('/bookings');

      setBookings(data.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        'Failed to load bookings'
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    id: string,
    status: Booking['status']
  ) => {
    try {
      await api.patch(
        `/bookings/${id}`,
        {
          status,
        }
      );

      toast.success(
        `Booking ${status.toLowerCase()} successfully`
      );

      fetchBookings();
    } catch (error) {
      console.error(error);

      toast.error(
        'Failed to update status'
      );
    }
  };

  const confirmBooking = async (
    id: string
  ) => {
    await updateStatus(
      id,
      'CONFIRMED'
    );
  };

  const cancelBooking = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        'Are you sure you want to cancel this booking?'
      );

    if (!confirmDelete) return;

    await updateStatus(
      id,
      'CANCELLED'
    );
  };

  const filteredBookings =
    bookings.filter((booking) => {
      const matchesFilter =
        filter === 'all' ||
        booking.status.toLowerCase() ===
          filter;

      const matchesSearch =
        booking.restaurantId.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return (
        matchesFilter &&
        matchesSearch
      );
    });

  const getStatusColor = (
    status: string
  ) => {
    switch (
      status.toLowerCase()
    ) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400';

      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400';

      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400';

      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  My Bookings
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">
                  Manage your restaurant
                  reservations
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    className="pl-12 pr-4 py-3 w-80 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 bg-white/80 dark:bg-gray-800/80"
                  />
                </div>

                {/* Export */}
                <button className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-2xl transition-colors">
                  <FiDownload className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-xl flex flex-wrap gap-3"
            >
              {(
                [
                  'all',
                  'pending',
                  'confirmed',
                  'cancelled',
                ] as const
              ).map((status) => (
                <button
                  key={status}
                  onClick={() =>
                    setFilter(status)
                  }
                  className={`px-6 py-2 rounded-2xl font-semibold transition-all duration-300 ${
                    filter === status
                      ? 'bg-orange-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-orange-900/30 text-gray-700 dark:text-gray-300 hover:text-orange-600'
                  }`}
                >
                  {status
                    .charAt(0)
                    .toUpperCase() +
                    status.slice(1)}

                  {status !==
                    'all' &&
                    ` (${
                      bookings.filter(
                        (b) =>
                          b.status.toLowerCase() ===
                          status
                      ).length
                    })`}
                </button>
              ))}
            </motion.div>

            {/* Table */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            >
              {loading ? (
                <div className="p-12 text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>

                  <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    Loading bookings...
                  </p>
                </div>
              ) : filteredBookings.length ===
                0 ? (
                <div className="p-20 text-center">
                  <FiShoppingBag className="w-20 h-20 text-gray-400 mx-auto mb-6" />

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    No bookings found
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Your bookings will
                    appear here.
                  </p>

                  <a
                    href="/restaurants"
                    className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl transition-all duration-300 font-semibold"
                  >
                    Book Now
                  </a>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50">
                        <th className="px-8 py-6 text-left text-lg font-bold text-gray-900 dark:text-white">
                          Restaurant
                        </th>

                        <th className="px-6 py-6 text-left text-lg font-bold text-gray-900 dark:text-white">
                          Date
                        </th>

                        <th className="px-6 py-6 text-left text-lg font-bold text-gray-900 dark:text-white">
                          Amount
                        </th>

                        <th className="px-6 py-6 text-left text-lg font-bold text-gray-900 dark:text-white">
                          Status
                        </th>

                        <th className="px-6 py-6 text-left text-lg font-bold text-gray-900 dark:text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                      <AnimatePresence>
                        {filteredBookings.map(
                          (booking) => (
                            <motion.tr
                              key={
                                booking._id
                              }
                              initial={{
                                opacity: 0,
                                x: -20,
                              }}
                              animate={{
                                opacity: 1,
                                x: 0,
                              }}
                              exit={{
                                opacity: 0,
                                x: 20,
                              }}
                              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                              {/* Restaurant */}
                              <td className="px-8 py-6">
                                <div className="flex items-center space-x-4">
                                  <Image
                                    src={
                                      booking
                                        ?.restaurantId
                                        ?.image ||
                                      '/default-food.jpg'
                                    }
                                    alt={
                                      booking
                                        ?.restaurantId
                                        ?.title ||
                                      'Restaurant'
                                    }
                                    width={
                                      60
                                    }
                                    height={
                                      60
                                    }
                                    unoptimized
                                    className="w-16 h-16 rounded-2xl object-cover shadow-md"
                                  />

                                  <div>
                                    <div className="font-semibold text-gray-900 dark:text-white">
                                      {
                                        booking
                                          .restaurantId
                                          .title
                                      }
                                    </div>

                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                      {
                                        booking.quantity
                                      }{' '}
                                      person
                                      {booking.quantity >
                                      1
                                        ? 's'
                                        : ''}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Date */}
                              <td className="px-6 py-6">
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  {new Date(
                                    booking.createdAt
                                  ).toLocaleDateString()}
                                </div>

                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {new Date(
                                    booking.createdAt
                                  ).toLocaleTimeString(
                                    [],
                                    {
                                      hour:
                                        '2-digit',
                                      minute:
                                        '2-digit',
                                    }
                                  )}
                                </div>
                              </td>

                              {/* Price */}
                              <td className="px-6 py-6">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                  $
                                  {booking.price.toLocaleString()}
                                </div>
                              </td>

                              {/* Status */}
                              <td className="px-6 py-6">
                                <span
                                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                                    booking.status
                                  )}`}
                                >
                                  {
                                    booking.status
                                  }
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="px-6 py-6">
                                <div className="flex items-center gap-2">
                                  {/* Confirm */}
                                  {booking.status ===
                                    'PENDING' && (
                                    <button
                                      onClick={() =>
                                        confirmBooking(
                                          booking._id
                                        )
                                      }
                                      className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
                                    >
                                      <FiCheck className="w-4 h-4" />
                                      Confirm
                                    </button>
                                  )}

                                  {/* Edit */}
                                  <button className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl transition-all">
                                    <FiEdit className="w-5 h-5" />
                                  </button>

                                  {/* Cancel */}
                                  {booking.status !==
                                    'CANCELLED' && (
                                    <button
                                      onClick={() =>
                                        cancelBooking(
                                          booking._id
                                        )
                                      }
                                      className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                                    >
                                      <FiTrash2 className="w-5 h-5" />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </motion.tr>
                          )
                        )}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>

            {/* Footer */}
            {filteredBookings.length >
              0 && (
              <div className="flex items-center justify-between pt-8">
                <div className="text-sm text-gray-700 dark:text-gray-400">
                  Showing{' '}
                  <span className="font-semibold">
                    {
                      filteredBookings.length
                    }
                  </span>{' '}
                  of{' '}
                  <span className="font-semibold">
                    {bookings.length}
                  </span>{' '}
                  bookings
                </div>

                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-xl transition-colors">
                    Previous
                  </button>

                  <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors font-semibold">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}