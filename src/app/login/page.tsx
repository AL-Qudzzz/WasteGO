import { LoginForm } from '@/components/auth/login-form';
import { Leaf } from 'lucide-react';
import { BottomNav } from '@/components/layout/bottom-nav';

const WasteGoLogo = () => (
    <div className="flex items-center gap-1">
        <span className="text-4xl font-bold text-white">Waste</span>
        <span className="text-4xl font-bold text-white flex items-center">
            GO
            <Leaf className="w-6 h-6 text-white -ml-2.5 -mt-4 transform -scale-x-100" strokeWidth={3} />
        </span>
    </div>
);

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
      <BottomNav />
    </div>
  );
}
