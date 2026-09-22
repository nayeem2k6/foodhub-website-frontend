'use client';
import { motion } from 'framer-motion';
import { FiUsers, FiDollarSign, FiActivity, FiUserPlus } from 'react-icons/fi';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import DashboardHeader from '../../components/DashboardHeader';
import DashboardSidebar from '../../components/DashboardSidebar';

const adminStats = {
  totalUsers: 1247,
  totalRestaurants: 456,
  pendingBookings: 89,
  totalRevenue: 45230
};

const chartData = [
  { month: 'Jan', revenue: 12000, bookings: 45 },
  { month: 'Feb', revenue: 15000, bookings: 62 },
  { month: 'Mar', revenue: 18000, bookings: 78 },
  { month: 'Apr', revenue: 22000, bookings: 95 },
  { month: 'May', revenue: 28000, bookings: 112 }
];

const COLORS = ['#f97316', '#10b981', '#3b82f6', '#f59e0b'];

export default function AdminDashboard() {
  const StatCard = ({ icon: Icon, title, value, color }: any) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:-translate-y-2"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl group-hover:scale-110 transition-transform">
          <Icon className="w-8 h-8" />
        </div>
        <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse" />
      </div>
      <div>
        <div className="text-4xl font-bold mb-2">{value.toLocaleString()}</div>
        <div className="text-purple-100 font-semibold opacity-90">{title}</div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-2xl"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                    Admin Dashboard
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    Complete control over FoodHub platform
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Add Restaurant
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Export Data
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <StatCard icon={FiUsers} title="Active Users" value={adminStats.totalUsers} color="from-blue-500" />
              <StatCard icon={FiUserPlus} title="Restaurants" value={adminStats.totalRestaurants} color="from-emerald-500" />
              <StatCard icon={FiDollarSign} title="Pending Bookings" value={adminStats.pendingBookings} color="from-amber-500" />
              <StatCard icon={FiActivity} title="Monthly Revenue" value={adminStats.totalRevenue} color="from-purple-500" />
            </motion.div>

            {/* Charts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-8"
            >
              {/* Revenue Chart */}
              <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Revenue & Bookings</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#f97316" name="Revenue ($)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="bookings" fill="#10b981" name="Bookings" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* User Distribution */}
              <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-2xl">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Platform Growth</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Restaurants', value: 456 },
                        { name: 'Users', value: 1247 },
                        { name: 'Bookings', value: 2345 }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {[
                        { name: 'Restaurants', fill: '#f97316' },
                        { name: 'Users', fill: '#3b82f6' },
                        { name: 'Bookings', fill: '#10b981' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-200/50 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { user: 'John Doe', action: 'Added new restaurant', time: '2 min ago', type: 'restaurant' },
                  { user: 'Jane Smith', action: 'New booking confirmed', time: '15 min ago', type: 'booking' },
                  { user: 'Mike Johnson', action: 'Left 5-star review', time: '1 hour ago', type: 'review' },
                  { user: 'Sarah Wilson', action: 'Profile updated', time: '3 hours ago', type: 'profile' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-6 bg-white/70 dark:bg-gray-800/70 rounded-2xl hover:shadow-md transition-all group">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      activity.type === 'restaurant' ? 'bg-orange-500' :
                      activity.type === 'booking' ? 'bg-green-500' :
                      activity.type === 'review' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}>
                      <span className="text-white font-semibold text-sm">✓</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 dark:text-white truncate">
                        {activity.user} {activity.action}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</div>
                    </div>
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      View Details →
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}