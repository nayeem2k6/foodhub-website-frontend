// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { FiMail, FiLock, FiEye, FiEyeOff, FiLoader, FiUser } from 'react-icons/fi';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useAuth } from '../../../context/AuthContext';
// import { useRouter } from 'next/navigation';
// import api from '../../../lib/api';
// import { toast } from 'react-hot-toast';

// const schema = z.object({
//   email: z.string().email('Please enter a valid email'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// type FormData = z.infer<typeof schema>;

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const { login } = useAuth();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = async (data: FormData) => {
//     try {
//       setLoading(true);
//       const { data: response } = await api.post('/auth/login', data);
      
//       login(response.data.token, response.data.user);
//       toast.success(response.message);
//       router.push('/dashboard');
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDemoLogin = async (role: 'user' | 'admin') => {
//     try {
//       setLoading(true);
//       const { data: response } = await api.post(`/auth/demo-login/${role}`);
      
//       login(response.data.token, response.data.user);
//       toast.success(`Demo ${role} login successful!`);
//       router.push('/dashboard');
//     } catch (error) {
//       toast.error('Demo login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
//       >
//         {/* Header */}
//         <div className="text-center space-y-4">
//           <div className="mx-auto w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl">
//             <FiLock className="w-12 h-12 text-white" />
//           </div>
//           <div>
//             <h2 className="text-4xl lg:text-3xl font-bold text-gray-900 dark:text-white">
//               Welcome Back
//             </h2>
//             <p className="text-gray-600 dark:text-gray-400 mt-2">
//               Sign in to your account to continue
//             </p>
//           </div>
//         </div>

//         {/* Form */}
//         <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
//                     ? 'border-red-300 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/20'
//                     : 'border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-orange-100 dark:focus:ring-orange-900/20'
//                 }`}
//                 placeholder="Enter your email"
//                 disabled={loading}
//                 {...register('email')}
//               />
//             </div>
//             {errors.email && (
//               <p className="mt-2 text-sm text-red-600 flex items-center">
//                 <span className="w-5 h-5 mr-2">!</span>
//                 {errors.email.message}
//               </p>
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
//                     ? 'border-red-300 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/20'
//                     : 'border-gray-200 dark:border-gray-700 focus:border-orange-500 focus:ring-orange-100 dark:focus:ring-orange-900/20'
//                 }`}
//                 placeholder="Enter your password"
//                 disabled={loading}
//                 {...register('password')}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
//                 disabled={loading}
//               >
//                 {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="mt-2 text-sm text-red-600 flex items-center">
//                 <span className="w-5 h-5 mr-2">!</span>
//                 {errors.password.message}
//               </p>
//             )}
//           </div>

//           {/* Forgot Password */}
//           <div className="flex items-center justify-between">
//             <label className="flex items-center">
//               <input type="checkbox" className="rounded border-gray-300 text-orange-600 shadow-sm focus:ring-orange-500" />
//               <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
//             </label>
//             <Link href="/auth/forgot-password" className="text-sm font-semibold text-orange-600 hover:text-orange-700 dark:hover:text-orange-500 transition-colors">
//               Forgot Password?
//             </Link>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 text-lg"
//           >
//             {loading ? (
//               <>
//                 <FiLoader className="w-5 h-5 animate-spin" />
//                 <span>Signing In...</span>
//               </>
//             ) : (
//               <span>Sign In</span>
//             )}
//           </button>
//         </form>

//         {/* Demo Login Buttons */}
//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300 dark:border-gray-700" />
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
//               Quick Demo
//             </span>
//           </div>
//         </div>

//         {/* Demo Buttons */}
//         <div className="grid grid-cols-2 gap-4 pt-4">
//           <button
//             onClick={() => handleDemoLogin('user')}
//             disabled={loading}
//             className="btn-secondary py-4 text-lg flex items-center justify-center space-x-2"
//           >
//             <FiUser className="w-5 h-5" />
//             <span>Demo User</span>
//           </button>
//           <button
//             onClick={() => handleDemoLogin('admin')}
//             disabled={loading}
//             className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 text-lg"
//           >
//             <FiUser className="w-5 h-5" />
//             <span>Demo Admin</span>
//           </button>
//         </div>

//         {/* Register Link */}
//         <div className="text-center pt-8">
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Don't have an account?{' '}
//             <Link href="/auth/register" className="font-semibold text-orange-600 hover:text-orange-700 dark:hover:text-orange-500 transition-colors">
//               Sign up here
//             </Link>
//           </p>
//         </div>
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
import { FiMail, FiLock, FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
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

      const res = await api.post('/auth/login', data);

      const { token, user } = res.data.data;

      localStorage.setItem('token', token);
      login(token, user);

      toast.success('Login successful!');
      router.push('/dashboard');

    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div>
            <label>Email</label>
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
            <label>Password</label>
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
            className="w-full bg-orange-600 text-white p-3 rounded-xl flex justify-center items-center gap-2"
          >
            {loading ? <FiLoader className="animate-spin" /> : 'Login'}
          </button>

        </form>

        <p className="text-center mt-4 text-sm">
          Don't have account?{' '}
          <Link href="/auth/register" className="text-orange-600 font-semibold">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}