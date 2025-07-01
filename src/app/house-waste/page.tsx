'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Leaf, ArrowLeft, Menu, ArrowDown } from 'lucide-react';
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
import React from 'react';

const WasteGoLogo = () => (
    <div className="flex items-center gap-1">
        <span className="text-3xl font-bold text-foreground">Waste</span>
        <span className="text-3xl font-bold text-primary flex items-center">
            GO
            <Leaf className="w-5 h-5 text-primary -ml-2 -mt-3 transform -scale-x-100" strokeWidth={3} />
        </span>
    </div>
);

const ProcessStep = ({ number, title, description }: { number: string; title: string; description: string; }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
            {number}
        </div>
        <div className="ml-4 pt-1">
            <h3 className="font-bold text-md text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
);


export default function HouseWastePage() {
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
            title: "Used Cooking Oil",
            description: "Minyak goreng sisa pemakaian Harus dikemas dengan aman dan tidak dibuang ke sembarang tempat seperti saluran air",
            imageUrl: "https://placehold.co/360x164.png",
            imageHint: "cooking oil"
        },
        {
            title: "Discarded Furniture",
            description: "Barang furnitur yang sudah tidak layak pakai memerlukan pengangkutan khusus dan dapat diarahkan ke proses daur ulang atau pemanfaatan kembali.",
            imageUrl: "https://placehold.co/360x164.png",
            imageHint: "discarded furniture"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-muted/20 text-foreground font-sans">
            <header className="p-4 flex justify-between items-center bg-background border-b sticky top-0 z-10">
                <WasteGoLogo />
                 <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="w-6 h-6"/>
                </Button>
            </header>
            <main className="flex-grow p-4 pb-24 overflow-y-auto">
                <Link href="/" className="flex items-center gap-2 mb-4 text-sm text-foreground font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                </Link>
                <div className="relative mb-6 pb-2">
                    <h1 className="text-2xl font-bold text-foreground">Household Waste</h1>
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
                                        <Button className="w-full mt-auto">Salurkan</Button>
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
                    <CardContent className="pt-6 px-4">
                        <div className="flex flex-col items-center">
                            {processSteps.map((step, index) => (
                                <React.Fragment key={step.number}>
                                    <div className='w-full'>
                                        <ProcessStep 
                                            number={step.number} 
                                            title={step.title} 
                                            description={step.description}
                                        />
                                    </div>
                                    {index < processSteps.length - 1 && (
                                        <ArrowDown className="w-6 h-6 text-muted-foreground my-4" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </main>
            <BottomNav />
        </div>
    );
}
