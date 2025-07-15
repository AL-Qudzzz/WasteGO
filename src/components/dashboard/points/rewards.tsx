
"use client";

import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2 } from "lucide-react";

const availableRewards = [
    {
        title: "Voucher Belanja Indomaret",
        value: "Rp. 100.000",
        points: 10000,
        imageUrl: "https://i.imgur.com/7O5Dg7V.jpeg",
        imageHint: "indomaret logo"
    },
    {
        title: "Voucher Belanja Superindo",
        value: "Rp. 90.000",
        points: 9000,
        imageUrl: "https://i.imgur.com/yr63o8h.jpeg",
        imageHint: "superindo logo"
    },
    {
        title: "Voucher Belanja Alfamidi",
        value: "Rp. 100.000",
        points: 10000,
        imageUrl: "https://i.imgur.com/g8OTnhV.jpeg",
        imageHint: "alfamidi logo"
    },
    {
        title: "Voucher Belanja Tokopedia",
        value: "Rp. 80.000",
        points: 8000,
        imageUrl: "https://i.imgur.com/cQ8wQCr.jpeg",
        imageHint: "tokopedia logo"
    },
];

export function PointsRewards() {
    const { toast } = useToast();
    const { user, userData, refreshUserData } = useAuth();
    const [redeeming, setRedeeming] = useState<number | null>(null);

    const handleRedeem = async (points: number, title: string, index: number) => {
        if (!user || !userData) {
            toast({ variant: 'destructive', title: 'Error', description: 'Anda harus login untuk menukar poin.' });
            return;
        }

        if ((userData.points || 0) < points) {
            toast({ variant: 'destructive', title: 'Poin Tidak Cukup', description: 'Poin Anda tidak cukup untuk menukar hadiah ini.' });
            return;
        }

        setRedeeming(index);
        try {
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, {
                points: increment(-points)
            });
            await refreshUserData();
            toast({
                title: "Voucher Berhasil Ditukar!",
                description: `Anda telah berhasil menukar ${points} poin dengan ${title}.`,
            });
        } catch (error) {
            console.error("Redeem error:", error);
            toast({
                variant: 'destructive',
                title: 'Gagal Menukar',
                description: 'Terjadi kesalahan. Silakan coba lagi.'
            });
        } finally {
            setRedeeming(null);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">Tukar Poin</h3>
            <div className="grid grid-cols-2 gap-4">
                {availableRewards.map((reward, index) => (
                    <Card key={index} className="flex flex-col text-center shadow-md">
                        <CardHeader className="p-4 items-center">
                            <div className="relative w-24 h-12">
                                <Image
                                    src={reward.imageUrl}
                                    alt={reward.title}
                                    layout="fill"
                                    objectFit="contain"
                                    data-ai-hint={reward.imageHint}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 flex-grow">
                            <CardDescription className="text-foreground font-medium text-sm">{reward.title}</CardDescription>
                            <p className="font-bold text-primary mt-1">{reward.value}</p>
                        </CardContent>
                        <CardFooter className="p-2">
                             <Button
                                className="w-full"
                                onClick={() => handleRedeem(reward.points, reward.title, index)}
                                disabled={redeeming === index || ((userData?.points || 0) < reward.points)}
                             >
                                {redeeming === index ? <Loader2 className="h-4 w-4 animate-spin" /> : `Tukar (-${reward.points})`}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
