import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Phone, MapPin, KeyRound, LogOut } from "lucide-react";
import Link from "next/link";

// Mock user data. In a real app, this would be fetched from Firestore.
const userProfile = {
  fullName: "Household User",
  email: "user@wastego.com",
  phone: "081234567890",
  address: "123 Green St, Eco City, 12345",
  avatarUrl: "https://placehold.co/100x100.png",
  avatarFallback: "HU"
};

export default function UserProfilePage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profil Saya</CardTitle>
          <CardDescription>Kelola informasi profil dan pengaturan akun Anda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userProfile.avatarUrl} alt={userProfile.fullName} data-ai-hint="user avatar" />
              <AvatarFallback>{userProfile.avatarFallback}</AvatarFallback>
            </Avatar>
            <Button variant="outline">Ganti Foto</Button>
          </div>
          <Separator />
          <form className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="flex items-center gap-2 mb-1"><User className="h-4 w-4 text-muted-foreground" /> Nama Lengkap</Label>
              <Input id="fullName" defaultValue={userProfile.fullName} />
            </div>
            <div>
              <Label htmlFor="email" className="flex items-center gap-2 mb-1"><Mail className="h-4 w-4 text-muted-foreground" /> Email</Label>
              <Input id="email" type="email" defaultValue={userProfile.email} disabled />
            </div>
            <div>
              <Label htmlFor="phone" className="flex items-center gap-2 mb-1"><Phone className="h-4 w-4 text-muted-foreground" /> Nomor Telepon</Label>
              <Input id="phone" type="tel" defaultValue={userProfile.phone} />
            </div>
            <div>
              <Label htmlFor="address" className="flex items-center gap-2 mb-1"><MapPin className="h-4 w-4 text-muted-foreground" /> Alamat</Label>
              <Input id="address" defaultValue={userProfile.address} />
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
