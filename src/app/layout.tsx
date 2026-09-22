import './globals.css';
import Providers from './providers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          
          <main>
            
            {children}
            </main>
          <Footer />
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
