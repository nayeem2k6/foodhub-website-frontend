// import Link from 'next/link';
// import { FiFacebook, FiTwitter, FiInstagram, FiPhone, FiMail } from 'react-icons/fi';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {/* Brand & Logo */}
//         <div className="space-y-4">
//           <Link href="/" className="flex items-center space-x-2 group">
//             <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
//               <span className="text-2xl font-bold">🍽️</span>
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
//                 FoodHub
//               </h3>
//               <p className="text-gray-400 text-sm">Discover amazing restaurants</p>
//             </div>
//           </Link>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h4 className="text-lg font-semibold mb-6 text-orange-400">Quick Links</h4>
//           <ul className="space-y-3">
//             {[
//               { href: '/', label: 'Home' },
//               { href: '/explore', label: 'Explore' },
//               { href: '/about', label: 'About' },
//               { href: '/contact', label: 'Contact' }
//             ].map((item) => (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center"
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Platform */}
//         <div>
//           <h4 className="text-lg font-semibold mb-6 text-orange-400">Platform</h4>
//           <ul className="space-y-3">
//             {[
//               { href: '/dashboard', label: 'Dashboard' },
//               { href: '/ai-chat', label: 'AI Assistant' },
//               { href: '/dashboard/orders', label: 'My Bookings' },
//               { href: '/dashboard/reviews', label: 'Reviews' }
//             ].map((item) => (
//               <li key={item.href}>
//                 <Link
//                   href={item.href}
//                   className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center"
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Contact */}
//         <div>
//           <h4 className="text-lg font-semibold mb-6 text-orange-400">Contact Info</h4>
//           <div className="space-y-4">
//             <div className="flex items-center space-x-3">
//               <FiPhone className="w-5 h-5 text-orange-400" />
//               <span className="text-gray-300">+8801407038855</span>
//             </div>
//             <div className="flex items-center space-x-3">
//               <FiMail className="w-5 h-5 text-orange-400" />
//               <span className="text-gray-300">devnayeem2k6@gmail.com</span>
//             </div>
//             <div className="flex space-x-4 pt-2">
//               {[
//                 { icon: FiFacebook, href: 'https://facebook.com' },
//                 { icon: FiTwitter, href: 'https://twitter.com' },
//                 { icon: FiInstagram, href: 'https://instagram.com' }
//               ].map((item) => (
//                 <a
//                   key={item.href}
//                   href={item.href}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="w-10 h-10 bg-white/20 hover:bg-white/40 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
//                 >
//                   <item.icon className="w-5 h-5" />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
//         <p>
//           &copy; {currentYear} FoodHub. All rights reserved. | 
//           <Link href="/privacy" className="hover:text-orange-400 mx-2">Privacy</Link> | 
//           <Link href="/terms" className="hover:text-orange-400">Terms</Link>
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;






import Link from 'next/link';
import {
  FiFacebook,
  FiGithub,
  FiLinkedin,
  FiPhone,
  FiMail,
} from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand & Logo */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-2xl font-bold">🍽️</span>
            </div>

            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-200 bg-clip-text text-transparent">
                FoodHub
              </h3>
              <p className="text-gray-400 text-sm">
                Discover amazing restaurants
              </p>
            </div>
          </Link>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-6 text-orange-400">
            Quick Links
          </h4>

          <ul className="space-y-3">
            {[
              { href: '/', label: 'Home' },
              { href: '/explore', label: 'Explore' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Platform */}
        <div>
          <h4 className="text-lg font-semibold mb-6 text-orange-400">
            Platform
          </h4>

          <ul className="space-y-3">
            {[
              { href: '/dashboard', label: 'Dashboard' },
              { href: '/ai-chat', label: 'AI Assistant' },
              { href: '/dashboard/orders', label: 'My Bookings' },
              { href: '/dashboard/reviews', label: 'Reviews' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-6 text-orange-400">
            Contact Info
          </h4>

          <div className="space-y-4">

            {/* Phone */}
            <a
              href="tel:+8801407038855"
              className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
            >
              <FiPhone className="w-5 h-5 text-orange-400" />
              <span>+8801407038855</span>
            </a>

            {/* Email */}
            <a
              href="mailto:nayeembabu2k6@gmail.com"
              className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
            >
              <FiMail className="w-5 h-5 text-orange-400" />
              <span>nayeembabu2k6@gmail.com</span>
            </a>

            {/* Social Links */}
            <div className="flex space-x-4 pt-2">

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/19HXSZQav5/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 bg-white/20 hover:bg-white/40 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <FiFacebook className="w-5 h-5" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/nayeem2k6"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 bg-white/20 hover:bg-white/40 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/nayeem2k6"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 bg-white/20 hover:bg-white/40 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <FiGithub className="w-5 h-5" />
              </a>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
        <p>
          &copy; {currentYear} FoodHub. All rights reserved.
          <span className="mx-2">|</span>

          <Link
            href="/privacy"
            className="hover:text-orange-400 transition-colors"
          >
            Privacy
          </Link>

          <span className="mx-2">|</span>

          <Link
            href="/terms"
            className="hover:text-orange-400 transition-colors"
          >
            Terms
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
