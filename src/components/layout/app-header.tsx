'use client';

import Link from 'next/link';
import { Home, ClipboardList, Coins, Info, Leaf, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
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

export function AppHeader() {
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
            <header className="p-4 flex justify-between items-center bg-background border-b sticky top-0 z-10">
                <WasteGoLogo />
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="w-6 h-6"/>
                    </Button>
                </SheetTrigger>
            </header>

            <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-background p-0">
                <SheetHeader className="p-4 border-b">
                    <WasteGoLogo inSheet={true} />
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
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
