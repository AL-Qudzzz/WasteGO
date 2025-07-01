"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Eye, EyeOff, Phone, MapPin, Loader2, Briefcase, FileText, Globe, UploadCloud, FileCheck2, X } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '@/lib/firebase';

export function SignupCompanyForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [nib, setNib] = useState('');
  const [website, setWebsite] = useState('');
  const [companyProfileFile, setCompanyProfileFile] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({ variant: "destructive", title: "File terlalu besar", description: "Silakan unggah file yang lebih kecil dari 10MB." });
        return;
      }
      setCompanyProfileFile(file);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const companyDocRef = doc(db, "companies", user.uid);
      await setDoc(companyDocRef, {
        uid: user.uid,
        username,
        email,
        companyName,
        phone,
        address,
        postalCode,
        nib,
        website,
        companyProfileUrl: '', // Initialize as empty
        role: 'company',
        createdAt: new Date(),
      });
      
      if (companyProfileFile) {
        const storageRef = ref(storage, `company_profiles/${user.uid}/${companyProfileFile.name}`);
        await uploadBytes(storageRef, companyProfileFile);
        const downloadURL = await getDownloadURL(storageRef);
        await updateDoc(companyDocRef, {
          companyProfileUrl: downloadURL
        });
      }

      toast({
        title: "Pendaftaran Berhasil",
        description: "Akun perusahaan Anda telah dibuat.",
      });
      router.push('/dashboard');

    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        variant: "destructive",
        title: "Pendaftaran Gagal",
        description: error.message || "Terjadi kesalahan tak terduga.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Perusahaan</h1>
        <p className="text-muted-foreground text-sm mt-1">Buat akun Perusahaan Anda untuk mulai mengelola sampah dengan mudah</p>
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
          <Label htmlFor="companyName">Nama Resmi Perusahaan *</Label>
          <div className="relative">
             <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Input id="companyName" type="text" placeholder="Masukkan nama lengkap Anda" required className="pl-10" value={companyName} onChange={(e) => setCompanyName(e.target.value)} disabled={isLoading} />
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
          <Label htmlFor="address">Kantor Pusat/Cabang *</Label>
          <div className="relative">
             <MapPin className="absolute left-3 top-4 h-5 w-5 text-muted-foreground" />
             <Textarea id="address" placeholder="Masukkan alamat lengkap" required className="pl-10 min-h-[100px] pt-3" value={address} onChange={(e) => setAddress(e.target.value)} disabled={isLoading} />
          </div>
        </div>
         <div className="space-y-2">
          <Label htmlFor="postalCode">Kode Pos *</Label>
          <div className="relative">
             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Input id="postalCode" type="text" placeholder="Masukkan kode pos Anda" required className="pl-10" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} disabled={isLoading}/>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="nib">Nomor Induk Berusaha (NIB) *</Label>
          <div className="relative">
             <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Input id="nib" type="text" placeholder="Masukkan NIB Anda" required className="pl-10" value={nib} onChange={(e) => setNib(e.target.value)} disabled={isLoading} />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Profile Perusahaan</Label>
          <p className="text-xs text-muted-foreground">Unggah dokumen pendukung yang berisi profile atau dokumentasi perusahaan untuk melengkapi registrasi</p>
          {!companyProfileFile ? (
            <div className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                    <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="mb-1 text-sm text-muted-foreground"><span className="font-semibold">Klik untuk upload</span> atau drag & drop</p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, JPG, PNG (Max. 10MB)</p>
                </div>
                <Input 
                  id="company-profile" 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  disabled={isLoading}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
            </div>
          ) : (
            <div className="flex items-center justify-between w-full p-3 border rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                    <FileCheck2 className="w-6 h-6 text-primary" />
                    <span className="text-sm font-medium truncate">{companyProfileFile.name}</span>
                </div>
                <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="w-8 h-8 text-muted-foreground hover:text-destructive"
                    onClick={() => {
                        setCompanyProfileFile(null);
                        const fileInput = document.getElementById('company-profile') as HTMLInputElement;
                        if(fileInput) fileInput.value = '';
                    }}
                    disabled={isLoading}
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>
          )}
        </div>
         <div className="space-y-2">
          <Label htmlFor="website">Website Perusahaan</Label>
          <div className="relative">
             <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <Input id="website" type="url" placeholder="https://www.perusahaan.com" className="pl-10" value={website} onChange={(e) => setWebsite(e.target.value)} disabled={isLoading} />
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
    </>
  );
}