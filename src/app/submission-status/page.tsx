'use client';

import Link from 'next/link';
import { ArrowLeft, Check, Circle, Clock, Info, Phone, Mail, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { AppHeader } from '@/components/layout/app-header';

const StatusStep = ({ icon, title, description, time, status, isLast, isCompleted, isInProgress }: { icon: React.ReactNode; title: string; description: string; time: string; status: string; isLast?: boolean; isCompleted?: boolean; isInProgress?: boolean; }) => (
    <div className="relative pl-12 pb-10 last:pb-0">
        {!isLast && <div className="absolute left-[19px] top-10 -bottom-2 w-0.5 bg-border" />}
        <div className="absolute left-0 top-0 flex items-center">
            <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 text-lg",
                isCompleted ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-border text-muted-foreground",
                isInProgress && "bg-amber-400 border-amber-500 text-white animate-pulse"
            )}>
                {icon}
            </div>
        </div>
        <div className="ml-4 pt-1">
            <h3 className="font-bold text-md text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
            <p className="text-sm text-muted-foreground mt-1">{time}</p>
            <Badge className={cn("mt-2 text-xs", 
                isCompleted && "bg-primary/20 text-primary border-transparent hover:bg-primary/20",
                isInProgress && "bg-amber-500/20 text-amber-700 border-transparent hover:bg-amber-500/20",
                !isCompleted && !isInProgress && "bg-gray-100 text-gray-500 border-transparent hover:bg-gray-100"
            )}>
                {isCompleted && <Check className="w-3.5 h-3.5 mr-1.5" />}
                {!isCompleted && <Circle className="w-2.5 h-2.5 mr-1.5 fill-current" />}
                {status}
            </Badge>
        </div>
    </div>
);


export default function SubmissionStatusPage() {
    
    const trackingSteps = [
        {
            icon: <Check className="w-6 h-6" />,
            title: 'Data Uploaded',
            description: 'Upload foto, berat, dan deskripsi makanan',
            time: '15 Desember 2024, 14:30 WIB',
            status: 'Selesai',
            isCompleted: true,
            isInProgress: false,
        },
        {
            icon: <Circle className="w-3 h-3 fill-current" />,
            title: 'Sedang Verifikasi',
            description: 'Tim kami sedang memverifikasi data yang dikirim',
            time: '15 Desember 2024, 14:45 WIB',
            status: 'Sedang Proses',
            isCompleted: false,
            isInProgress: true,
        },
        {
            icon: <span className="font-bold">3</span>,
            title: 'Menunggu Persetujuan',
            description: 'Notifikasi persetujuan akan dikirim',
            time: 'Menunggu',
            status: 'Menunggu',
            isCompleted: false,
            isInProgress: false,
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-muted/20 text-foreground font-sans">
            <AppHeader />
            <main className="flex-grow p-4 pb-24 overflow-y-auto">
                <Link href="/" className="flex items-center gap-2 mb-4 text-sm text-foreground font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                </Link>
                <div className="relative mb-6 pb-2">
                    <h1 className="text-2xl font-bold text-foreground">Status Pengajuan</h1>
                    <div className="absolute bottom-0 left-0 w-32 h-1 bg-primary rounded-full"></div>
                </div>

                <Card className="bg-card shadow-lg rounded-2xl mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Tracking Penyaluran Sampah</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground space-y-2 pt-0">
                        <div className="flex justify-between"><span>ID Penyaluran:</span> <span className="font-medium text-foreground">WG-2024-001234</span></div>
                        <div className="flex justify-between"><span>Jenis Sampah:</span> <span className="font-medium text-foreground">Inedible Food</span></div>
                        <div className="flex justify-between"><span>Estimasi Berat:</span> <span className="font-medium text-foreground">90×120×150 cm</span></div>
                    </CardContent>
                </Card>

                <div className="bg-card shadow-lg rounded-2xl p-6 mb-6">
                    {trackingSteps.map((step, index) => (
                         <StatusStep 
                            key={index}
                            icon={step.icon}
                            title={step.title}
                            description={step.description}
                            time={step.time}
                            status={step.status}
                            isCompleted={step.isCompleted}
                            isInProgress={step.isInProgress}
                            isLast={index === trackingSteps.length - 1} 
                        />
                    ))}
                </div>

                <Alert className="mb-6 bg-card border-border">
                    <Clock className="h-5 w-5 text-primary" />
                    <AlertTitle className="font-bold text-foreground">Estimasi Waktu</AlertTitle>
                    <AlertDescription className="text-muted-foreground">
                        Proses verifikasi membutuhkan waktu 2-4 jam kerja. Tim kami akan segera menghubungi Anda setelah verifikasi selesai.
                    </AlertDescription>
                </Alert>

                <Alert className="mb-6 bg-primary/10 border-primary/20">
                    <Info className="h-5 w-5 text-primary" />
                    <AlertTitle className="font-bold text-primary">Butuh Bantuan?</AlertTitle>
                    <AlertDescription className="text-primary/90 space-y-2">
                        <p>Hubungi tim customer service kami jika ada pertanyaan:</p>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>+62 812-3456-7890</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>support@wastego.id</span>
                        </div>
                    </AlertDescription>
                </Alert>

                <div className="space-y-3">
                    <Button className="w-full h-12 bg-primary hover:bg-primary/90">
                        <RefreshCw className="w-4 h-4 mr-2"/>
                        Refresh Status
                    </Button>
                    <Button variant="outline" className="w-full h-12">
                        Status Penjemputan & Penyaluran
                    </Button>
                </div>

            </main>
            <BottomNav />
        </div>
    );
}
