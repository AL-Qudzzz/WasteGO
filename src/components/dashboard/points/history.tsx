
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const pointHistory = [
    {
        description: 'Household Waste Collection',
        date: '2024-01-15',
        points: 150,
    },
    {
        description: 'Eco-friendly Water Bottle',
        date: '2024-01-14',
        points: -200,
    },
    {
        description: 'Factory Waste Disposal',
        date: '2024-01-13',
        points: 100,
    },
    {
        description: 'Food Waste Collection',
        date: '2024-01-12',
        points: 75,
    }
];

export function PointsHistory() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Riwayat Transaksi</h3>
            <div className="space-y-3">
                {pointHistory.map((item, index) => (
                    <Card key={index} className="shadow-sm">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className={cn(
                                "flex h-10 w-10 items-center justify-center rounded-full text-white",
                                item.points > 0 ? "bg-primary" : "bg-destructive"
                            )}>
                                <Star className="h-6 w-6 fill-current" />
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold text-sm">{item.description}</p>
                                <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                            <p className={cn(
                                "font-bold text-sm",
                                item.points > 0 ? "text-primary" : "text-destructive"
                            )}>
                                {item.points > 0 ? '+' : ''}{item.points.toLocaleString('id-ID')}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
