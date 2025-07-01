
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchedulePickupForm } from "@/components/dashboard/user/schedule-pickup-form";
import { PickupHistory } from "@/components/dashboard/user/pickup-history";
import { ImpactSummary } from "@/components/dashboard/user/impact-summary";
import { User, Mail, Phone, MapPin, KeyRound, LogOut } from "lucide-react";
import Link from "next/link";
import { Skeleton } from '@/components/ui/skeleton';

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  [key: string]: any; 
}

function DashboardContent() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserProfile(userDocSnap.data() as UserProfile);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const defaultTab = (tab === 'history' || tab === 'impact') ? tab : 'schedule';

  if (loading) {
    return (
        <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
    )
  }

  if (!userProfile) {
    return (
        <div className="text-center">
            <p>Could not load user profile.</p>
            <Button asChild className="mt-4"><Link href="/login">Return to Login</Link></Button>
        </div>
    )
  }
  
  const avatarFallback = (userProfile.fullName.split(' ').map(n => n[0]).join('') || 'U').substring(0,2).toUpperCase();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profil Pengguna</CardTitle>
          <CardDescription>Kelola informasi profil dan pengaturan akun Anda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://placehold.co/100x100.png" alt={userProfile.fullName} data-ai-hint="user avatar" />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <Button variant="outline">Ganti Foto</Button>
          </div>
          <Separator />
          <form className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="flex items-center gap-2 mb-1"><User className="h-4 w-4 text-muted-foreground" /> Nama Lengkap</Label>
              <Input id="fullName" defaultValue={userProfile.fullName} />
            </div>
            <div>
              <Label htmlFor="email" className="flex items-center gap-2 mb-1"><Mail className="h-4 w-4 text-muted-foreground" /> Email</Label>
              <Input id="email" type="email" defaultValue={userProfile.email} disabled />
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center gap-2 mb-1"><Phone className="h-4 w-4 text-muted-foreground" /> Nomor Telepon</Label>
              <Input id="phone" type="tel" defaultValue={userProfile.phone} />
            </div>
            <div>
              <Label htmlFor="address" className="flex items-center gap-2 mb-1"><MapPin className="h-4 w-4 text-muted-foreground" /> Alamat</Label>
              <Input id="address" defaultValue={userProfile.address} />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Simpan Perubahan</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Dasbor Aktivitas</CardTitle>
            <CardDescription>Kelola penjemputan sampah dan lihat dampak lingkungan Anda.</CardDescription>
        </CardHeader>
        <CardContent>
             <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="schedule">Jadwalkan Penjemputan</TabsTrigger>
                <TabsTrigger value="history">Riwayat Penjemputan</TabsTrigger>
                <TabsTrigger value="impact">Ringkasan Dampak</TabsTrigger>
              </TabsList>
              <TabsContent value="schedule" className="mt-6">
                  <SchedulePickupForm />
              </TabsContent>
              <TabsContent value="history" className="mt-6">
                  <PickupHistory />
              </TabsContent>
              <TabsContent value="impact" className="mt-6">
                  <ImpactSummary />
              </TabsContent>
            </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <Button variant="outline" className="w-full justify-start">
             <KeyRound className="mr-2 h-4 w-4"/>
             <span>Ubah Password</span>
           </Button>
           <Button variant="destructive" asChild className="w-full justify-start">
            <Link href="/login">
                <LogOut className="mr-2 h-4 w-4"/>
                <span>Keluar</span>
            </Link>
           </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function UserDashboardPage() {
  return (
    <Suspense fallback={<div className="space-y-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-48 w-full" />
    </div>}>
      <DashboardContent />
    </Suspense>
  );
}
