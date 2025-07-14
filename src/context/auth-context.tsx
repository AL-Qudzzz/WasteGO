
'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

export type UserRole = 'user' | 'company' | 'admin' | 'courier' | null;

interface UserData {
  uid: string;
  email: string | null;
  role: UserRole;
  [key: string]: any;
}

interface AuthContextType {
  user: FirebaseUser | null;
  userData: UserData | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUserData = useCallback(async (currentUser: FirebaseUser | null) => {
    if (currentUser) {
      const companyDocRef = doc(db, 'companies', currentUser.uid);
      const companyDocSnap = await getDoc(companyDocRef);
      if (companyDocSnap.exists()) {
        setUserData({ uid: currentUser.uid, email: currentUser.email, role: 'company', ...companyDocSnap.data() });
      } else {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setUserData({ uid: currentUser.uid, email: currentUser.email, role: data.role || 'user', ...data });
        } else {
           setUserData({ uid: currentUser.uid, email: currentUser.email, role: 'user' });
        }
      }
    } else {
      setUserData(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      await fetchUserData(currentUser);
    });

    return () => unsubscribe();
  }, [fetchUserData]);

  const refreshUserData = async () => {
      if(auth.currentUser){
          setLoading(true);
          await fetchUserData(auth.currentUser);
          setLoading(false);
      }
  }

  const logout = async () => {
    await signOut(auth);
    // Clear submission and payment status from localStorage on logout
    if (typeof window !== 'undefined') {
        localStorage.removeItem('submissionMade');
        localStorage.removeItem('paymentCompleted');
    }
    router.push('/');
  };

  const value = { user, userData, loading, logout, refreshUserData };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
