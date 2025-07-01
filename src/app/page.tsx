
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
  Leaf,
  Menu,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BottomNav } from '@/components/layout/bottom-nav';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

type UserRole = 'user' | 'company' | 'admin' | 'courier' | null;

const WasteGoLogo = () => (
    <div className="flex items-center gap-1">
        <span className="text-3xl font-bold text-foreground">Waste</span>
        <span className="text-3xl font-bold text-foreground flex items-center">
            GO
            <Leaf className="w-5 h-5 text-primary -ml-2 -mt-3 transform -scale-x-100" strokeWidth={3} />
        </span>
    </div>
)


export default function Home() {
  const [dashboardUrl, setDashboardUrl] = useState('/login');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        let role: UserRole = null;
        let finalUrl = '/login';

        const companyDocRef = doc(db, "companies", currentUser.uid);
        const companyDoc = await getDoc(companyDocRef);
        if (companyDoc.exists()) {
          role = 'company';
        } else {
            const userDocRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                role = userData.role || 'user'; 
            } else {
                role = 'user'; // Fallback for safety
            }
        }
        
        switch (role) {
            case 'company':
                finalUrl = '/dashboard/company';
                break;
            case 'admin':
                finalUrl = '/dashboard/admin';
                break;
            case 'courier':
                finalUrl = '/dashboard/courier';
                break;
            default:
                finalUrl = '/dashboard';
                break;
        }
        setDashboardUrl(finalUrl);

      } else {
        setDashboardUrl('/login');
      }
    });
    return () => unsubscribe();
  }, []);

  const categories = [
    { icon: <HomeIcon className="w-8 h-8 text-primary" />, label: 'Household Waste', href: dashboardUrl },
    { icon: <Factory className="w-8 h-8 text-primary" />, label: 'Factory Waste', href: dashboardUrl },
    { icon: <Trash2 className="w-8 h-8 text-primary" />, label: 'Food Waste', href: dashboardUrl },
    { icon: <HeartPulse className="w-8 h-8 text-primary" />, label: 'Medic Waste', href: dashboardUrl },
    { icon: <Recycle className="w-8 h-8 text-primary" />, label: 'Recycle', href: dashboardUrl },
    { icon: <Smartphone className="w-8 h-8 text-primary" />, label: 'E-Waste', href: dashboardUrl },
  ];

  const menuItems = [
    { label: 'Scheduling', href: dashboardUrl },
    { label: 'Achievment', href: dashboardUrl },
    { label: 'About Us', href: '#' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
        <header className="p-4 flex justify-between items-center">
            <WasteGoLogo />
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-6 h-6"/>
            </Button>
        </header>
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
                    <Link href={dashboardUrl}>
                        <Award className="mr-2" /> Poin User
                    </Link>
                </Button>
                <Button asChild variant="secondary" className="h-12 text-base font-semibold shadow-md rounded-lg">
                    <Link href={dashboardUrl}>
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
