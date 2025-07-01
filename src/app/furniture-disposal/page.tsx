'use client';

import Link from 'next/link';
import { ArrowLeft, Menu, Leaf, Info, Camera, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { BottomNav } from '@/components/layout/bottom-nav';

const WasteGoLogo = () => (
    <div className="flex items-center gap-1">
        <span className="text-3xl font-bold text-foreground">Waste</span>
        <span className="text-3xl font-bold text-primary flex items-center">
            GO
            <Leaf className="w-5 h-5 text-primary -ml-2 -mt-3 transform -scale-x-100" strokeWidth={3} />
        </span>
    </div>
);

export default function FurnitureDisposalPage() {
    const { toast } = useToast();
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        toast({
            title: "Data Terkirim!",
            description: "Terima kasih, data furniture Anda telah berhasil dikirim.",
        });
        (event.target as HTMLFormElement).reset();
    };

    return (
        <div className="flex flex-col min-h-screen bg-muted/20 text-foreground font-sans">
            <header className="p-4 flex justify-between items-center bg-background border-b sticky top-0 z-10">
                <WasteGoLogo />
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="w-6 h-6"/>
                </Button>
            </header>

            <main className="flex-grow p-4 pb-24 overflow-y-auto">
                <Link href="/house-waste" className="flex items-center gap-2 mb-4 text-sm text-foreground font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                </Link>
                <h1 className="text-2xl font-bold text-foreground mb-4">Discarded Furniture</h1>

                <Card className="bg-card shadow-lg rounded-2xl">
                    <CardContent className="p-4 sm:p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Alert className="bg-primary/10 border-primary/20">
                                <Info className="h-5 w-5 text-primary" />
                                <AlertTitle className="font-bold text-primary">Informasi Penting</AlertTitle>
                                <AlertDescription className="text-primary/90">
                                    Furnitur seperti kursi, meja, atau kasur akan ditangani melalui layanan khusus. Harap pastikan dalam kondisi kering dan siap diangkut (tidak terurai atau berantakan).
                                </AlertDescription>
                            </Alert>

                            <div className="space-y-2">
                                <Label htmlFor="address" className="font-semibold text-foreground">Alamat Penjemputan *</Label>
                                <Textarea id="address" placeholder="Masukkan alamat lengkap Anda" required className="bg-background" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="photo-upload" className="font-semibold text-foreground">Upload foto furniture tidak layak</Label>
                                <div 
                                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer hover:border-primary"
                                    onClick={() => document.getElementById('photo-upload-input')?.click()}
                                >
                                    <div className="space-y-1 text-center">
                                        <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                                        <p className="text-sm text-primary font-semibold">
                                            Klik untuk upload foto
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Format: JPG, PNG (Max 5MB)
                                        </p>
                                    </div>
                                </div>
                                <Input id="photo-upload-input" type="file" accept="image/jpeg,image/png" className="hidden" />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="dimensions" className="font-semibold text-foreground">Dimensi furniture ( p x l x t cm ) *</Label>
                                <Input id="dimensions" placeholder="Contoh: 90 x 120 x 150 cm" required className="bg-background" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="font-semibold text-foreground">Deskripsi Mebel *</Label>
                                <Textarea id="description" placeholder="Deskripsikan kondisi mebel Anda..." required className="bg-background" />
                            </div>

                            <div className="flex flex-col gap-3 pt-4">
                                <Button type="button" variant="secondary" className="bg-muted hover:bg-muted/90">Batal</Button>
                                <Button type="submit" className="bg-primary hover:bg-primary/90">Kirim Data</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
            <BottomNav />
        </div>
    );
}