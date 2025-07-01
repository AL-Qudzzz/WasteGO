import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Briefcase, Mail, Phone, MapPin, KeyRound, LogOut, Globe, FileText } from "lucide-react";
import Link from "next/link";

// Mock company data. In a real app, this would be fetched from Firestore.
const companyProfile = {
  companyName: "PT Eco Solutions",
  email: "contact@ecosolutions.com",
  phone: "021-555-0123",
  address: "456 Industrial Park, Metropolis",
  website: "https://www.ecosolutions.com",
  nib: "1234567890123",
  avatarUrl: "https://placehold.co/100x100.png",
  avatarFallback: "ES"
};

export default function CompanyProfilePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profil Perusahaan</CardTitle>
          <CardDescription>Kelola informasi profil dan pengaturan akun perusahaan Anda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={companyProfile.avatarUrl} alt={companyProfile.companyName} data-ai-hint="company logo" />
              <AvatarFallback>{companyProfile.avatarFallback}</AvatarFallback>
            </Avatar>
            <Button variant="outline">Ganti Logo</Button>
          </div>
          <Separator />
          <form className="space-y-4">
            <div>
              <Label htmlFor="companyName" className="flex items-center gap-2 mb-1"><Briefcase className="h-4 w-4 text-muted-foreground" /> Nama Perusahaan</Label>
              <Input id="companyName" defaultValue={companyProfile.companyName} />
            </div>
            <div>
              <Label htmlFor="email" className="flex items-center gap-2 mb-1"><Mail className="h-4 w-4 text-muted-foreground" /> Email</Label>
              <Input id="email" type="email" defaultValue={companyProfile.email} disabled />
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center gap-2 mb-1"><Phone className="h-4 w-4 text-muted-foreground" /> Nomor Telepon</Label>
              <Input id="phone" type="tel" defaultValue={companyProfile.phone} />
            </div>
            <div>
              <Label htmlFor="address" className="flex items-center gap-2 mb-1"><MapPin className="h-4 w-4 text-muted-foreground" /> Alamat</Label>
              <Input id="address" defaultValue={companyProfile.address} />
            </div>
             <div>
              <Label htmlFor="website" className="flex items-center gap-2 mb-1"><Globe className="h-4 w-4 text-muted-foreground" /> Website</Label>
              <Input id="website" defaultValue={companyProfile.website} />
            </div>
             <div>
              <Label htmlFor="nib" className="flex items-center gap-2 mb-1"><FileText className="h-4 w-4 text-muted-foreground" /> NIB</Label>
              <Input id="nib" defaultValue={companyProfile.nib} disabled/>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Simpan Perubahan</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pengaturan Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
           <Button variant="outline" className="w-full justify-start">
             <KeyRound className="mr-2 h-4 w-4"/>
             <span>Ubah Password</span>
           </Button>
           <Button variant="destructive" asChild className="w-full justify-start">
            <Link href="/login">
                <LogOut className="mr-2 h-4 w-4"/>
                <span>Keluar</span>
            </Link>
           </Button>
        </CardContent>
      </Card>
    </div>
  );
}
