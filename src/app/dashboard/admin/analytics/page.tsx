
// 'use client';
// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis
// } from 'recharts';
// import { FiDownload, FiFilter, FiCalendar, FiUsers, FiDollarSign, FiActivity } from 'react-icons/fi';
// import DashboardHeader from '../../../components/DashboardHeader';
// import DashboardSidebar from '../../../components/DashboardSidebar';
// import api from '../../../../lib/api';
// import { toast } from 'react-hot-toast';

// const COLORS = ['#f97316', '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

// export default function AdminAnalytics() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalRestaurants: 0,
//     totalBookings: 0,
//     totalRevenue: 0,
//     avgRating: 0
//   });
//   const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
//   const [loading, setLoading] = useState(false);
//   const [chartData, setChartData] = useState({
//     revenue: [],
//     bookings: [],
//     users: [],
//     restaurants: []
//   });

//   useEffect(() => {
//     fetchAnalytics();
//   }, [timeRange]);

//   const fetchAnalytics = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get('/dashboard/stats');
//       setStats(data.data);
      
//       // Mock chart data - replace with real API
//       setChartData({
//         revenue: generateChartData(timeRange, 'revenue'),
//         bookings: generateChartData(timeRange, 'bookings'),
//         users: generateChartData(timeRange, 'users'),
//         restaurants: generateChartData(timeRange, 'restaurants')
//       });
//     } catch (error) {
//       toast.error('Failed to load analytics');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateChartData = (range: string, type: string) => {
//     const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 365;
//     return Array.from({ length: Math.min(days, 30) }, (_, i) => ({
//       date: `Day ${i + 1}`,
//       [type]: Math.floor(Math.random() * 1000) + 100 + i * 20
//     }));
//   };

//   const StatCard = ({ 
//     title, 
//     value, 
//     change, 
//     icon: Icon, 
//     color 
//   }: any) => (
//     <motion.div
//       whileHover={{ scale: 1.02, y: -4 }}
//       className={`glass p-8 rounded-3xl shadow-2xl border-0 group hover:shadow-3xl transition-all duration-500 ${color}`}
//     >
//       <div className="flex items-center justify-between mb-6">
//         <div className={`p-4 rounded-2xl backdrop-blur-sm shadow-lg group-hover:scale-110 transition-all ${color === 'bg-gradient-to-r from-blue-500 to-blue-600' ? 'bg-blue-500/20' : 'bg-white/20'}`}>
//           <Icon className="w-8 h-8 text-white" />
//         </div>
//         <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//           change >= 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/50' : 'bg-red-100 text-red-700 dark:bg-red-900/50'
//         }`}>
//           {change >= 0 ? `+${change}%` : `${change}%`}
//         </span>
//       </div>
//       <div>
//         <div className="text-4xl font-black mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
//           {value.toLocaleString()}
//         </div>
//         <div className="text-lg font-semibold text-white/90">{title}</div>
//       </div>
//     </motion.div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-8">
//         <div className="max-w-4xl w-full space-y-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {Array(4).fill(0).map((_, i) => (
//               <div key={i} className="glass p-8 rounded-3xl animate-pulse">
//                 <div className="w-16 h-16 bg-white/20 rounded-2xl mb-6 animate-pulse" />
//                 <div className="space-y-3">
//                   <div className="h-12 bg-white/20 rounded-2xl animate-pulse" />
//                   <div className="h-6 bg-white/10 rounded-xl w-3/4 animate-pulse" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex">
//       <DashboardSidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <DashboardHeader />
//         <main className="flex-1 overflow-y-auto p-8">
//           <div className="max-w-7xl mx-auto space-y-8">
//             {/* Header */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="glass p-8 lg:p-12 rounded-3xl shadow-2xl border-0"
//             >
//               <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
//                 <div>
//                   <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-3">
//                     Analytics Dashboard
//                   </h1>
//                   <p className="text-xl text-gray-700 dark:text-gray-300">
//                     Real-time insights and platform performance
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-3 flex-wrap">
//                   <div className="flex bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-1">
//                     {(['7d', '30d', '90d', 'all'] as const).map((range) => (
//                       <button
//                         key={range}
//                         onClick={() => setTimeRange(range)}
//                         className={`px-4 py-2 rounded-xl font-semibold transition-all text-sm ${
//                           timeRange === range
//                             ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
//                             : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
//                         }`}
//                       >
//                         {range.toUpperCase()}
//                       </button>
//                     ))}
//                   </div>
//                   <button className="btn-primary px-8 py-4 text-lg flex items-center space-x-2 shadow-xl hover:shadow-2xl">
//                     <FiDownload className="w-5 h-5" />
//                     <span>Export Report</span>
//                   </button>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Stats Cards */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
//             >
//               <StatCard
//                 icon={FiUsers}
//                 title="Total Users"
//                 value={stats.totalUsers}
//                 change={18}
//                 color="bg-gradient-to-r from-blue-500 to-blue-600"
//               />
//               <StatCard
//                 icon={FiActivity}
//                 title="Restaurants"
//                 value={stats.totalRestaurants}
//                 change={12}
//                 color="bg-gradient-to-r from-emerald-500 to-teal-600"
//               />
//               <StatCard
//                 icon={FiDollarSign}
//                 title="Total Revenue"
//                 value={stats.totalRevenue}
//                 change={25}
//                 color="bg-gradient-to-r from-green-500 to-emerald-600"
//               />
//               <StatCard
//                 icon={FiActivity}
//                 title="Bookings"
//                 value={stats.totalBookings}
//                 change={32}
//                 color="bg-gradient-to-r from-orange-500 to-orange-600"
//               />
//               <StatCard
//                 icon={FiActivity}
//                 title="Avg Rating"
//                 value={stats.avgRating}
//                 change={2}
//                 color="bg-gradient-to-r from-purple-500 to-pink-600"
//               />
//             </motion.div>

