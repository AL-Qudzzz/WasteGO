
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Star, Ticket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const availableRewards = [
    {
        icon: <ShoppingBag className="w-6 h-6 text-primary-foreground" />,
        title: "Voucher Diskon Toko A",
        description: "Diskon Rp 25.000 untuk semua produk",
        points: 500
    },
    {
        icon: <Ticket className="w-6 h-6 text-primary-foreground" />,
        title: "Voucher Nonton Bioskop",
        description: "1 Tiket nonton gratis di XXI",
        points: 750
    },
    {
        icon: <ShoppingBag className="w-6 h-6 text-primary-foreground" />,
        title: "Voucher Belanja Supermarket B",
        description: "Potongan harga Rp 50.000",
        points: 1000
    },
];

export function PointsRewards() {
    const { toast } = useToast();

    const handleRedeem = (points: number, title: string) => {
        // Here you would add logic to check if user has enough points
        // and deduct points from their account.
        toast({
            title: "Voucher Berhasil Ditukar!",
            description: `Anda telah berhasil menukar ${points} poin dengan ${title}.`,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tukarkan Poin Anda</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {availableRewards.map((reward, index) => (
                        <React.Fragment key={index}>
                            <div className="flex items-center gap-4">
                                <div className="bg-primary p-3 rounded-lg">
                                    {reward.icon}
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-semibold text-foreground">{reward.title}</h4>
                                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        <span className="font-bold text-sm text-primary">{reward.points} Poin</span>
                                    </div>
                                </div>
                                <Button size="sm" onClick={() => handleRedeem(reward.points, reward.title)}>
                                    Tukar
                                </Button>
                            </div>
                            {index < availableRewards.length - 1 && <Separator />}
                        </React.Fragment>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
