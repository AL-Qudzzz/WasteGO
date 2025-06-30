import { LoginForm } from '@/components/auth/login-form';
import { Recycle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
       <div className="absolute top-4 left-4">
          <Button asChild variant="ghost">
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Recycle className="w-12 h-12 text-primary" />
          <h1 className="text-3xl font-bold text-primary mt-2">Welcome to WasteGo</h1>
          <p className="text-muted-foreground">Sign in to continue</p>
        </div>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="#" className="font-semibold text-primary hover:underline">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
