'use client';

import Link from 'next/link';
import { ArrowLeft, User, Phone, MapPin, Scale, Camera, Pencil, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
            title: "Penjemputan Terjadwal!",
            description: "Penjemputan furniture Anda telah berhasil dijadwalkan.",
        });
        (event.target as HTMLFormElement).reset();
    };

    return (
        <div className="flex flex-col min-h-screen bg-muted/20 text-foreground font-sans">
            <header className="p-4 flex justify-between items-center bg-background border-b sticky top-0 z-10">
                <WasteGoLogo />
            </header>
            <main className="flex-grow p-4 pb-24 overflow-y-auto">
                <Link href="/house-waste" className="flex items-center gap-2 mb-4 text-sm text-foreground font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali
                </Link>
                 <div className="relative mb-6 pb-2">
                    <h1 className="text-2xl font-bold text-foreground">Salurkan Furniture</h1>
                    <div className="absolute bottom-0 left-0 w-24 h-1 bg-primary rounded-full"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName" className="flex items-center gap-2"><User className="h-4 w-4" /> Nama Lengkap</Label>
                        <Input id="fullName" placeholder="Masukkan nama lengkap Anda" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2"><Phone className="h-4 w-4" /> Nomor Telepon</Label>
                        <Input id="phone" type="tel" placeholder="Masukkan nomor telepon Anda" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address" className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Alamat Penjemputan</Label>
                        <Textarea id="address" placeholder="Masukkan alamat lengkap Anda" required />
                    </div>
                    <div className="space-y-2">
                        <Label>Jenis Furniture</Label>
                        <RadioGroup defaultValue="table" className="grid grid-cols-2 gap-4 pt-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="table" id="table" />
                                <Label htmlFor="table">Meja</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="chair" id="chair" />
                                <Label htmlFor="chair">Kursi</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cabinet" id="cabinet" />
                                <Label htmlFor="cabinet">Lemari</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="other" id="other" />
                                <Label htmlFor="other">Lainnya</Label>
                            </div>
                        </RadioGroup>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="weight" className="flex items-center gap-2"><Scale className="h-4 w-4" /> Perkiraan Berat (kg)</Label>
                        <Input id="weight" type="number" placeholder="cth., 20" required min="1" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="photo" className="flex items-center gap-2"><Camera className="h-4 w-4" /> Foto Limbah</Label>
                        <div className="p-4 border rounded-lg bg-card flex flex-col md:flex-row items-center gap-4">
                            <div className="w-28 h-28 border-2 border-dashed rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                                <Camera className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Button type="button" variant="outline" onClick={() => document.getElementById('photo-upload')?.click()}>
                                    Upload Foto
                                </Button>
                                <Input id="photo-upload" type="file" accept="image/*" className="hidden"/>
                                <Button type="button" onClick={() => document.getElementById('photo-capture')?.click()}>
                                    Ambil Gambar
                                </Button>
                                <Input id="photo-capture" type="file" accept="image/*" capture="environment" className="hidden"/>
                            </div>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="notes" className="flex items-center gap-2"><Pencil className="h-4 w-4" /> Catatan Tambahan</Label>
                        <Textarea id="notes" placeholder="Tulis catatan jika ada..." />
                    </div>
                    <Button type="submit" className="w-full">Jadwalkan Penjemputan</Button>
                </form>
            </main>
            <BottomNav />
        </div>
    );
}
