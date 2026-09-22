


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useAuth } from '../../context/AuthContext';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import {
  FiBell,
  FiHome,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSearch,
  FiSettings,
  FiSun,
  FiUser,
  FiX,
} from 'react-icons/fi';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // ❗ hydration fix: render only after mount
  if (!mounted) return null;

  const navItems = user
    ? [
        { href: '/', label: 'Home', icon: FiHome },
        { href: '/explore', label: 'Explore', icon: FiSearch },
        { href: '/dashboard', label: 'Dashboard', icon: FiUser },
        { href: '/ai-chat', label: 'AI Chat', icon: FiBell },
        { href: '/about', label: 'About', icon: FiUser },
      ]
    : [
        { href: '/', label: 'Home', icon: FiHome },
        { href: '/explore', label: 'Explore', icon: FiSearch },
        { href: '/about', label: 'About', icon: FiUser },
      ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">🍽️ FoodHub</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition ${
                    pathname === item.href
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4">

            {/* Theme toggle (SAFE) */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === 'dark' ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>

            {/* Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={user.avatar || '/default-avatar.png'}
                    className="w-9 h-9 rounded-xl"
                    alt="avatar"
                  />
                  <span className="hidden sm:block">{user.name}</span>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                    >
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FiUser className="mr-2" />
                        Profile
                      </Link>

                      <Link
                        href="/dashboard/settings"
                        className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <FiSettings className="mr-2" />
                        Settings
                      </Link>

                      <button
                        onClick={logout}
                        className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        <FiLogOut className="mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/auth/login">Login</Link>
                <Link href="/auth/register">Sign Up</Link>
              </>
            )}

            {/* Mobile */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div className="md:hidden pt-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;