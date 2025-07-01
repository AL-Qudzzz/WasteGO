
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MapPin, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { doc, getDoc } from 'firebase/firestore';

type UserRole = 'user' | 'company' | 'admin' | 'courier' | null;


export function BottomNav() {
  const pathname = usePathname();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check for role in firestore
        const companyDocRef = doc(db, "companies", currentUser.uid);
        const companyDoc = await getDoc(companyDocRef);
        if (companyDoc.exists()) {
          setRole('company');
        } else {
            const userDocRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                // Roles like 'admin', 'courier' are also in the users collection
                setRole(userData.role || 'user'); 
            } else {
                setRole('user'); // Fallback for safety
            }
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);


  let profileHref = '/login';
  if (user) {
    switch (role) {
      case 'company':
        profileHref = '/dashboard/company';
        break;
      case 'admin':
        profileHref = '/dashboard/admin';
        break;
      case 'courier':
        profileHref = '/dashboard/courier';
        break;
      default:
        profileHref = '/dashboard';
        break;
    }
  }


  const bottomNavItems = [
    { icon: <Home className="w-6 h-6" />, label: 'Home', href: '/', active: pathname === '/' },
    { icon: <MapPin className="w-6 h-6" />, label: 'Location', href: '#', active: pathname === '/location' },
    { icon: <User className="w-6 h-6" />, label: 'Profile', href: profileHref, active: pathname.startsWith('/dashboard') || pathname === '/login' || pathname.startsWith('/signup') },
  ];

  if (loading) {
    return (
      <footer className="fixed bottom-0 left-0 right-0 bg-nav-background text-nav-foreground shadow-t-lg z-50">
        <div className="flex justify-around items-center h-16">
          <Skeleton className="w-12 h-10 rounded-md bg-gray-700" />
          <Skeleton className="w-12 h-10 rounded-md bg-gray-700" />
          <Skeleton className="w-12 h-10 rounded-md bg-gray-700" />
        </div>
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-nav-background text-nav-foreground shadow-t-lg z-50">
      <div className="flex justify-around items-center h-16">
        {bottomNavItems.map((item, index) => (
            <Link href={item.href} key={index} data-active={item.active} className="flex flex-col items-center justify-center text-xs text-center hover:text-white data-[active=true]:text-nav-active">
              {item.icon}
              <span>{item.label}</span>
            </Link>
          )
        )}
      </div>
    </footer>
  );
}
