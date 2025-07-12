'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CheckCircle, QrCode, Landmark, Wallet, Truck, Coins, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { BottomNav } from '@/components/layout/bottom-nav';
import { AppHeader } from '@/components/layout/app-header';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';


const paymentMethods = [
    { id: 'qris', label: 'QRIS', description: 'Scan QR Code untuk bayar', icon: <QrCode className="w-6 h-6 text-foreground" /> },
    { id: 'transfer', label: 'Transfer Bank', description: 'BCA, Mandiri, BNI, BRI', icon: <Landmark className="w-6 h-6 text-foreground" /> },
    { id: 'ewallet', label: 'E-Wallet', description: 'OVO, GoPay, DANA, ShopeePay', icon: <Wallet className="w-6 h-6 text-foreground" /> },
    { id: 'cod', label: 'COD', description: 'Bayar ditempat', icon: <Truck className="w-6 h-6 text-foreground" /> },
    { id: 'poin', label: 'Poin', description: 'Tukar dengan Poin Reward kamu', icon: <Coins className="w-6 h-6 text-foreground" /> },
]

export default function PaymentPage() {
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsSuccessModalOpen(true);
    };

    const handleBackToHome = () => {
        setIsSuccessModalOpen(false);
        router.push('/');
    };

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

                <Button onClick={handleSubmit} className="w-full h-12 text-lg mt-6">Bayar Sekarang</Button>
            </main>
            <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
                <DialogContent className="sm:max-w-md p-8 rounded-[5px]">
                    <div className="flex flex-col items-center text-center space-y-4">
                         <div className="bg-primary/10 text-primary rounded-full p-4">
                            <CheckCircle className="h-16 w-16" />
                        </div>
                        <DialogHeader className="space-y-2">
                            <DialogTitle className="text-2xl font-bold text-foreground">Pembayaran Berhasil!</DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                            Terima kasih! Pembayaran Anda telah dikonfirmasi.
                            </DialogDescription>
                        </DialogHeader>
                        <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleBackToHome}>
                            Kembali ke Home
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
            <BottomNav />
        </div>
    );
}