//             {/* Charts Grid */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
//             >
//               {/* Revenue Chart */}
//               <div className="glass p-8 lg:p-10 rounded-3xl shadow-2xl col-span-1 lg:col-span-2">
//                 <div className="flex items-center justify-between mb-8">
//                   <h3 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
//                     Revenue Over Time
//                   </h3>
//                   <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//                     <FiDollarSign className="w-4 h-4" />
//                     <span>${stats.totalRevenue.toLocaleString()}</span>
//                   </div>
//                 </div>
//                 <ResponsiveContainer width="100%" height={400}>
//                   <AreaChart data={chartData.revenue}>
//                     <defs>
//                       <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
//                         <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                     <XAxis dataKey="date" axisLine={false} tickLine={false} />
//                     <YAxis axisLine={false} tickLine={false} />
//                     <Tooltip />
//                     <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="url(#revenueGradient)" />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Bookings Chart */}
//               <div className="glass p-8 rounded-3xl shadow-2xl">
//                 <div className="flex items-center justify-between mb-8">
//                   <h3 className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
//                     Daily Bookings
//                   </h3>
//                   <span className="text-2xl font-black text-orange-500">{stats.totalBookings}</span>
//                 </div>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={chartData.bookings}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                     <XAxis dataKey="date" axisLine={false} tickLine={false} />
//                     <YAxis axisLine={false} tickLine={false} />
//                     <Tooltip />
//                     <Bar dataKey="bookings" fill="#f97316" radius={[8, 8, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* User Growth */}
//               <div className="glass p-8 rounded-3xl shadow-2xl">
//                 <div className="flex items-center justify-between mb-8">
//                   <h3 className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
//                     User Growth
//                   </h3>
//                   <span className="text-2xl font-black text-blue-500">{stats.totalUsers}</span>
//                 </div>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <LineChart data={chartData.users}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                     <XAxis dataKey="date" axisLine={false} tickLine={false} />
//                     <YAxis axisLine={false} tickLine={false} />
//                     <Tooltip />
//                     <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={4} dot={false} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </motion.div>

//             {/* Bottom Metrics */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//             >
//               {[
//                 { title: 'Conversion Rate', value: '4.2%', color: 'bg-gradient-to-r from-emerald-500 to-teal-600' },
//                 { title: 'Avg Order Value', value: '$89.50', color: 'bg-gradient-to-r from-orange-500 to-orange-600' },
//                 { title: 'Retention Rate', value: '78%', color: 'bg-gradient-to-r from-purple-500 to-pink-600' },
//                 { title: 'Churn Rate', value: '12%', color: 'bg-gradient-to-r from-red-500 to-red-600' }
//               ].map((metric, index) => (
//                 <div key={index} className={`glass p-8 rounded-3xl shadow-2xl ${metric.color}`}>
//                   <div className="text-4xl font-black mb-2 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
//                     {metric.value}
//                   </div>
//                   <div className="text-lg font-semibold text-white/90">{metric.title}</div>
//                 </div>
//               ))}
//             </motion.div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }




