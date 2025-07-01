
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Camera, MapPin, Scale } from "lucide-react";

export function SchedulePickupForm() {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logic to handle form submission would go here
    toast({
      title: "Penjemputan Terjadwal!",
      description: "Penjemputan sampah Anda telah berhasil dijadwalkan. Kami akan memberitahu Anda dengan pembaruan.",
    });
    (event.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="address" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Alamat Penjemputan
        </Label>
        <Textarea
          id="address"
          placeholder="Masukkan alamat lengkap Anda"
          required
          defaultValue="123 Green St, Eco City, 12345"
        />
      </div>

      <div className="space-y-2">
        <Label>Jenis Limbah</Label>
        <RadioGroup defaultValue="plastic" className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="plastic" id="plastic" />
            <Label htmlFor="plastic">Plastik</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paper" id="paper" />
            <Label htmlFor="paper">Kertas</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="metal" id="metal" />
            <Label htmlFor="metal">Logam</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="glass" id="glass" />
            <Label htmlFor="glass">Kaca</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Lainnya</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="weight" className="flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Perkiraan Berat (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            placeholder="cth., 5"
            required
            min="1"
            defaultValue="5"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="photo" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Foto Limbah
          </Label>
          <Input id="photo" type="file" />
        </div>
      </div>

      <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
        Jadwalkan Penjemputan
      </Button>
    </form>
  );
}
