'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiEdit, FiTrash2, FiEye, FiFilter, FiUserPlus, FiChevronDown } from 'react-icons/fi';
import DashboardHeader from '../../../components/DashboardHeader';
import DashboardSidebar from '../../../components/DashboardSidebar';
import api from '../../../../lib/api';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  avatar?: string;
  createdAt: string;
  bookingsCount?: number;
  reviewsCount?: number;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [filterRole, setFilterRole] = useState<'all' | 'USER' | 'ADMIN'>('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/users');
      setUsers(data.data);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const bulkAction = async (action: 'delete' | 'make-admin' | 'make-user') => {
    if (selected.length === 0) {
      toast.error('Please select users');
      return;
    }
    
    const confirmed = confirm(`Perform "${action}" on ${selected.length} selected users?`);
    if (confirmed) {
      try {
        // Simulate bulk action
        toast.success(`${action} applied to ${selected.length} users`);
        setSelected([]);
        fetchUsers();
      } catch (error) {
        toast.error('Bulk action failed');
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
                         user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const SkeletonRow = () => (
    <tr className="h-20">
      <td className="p-6">
        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
      </td>
      <td className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </td>
      <td className="p-6">
        <div className={`h-10 w-24 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse`} />
      </td>
      <td className="p-6">
        <div className="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
      </td>
      <td className="p-6">
        <div className="flex space-x-2">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-xl animate-pulse" />
          ))}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/50 shadow-2xl">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  User Management
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Manage {users.length} users on the platform
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                {/* Search */}
                <div className="relative flex-1 min-w-[300px]">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 bg-white/80 dark:bg-gray-800/80 shadow-sm transition-all"
                  />
                </div>

                {/* Actions */}
                <Link href="/dashboard/admin/users/new" className="btn-primary px-8 py-4 text-lg flex items-center space-x-2 shadow-xl hover:shadow-2xl">
                  <FiUserPlus className="w-5 h-5" />
                  <span>Add User</span>
                </Link>
                
                {selected.length > 0 && (
                  <>
                    <button
                      onClick={() => bulkAction('make-admin')}
                      className="px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center space-x-2 text-lg active:scale-95"
                    >
                      <FiChevronDown className="w-4 h-4" />
                      <span>Admin ({selected.length})</span>
                    </button>
                    <button
                      onClick={() => bulkAction('delete')}
                      className="px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center space-x-2 text-lg active:scale-95"
                    >
                      <FiTrash2 className="w-5 h-5" />
                      <span>Delete ({selected.length})</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-200/50 shadow-xl">
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-semibold text-gray-700 dark:text-gray-300 flex-shrink-0">Filter by role:</span>
                {(['all', 'USER', 'ADMIN'] as const).map((role) => {
                  const count = users.filter((u: User) => role === 'all' || u.role === role).length;
                  return (
                    <button
                      key={role}
                      onClick={() => setFilterRole(role)}
                      className={`px-6 py-3 rounded-2xl font-semibold transition-all shadow-md ${
                        filterRole === role
                          ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-300 hover:shadow-lg'
                      }`}
                    >
                      {role} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Users Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <tr>
                      <th className="p-6 text-left">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selected.length === filteredUsers.length && filteredUsers.length > 0}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelected(filteredUsers.map((u: User) => u._id));
                              } else {
                                setSelected([]);
                              }
                            }}
                            className="w-5 h-5 text-blue-600 rounded border-white/50 focus:ring-white"
                          />
                          <span className="font-semibold">Select All</span>
                        </label>
                      </th>
                      <th className="p-6 text-left font-semibold">User</th>
                      <th className="p-6 text-left font-semibold">Role</th>
                      <th className="p-6 text-left font-semibold">Email</th>
                      <th className="p-6 text-left font-semibold">Bookings</th>
                      <th className="p-6 text-left font-semibold">Reviews</th>
                      <th className="p-6 text-left font-semibold">Joined</th>
                      <th className="p-6 text-left font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                    {loading ? (
                      Array(8).fill(0).map((_, i) => <SkeletonRow key={i} />)
                    ) : filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-20 text-center">
                          <FiSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            No users found
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Try adjusting your search or role filter
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((user) => (
                        <tr
                          key={user._id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors h-20 border-b border-gray-100 dark:border-gray-800"
                        >
                          {/* Select */}
                          <td className="p-6">
                            <input
                              type="checkbox"
                              checked={selected.includes(user._id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelected([...selected, user._id]);
                                } else {
                                  setSelected(selected.filter(id => id !== user._id));
                                }
                              }}
                              className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                          </td>

                          {/* User Info */}
                          <td className="p-6">
                            <div className="flex items-center space-x-4 group">
                              <div className="relative">
                                <img
                                  src={user.avatar || '/default-avatar.png'}
                                  alt={user.name}
                                  className="w-14 h-14 rounded-full object-cover shadow-md ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-300 transition-all"
                                />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-3 border-white dark:border-gray-900 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                              </div>
                              <div>
                                <Link
                                  href={`/dashboard/admin/users/${user._id}`}
                                  className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                  {user.name}
                                </Link>
                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Role */}
                          <td className="p-6">
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                              user.role === 'ADMIN'
                                ? 'bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900/50 text-purple-800 dark:text-purple-200'
                                : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200'
                            }`}>
                              {user.role}
                            </span>
                          </td>

                          {/* Email */}
                          <td className="p-6">
                            <div className="font-mono text-sm bg-gray-50 dark:bg-gray-900/50 px-3 py-2 rounded-xl truncate max-w-[250px]">
                              {user.email}
                            </div>
                          </td>

                          {/* Bookings */}
                          <td className="p-6">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                                <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                                  {user.bookingsCount || 0}
                                </span>
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">Bookings</span>
                            </div>
                          </td>

                          {/* Reviews */}
                          <td className="p-6">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/50 rounded-xl flex items-center justify-center">
                                <span className="text-yellow-600 dark:text-yellow-400 font-semibold text-sm">
                                  {user.reviewsCount || 0}
                                </span>
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">Reviews</span>
                            </div>
                          </td>

                          {/* Joined */}
                          <td className="p-6">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(user.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                              })}
                            </div>
                          </td>

                          {/* Actions */}
                          <td className="p-6">
                            <div className="flex items-center space-x-2">
                              <Link
                                href={`/dashboard/admin/users/${user._id}`}
                                className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all group"
                                title="View Profile"
                              >
                                <FiEye className="w-5 h-5 text-blue-500 group-hover:scale-110" />
                              </Link>
                              <Link
                                href={`/dashboard/admin/users/${user._id}/edit`}
                                className="p-2 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl transition-all group"
                                title="Edit User"
                              >
                                <FiEdit className="w-5 h-5 text-orange-500 group-hover:scale-110" />
                              </Link>
                              <button
                                onClick={() => bulkAction('delete')}
                                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all group"
                                title="Delete User"
                              >
                                <FiTrash2 className="w-5 h-5 text-red-500 group-hover:scale-110" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}