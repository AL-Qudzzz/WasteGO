
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Gift, ArrowDownLeft, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const pointHistory = [
    {
        type: 'Penukaran',
        description: 'Voucher Belanja Indomaret',
        date: '16 Juli 2024',
        points: -10000,
        status: 'Berhasil'
    },
    {
        type: 'Pendapatan',
        description: 'Penyaluran Sampah #WG-2024-001234',
        date: '16 Juli 2024',
        points: 150,
        status: 'Berhasil'
    },
    {
        type: 'Penukaran',
        description: 'Voucher Belanja Tokopedia',
        date: '10 Juli 2024',
        points: -8000,
        status: 'Berhasil'
    },
    {
        type: 'Pendapatan',
        description: 'Penyaluran Sampah #WG-2024-001211',
        date: '10 Juli 2024',
        points: 50,
        status: 'Berhasil'
    }
];

export function PointsHistory() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Riwayat Transaksi</CardTitle>
                <CardDescription>Daftar semua transaksi poin Anda.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {pointHistory.map((item, index) => (
                        <div key={index}>
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-muted">
                                    {item.type === 'Penukaran' ? <Gift className="w-5 h-5 text-primary" /> : <ArrowDownLeft className="w-5 h-5 text-green-600" />}
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-sm">{item.description}</p>
                                    <p className="text-xs text-muted-foreground">{item.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className={cn(
                                        "font-bold text-sm",
                                        item.points > 0 ? "text-green-600" : "text-destructive"
                                    )}>
                                        {item.points > 0 ? '+' : ''}{item.points.toLocaleString('id-ID')} Poin
                                    </p>
                                    <Badge variant={item.status === 'Berhasil' ? 'default' : 'secondary'} className={cn(
                                        "text-xs mt-1",
                                        item.status === 'Berhasil' ? 'bg-green-100 text-green-800 border-transparent hover:bg-green-200' : ''
                                    )}>
                                        {item.status === 'Berhasil' ? <CheckCircle className="w-3 h-3 mr-1"/> : <Clock className="w-3 h-3 mr-1"/>}
                                        {item.status}
                                    </Badge>
                                </div>
                            </div>
                            {index < pointHistory.length - 1 && <Separator className="mt-4" />}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
