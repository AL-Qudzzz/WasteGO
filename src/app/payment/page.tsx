'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CreditCard, Landmark, Wallet, ShieldCheck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
                    <h1 className="text-2xl font-bold text-foreground">Payment</h1>
                    <div className="absolute bottom-0 left-0 w-24 h-1 bg-primary rounded-full"></div>
                </div>

                <Card className="mb-6 shadow-md">
                    <CardHeader>
                        <CardTitle>Ringkasan Pesanan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">ID Penyaluran</span>
                                <span className="font-medium">WG-2024-001234</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Jenis Sampah</span>
                                <span className="font-medium">Discard Furniture</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>Rp 50.000</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Pilih Metode Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="credit-card" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="credit-card"><CreditCard className="w-4 h-4 mr-2" />Kartu</TabsTrigger>
                                <TabsTrigger value="bank-transfer"><Landmark className="w-4 h-4 mr-2" />Transfer</TabsTrigger>
                                <TabsTrigger value="e-wallet"><Wallet className="w-4 h-4 mr-2" />E-Wallet</TabsTrigger>
                            </TabsList>
                            <TabsContent value="credit-card" className="mt-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-1">
                                        <Label htmlFor="card-number">Nomor Kartu</Label>
                                        <Input id="card-number" placeholder="0000 0000 0000 0000" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <Label htmlFor="expiry-date">Tanggal Kedaluwarsa</Label>
                                            <Input id="expiry-date" placeholder="MM/YY" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="cvv">CVV</Label>
                                            <Input id="cvv" placeholder="123" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="card-name">Nama Pemegang Kartu</Label>
                                        <Input id="card-name" placeholder="Nama lengkap Anda" />
                                    </div>
                                     <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
                                        <ShieldCheck className="w-5 h-5 text-primary" />
                                        <span>Pembayaran Anda aman dan terenkripsi.</span>
                                    </div>
                                </form>
                            </TabsContent>
                            <TabsContent value="bank-transfer" className="mt-6 text-center">
                                <p className="text-muted-foreground">Instruksi transfer bank akan ditampilkan di sini.</p>
                            </TabsContent>
                             <TabsContent value="e-wallet" className="mt-6 text-center">
                                <p className="text-muted-foreground">Opsi e-wallet akan ditampilkan di sini.</p>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                     <CardFooter>
                        <Button onClick={handleSubmit} className="w-full h-12 text-lg">Bayar Sekarang</Button>
                    </CardFooter>
                </Card>
            </main>
            <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
                <DialogContent className="sm:max-w-md p-8 rounded-lg">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="bg-primary text-primary-foreground rounded-full p-4">
                            <CheckCircle className="h-12 w-12" />
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
