// 'use client';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useAuth } from '../../context/AuthContext';
// import { 
//   FiHome, FiUser, FiShoppingBag, FiStar, FiSettings, 
//   FiUsers,  
// } from 'react-icons/fi';

// const DashboardSidebar = () => {
//   const pathname = usePathname();
//   const { user } = useAuth();

//   const userNav = [
//     { href: '/dashboard', label: 'Overview', icon: FiHome },
//     { href: '/dashboard/profile', label: 'Profile', icon: FiUser },
//     { href: '/dashboard/orders', label: 'Bookings', icon: FiShoppingBag },
//     { href: '/dashboard/reviews', label: 'Reviews', icon: FiStar },
//   ];

//   const adminNav = [
//     { href: '/dashboard/admin', label: 'Admin Dashboard',  },
//     { href: '/dashboard/admin/restaurants', label: 'Restaurants', },
//     { href: '/dashboard/admin/users', label: 'Users', icon: FiUsers },
//     { href: '/dashboard/admin/analytics', label: 'Analytics',  },
//   ];

//   const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

//   return (
//     <div className="w-full lg:w-64 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 shadow-xl">
//       <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
//         <div className="flex items-center space-x-4">
//           <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
//             <span className="text-xl font-bold text-white">
//               {user?.name?.[0]?.toUpperCase() || 'U'}
//             </span>
//           </div>
//           <div>
//             <h2 className="font-bold text-xl text-gray-900 dark:text-white">
//               {user?.name || 'User'}
//             </h2>
//             <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
//               {user?.role || 'user'}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="p-4 space-y-2">
//         {userNav.map((item) => (
//           <Link
//             key={item.href}
//             href={item.href}
//             className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 group ${
//               isActive(item.href)
//                 ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
//                 : 'text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700/50 hover:text-orange-600 dark:hover:text-orange-400'
//             }`}
//           >
//             <item.icon 
//               className={`w-6 h-6 ${isActive(item.href) ? 'text-white' : 'group-hover:text-orange-500'}`} 
//             />
//             <span className="font-medium">{item.label}</span>
//           </Link>
//         ))}

//         {user?.role === 'ADMIN' && (
//           <>
//             <div className="my-4 h-px bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-600" />
//             {adminNav.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 group ${
//                   isActive(item.href)
//                     ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
//                     : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400'
//                 }`}
//               >
//                 <item.icon 
//                   className={`w-6 h-6 ${isActive(item.href) ? 'text-white' : 'group-hover:text-purple-500'}`} 
//                 />
//                 <span className="font-medium">{item.label}</span>
//               </Link>
//             ))}
//           </>
//         )}
//       </nav>
//     </div>
//   );
// };

// export default DashboardSidebar;



'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
  FiHome,
  FiUser,
  FiShoppingBag,
  FiStar,
  FiUsers,
  FiSettings,
  FiBarChart2,
} from 'react-icons/fi';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  // User Navigation
  const userNav = [
    {
      href: '/dashboard',
      label: 'Overview',
      icon: FiHome,
    },
    {
      href: '/dashboard/profile',
      label: 'Profile',
      icon: FiUser,
    },
    {
      href: '/dashboard/orders',
      label: 'Bookings',
      icon: FiShoppingBag,
    },
    {
      href: '/dashboard/reviews',
      label: 'Reviews',
      icon: FiStar,
    },
  ];

  // Admin Navigation
  const adminNav = [
    {
      href: '/dashboard/admin',
      label: 'Admin Dashboard',
      icon: FiHome,
    },
    {
      href: '/dashboard/admin/restaurants',
      label: 'Restaurants',
      icon: FiShoppingBag,
    },
    {
      href: '/dashboard/admin/users',
      label: 'Users',
      icon: FiUsers,
    },
    {
      href: '/dashboard/admin/analytics',
      label: 'Analytics',
      icon: FiBarChart2,
    },
    {
      href: '/dashboard/admin/settings',
      label: 'Settings',
      icon: FiSettings,
    },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className="w-full lg:w-64 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 shadow-xl min-h-screen">
      
      {/* User Info */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold text-white">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>

          <div>
            <h2 className="font-bold text-xl text-gray-900 dark:text-white">
              {user?.name || 'User'}
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {user?.role || 'user'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">

        {/* User Menu */}
        {userNav.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 group ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700/50 hover:text-orange-600 dark:hover:text-orange-400'
              }`}
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive(item.href)
                    ? 'text-white'
                    : 'group-hover:text-orange-500'
                }`}
              />

              <span className="font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Admin Menu */}
        {user?.role === 'ADMIN' && (
          <>
            <div className="my-4 h-px bg-gradient-to-r from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-600" />

            {adminNav.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 group ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isActive(item.href)
                        ? 'text-white'
                        : 'group-hover:text-purple-500'
                    }`}
                  />

                  <span className="font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </>
        )}
      </nav>
    </div>
  );
};

export default DashboardSidebar;