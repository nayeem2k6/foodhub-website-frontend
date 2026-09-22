// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useAuth } from '../../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import api from '../../../lib/api';
// import { toast } from 'react-hot-toast';

// const schema = z.object({
//   name: z.string().min(2, 'Name must be at least 2 characters'),
//   email: z.string().email('Please enter a valid email'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   confirmPassword: z.string(),
// }).refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords don't match",
//   path: ["confirmPassword"],
// });

// type FormData = z.infer<typeof schema>;

// export default function RegisterPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const { login } = useAuth();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const password = watch('password');

//   const onSubmit = async (data: FormData) => {
//     try {
//       setLoading(true);
//       const { data: response } = await api.post('/auth/register', {
//         name: data.name,
//         email: data.email,
//         password: data.password
//       });
      
//       login(response.data.token, response.data.user);
//       toast.success(response.message);
//       router.push('/dashboard');
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
//       >
//         {/* Header */}
//         <div className=" className="text-center space-y-4">
//           <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
//             <FiUser className="w-12 h-12 text-white" />
//           </div>
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//               Create Account
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400 mt-2">
//               Join FoodHub today and discover amazing restaurants
//             </p>
//           </div>
//         </div>

//         {/* Form */}
//         <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//           {/* Name */}
//           <div>
//             <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Full Name
//             </label>
//             <div className="relative">
//               <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 id="name"
//                 type="text"
//                 className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 ${
//                   errors.name
//                     ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
//                     : 'border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-100'
//                 }`}
//                 placeholder="Enter your full name"
//                 disabled={loading}
//                 {...register('name')}
//               />
//             </div>
//             {errors.name && (
//               <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 id="email"
//                 type="email"
//                 className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 ${
//                   errors.email
//                     ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
//                     : 'border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-100'
//                 }`}
//                 placeholder="Enter your email"
//                 disabled={loading}
//                 {...register('email')}
//               />
//             </div>
//             {errors.email && (
//               <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 id="password"
//                 type={showPassword ? 'text' : 'password'}
//                 className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 ${
//                   errors.password
//                     ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
//                     : 'border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-100'
//                 }`}
//                 placeholder="Create a password"
//                 disabled={loading}
//                 {...register('password')}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
//                 disabled={loading}
//               >
//                 {showPassword ? <FiEye className="w-5 h-5" /> : <FiEyeOff className="w-5 h-5" />}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Confirm Password
//             </label>



// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import {
//   FiMail,
//   FiLock,
//   FiUser,
//   FiEye,
//   FiEyeOff,
//   FiLoader,
// } from 'react-icons/fi';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useAuth } from '../../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import api from '../../../lib/api';
// import { toast } from 'react-hot-toast';

// const schema = z
//   .object({
//     name: z.string().min(2, 'Name must be at least 2 characters'),
//     email: z.string().email('Please enter a valid email'),
//     password: z.string().min(6, 'Password must be at least 6 characters'),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ['confirmPassword'],
//   });

// type FormData = z.infer<typeof schema>;

// export default function RegisterPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const { login } = useAuth();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = async (data: FormData) => {
//     try {
//       setLoading(true);

//       const response = await api.post('/auth/register', {
//         name: data.name,
//         email: data.email,
//         password: data.password,
//       });

//       login(response.data.data.token, response.data.data.user);

//       toast.success(response.data.message || 'Registration successful');

//       reset();

//       router.push('/dashboard');
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message || 'Registration failed'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
//       >
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
//             <FiUser className="w-12 h-12 text-white" />
//           </div>

//           <div>
//             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//               Create Account
//             </h2>

//             <p className="text-gray-600 dark:text-gray-400 mt-2">
//               Join FoodHub today and discover amazing restaurants
//             </p>
//           </div>
//         </div>

//         {/* Form */}
//         <form
//           className="space-y-6"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           {/* Name */}
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
//             >
//               Full Name
//             </label>

//             <div className="relative">
//               <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

//               <input
//                 id="name"
//                 type="text"
//                 placeholder="Enter your full name"
//                 disabled={loading}
//                 {...register('name')}
//                 className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 ${
//                   errors.name
//                     ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
//                     : 'border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-100'
//                 }`}
//               />
//             </div>

