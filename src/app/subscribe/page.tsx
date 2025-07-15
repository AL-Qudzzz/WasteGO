

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, MapPin, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { useAuth } from '@/context/auth-context';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';


const subscriptionPlans = [
    {
        id: 'basic',
        name: 'Basic',
        price: 50000,
        originalPrice: 50000,
        period: 'Per bulan',
        features: ['Penjemputan 1x/minggu', 'Maksimal 10kg per penjemputan', 'Laporan bulanan', 'Support email']
    },
    {
        id: 'premium',
        name: 'Premium',
        price: 90000,
        originalPrice: 90000,
        period: 'Per bulan',
        features: ['Penjemputan 2x/minggu', 'Maksimal 10kg per penjemputan', 'Laporan real-time', 'Support prioritas', 'Reward poin']
    },
    {
        id: 'annual_basic',
        name: 'Tahunan Basic',
        price: 500000,
        originalPrice: 500000,
        period: 'Per tahun',
        features: ['Penjemputan 4x/bulan', 'Maksimal 10kg per penjemputan', 'Laporan real-time', 'Support prioritas', 'Hemat 17% dari bulanan']
    },
    {
        id: 'annual_pro',
        name: 'Tahunan Pro',
        price: 900000,
        originalPrice: 900000,
        period: 'Per tahun',
        features: ['Penjemputan 8x/bulan', 'Maksimal 10kg per penjemputan', 'Analytics lengkap', 'Support 24/7', 'Reward premium']
    }
];

const subscriptionBenefits = [
    { title: 'Penjemputan Terjadwal', description: 'Sampah dijemput sesuai jadwal tanpa perlu request' },
    { title: 'Tracking Real-time', description: 'Pantau status penjemputan dan penyaluran secara langsung' },
    { title: 'Maksimal 10kg per Penjemputan', description: 'Semua paket memiliki batas maksimal yang sama' },
    { title: 'Reward Poin', description: 'Dapatkan poin setiap penyaluran untuk ditukar hadiah' }
];

export function SubscribeDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const router = useRouter();
    const { user, refreshUserData } = useAuth();
    const { toast } = useToast();
    const [selectedPlan, setSelectedPlan] = useState('basic');
    const [isSubscribing, setIsSubscribing] = useState(false);


    const handleLater = () => {
        onOpenChange(false);
        if (localStorage.getItem('paymentCompleted')) {
             router.push('/track-pickup');
        }
    };
    
    const handleSubscribe = async () => {
        if (!user) {
            toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to subscribe.' });
            return;
        }
        setIsSubscribing(true);
        try {
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
                subscription: {
                    planId: selectedPlan,
                    planName: subscriptionPlans.find(p => p.id === selectedPlan)?.name,
                    status: 'active',
                    subscribedAt: new Date()
                }
            });

            await refreshUserData();

            toast({
                title: 'Berlangganan Berhasil!',
                description: `Anda sekarang berlangganan paket ${subscriptionPlans.find(p => p.id === selectedPlan)?.name}.`
            });
            onOpenChange(false);
            router.push('/schedule');
        } catch (error) {
            console.error("Subscription error: ", error);
            toast({
                variant: 'destructive',
                title: 'Gagal Berlangganan',
                description: 'Terjadi kesalahan. Silakan coba lagi.'
            });
        } finally {
            setIsSubscribing(false);
        }
    }

    const currentPlan = subscriptionPlans.find(p => p.id === selectedPlan);
    const discountedPrice = currentPlan ? currentPlan.price * 0.7 : 0;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md p-0 flex flex-col max-h-[90vh]">
                 <DialogHeader className="p-4 flex flex-row items-center gap-4 border-b">
                    <div className="bg-primary/20 text-primary p-3 rounded-full">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex-grow">
                        <DialogTitle className="text-lg font-bold text-left">Berlangganan WasteGO</DialogTitle>
                        <DialogDescription className="text-sm text-left">Nikmati layanan premium</DialogDescription>
                    </div>
                    <DialogClose asChild>
                         <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Tutup</span>
                        </Button>
                    </DialogClose>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <Card className="bg-green-50 border-green-200 text-green-800">
                        <CardContent className="p-4">
                            <Badge variant="secondary" className="bg-green-200 text-green-900 mb-2">PENAWARAN TERBATAS</Badge>
                            <h3 className="font-bold text-lg">Diskon 30% untuk 3 bulan pertama!</h3>
                            <p className="text-sm">Hemat lebih banyak dengan berlangganan sekarang</p>
                        </CardContent>
                    </Card>

                    <h2 className="font-bold text-lg">Pilih Paket Berlangganan</h2>

                    <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-3">
                        {subscriptionPlans.map(plan => (
                            <Label key={plan.id} htmlFor={plan.id} className={`block p-4 rounded-lg border-2 cursor-pointer ${selectedPlan === plan.id ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                                <div className="flex items-start">
                                    <RadioGroupItem value={plan.id} id={plan.id} className="mr-3 mt-1" />
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-baseline">
                                            <div>
                                                <p className="font-bold">{plan.name}</p>
                                                <p className="text-xs text-muted-foreground">{plan.period}</p>
                                            </div>
                                            <p className="font-bold text-md text-primary">
                                                Rp{plan.price.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                        <div className="mt-3 space-y-2">
                                            {plan.features.map((feature, index) => (
                                                <div key={index} className="flex items-center gap-2 text-sm">
                                                    <Check className="w-4 h-4 text-primary" />
                                                    <span className="text-muted-foreground">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Label>
                        ))}
                    </RadioGroup>

                     <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Keuntungan Berlangganan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {subscriptionBenefits.map(benefit => (
                                <div key={benefit.title} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 bg-primary/20 text-primary p-2 rounded-full">
                                        <CheckCircle className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-sm">{benefit.title}</h4>
                                        <p className="text-xs text-muted-foreground">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                 <footer className="bg-background border-t p-4 z-10 shrink-0">
                     <div className="p-3 rounded-lg border bg-muted mb-3">
                        <div className="flex justify-between items-center">
                            <span className="text-md font-bold">Total</span>
                            <div className="text-right">
                               {currentPlan && currentPlan.price !== discountedPrice && (
                                 <p className="text-xs text-muted-foreground line-through">Rp{currentPlan.price.toLocaleString('id-ID')}</p>
                               )}
                                <div className="text-xl font-bold text-primary flex items-center gap-2">
                                 Rp{discountedPrice.toLocaleString('id-ID')}
                                 {currentPlan && currentPlan.price !== discountedPrice && <Badge className="bg-green-200 text-green-800">-30%</Badge>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" size="lg" onClick={handleLater} disabled={isSubscribing}>Nanti Saja</Button>
                        <Button size="lg" onClick={handleSubscribe} disabled={isSubscribing}>
                            {isSubscribing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Berlangganan
                        </Button>
                    </div>
                 </footer>
            </DialogContent>
        </Dialog>
    );
}


// The full page is kept for the post-payment redirect flow.
export default function SubscribePage() {
    const [isDialogOpen, setIsDialogOpen] = useState(true);

    return <SubscribeDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />;
}
