
'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, KeyRound, LogOut, Star, Loader2 } from "lucide-react";
import Link from "next/link";
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/auth-context';
import { SubscribeDialog } from '@/app/subscribe/page';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

function DashboardContent() {
  const { user, userData: userProfile, loading, logout, refreshUserData } = useAuth();
  const { toast } = useToast();
  const [showSubscribe, setShowSubscribe] = useState(false);
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Show subscribe popup only once after login
    const hasSeenPopup = sessionStorage.getItem('hasSeenSubscribePopup');
    if (!loading && userProfile && !hasSeenPopup) {
      // Only show popup if user is NOT subscribed
      if (userProfile.subscription?.status !== 'active') {
          setShowSubscribe(true);
      }
      sessionStorage.setItem('hasSeenSubscribePopup', 'true');
    }
     // Clear the flag on logout
     return () => {
        if (!userProfile) {
            sessionStorage.removeItem('hasSeenSubscribePopup');
        }
     }
  }, [loading, userProfile]);
  
  useEffect(() => {
    if (userProfile) {
        setFullName(userProfile.fullName || '');
        setPhone(userProfile.phone || '');
        setAddress(userProfile.address || '');
    }
  }, [userProfile]);

  const handleSaveChanges = async () => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "You must be logged in to save changes.",
        });
        return;
    }
    
    setIsSaving(true);
    try {
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
            fullName,
            phone,
            address,
        });
        await refreshUserData();
        toast({
            title: "Success",
            description: "Profile updated successfully.",
        });
    } catch (error) {
       console.error("Error updating profile: ", error);
       toast({
            variant: "destructive",
            title: "Update Failed",
            description: "Could not update profile. Please try again.",
        });
    } finally {
        setIsSaving(false);
    }
  };

  if (loading) {
    return (
        <div className="space-y-6">
            <Skeleton className="h-64 w-full" />
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
  
  const avatarFallback = (userProfile.fullName?.split(' ').map(n => n[0]).join('') || 'U').substring(0,2).toUpperCase();
  const isSubscribed = userProfile.subscription?.status === 'active';

  return (
    <>
      <SubscribeDialog open={showSubscribe} onOpenChange={setShowSubscribe} />
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Profil Pengguna</CardTitle>
                    <CardDescription>Kelola informasi profil dan pengaturan akun Anda.</CardDescription>
                </div>
                {isSubscribed && (
                    <Badge variant="secondary" className="bg-yellow-200 text-yellow-800 border-yellow-300">
                        <Star className="w-3.5 h-3.5 mr-1.5" />
                        Subscribed
                    </Badge>
                )}
            </div>
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
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={isSaving} />
              </div>
              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-1"><Mail className="h-4 w-4 text-muted-foreground" /> Email</Label>
                <Input id="email" type="email" value={userProfile.email} disabled />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 mb-1"><Phone className="h-4 w-4 text-muted-foreground" /> Nomor Telepon</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isSaving} />
              </div>
              <div>
                <Label htmlFor="address" className="flex items-center gap-2 mb-1"><MapPin className="h-4 w-4 text-muted-foreground" /> Alamat</Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} disabled={isSaving} />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSaveChanges} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan Perubahan
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Akun</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             { !isSubscribed && (
                <Button className="w-full justify-start bg-primary hover:bg-primary/90" onClick={() => setShowSubscribe(true)}>
                    <Star className="mr-2 h-4 w-4" />
                    <span>Berlangganan Sekarang</span>
                </Button>
              )}
             <Button variant="outline" className="w-full justify-start">
               <KeyRound className="mr-2 h-4 w-4"/>
               <span>Ubah Password</span>
             </Button>
             <Button variant="destructive" onClick={logout} className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4"/>
              <span>Keluar</span>
             </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default function UserDashboardPage() {
  return (
    <Suspense fallback={<div className="space-y-6">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-48 w-full" />
    </div>}>
      <DashboardContent />
    </Suspense>
  );
}
