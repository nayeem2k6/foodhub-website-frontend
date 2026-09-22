'use client';
import { useAuth } from '../../context/AuthContext';
import { FiBell, FiSearch, FiSettings, FiLogOut, FiGrid } from 'react-icons/fi';
import Link from 'next/link';

const DashboardHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left - Breadcrumbs */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <FiGrid className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Welcome back, {user?.name}!
            </p>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiBell className="w-6 h-6 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl cursor-pointer transition-colors" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </div>
          
          <FiSettings className="w-6 h-6 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl cursor-pointer transition-colors" />
          
          <button
            onClick={logout}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 dark:hover:text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl transition-all duration-300"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;