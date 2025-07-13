'use client';

import {
  Home as HomeIcon,
  Factory,
  Trash2,
  HeartPulse,
  Recycle,
  Smartphone,
  Award,
  History,
  ChevronRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNav } from '@/components/layout/bottom-nav';
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/auth-context';
import { AppHeader } from '@/components/layout/app-header';

type UserRole = 'user' | 'company' | 'admin' | 'courier' | null;

export default function Home() {
  const { user, userData, loading } = useAuth();
  const isLoggedIn = !!user;
  
  let dashboardUrl = '/login';
  if (isLoggedIn && userData) {
    switch (userData.role) {
        case 'company':
            dashboardUrl = '/dashboard/company';
            break;
        case 'admin':
            dashboardUrl = '/dashboard/admin';
            break;
        case 'courier':
            dashboardUrl = '/dashboard/courier';
            break;
        default:
            dashboardUrl = '/dashboard';
            break;
    }
  }

  const categories = [
    { icon: <HomeIcon className="w-8 h-8 text-primary" />, label: 'House Waste', href: isLoggedIn ? '/house-waste' : '/login' },
    { icon: <Factory className="w-8 h-8 text-primary" />, label: 'Factory Waste', href: isLoggedIn ? dashboardUrl : '/login' },
    { icon: <Trash2 className="w-8 h-8 text-primary" />, label: 'Food Waste', href: isLoggedIn ? dashboardUrl : '/login' },
    { icon: <HeartPulse className="w-8 h-8 text-primary" />, label: 'Medic Waste', href: isLoggedIn ? '/medic-waste' : '/login' },
    { icon: <Recycle className="w-8 h-8 text-primary" />, label: 'Recycle', href: isLoggedIn ? dashboardUrl : '/login' },
    { icon: <Smartphone className="w-8 h-8 text-primary" />, label: 'E-Waste', href: isLoggedIn ? dashboardUrl : '/login' },
  ];

  const menuItems = [
    { label: 'Status', href: isLoggedIn ? '/submission-status' : '/login' },
    { label: 'Scheduling', href: isLoggedIn ? '/dashboard/points' : '/login' },
    { label: 'About Us', href: '/about-us' },
  ];
  
  const historyHref = isLoggedIn ? '/history' : '/login';
  const pointsHref = isLoggedIn ? '/dashboard/points' : '/login';

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
        <AppHeader />
        <main className="flex-grow px-4 pb-24">
          <Skeleton className="relative h-48 rounded-2xl mb-6" />
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[...Array(6)].map((_, index) => (
                <Card key={index} className="bg-primary/10 shadow-md rounded-2xl animate-pulse">
                    <CardContent className="flex flex-col items-center justify-center p-2 text-center h-full aspect-square">
                        <Skeleton className="bg-muted rounded-full p-3 mb-2 w-14 h-14" />
                        <Skeleton className="h-4 w-16 bg-muted" />
                    </CardContent>
                </Card>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
             <Skeleton className="h-12 rounded-lg bg-muted" />
             <Skeleton className="h-12 rounded-lg bg-muted" />
          </div>

          <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="h-16 rounded-lg bg-muted" />
              ))}
          </div>
        </main>
        
        <BottomNav />
    </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
        <AppHeader />
        <main className="flex-grow px-4 pb-24">
            <div className="relative h-48 rounded-2xl overflow-hidden mb-6 shadow-md">
                <Image src="https://i.imgur.com/CABdaYA.png" fill alt="Selamat Datang" data-ai-hint="recycling hands" className="object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
                    <h2 className="text-white text-3xl font-bold">Selamat Datang!</h2>
                    <p className="text-white text-sm">Kelola sampah Anda dengan mudah dan dapatkan poin reward</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
                {categories.map((category, index) => (
                    <Link href={category.href} key={index}>
                        <Card className="bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors rounded-2xl">
                            <CardContent className="flex flex-col items-center justify-center p-2 text-center h-full aspect-square">
                                <div className="bg-white rounded-full p-3 mb-2">
                                    {category.icon}
                                </div>
                                <span className="text-xs font-semibold leading-tight">{category.label}</span>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                 <Button asChild variant="secondary" className="h-12 text-base font-semibold shadow-md rounded-lg">
                    <Link href={pointsHref}>
                        <Award className="mr-2" /> Poin User
                    </Link>
                </Button>
                <Button asChild variant="secondary" className="h-12 text-base font-semibold shadow-md rounded-lg">
                    <Link href={historyHref}>
                        <History className="mr-2" /> View History
                    </Link>
                </Button>
            </div>

            <div className="space-y-3">
                {menuItems.map((item, index) => (
                    <Link href={item.href} key={index} className="flex items-center justify-between bg-card text-card-foreground p-4 rounded-lg shadow-sm hover:bg-muted transition-colors">
                        <span className="font-semibold text-lg">{item.label}</span>
                        <ChevronRight className="w-6 h-6 text-muted-foreground"/>
                    </Link>
                ))}
            </div>
        </main>
        
        <BottomNav />
    </div>
  )
}
