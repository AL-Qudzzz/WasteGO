
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, QrCode, Landmark, Wallet, Truck, Coins, Info, Star, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { BottomNav } from '@/components/layout/bottom-nav';
import { AppHeader } from '@/components/layout/app-header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { useAuth } from '@/context/auth-context';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';


const paymentMethods = [
    { id: 'qris', label: 'QRIS', description: 'Scan QR Code untuk bayar', icon: <QrCode className="w-6 h-6 text-foreground" /> },
    { id: 'transfer', label: 'Transfer Bank', description: 'BCA, Mandiri, BNI, BRI', icon: <Landmark className="w-6 h-6 text-foreground" /> },
    { id: 'ewallet', label: 'E-Wallet', description: 'OVO, GoPay, DANA, ShopeePay', icon: <Wallet className="w-6 h-6 text-foreground" /> },
    { id: 'cod', label: 'COD', description: 'Bayar ditempat', icon: <Truck className="w-6 h-6 text-foreground" /> },
    { id: 'poin', label: 'Poin', description: 'Tukar dengan Poin Reward kamu', icon: <Coins className="w-6 h-6 text-foreground" /> },
]

const POINTS_EARNED = 150;

export default function PaymentPage() {
    const router = useRouter();
    const { user, refreshUserData } = useAuth();
    const { toast } = useToast();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!user) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'You must be logged in to make a payment.',
            });
            return;
        }

        setIsProcessing(true);
        try {
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
                points: increment(POINTS_EARNED),
            });

            await refreshUserData();
            localStorage.setItem('paymentCompleted', 'true');
            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error("Payment error:", error);
            toast({
                variant: 'destructive',
                title: 'Payment Failed',
                description: 'Could not process your payment. Please try again.',
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleTrackPickup = () => {
        setIsSuccessModalOpen(false);
        router.push('/track-pickup');
    };

    const handleViewSubmissionStatus = () => {
        setIsSuccessModalOpen(false);
        router.push('/submission-status');
    }

    return (
        <div className="flex flex-col min-h-screen bg-muted/20 text-foreground font-sans">
            <AppHeader />
            <main className="flex-grow p-4 pb-24 overflow-y-auto">
                <Link href="/submission-status" className="flex items-center gap-2 mb-4 text-sm text-foreground font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                </Link>
                <div className="relative mb-6 pb-2">
                    <h1 className="text-2xl font-bold text-foreground">Pembayaran</h1>
                    <div className="absolute bottom-0 left-0 w-24 h-1 bg-primary rounded-full"></div>
                </div>

                <Card className="mb-6 shadow-md rounded-lg">
                    <CardHeader>
                        <CardTitle>Detail Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">ID Penyaluran :</span>
                            <span className="font-medium">WG-2024-001234</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Jenis Sampah :</span>
                            <span className="font-medium">Discard Furniture</span>
                        </div>
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Estimasi Dimensi :</span>
                            <span className="font-medium">90x120x150 cm</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center text-lg">
                            <span className="font-bold">Total Pembayaran:</span>
                            <span className="font-bold text-primary">Rp 100.000,00</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-md rounded-lg">
                    <CardHeader>
                        <CardTitle>Pilih Metode Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup defaultValue="qris" className="space-y-4">
                            {paymentMethods.map(method => (
                                <Label key={method.id} htmlFor={method.id} className="flex items-center p-4 rounded-lg border has-[:checked]:bg-primary/10 has-[:checked]:border-primary cursor-pointer transition-colors">
                                    <div className="bg-primary/20 p-2 rounded-md mr-4">
                                        {method.icon}
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-foreground">{method.label}</p>
                                        <p className="text-xs text-muted-foreground">{method.description}</p>
                                    </div>
                                    <RadioGroupItem value={method.id} id={method.id} />
                                </Label>
                            ))}
                        </RadioGroup>
                    </CardContent>
                </Card>

                <Alert className="mt-6 bg-primary/10 border-primary/20 text-primary">
                    <Info className="h-5 w-5" />
                    <AlertTitle className="font-semibold">Dapatkan Poin Reward!</AlertTitle>
                    <AlertDescription>
                        Setiap pembayaran Rp 1.000 = 1 poin. Tukarkan poin dengan voucher menarik!
                    </AlertDescription>
                </Alert>

                <Button onClick={handleSubmit} className="w-full h-12 text-lg mt-6" disabled={isProcessing}>
                    {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Bayar Sekarang
                </Button>
            </main>

            <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
                <DialogContent hideClose={false} className="sm:max-w-sm p-6 rounded-lg">
                     <div className="flex flex-col items-center text-center space-y-4">
                        <div className="bg-primary text-primary-foreground rounded-full p-3">
                            <CheckCircle className="h-10 w-10" />
                        </div>
                        <DialogHeader className="space-y-1">
                            <DialogTitle className="text-2xl font-bold text-foreground">Pembayaran Berhasil!</DialogTitle>
                            <DialogDescription className="text-muted-foreground text-base">
                                Transaksi Anda telah berhasil diproses
                            </DialogDescription>
                        </DialogHeader>

                        <Card className="bg-green-50 border-green-200 text-green-900 w-full text-center">
                            <CardContent className="p-4 space-y-2">
                                <div className="flex items-center justify-center gap-2">
                                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                                        <Star className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">Selamat!</p>
                                        <p className="text-sm">Anda mendapatkan</p>
                                    </div>
                                </div>
                                <p className="text-3xl font-bold">{POINTS_EARNED} <span className="text-xl">Poin</span></p>
                                <p className="text-xs text-muted-foreground">Poin telah ditambahkan ke akun Anda</p>
                            </CardContent>
                        </Card>
                        
                        <div className="w-full space-y-3 pt-2">
                             <Button className="w-full h-12" onClick={handleTrackPickup}>
                                Lacak Penjemputan
                            </Button>
                            <Button variant="outline" className="w-full h-12" onClick={handleViewSubmissionStatus}>
                                Lihat detail pemesanan
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            <BottomNav />
        </div>
    );
}