//             {errors.name && (
//               <p className="mt-2 text-sm text-red-600">
//                 {errors.name.message}
//               </p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
//             >
//               Email Address
//             </label>

//             <div className="relative">
//               <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 disabled={loading}
//                 {...register('email')}
//                 className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 ${
//                   errors.email
//                     ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
//                     : 'border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-100'
//                 }`}
//               />
//             </div>

//             {errors.email && (
//               <p className="mt-2 text-sm text-red-600">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
//             >
//               Password
//             </label>

//             <div className="relative">
//               <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

//               <input
//                 id="password"
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Create a password"
//                 disabled={loading}
//                 {...register('password')}
//                 className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 ${
//                   errors.password
//                     ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
//                     : 'border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-100'
//                 }`}
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 disabled={loading}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
//               >
//                 {showPassword ? (
//                   <FiEye className="w-5 h-5" />
//                 ) : (
//                   <FiEyeOff className="w-5 h-5" />
//                 )}
//               </button>
//             </div>

//             {errors.password && (
//               <p className="mt-2 text-sm text-red-600">
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label
//               htmlFor="confirmPassword"
//               className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
//             >
//               Confirm Password
//             </label>

//             <div className="relative">
//               <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

//               <input
//                 id="confirmPassword"
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 placeholder="Confirm your password"
//                 disabled={loading}
//                 {...register('confirmPassword')}
//                 className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 ${
//                   errors.confirmPassword
//                     ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
//                     : 'border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-100'
//                 }`}
//               />

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowConfirmPassword(!showConfirmPassword)
//                 }
//                 disabled={loading}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
//               >
//                 {showConfirmPassword ? (
//                   <FiEye className="w-5 h-5" />
//                 ) : (
//                   <FiEyeOff className="w-5 h-5" />
//                 )}
//               </button>
//             </div>

//             {errors.confirmPassword && (
//               <p className="mt-2 text-sm text-red-600">
//                 {errors.confirmPassword.message}
//               </p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
//           >
//             {loading ? (
//               <>
//                 <FiLoader className="animate-spin w-5 h-5" />
//                 Creating Account...
//               </>
//             ) : (
//               'Create Account'
//             )}
//           </button>

//           {/* Login Link */}
//           <p className="text-center text-gray-600 dark:text-gray-400">
//             Already have an account?{' '}
//             <Link
//               href="/auth/login"
//               className="text-green-600 hover:text-green-500 font-semibold"
//             >
//               Sign In
//             </Link>
//           </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// }






























// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import {
//   FiMail,
//   FiLock,
//   FiUser,
//   FiEye,
//   FiEyeOff,
//   FiLoader,
// } from 'react-icons/fi';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useAuth } from '../../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import api from '../../../lib/api';
// import { toast } from 'react-hot-toast';

// const schema = z
//   .object({
//     name: z.string().min(2, 'Name must be at least 2 characters'),
//     email: z.string().email('Please enter a valid email'),
//     password: z.string().min(6, 'Password must be at least 6 characters'),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ['confirmPassword'],
//   });

// type FormData = z.infer<typeof schema>;

// export default function RegisterPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const { loginWithGoogle, loginWithFacebook, isLoading: authLoading } = useAuth();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = async (data: FormData) => {
//     try {
//       setLoading(true);
//       const response = await api.post('/auth/register', {
//         name: data.name,
//         email: data.email,
//         password: data.password,
//       });
      
//       toast.success(response.data.message || 'Registration successful');
//       reset();
//       router.push('/dashboard');
//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message || 'Registration failed'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleRegister = async () => {
//     try {
//       await loginWithGoogle();
//       toast.success('Welcome! Google registration successful!');
//       router.push('/dashboard');
//     } catch (error: any) {
//       toast.error('Google registration failed');
//     }
//   };

//   const handleFacebookRegister = async () => {
//     try {
//       await loginWithFacebook();
//       toast.success('Welcome! Facebook registration successful!');
//       router.push('/dashboard');
//     } catch (error: any) {
//       toast.error('Facebook registration failed');
//     }
//   };

