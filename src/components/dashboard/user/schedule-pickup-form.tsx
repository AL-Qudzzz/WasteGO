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
      title: "Pickup Scheduled!",
      description: "Your waste pickup has been successfully scheduled. We will notify you with updates.",
    });
    (event.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="address" className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Pickup Address
        </Label>
        <Textarea
          id="address"
          placeholder="Enter your full address"
          required
          defaultValue="123 Green St, Eco City, 12345"
        />
      </div>

      <div className="space-y-2">
        <Label>Type of Waste</Label>
        <RadioGroup defaultValue="plastic" className="flex flex-wrap gap-4 pt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="plastic" id="plastic" />
            <Label htmlFor="plastic">Plastic</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paper" id="paper" />
            <Label htmlFor="paper">Paper</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="metal" id="metal" />
            <Label htmlFor="metal">Metal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="glass" id="glass" />
            <Label htmlFor="glass">Glass</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Other</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="weight" className="flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Estimated Weight (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            placeholder="e.g., 5"
            required
            min="1"
            defaultValue="5"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="photo" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Upload Photo
          </Label>
          <Input id="photo" type="file" />
        </div>
      </div>

      <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
        Schedule Pickup
      </Button>
    </form>
  );
}
