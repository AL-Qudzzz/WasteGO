import {
  Home as HomeIcon,
  Factory,
  Trash2,
  HeartPulse,
  Recycle,
  Smartphone,
  Award,
  History,
  ChevronRight,
  MapPin,
  User,
  Leaf,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const WasteGoLogo = () => (
    <div className="flex items-center gap-1">
        <span className="text-3xl font-bold text-foreground">Waste</span>
        <span className="text-3xl font-bold text-foreground flex items-center">
            GO
            <Leaf className="w-5 h-5 text-primary -ml-2 -mt-3 transform -scale-x-100" strokeWidth={3} />
        </span>
    </div>
)

const categories = [
  { icon: <HomeIcon className="w-8 h-8 text-primary" />, label: 'Household Waste', href: '#' },
  { icon: <Factory className="w-8 h-8 text-primary" />, label: 'Factory Waste', href: '#' },
  { icon: <Trash2 className="w-8 h-8 text-primary" />, label: 'Food Waste', href: '#' },
  { icon: <HeartPulse className="w-8 h-8 text-primary" />, label: 'Medic Waste', href: '#' },
  { icon: <Recycle className="w-8 h-8 text-primary" />, label: 'Recycle', href: '#' },
  { icon: <Smartphone className="w-8 h-8 text-primary" />, label: 'Electronic Waste', href: '#' },
];

const menuItems = [
  { label: 'Scheduling', href: '/login' },
  { label: 'Achievment', href: '/login' },
  { label: 'About Us', href: '#' },
];

const bottomNavItems = [
    { icon: <HomeIcon className="w-6 h-6" />, label: 'Home', href: '/', active: true },
    { icon: <MapPin className="w-6 h-6" />, label: 'Location', href: '#', active: false },
    { icon: <User className="w-6 h-6" />, label: 'Profile', href: '/login', active: false },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
        <header className="p-4">
            <WasteGoLogo />
        </header>
        <main className="flex-grow px-4 pb-24">
            <div className="relative h-48 rounded-2xl overflow-hidden mb-6 shadow-md">
                <Image src="https://placehold.co/600x400.png" layout="fill" objectFit="cover" alt="Selamat Datang" data-ai-hint="recycling hands" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
                    <h2 className="text-white text-3xl font-bold">Selamat Datang!</h2>
                    <p className="text-white text-sm">Kelola sampah Anda dengan mudah dan dapatkan poin reward</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
                {categories.map((category, index) => (
                    <Link href={category.href} key={index}>
                        <Card className="bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors rounded-2xl">
                            <CardContent className="flex flex-col items-center justify-center p-2 text-center aspect-square">
                                <div className="bg-white rounded-full p-3 mb-2">
                                    {category.icon}
                                </div>
                                <span className="text-xs font-semibold leading-tight">{category.label}</span>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <Button variant="secondary" className="h-12 text-base font-semibold shadow-md rounded-lg">
                    <Award className="mr-2" /> Poin User
                </Button>
                <Button variant="secondary" className="h-12 text-base font-semibold shadow-md rounded-lg">
                    <History className="mr-2" /> View History
                </Button>
            </div>

            <div className="space-y-3">
                {menuItems.map((item, index) => (
                    <Link href={item.href} key={index} className="flex items-center justify-between bg-card text-card-foreground p-4 rounded-lg shadow-sm hover:bg-muted transition-colors">
                        <span className="font-semibold text-lg">{item.label}</span>
                        <ChevronRight className="w-6 h-6 text-muted-foreground"/>
                    </Link>
                ))}
            </div>
        </main>
        
        <footer className="fixed bottom-0 left-0 right-0 bg-nav-background text-nav-foreground shadow-t-lg z-50">
            <div className="flex justify-around items-center h-16">
                 {bottomNavItems.map((item, index) => (
                    <Link href={item.href} key={index} data-active={item.active} className="flex flex-col items-center justify-center text-xs text-center hover:text-white data-[active=true]:text-nav-active">
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}
            </div>
        </footer>
    </div>
  )
}
