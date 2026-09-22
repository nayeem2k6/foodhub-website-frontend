// 'use client';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { FiUsers, FiShoppingBag, FiDollarSign, FiStar } from 'react-icons/fi';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
//   Legend
// } from 'recharts';
// import api from '../../lib/api';
// import DashboardHeader from '../components/DashboardHeader';
// import DashboardSidebar from '../components/DashboardSidebar';
// import { toast } from 'react-hot-toast';
// import Link from 'next/link';

// const COLORS = ['#f97316', '#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

// export default function DashboardPage() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalRestaurants: 0,
//     totalBookings: 0,
//     totalRevenue: 0
//   });
//   const [chartData, setChartData] = useState({
//     monthlyRevenue: [],
//     categoryStats: []
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const [statsRes, chartRes] = await Promise.all([
//         api.get('/dashboard/stats'),
//         api.get('/dashboard/chart-data')
//       ]);
      
//       setStats(statsRes.data.data);
//       setChartData(chartRes.data.data);
//     } catch (error) {
//       toast.error('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.1 }}
//       className="bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
//       whileHover={{ scale: 1.02 }}
//     >
//       <div className="flex items-center justify-between mb-6">
//         <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
//           <Icon className="w-8 h-8 text-white" />
//         </div>
//         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//           change >= 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
//         }`}>
//           {change >= 0 ? `+${change}%` : `${change}%`}
//         </span>
//       </div>
//       <div>
//         <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1">
//           {value.toLocaleString()}
//         </div>
//         <div className="text-gray-600 dark:text-gray-400 font-semibold">{title}</div>
//       </div>
//     </motion.div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//         <div className="flex h-screen">
//           <div className="w-full lg:w-64 bg-gray-200 dark:bg-gray-800 animate-pulse h-96" />
//           <div className="flex-1 p-8 space-y-8">
//             <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               {Array(4).fill(0).map((_, i) => (
//                 <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse" />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex">
//       <DashboardSidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <DashboardHeader />
        
//         <main className="flex-1 overflow-y-auto p-8">
//           <div className="max-w-7xl mx-auto space-y-8">
//             {/* Stats Cards */}
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//             >
//               <StatCard
//                 icon={FiUsers}
//                 title="Total Users"
//                 value={stats.totalUsers}
//                 change={12}
//                 color="from-blue-500 to-blue-600"
//               />
//               <StatCard
//                 icon={FiStar}
//                 title="Restaurants"
//                 value={stats.totalRestaurants}
//                 change={8}
//                 color="from-orange-500 to-orange-600"
//               />
//               <StatCard
//                 icon={FiShoppingBag}
//                 title="Bookings"
//                 value={stats.totalBookings}
//                 change={25}
//                 color="from-green-500 to-green-600"
//               />
//               <StatCard
//                 icon={FiDollarSign}
//                 title="Revenue"
//                 value={stats.totalRevenue}
//                 change={18}
//                 color="from-purple-500 to-purple-600"
//               />
//             </motion.div>

//             {/* Charts Row */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="grid grid-cols-1 lg:grid-cols-2 gap-8"
//             >
//               {/* Revenue Chart */}
//               <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
//                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Monthly Revenue</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={chartData.monthlyRevenue}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                     <XAxis dataKey="_id.month" />
//                     <YAxis />
//                     <Tooltip />
//                     <Bar dataKey="total" fill="#f97316" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Category Distribution */}
//               <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
//                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Restaurants by Category</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={chartData.categoryStats}
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={80}
//                       dataKey="count"
//                       label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                     >
//                       {chartData.categoryStats.map((entry: any, index: number) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </motion.div>

//             {/* Recent Activity & Quick Actions */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="grid grid-cols-1 lg:grid-cols-2 gap-8"
//             >
//               {/* Recent Bookings */}
//               <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
//                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Bookings</h3>
//                 <div className="space-y-4">
//                   {[
//                     { id: '#1234', restaurant: 'Bella Italia', date: 'Today', amount: 89, status: 'confirmed' },
//                     { id: '#1233', restaurant: 'Sushi Palace', date: 'Yesterday', amount: 125, status: 'pending' },
//                     { id: '#1232', restaurant: 'Spice India', date: '2 days ago', amount: 65, status: 'cancelled' }
//                   ].map((booking) => (
//                     <div key={booking.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl group hover:shadow-md transition-all">
//                       <div className="space-y-1">
//                         <div className="font-semibold text-gray-900 dark:text-white">{booking.restaurant}</div>
//                         <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
//                           <span>{booking.date}</span>
//                           <span className="font-mono text-xs">#{booking.id}</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-4">
//                         <span className="font-semibold text-lg">${booking.amount}</span>
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                           booking.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400' :
//                           booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400' :
//                           'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
//                         }`}>
//                           {booking.status.toUpperCase()}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-8 border border-orange-200/50 dark:border-orange-800/50 shadow-2xl">
//                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Quick Actions</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   {[
//                     { label: 'Add Restaurant', icon: FiStar, href: '/dashboard/admin/restaurants', color: 'from-orange-500' },
//                     { label: 'View Analytics', icon: FiStar, href: '/dashboard/admin/analytics', color: 'from-blue-500' },
//                     { label: 'Manage Users', icon: FiUsers, href: '/dashboard/admin/users', color: 'from-purple-500' },
//                     { label: 'My Bookings', icon: FiShoppingBag, href: '/dashboard/orders', color: 'from-green-500' }
//                   ].map((action, index) => (
//                     <Link
//                       key={action.label}
//                       href={action.href}
//                       className={`group flex items-center space-x-4 p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${action.color} ${action.color === 'from-orange-500' ? 'hover:border-orange-300' : ''}`}
//                     >
//                       <div className={`p-3 rounded-2xl ${action.color} shadow-lg group-hover:scale-110 transition-transform`}>
//                         <action.icon className="w-6 h-6 text-white" />
//                       </div>
//                       <span className="font-semibold text-gray-900 dark:text-white">{action.label}</span>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiShoppingBag,
  FiDollarSign,
  FiStar,
} from 'react-icons/fi';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

import api from '../../lib/api';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSidebar from '../components/DashboardSidebar';
import { toast } from 'react-hot-toast';
import Link from 'next/link';


const COLORS = [
  '#f97316',
  '#10b981',
  '#3b82f6',
  '#f59e0b',
  '#ef4444',
];


interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;

  userId?: {
    name?: string;
    avatar?: string;
  };

  restaurantId?: {
    title?: string;
    image?: string;
  };
}


