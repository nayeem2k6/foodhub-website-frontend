'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiCamera, FiSave, FiEdit3, FiLoader, FiShoppingBag, FiUsers, FiStar } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from '../../../lib/api';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-hot-toast';
import DashboardHeader from '../../components/DashboardHeader';
import DashboardSidebar from '../..//components/DashboardSidebar';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
});

type ProfileForm = z.infer<typeof schema>;

export default function ProfilePage() {
  const { user, login } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ProfileForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: ''
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: ''
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: ProfileForm) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const { data: response } = await api.patch(`/users/${user?._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      login(response.data.token, response.data.user);
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-12"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
                  My Profile
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Update your personal information
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-8">
                {/* Avatar Upload */}
                <div className="flex flex-col items-center space-y-6">
                  <div className="relative group">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center shadow-2xl border-4 border-white dark:border-gray-800 relative overflow-hidden">
                      <Image
                        src={avatarPreview || user?.avatar || '/default-avatar.png'}
                        alt="Avatar"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover rounded-full"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <label className="cursor-pointer p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all">
                          <FiCamera className="w-6 h-6 text-gray-700" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Click to change avatar</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                      <FiUser className="w-5 h-5 mr-2 text-orange-500" />
                      Full Name
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      className={`w-full px-5 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 shadow-inner ${
                        errors.name
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                          : editing
                          ? 'border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-orange-100'
                          : 'border-transparent bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                      }`}
                      disabled={!editing}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                      <FiMail className="w-5 h-5 mr-2 text-green-500" />
                      Email Address
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className={`w-full px-5 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 shadow-inner ${
                        errors.email
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                          : editing
                          ? 'border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-orange-100'
                          : 'border-transparent bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                      }`}
                      disabled={!editing}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                      <FiPhone className="w-5 h-5 mr-2 text-blue-500" />
                      Phone Number (Optional)
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className={`w-full px-5 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 shadow-inner ${
                        editing
                          ? 'border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-orange-100'
                          : 'border-transparent bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
                      }`}
                      disabled={!editing}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                  {!editing ? (
                    <button
                      type="button"
                      onClick={() => setEditing(true)}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 text-lg"
                    >
                      <FiEdit3 className="w-5 h-5" />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {loading ? (
                          <>
                            <FiLoader className="w-5 h-5 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <FiSave className="w-5 h-5" />
                            <span>Save Changes</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(false);
                          setAvatarPreview(null);
                          setAvatarFile(null);
                          reset();
                        }}
                        className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </form>

              {/* Account Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-3xl">
                  <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FiStar className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">4.8</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Avg Rating</div>
                </div>
                <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-3xl">
                  <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FiShoppingBag className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">12</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Bookings</div>
                </div>
                <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-3xl">
                  <div className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <FiUsers className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">Member</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Since 2024</div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}