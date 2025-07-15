
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/bottom-nav';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AppHeader } from '@/components/layout/app-header';

const ProcessStep = ({ number, title, description, isLast }: { number: string; title: string; description: string; isLast?: boolean }) => (
  <div className="relative pl-16 pb-12 last:pb-0">
    <div className="absolute left-5 top-1 flex flex-col items-center h-full">
      <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold flex-shrink-0">
        {number}
      </div>
      {!isLast && <div className="w-px h-full bg-border mt-2" />}
    </div>
    <div className="pt-1">
      <h3 className="font-bold text-md text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);


export default function RecyclePage() {
    const processSteps = [
        { number: '1', title: 'Pengisian Data', description: 'Upload foto, berat, dan deskripsi limbah' },
        { number: '2', title: 'Verifikasi', description: 'Tim kami akan memverifikasi data yang dikirim' },
        { number: '3', title: 'Persetujuan', description: 'Notifikasi persetujuan akan dikirim' },
        { number: '4', title: 'Pembayaran', description: 'Proses pembayaran biaya operasional' },
        { number: '5', title: 'Penjemputan', description: 'Tim akan menjemput limbah sesuai jadwal' },
        { number: '6', title: 'Penyaluran', description: 'Limbah disalurkan ke tujuan yang tepat' }
    ];

    const wasteTypes = [
        {
            title: "Plastic Waste",
            description: "Limbah dari sisa kemasan dan botol plastik yang bila dipilah berdasarkan jenisnya dapat di daur ulang menjadi barang berguna.",
            imageUrl: "https://placehold.co/360x164.png",
            imageHint: "plastic bottles",
            info: "Limbah plastik akan kami salurkan ke mitra daur ulang kami. Harap pastikan limbah dalam keadaan bersih dan kering.",
            href: `/disposal-form?title=Plastic Waste&info=${encodeURIComponent("Limbah plastik akan kami salurkan ke mitra daur ulang kami. Harap pastikan limbah dalam keadaan bersih dan kering.")}&backUrl=/recycle`
        },
        {
            title: "Cardboard Waste",
            description: "Semua jenis limbah kardus dan kemasan kertas yang bisa menjadi produk daur ulang bernilai jika dipilah dan dikumpulkan.",
            imageUrl: "https://placehold.co/360x164.png",
            imageHint: "cardboard boxes",
            info: "Limbah kardus dan kertas akan kami salurkan ke mitra daur ulang kami. Pastikan limbah tidak basah atau terkontaminasi minyak.",
            href: `/disposal-form?title=Cardboard Waste&info=${encodeURIComponent("Limbah kardus dan kertas akan kami salurkan ke mitra daur ulang kami. Pastikan limbah tidak basah atau terkontaminasi minyak.")}&backUrl=/recycle`
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
                    <h1 className="text-2xl font-bold text-foreground">Recycle Waste</h1>
                    <div className="absolute bottom-0 left-0 w-24 h-1 bg-primary rounded-full"></div>
                </div>
                
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full md:max-w-xl lg:max-w-2xl mx-auto mb-6"
                >
                    <CarouselContent>
                        {wasteTypes.map((waste, index) => (
                            <CarouselItem key={index} className="basis-4/5 md:basis-1/2">
                                <Card className="overflow-hidden shadow-md h-full flex flex-col">
                                    <CardHeader className="p-0 relative h-32">
                                        <Image src={waste.imageUrl} alt={waste.title} layout="fill" objectFit="cover" data-ai-hint={waste.imageHint} />
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-2">
                                            <CardTitle className="text-white text-center text-lg leading-tight">{waste.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 space-y-3 flex-grow flex flex-col">
                                        <p className="text-center text-sm text-muted-foreground flex-grow">
                                           {waste.description}
                                        </p>
                                        <Button asChild className="w-full mt-auto">
                                            <Link href={waste.href}>Salurkan</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>


                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="text-center text-xl">Alur Proses Penyaluran</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {processSteps.map((step, index) => (
                            <ProcessStep 
                                key={step.number}
                                number={step.number} 
                                title={step.title} 
                                description={step.description}
                                isLast={index === processSteps.length - 1} 
                            />
                        ))}
                    </CardContent>
                </Card>
            </main>
            <BottomNav />
        </div>
    );
}