'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';

import {
  FiDownload,
  FiUsers,
  FiDollarSign,
  FiActivity,
} from 'react-icons/fi';

import DashboardHeader from '../../../components/DashboardHeader';
import DashboardSidebar from '../../../components/DashboardSidebar';
import api from '../../../../lib/api';
import { toast } from 'react-hot-toast';

/* =========================
   COLORS
========================= */
const COLORS = [
  '#f97316',
  '#10b981',
  '#3b82f6',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
];

/* =========================
   TYPES
========================= */
interface Stats {
  totalUsers: number;
  totalRestaurants: number;
  totalBookings: number;
  totalRevenue: number;
  avgRating: number;
}

interface ChartItem {
  date: string;
  revenue?: number;
  bookings?: number;
  users?: number;
  restaurants?: number;
}

/* =========================
   PAGE
========================= */
export default function AdminAnalytics() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalRestaurants: 0,
    totalBookings: 0,
    totalRevenue: 0,
    avgRating: 0,
  });

  const [timeRange, setTimeRange] =
    useState<'7d' | '30d' | '90d' | 'all'>('30d');

  const [loading, setLoading] =
    useState(false);

  const [chartData, setChartData] = useState<{
    revenue: ChartItem[];
    bookings: ChartItem[];
    users: ChartItem[];
    restaurants: ChartItem[];
  }>({
    revenue: [],
    bookings: [],
    users: [],
    restaurants: [],
  });

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  /* =========================
     FETCH
  ========================= */
  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const { data } =
        await api.get('/dashboard/stats');

      setStats(data?.data || stats);

      setChartData({
        revenue: generateChartData('revenue'),
        bookings: generateChartData('bookings'),
        users: generateChartData('users'),
        restaurants: generateChartData(
          'restaurants'
        ),
      });
    } catch (error) {
      console.error(error);
      toast.error(
        'Failed to load analytics'
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SAFE CHART DATA
  ========================= */
  const generateChartData = (
    type: string
  ): ChartItem[] => {
    const days =
      timeRange === '7d'
        ? 7
        : timeRange === '30d'
        ? 30
        : timeRange === '90d'
        ? 90
        : 30;

    return Array.from(
      { length: days },
      (_, i) => ({
        date: `Day ${i + 1}`,
        [type]:
          Math.floor(
            Math.random() * 1000
          ) +
          100 +
          i * 10,
      })
    );
  };

  /* =========================
     SAFE CARD
  ========================= */
  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    color,
  }: any) => {
    const safeValue =
      Number(value) || 0;

    return (
      <motion.div
        whileHover={{
          scale: 1.02,
          y: -4,
        }}
        className={`p-6 rounded-3xl shadow-2xl ${color}`}
      >
        <div className="flex items-center justify-between mb-4">
          <Icon className="w-7 h-7 text-white" />

          <span className="text-white text-sm">
            {change}%
          </span>
        </div>

        <div className="text-3xl font-black text-white">
          {safeValue.toLocaleString()}
        </div>

        <div className="text-white/80 mt-1">
          {title}
        </div>
      </motion.div>
    );
  };

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="p-6 space-y-6">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              Analytics
            </h1>

            <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl">
              <FiDownload />
              Export
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              title="Users"
              value={stats.totalUsers}
              change={12}
              icon={FiUsers}
              color="bg-blue-500"
            />

            <StatCard
              title="Revenue"
              value={stats.totalRevenue}
              change={25}
              icon={FiDollarSign}
              color="bg-green-500"
            />

            <StatCard
              title="Bookings"
              value={stats.totalBookings}
              change={18}
              icon={FiActivity}
              color="bg-orange-500"
            />
          </div>

          {/* CHART */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl">
            <h2 className="text-xl font-bold mb-4">
              Revenue
            </h2>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <AreaChart
                data={chartData.revenue}
              >
                <CartesianGrid />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  fill="#10b981"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}