export default function DashboardPage() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });


  const [chartData, setChartData] = useState({
    monthlyRevenue: [],
    categoryStats: [],
  });


  const [reviews, setReviews] = useState<Review[]>([]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchDashboardData();
  }, []);


  const fetchDashboardData = async () => {
    try {

      setLoading(true);

      const [statsRes, chartRes, reviewsRes] =
        await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/dashboard/chart-data'),
          api.get('/reviews'),
        ]);


      setStats(statsRes.data.data);

      setChartData(chartRes.data.data);

      setReviews(reviewsRes.data.data || []);


    } catch (error) {

      console.error(error);

      toast.error('Failed to load dashboard data');

    } finally {

      setLoading(false);

    }
  };


  const StatCard = ({
    icon: Icon,
    title,
    value,
    change,
  }: any) => (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2"
      whileHover={{ scale: 1.02 }}
    >

      <div className="flex items-center justify-between mb-6">

        <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">

          <Icon className="w-8 h-8 text-white" />

        </div>


        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            change >= 0
              ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
          }`}
        >

          {change >= 0 ? `+${change}%` : `${change}%`}

        </span>

      </div>


      <div>

        <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-1">

          {value.toLocaleString()}

        </div>

        <div className="text-gray-600 dark:text-gray-400 font-semibold">

          {title}

        </div>

      </div>

    </motion.div>
  );


  if (loading) {

    return (

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">

        <div className="flex h-screen">

          <div className="w-full lg:w-64 bg-gray-200 dark:bg-gray-800 animate-pulse h-96" />

          <div className="flex-1 p-8 space-y-8">

            <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {Array(4)
                .fill(0)
                .map((_, i) => (

                  <div
                    key={i}
                    className="h-48 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse"
                  />

                ))}

            </div>

          </div>

        </div>

      </div>

    );
  }


  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex">

      <DashboardSidebar />


      <div className="flex-1 flex flex-col overflow-hidden">

        <DashboardHeader />


        <main className="flex-1 overflow-y-auto p-8">

          <div className="max-w-7xl mx-auto space-y-8">


            {/* =========================
                STATS
            ========================= */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >

              <StatCard
                icon={FiUsers}
                title="Total Users"
                value={stats.totalUsers}
                change={12}
              />


              <StatCard
                icon={FiStar}
                title="Restaurants"
                value={stats.totalRestaurants}
                change={8}
              />


              <StatCard
                icon={FiShoppingBag}
                title="Bookings"
                value={stats.totalBookings}
                change={25}
              />


              <StatCard
                icon={FiDollarSign}
                title="Revenue"
                value={stats.totalRevenue}
                change={18}
              />

            </motion.div>


            {/* =========================
                CHARTS
            ========================= */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >


              {/* Revenue */}

              <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">

                  Monthly Revenue

                </h3>


                <ResponsiveContainer width="100%" height={300}>

                  <BarChart data={chartData.monthlyRevenue}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis dataKey="_id.month" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="total"
                      fill="#f97316"
                      radius={[4, 4, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>


              {/* Category */}

              <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">

                  Restaurants by Category

                </h3>


                <ResponsiveContainer width="100%" height={300}>

                  <PieChart>

                    <Pie
                      data={chartData.categoryStats}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      nameKey="_id"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >

                      {chartData.categoryStats.map(
                        (entry: any, index: number) => (

                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />

                        )
                      )}

                    </Pie>

                    <Tooltip />

                    <Legend />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </motion.div>


            {/* =========================
                RECENT REVIEWS
            ========================= */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
            >

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">

                    Recent Reviews

                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mt-1">

                    Latest customer reviews

                  </p>

                </div>


                <Link
                  href="/dashboard/reviews"
                  className="px-5 py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
                >

                  View All

                </Link>

              </div>


              {reviews.length === 0 ? (

                <div className="text-center py-12">

                  <FiStar className="w-16 h-16 mx-auto text-gray-300 mb-4" />

                  <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300">

                    No Reviews Yet

                  </h4>

                  <p className="text-gray-500 mt-2">

                    Reviews will appear here when customers submit them.

                  </p>

                </div>

              ) : (

                <div className="space-y-4">

                  {reviews.slice(0, 5).map((review) => (

                    <div
                      key={review._id}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-gray-50/80 dark:bg-gray-900/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition"
                    >


                      {/* User */}

                      <div className="flex items-center gap-4">

                        {review.userId?.avatar ? (

                          <img
                            src={review.userId.avatar}
                            alt={review.userId.name || 'User'}
                            className="w-12 h-12 rounded-full object-cover"
                          />

                        ) : (

                          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">

                            {review.userId?.name
                              ?.charAt(0)
                              ?.toUpperCase() || 'U'}

                          </div>

                        )}


                        <div>

                          <h4 className="font-bold text-gray-900 dark:text-white">

                            {review.userId?.name || 'Unknown User'}

                          </h4>

                          <p className="text-sm text-gray-500">

                            {review.restaurantId?.title ||
                              'Unknown Restaurant'}

                          </p>

                        </div>

                      </div>


                      {/* Review */}

                      <div className="flex-1 md:px-6">

                        <div className="flex items-center gap-1 mb-2">

                          {Array.from(
                            { length: 5 },
                            (_, index) => (

                              <FiStar
                                key={index}
                                className={`w-5 h-5 ${
                                  index < review.rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />

                            )
                          )}

                          <span className="ml-2 font-semibold text-gray-700 dark:text-gray-300">

                            {review.rating}/5

                          </span>

                        </div>


                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">

                          {review.comment}

                        </p>

                      </div>


                      {/* Date */}

                      <div className="text-sm text-gray-500 whitespace-nowrap">

                        {new Date(
                          review.createdAt
                        ).toLocaleDateString()}

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </motion.div>


            {/* =========================
                RECENT BOOKINGS + ACTIONS
            ========================= */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >


              {/* Recent Bookings */}

              <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">

                  Recent Bookings

                </h3>


                <div className="space-y-4">

                  {[
                    {
                      id: '#1234',
                      restaurant: 'Bella Italia',
                      date: 'Today',
                      amount: 89,
                      status: 'confirmed',
                    },

                    {
                      id: '#1233',
                      restaurant: 'Sushi Palace',
                      date: 'Yesterday',
                      amount: 125,
                      status: 'pending',
                    },

                    {
                      id: '#1232',
                      restaurant: 'Spice India',
                      date: '2 days ago',
                      amount: 65,
                      status: 'cancelled',
                    },

                  ].map((booking) => (

                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl group hover:shadow-md transition-all"
                    >

                      <div className="space-y-1">

                        <div className="font-semibold text-gray-900 dark:text-white">

                          {booking.restaurant}

                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">

                          <span>{booking.date}</span>

                          <span className="font-mono text-xs">

                            #{booking.id}

                          </span>

                        </div>

                      </div>


                      <div className="flex items-center space-x-4">

                        <span className="font-semibold text-lg">

                          ${booking.amount}

                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                          }`}
                        >

                          {booking.status.toUpperCase()}

                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              </div>


              {/* Quick Actions */}

              <div className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-8 border border-orange-200/50 dark:border-orange-800/50 shadow-2xl">

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">

                  Quick Actions

                </h3>


                <div className="grid grid-cols-2 gap-4">

                  {[

                    {
                      label: 'Add Restaurant',
                      icon: FiStar,
                      href: '/dashboard/admin/restaurants',
                    },

                    {
                      label: 'View Analytics',
                      icon: FiStar,
                      href: '/dashboard/admin/analytics',
                    },

                    {
                      label: 'Manage Users',
                      icon: FiUsers,
                      href: '/dashboard/admin/users',
                    },

                    {
                      label: 'My Bookings',
                      icon: FiShoppingBag,
                      href: '/dashboard/orders',
                    },

                  ].map((action) => (

                    <Link
                      key={action.label}
                      href={action.href}
                      className="group flex items-center space-x-4 p-6 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >

                      <div className="p-3 rounded-2xl bg-orange-500 shadow-lg group-hover:scale-110 transition-transform">

                        <action.icon className="w-6 h-6 text-white" />

                      </div>

                      <span className="font-semibold text-gray-900 dark:text-white">

                        {action.label}

                      </span>

                    </Link>

                  ))}

                </div>

              </div>

            </motion.div>


          </div>

        </main>

      </div>

    </div>

  );
}