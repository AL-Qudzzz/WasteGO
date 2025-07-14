
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Calendar, ArrowLeft, CheckCircle, Info } from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as UICalendar } from '@/components/ui/calendar';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { addDays, format } from 'date-fns';

const scheduleOptions: { [key: string]: { label: string; pickups: number; period: 'week' | 'month' } } = {
    basic: { label: '1x per Minggu', pickups: 1, period: 'week' },
    premium: { label: '2x per Minggu', pickups: 2, period: 'week' },
    annual_basic: { label: '4x per Bulan', pickups: 4, period: 'month' },
    annual_pro: { label: '8x per Bulan', pickups: 8, period: 'month' },
};

export default function SchedulePage() {
    const router = useRouter();
    const { user, userData, loading } = useAuth();
    const { toast } = useToast();
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    
    const subscription = userData?.subscription;
    const planId = subscription?.planId;
    const planDetails = planId ? scheduleOptions[planId] : null;

    useEffect(() => {
        if (!loading && (!user || subscription?.status !== 'active')) {
            toast({
                variant: 'destructive',
                title: 'Akses Ditolak',
                description: 'Anda harus berlangganan untuk mengakses halaman ini.',
            });
            router.replace('/');
        }
    }, [user, loading, subscription, router, toast]);

    if (loading || !planDetails) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const handleDayClick = (day: Date) => {
        setSelectedDates(prev => {
            if (prev.some(d => d.getTime() === day.getTime())) {
                return prev.filter(d => d.getTime() !== day.getTime());
            }
            if (prev.length < planDetails.pickups) {
                return [...prev, day];
            }
            toast({
                variant: 'destructive',
                title: 'Batas Penjadwalan Tercapai',
                description: `Anda hanya dapat memilih ${planDetails.pickups} hari.`,
            });
            return prev;
        });
    };

    const handleSaveSchedule = () => {
        if (selectedDates.length !== planDetails.pickups) {
            toast({
                variant: 'destructive',
                title: 'Jadwal Belum Lengkap',
                description: `Harap pilih ${planDetails.pickups} hari untuk penjemputan.`,
            });
            return;
        }

        console.log('Jadwal disimpan:', selectedDates);
        toast({
            title: 'Jadwal Berhasil Disimpan!',
            description: 'Penjemputan Anda telah dikonfirmasi.',
        });
        router.push('/');
    };
    
    const today = new Date();
    const nextPeriod = planDetails.period === 'week' ? addDays(today, 7) : addDays(today, 30);

    return (
        <div className="space-y-6">
            <Link href="/dashboard" className="flex items-center gap-2 mb-2 text-sm text-foreground font-medium">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Dashboard
            </Link>
            <div>
                <h1 className="text-2xl font-bold">Atur Jadwal Penjemputan</h1>
                <p className="text-muted-foreground">Pilih hari untuk penjemputan sampah rutin Anda.</p>
            </div>

            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Paket Anda: {subscription?.planName}</CardTitle>
                    <CardDescription>
                        Anda memiliki jatah {planDetails.label}.
                        Pilih {planDetails.pickups} hari untuk periode {format(today, 'd MMM')} - {format(nextPeriod, 'd MMM yyyy')}.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-grow flex justify-center">
                            <UICalendar
                                mode="multiple"
                                min={planDetails.pickups}
                                max={planDetails.pickups}
                                selected={selectedDates}
                                onSelect={(dates) => setSelectedDates(dates || [])}
                                onDayClick={handleDayClick}
                                disabled={{ before: today }}
                                className="rounded-md border"
                            />
                        </div>
                        <div className="w-full md:w-1/3">
                            <h3 className="font-semibold mb-2">Hari Terpilih:</h3>
                            {selectedDates.length > 0 ? (
                                <ul className="space-y-2">
                                    {selectedDates.sort((a,b) => a.getTime() - b.getTime()).map((date, index) => (
                                        <li key={index} className="flex items-center gap-2 p-2 rounded-md bg-muted text-sm">
                                            <CheckCircle className="w-4 h-4 text-primary" />
                                            {format(date, 'EEEE, d MMMM yyyy')}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground">Belum ada tanggal yang dipilih.</p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Informasi Penjadwalan</AlertTitle>
                <AlertDescription>
                    Anda dapat mengubah jadwal ini kapan saja sebelum 24 jam dari tanggal penjemputan.
                </AlertDescription>
            </Alert>
            
            <Button
                className="w-full"
                onClick={handleSaveSchedule}
                disabled={selectedDates.length !== planDetails.pickups}
            >
                Simpan Jadwal ({selectedDates.length}/{planDetails.pickups})
            </Button>
        </div>
    );
}
