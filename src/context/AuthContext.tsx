'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};



// 'use client';
// import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// import { 
//   User as FirebaseUser, 
//   onAuthStateChanged, 
//   signInWithPopup, 
//   signOut,
//   GoogleAuthProvider,
//   FacebookAuthProvider,
//   UserCredential
// } from 'firebase/auth';
// import { auth, googleProvider, facebookProvider } from '';
// import { User } from '../types';

// interface AuthContextType {
//   user: User | null;
//   loginWithGoogle: () => Promise<void>;
//   loginWithFacebook: () => Promise<void>;
//   logout: () => Promise<void>;
//   isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Firebase Auth State Listener
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
//       if (firebaseUser) {
//         // Firebase user কে আপনার User type এ convert করুন
//         const customUser: User = {
//           uid: firebaseUser.uid,
//           email: firebaseUser.email || '',
//           displayName: firebaseUser.displayName || '',
//           photoURL: firebaseUser.photoURL || '',
//           providerId: firebaseUser.providerData[0]?.providerId || ''
//         };
//         setUser(customUser);
//         // Optional: localStorage এ save করতে পারেন
//         localStorage.setItem('user', JSON.stringify(customUser));
//       } else {
//         setUser(null);
//         localStorage.removeItem('user');
//       }
//       setIsLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const loginWithGoogle = async (): Promise<void> => {
//     try {
//       setIsLoading(true);
//       const result: UserCredential = await signInWithPopup(auth, googleProvider);
//       // Firebase automatically handle করে user state
//       console.log('Google login successful:', result.user);
//     } catch (error: any) {
//       console.error('Google login error:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const loginWithFacebook = async (): Promise<void> => {
//     try {
//       setIsLoading(true);
//       const result: UserCredential = await signInWithPopup(auth, facebookProvider);
//       console.log('Facebook login successful:', result.user);
//     } catch (error: any) {
//       console.error('Facebook login error:', error);
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = async (): Promise<void> => {
//     try {
//       setIsLoading(true);
//       await signOut(auth);
//       console.log('User logged out');
//     } catch (error) {
//       console.error('Logout error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       loginWithGoogle, 
//       loginWithFacebook, 
//       logout, 
//       isLoading 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };