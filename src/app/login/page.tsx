import { LoginForm } from '@/components/auth/login-form';
import { Leaf, Home, MapPin, User } from 'lucide-react';
import Link from 'next/link';

const WasteGoLogo = () => (
    <div className="flex items-center gap-1">
        <span className="text-4xl font-bold text-white">Waste</span>
        <span className="text-4xl font-bold text-white flex items-center">
            GO
            <Leaf className="w-6 h-6 text-white -ml-2.5 -mt-4 transform -scale-x-100" strokeWidth={3} />
        </span>
    </div>
);

const bottomNavItems = [
    { icon: <Home className="w-6 h-6" />, label: 'Home', href: '/', active: false },
    { icon: <MapPin className="w-6 h-6" />, label: 'Location', href: '#', active: false },
    { icon: <User className="w-6 h-6" />, label: 'Profile', href: '/login', active: true },
];


export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-primary font-body">
      
      {/* Header section */}
      <header className="flex-shrink-0 flex flex-col items-center justify-end pt-12 pb-8 text-white">
        <WasteGoLogo />
      </header>

      {/* Form container */}
      <main className="flex-grow bg-background rounded-t-[40px] px-6 py-8 pb-24 overflow-y-auto">
          <LoginForm />
      </main>

      {/* Bottom Navigation */}
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
  );
}
