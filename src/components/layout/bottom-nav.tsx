
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MapPin, User } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/auth-context';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type UserRole = 'user' | 'company' | 'admin' | 'courier' | null;


export function BottomNav() {
  const pathname = usePathname();
  const { user, userData, loading } = useAuth();
  const [canTrack, setCanTrack] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const paymentCompleted = localStorage.getItem('paymentCompleted') === 'true';
      setCanTrack(paymentCompleted);
    }
  }, [pathname]);

  let profileHref = '/login';
  if (user) {
    switch (userData?.role) {
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

  const handleTrackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canTrack) {
      e.preventDefault();
      toast({
        variant: "destructive",
        title: "Akses Ditolak",
        description: "Anda harus menyelesaikan pembayaran terlebih dahulu untuk melacak penjemputan.",
      });
    }
  };

  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: 'Home', href: '/', active: pathname === '/' },
    { 
      icon: <MapPin className="w-6 h-6" />, 
      label: 'Lacak', 
      href: '/track-pickup', 
      active: pathname === '/track-pickup',
      disabled: !canTrack,
      onClick: handleTrackClick,
      tooltip: 'Selesaikan pembayaran untuk melacak'
    },
    { icon: <User className="w-6 h-6" />, label: 'Profile', href: profileHref, active: pathname.startsWith('/dashboard') || pathname === '/login' || pathname.startsWith('/signup') },
  ];

  if (loading) {
    return (
      <footer className="fixed bottom-0 left-0 right-0 bg-nav-background text-nav-foreground shadow-t-lg z-50 md:hidden">
        <div className="flex justify-around items-center h-16">
          <Skeleton className="w-12 h-10 rounded-md bg-gray-700" />
          <Skeleton className="w-12 h-10 rounded-md bg-gray-700" />
          <Skeleton className="w-12 h-10 rounded-md bg-gray-700" />
        </div>
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-nav-background text-nav-foreground shadow-t-lg z-50 md:hidden">
      <TooltipProvider>
        <div className="flex justify-around items-center h-16">
          {navItems.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Link 
                  href={item.disabled ? '#' : item.href} 
                  data-active={item.active} 
                  onClick={item.onClick}
                  className={`flex flex-col items-center justify-center text-xs text-center ${item.disabled ? 'text-gray-500 cursor-not-allowed' : 'hover:text-white data-[active=true]:text-nav-active'}`}
                  aria-disabled={item.disabled}
                  tabIndex={item.disabled ? -1 : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </TooltipTrigger>
              {item.disabled && (
                <TooltipContent>
                  <p>{item.tooltip}</p>
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </footer>
  );
}
