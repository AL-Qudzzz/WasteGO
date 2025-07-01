import { SignupCompanyForm } from '@/components/auth/signup-company-form';
import { Leaf } from 'lucide-react';
import { BottomNav } from '@/components/layout/bottom-nav';

const WasteGoLogo = () => (
    <div className="flex items-center gap-1">
        <span className="text-3xl font-bold text-foreground">Waste</span>
        <span className="text-3xl font-bold text-foreground flex items-center">
            GO
            <Leaf className="w-5 h-5 text-primary -ml-2 -mt-3 transform -scale-x-100" strokeWidth={3} />
        </span>
    </div>
);

export default function SignupCompanyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      
      <header className="flex-shrink-0 flex flex-col items-center justify-center pt-12 pb-8 text-foreground">
        <WasteGoLogo />
      </header>

      <main className="flex-grow bg-background px-6 pt-2 pb-24 overflow-y-auto">
          <SignupCompanyForm />
      </main>

      <BottomNav />
    </div>
  );
}
