'use client';

import Link from 'next/link';
import { Leaf, ArrowLeft, Menu, Users, Target, Rocket, Home, ClipboardList, Coins, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from '@/context/auth-context';

const WasteGoLogo = ({ inSheet = false }: { inSheet?: boolean }) => (
    <div className="flex items-center gap-1">
        <span className={`font-bold text-foreground ${inSheet ? 'text-2xl' : 'text-3xl'}`}>Waste</span>
        <span className={`font-bold text-primary flex items-center ${inSheet ? 'text-2xl' : 'text-3xl'}`}>
            GO
            <Leaf className={`text-primary -ml-2 transform -scale-x-100 ${inSheet ? 'w-4 h-4 -mt-2.5' : 'w-5 h-5 -mt-3'}`} strokeWidth={3} />
        </span>
    </div>
);

const teamMembers = [
    { name: 'Andi Wijaya', role: 'CEO & Founder', imageHint: 'male ceo' },
    { name: 'Bunga Lestari', role: 'CTO & Co-Founder', imageHint: 'female cto' },
    { name: 'Cahyo Wibowo', role: 'COO', imageHint: 'male coo' },
];

export default function AboutUsPage() {
    const { user } = useAuth();
    const isLoggedIn = !!user;

    const navLinks = [
        { href: '/', icon: Home, label: 'Home' },
        { href: isLoggedIn ? '/submission-status' : '/login', icon: ClipboardList, label: 'Status' },
        { href: isLoggedIn ? '/dashboard/points' : '/login', icon: Coins, label: 'Poin' },
        { href: '/about-us', icon: Info, label: 'Tentang Kami' },
    ];

    return (
        <Sheet>
            <div className="flex flex-col min-h-screen bg-muted/20 text-foreground font-sans">
                <header className="p-4 flex justify-between items-center bg-background border-b sticky top-0 z-10">
                    <WasteGoLogo />
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="w-6 h-6"/>
                        </Button>
                    </SheetTrigger>
                </header>

                <main className="flex-grow p-4 pb-24 overflow-y-auto">
                    <Link href="/" className="flex items-center gap-2 mb-4 text-sm text-foreground font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        Kembali
                    </Link>
                    <div className="relative mb-6 pb-2">
                        <h1 className="text-2xl font-bold text-foreground">Tentang Kami</h1>
                        <div className="absolute bottom-0 left-0 w-24 h-1 bg-primary rounded-full"></div>
                    </div>
                    
                    <div className="space-y-6">
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle>Mengenal WasteGo</CardTitle>
                                <CardDescription>Solusi pengelolaan sampah yang inovatif dan bertanggung jawab untuk masa depan yang lebih hijau.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    WasteGo adalah platform yang didedikasikan untuk merevolusi cara kita mengelola sampah. Kami menghubungkan rumah tangga, perusahaan, dan komunitas dengan layanan pengumpulan yang efisien, sekaligus mempromosikan praktik daur ulang dan pengurangan sampah. Dengan teknologi, kami bertujuan untuk menciptakan ekosistem pengelolaan sampah yang transparan, menguntungkan, dan berkelanjutan.
                                </p>
                            </CardContent>
                        </Card>

                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Target className="w-8 h-8 text-primary" />
                                    <div>
                                        <CardTitle>Visi Kami</CardTitle>
                                        <CardDescription>Menjadi pelopor dalam ekonomi sirkular.</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    Menjadi platform pengelolaan sampah terdepan di Indonesia yang menginspirasi perubahan perilaku menuju gaya hidup nol sampah (zero-waste).
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Rocket className="w-8 h-8 text-primary" />
                                    <div>
                                        <CardTitle>Misi Kami</CardTitle>
                                        <CardDescription>Menyederhanakan & memberi insentif.</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                        <li>Menyediakan platform yang mudah diakses.</li>
                                        <li>Memberikan insentif bagi pengguna.</li>
                                        <li>Mengedukasi masyarakat tentang pentingnya daur ulang.</li>
                                        <li>Membangun kemitraan dengan pemangku kepentingan.</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="w-6 h-6 text-primary" />
                                    Tim Kami
                                </CardTitle>
                                <CardDescription>Orang-orang hebat di balik WasteGo.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {teamMembers.map((member, index) => (
                                    <div key={index} className="flex flex-col items-center text-center">
                                        <Avatar className="w-24 h-24 mb-3 border-2 border-primary">
                                            <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint={member.imageHint} />
                                            <AvatarFallback>{member.name.substring(0,2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <h4 className="font-semibold text-foreground">{member.name}</h4>
                                        <p className="text-sm text-muted-foreground">{member.role}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </main>
                <BottomNav />
            </div>

            <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-background p-0">
                <SheetHeader className="p-4 border-b">
                    <WasteGoLogo inSheet={true} />
                </SheetHeader>
                <div className="p-4">
                    <nav className="flex flex-col gap-2">
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="flex items-center gap-3 p-3 rounded-lg text-lg font-medium text-foreground hover:bg-muted"
                            >
                                <link.icon className="w-6 h-6 text-primary" />
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
    );
}