//   if (authLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <FiLoader className="w-12 h-12 animate-spin text-green-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
//       >
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
//             <FiUser className="w-12 h-12 text-white" />
//           </div>
//           <div>
//             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//               Create Account
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400 mt-2">
//               Join us today and discover amazing experiences
//             </p>
//           </div>
//         </div>

//         {/* Google & Facebook Buttons */}
//         <div className="space-y-3">
//           <button
//             onClick={handleGoogleRegister}
//             disabled={loading || authLoading}
//             className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 px-6 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <svg className="w-6 h-6" viewBox="0 0 24 24">
//               <path
//                 fill="currentColor"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//               />
//               <path
//                 fill="currentColor"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//               />
//             </svg>
//             <span className="font-semibold text-gray-800 dark:text-white">Sign up with Google</span>
//           </button>

//           <button
//             onClick={handleFacebookRegister}
//             disabled={loading || authLoading}
//             className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166FE5] text-white px-6 py-4 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
//               <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//             </svg>
//             <span className="font-semibold">Sign up with Facebook</span>
//           </button>
//         </div>

//         {/* Divider */}
//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300 dark:border-gray-700" />
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
//               or create account with email
//             </span>
//           </div>
//         </div>

//         {/* Email/Password Form */}
//         <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//           {/* Name */}
//           <div>
//             <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Full Name
//             </label>
//             <div className="relative">
//               <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 id="name"
//                 type="text"
//                 placeholder="Enter your full name"
//                 disabled={loading || authLoading}
//                 {...register('name')}
//                 className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 ${
//                   errors.name
//                     ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
//                     : 'border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-100'
//                 }`}
//               />
//             </div>
//             {errors.name && (
//               <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 disabled={loading || authLoading}
//                 {...register('email')}
//                 className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 ${
//                   errors.email
//                     ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
//                     : 'border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-100'
//                 }`}
//               />
//             </div>
//             {errors.email && (
//               <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 id="password"
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Create a password"
//                 disabled={loading || authLoading}
//                 {...register('password')}
//                 className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 ${
//                   errors.password
//                     ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
//                     : 'border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-100'
//                 }`}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 disabled={loading || authLoading}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
//               >
//                 {showPassword ? <FiEye className="w-5 h-5" /> : <FiEyeOff className="w-5 h-5" />}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 id="confirmPassword"
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 placeholder="Confirm your password"
//                 disabled={loading || authLoading}
//                 {...register('confirmPassword')}
//                 className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 bg-white/50 dark:bg-gray-900/50 ${
//                   errors.confirmPassword
//                     ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
//                     : 'border-gray-200 dark:border-gray-700 focus:border-green-500 focus:ring-green-100'
//                 }`}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 disabled={loading || authLoading}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
//               >
//                 {showConfirmPassword ? <FiEye className="w-5 h-5" /> : <FiEyeOff className="w-5 h-5" />}
//               </button>
//             </div>
//             {errors.confirmPassword && (
//               <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading || authLoading}
//             className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? (
//               <>
//                 <FiLoader className="animate-spin w-5 h-5" />
//                 <span>Creating Account...</span>
//               </>
//             ) : (
//               'Create Account'
//             )}
//           </button>

//           {/* Login Link */}
//           <p className="text-center text-gray-600 dark:text-gray-400">
//             Already have an account?{' '}
//             <Link
//               href="/auth/login"
//               className="text-green-600 hover:text-green-500 font-semibold hover:underline"
//             >
//               Sign In
//             </Link>
//           </p>
//         </form>
//       </motion.div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import api from '../../../lib/api';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const res = await api.post('/auth/register', data);

      const { token, user } = res.data.data;

      localStorage.setItem('token', token);
      login(token, user);

      toast.success('Account created successfully!');
      router.push('/dashboard');

    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Name */}
          <div>
            <label className="text-sm">Name</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-3 text-gray-400" />
              <input
                {...register('name')}
                className="w-full pl-10 p-3 border rounded-xl"
                placeholder="Your name"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                {...register('email')}
                className="w-full pl-10 p-3 border rounded-xl"
                placeholder="Email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className="w-full pl-10 pr-10 p-3 border rounded-xl"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-xl flex justify-center items-center gap-2"
          >
            {loading ? <FiLoader className="animate-spin" /> : 'Create Account'}
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          Already have account?{' '}
          <Link href="/auth/login" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}