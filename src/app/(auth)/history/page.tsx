
'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle, Package, Star, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const completedPickups = [
    {
        id: 'WG-2024-001234',
        date: '16 Juli 2024',
        wasteType: 'Discard Furniture',
        points: 150,
        status: 'Selesai',
        courier: 'Joko Susilo'
    },
    {
        id: 'WG-2024-001211',
        date: '10 Juli 2024',
        wasteType: 'Used Cooking Oil',
        points: 50,
        status: 'Selesai',
        courier: 'Bambang P.'
    },
    {
        id: 'WG-2024-001198',
        date: '02 Juli 2024',
        wasteType: 'E-Waste',
        points: 200,
        status: 'Selesai',
        courier: 'Joko Susilo'
    }
];

export default function HistoryPage() {
    return (
        <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 mb-2 text-sm text-foreground font-medium">
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Home
            </Link>
            <div>
                <h1 className="text-2xl font-bold">Riwayat Penyaluran</h1>
                <p className="text-muted-foreground">Lihat riwayat semua penyaluran sampah Anda yang telah selesai.</p>
            </div>

            <div className="space-y-4">
                {completedPickups.map((pickup) => (
                    <Card key={pickup.id} className="shadow-md">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-base font-bold">ID: {pickup.id}</CardTitle>
                                    <CardDescription className="flex items-center gap-2 pt-1">
                                        <Calendar className="w-4 h-4" />
                                        {pickup.date}
                                    </CardDescription>
                                </div>
                                <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                                    <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                                    {pickup.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Separator />
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Package className="w-4 h-4" />
                                    <span>Jenis Sampah</span>
                                </div>
                                <span className="font-medium text-foreground">{pickup.wasteType}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span>Poin Didapat</span>
                                </div>
                                <span className="font-medium text-primary">+{pickup.points} Poin</span>
                            </div>
                             <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <span className="font-medium">Kurir:</span>
                                </div>
                                <span className="font-medium text-foreground">{pickup.courier}</span>
                            </div>
                            <Button variant="outline" className="w-full mt-2">
                                Lihat Detail
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

