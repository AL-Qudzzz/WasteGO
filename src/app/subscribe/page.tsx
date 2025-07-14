
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { BottomNav } from '@/components/layout/bottom-nav';

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

export default function SubscribePage() {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState('basic');
    
    const handleLater = () => {
        router.push('/track-pickup');
    };

    const currentPlan = subscriptionPlans.find(p => p.id === selectedPlan);
    const discountedPrice = currentPlan ? currentPlan.price * 0.7 : 0;
    
    return (
        <div className="flex flex-col min-h-screen bg-muted/20">
             <header className="p-4 flex justify-between items-center bg-background border-b sticky top-0 z-10">
                <div className="flex items-center gap-1">
                    <span className="text-3xl font-bold text-foreground">Waste</span>
                    <span className="text-3xl font-bold text-primary flex items-center">GO</span>
                </div>
                 <Button variant="ghost" size="icon" asChild>
                    <Link href="/"><X className="w-6 h-6"/></Link>
                </Button>
            </header>
            <main className="flex-grow p-4 pb-32 overflow-y-auto">
                <Button variant="ghost" className="mb-4 pl-0" onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali
                </Button>

                 <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/20 p-3 rounded-full">
                        <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-foreground">Berlangganan WasteGO</h1>
                        <p className="text-sm text-muted-foreground">Nikmati layanan premium</p>
                    </div>
                </div>

                <Card className="bg-green-50 border-green-200 text-green-800 mb-6">
                    <CardContent className="p-4">
                        <Badge variant="secondary" className="bg-green-200 text-green-900 mb-2">PENAWARAN TERBATAS</Badge>
                        <h3 className="font-bold text-lg">Diskon 30% untuk 3 bulan pertama!</h3>
                        <p className="text-sm">Hemat lebih banyak dengan berlangganan sekarang</p>
                    </CardContent>
                </Card>

                <h2 className="font-bold text-lg mb-4">Pilih Paket Berlangganan</h2>

                <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
                    {subscriptionPlans.map(plan => (
                        <Label key={plan.id} htmlFor={plan.id} className={`block p-4 rounded-lg border-2 cursor-pointer ${selectedPlan === plan.id ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
                            <div className="flex items-start">
                                <RadioGroupItem value={plan.id} id={plan.id} className="mr-4 mt-1" />
                                <div className="flex-grow">
                                    <div className="flex justify-between items-baseline">
                                        <div>
                                            <p className="font-bold">{plan.name}</p>
                                            <p className="text-xs text-muted-foreground">{plan.period}</p>
                                        </div>
                                        <p className="font-bold text-lg text-primary">
                                            Rp{plan.price.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                    <ul className="mt-4 space-y-2 text-sm">
                                        {plan.features.map(feature => (
                                            <li key={feature} className="flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4 text-primary" />
                                                <span className="text-muted-foreground">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Label>
                    ))}
                </RadioGroup>

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Keuntungan Berlangganan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {subscriptionBenefits.map(benefit => (
                            <div key={benefit.title} className="flex items-start gap-3">
                                <div className="flex-shrink-0 bg-primary/20 text-primary p-2 rounded-full">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold">{benefit.title}</h4>
                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-10 pb-24 md:pb-4">
                 <div className="p-4 rounded-lg border bg-muted mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total Pembayaran</span>
                        <div className="text-right">
                           {currentPlan && currentPlan.price !== discountedPrice && (
                             <p className="text-sm text-muted-foreground line-through">Rp{currentPlan.price.toLocaleString('id-ID')}</p>
                           )}
                           <p className="text-2xl font-bold text-primary flex items-center gap-2">
                            Rp{discountedPrice.toLocaleString('id-ID')}
                            {currentPlan && currentPlan.price !== discountedPrice && <Badge className="bg-green-200 text-green-800">-30%</Badge>}
                           </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="lg" onClick={handleLater}>Nanti Saja</Button>
                    <Button size="lg">Berlangganan</Button>
                </div>
                 <p className="text-xs text-center text-muted-foreground mt-3">Dengan berlangganan, Anda menyetujui Syarat & Ketentuan</p>
            </footer>
            <BottomNav />
        </div>
    );
}
