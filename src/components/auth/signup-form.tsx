
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Eye, EyeOff, Phone, MapPin, Briefcase, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';


const GoogleIcon = () => (
    <svg role="img" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.84-4.21 1.84-3.57 0-6.47-2.9-6.47-6.47s2.9-6.47 6.47-6.47c1.93 0 3.28.77 4.21 1.62l2.6-2.6C16.92 3.96 14.91 3 12.48 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c2.75 0 4.97-1.15 6.64-2.84 1.73-1.73 2.5-4.25 2.5-6.85 0-.58-.05-1.15-.15-1.72H12.48z" fill="#4285F4"/></svg>
)

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
)

export function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        username,
        email,
        fullName,
        phone,
        address,
        postalCode,
        role: 'user', // default role
        points: 0, // Initialize points
        createdAt: new Date(),
      });
      
      toast({
        title: "Signup Successful",
        description: "Your account has been created.",
      });
      router.push('/dashboard');

    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Pribadi</h1>
        <p className="text-muted-foreground text-sm mt-1">Buat akun pribadi Anda untuk mulai mengelola sampah dengan mudah</p>
      </div>
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username *</Label>
          <div className="relative">
             <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Input id="username" type="text" placeholder="Masukkan username Anda" required className="pl-10" value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <div className="relative">
             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Input id="email" type="email" placeholder="Masukkan email Anda" required className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <div className="relative">
             <Input id="password" type={showPassword ? "text" : "password"} placeholder="Masukkan password Anda" required className="pl-10 pr-10" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
             <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" aria-label="Toggle password visibility">
              {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="fullName">Nama Lengkap *</Label>
          <div className="relative">
             <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Input id="fullName" type="text" placeholder="Masukkan nama lengkap Anda" required className="pl-10" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={isLoading} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Nomor Telepon *</Label>
          <div className="relative">
             <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Input id="phone" type="tel" placeholder="Masukkan nomor telepon Anda" required className="pl-10" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isLoading}/>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Alamat Lengkap *</Label>
          <div className="relative">
             <MapPin className="absolute left-3 top-4 h-5 w-5 text-muted-foreground" />
             <Textarea id="address" placeholder="" required className="pl-10 min-h-[100px] pt-3" value={address} onChange={(e) => setAddress(e.target.value)} disabled={isLoading} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Kode Pos *</Label>
          <div className="relative">
             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Input id="postalCode" type="text" placeholder="Masukkan kode pos Anda" required className="pl-10" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} disabled={isLoading}/>
          </div>
        </div>
        <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="terms" required disabled={isLoading} />
            <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">Saya setuju dengan syarat dan ketentuan</Label>
        </div>
        <Button type="submit" className="w-full text-base font-bold py-6 rounded-lg" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Daftar
        </Button>
      </form>
       <p className="mt-6 text-center text-sm text-muted-foreground">
          Sudah punya akun?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Masuk sekarang
          </Link>
        </p>

        <div className="flex items-center my-6">
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink mx-4 text-xs text-muted-foreground">atau daftar dengan</span>
            <div className="flex-grow border-t border-border"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2" disabled={isLoading}>
                <GoogleIcon />
                <span>Google</span>
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 text-[#1877F2]" disabled={isLoading}>
                <FacebookIcon />
                <span>Facebook</span>
            </Button>
        </div>
    </>
  );
}
