'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Phone, Star, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/bottom-nav';
import { AppHeader } from '@/components/layout/app-header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TrackPickupPage() {
    const router = useRouter();
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        const paymentCompleted = localStorage.getItem('paymentCompleted') === 'true';
        if (!paymentCompleted) {
            router.replace('/'); 
        } else {
            setIsAllowed(true);
        }
    }, [router]);

    if (!isAllowed) {
        return (
            <div className="flex flex-col min-h-screen bg-muted/20 text-foreground font-sans justify-center items-center">
                <p>Mengarahkan...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-muted/20 text-foreground font-sans">
            <AppHeader />
            <main className="flex-grow p-4 pb-24 overflow-y-auto">
                <Link href="/" className="flex items-center gap-2 mb-4 text-sm text-foreground font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                </Link>
                <div className="relative mb-6 pb-2">
                    <h1 className="text-2xl font-bold text-foreground">Lacak Penjemputan</h1>
                    <div className="absolute bottom-0 left-0 w-32 h-1 bg-primary rounded-full"></div>
                </div>

                <Card className="mb-6 shadow-md rounded-lg overflow-hidden">
                    <div className="relative h-64 w-full">
                        <Image src="https://i.imgur.com/3Z6gJ8N.png" alt="Peta Lokasi Kurir" layout="fill" objectFit="cover" data-ai-hint="map route" />
                    </div>
                    <CardContent className="p-4 bg-background">
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-semibold text-primary">Status: Sedang Dijalan</span>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="w-4 h-4" />
                                <span>Estimasi Tiba: 15 menit</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-md rounded-lg">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar className="w-16 h-16 border-2 border-primary">
                            <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="male courier" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>Joko Susilo</CardTitle>
                            <CardDescription>Kurir WasteGo</CardDescription>
                            <div className="flex items-center gap-1 mt-1 text-yellow-500">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="text-sm font-semibold text-foreground">4.8 (120 reviews)</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="text-sm text-muted-foreground">
                            <p>Plat Nomor: B 1234 XYZ</p>
                            <p>Jenis Kendaraan: Motor Bak Terbuka</p>
                        </div>
                        <Separator/>
                        <div className="flex gap-3">
                            <Button className="flex-1">
                                <Phone className="mr-2" /> Hubungi Kurir
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
            <BottomNav />
        </div>
    );
}
