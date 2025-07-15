
"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

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

    const handleRedeem = (points: number, title: string) => {
        // Here you would add logic to check if user has enough points
        // and deduct points from their account.
        toast({
            title: "Voucher Berhasil Ditukar!",
            description: `Anda telah berhasil menukar ${points} poin dengan ${title}.`,
        });
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
                                onClick={() => handleRedeem(reward.points, reward.title)}
                             >
                                Tukar
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
