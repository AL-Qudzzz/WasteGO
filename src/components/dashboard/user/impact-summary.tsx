
"use client";

import { useFormStatus } from "react-dom";
import { getImpactSummary } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Leaf, Trees, Droplets, Zap, Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  message: "",
  summary: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Menghasilkan...
        </>
      ) : (
        <>
          <Leaf className="mr-2 h-4 w-4" />
          Hasilkan Ringkasan Dampak Saya
        </>
      )}
    </Button>
  );
}

const stats = [
    { name: "Pohon Terselamatkan", value: "12", icon: Trees, color: "text-green-600" },
    { name: "Air Terhemat", value: "3,000L", icon: Droplets, color: "text-blue-500" },
    { name: "Energi Terhemat", value: "600 kWh", icon: Zap, color: "text-yellow-500" },
]

export function ImpactSummary() {
  const [state, formAction] = useActionState(getImpactSummary, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== "success") {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map(stat => (
                <div key={stat.name} className="p-2 rounded-lg bg-gray-50">
                    <stat.icon className={`h-6 w-6 mx-auto ${stat.color}`} />
                    <p className="text-sm font-semibold mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.name}</p>
                </div>
            ))}
        </div>
      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="totalWeight">Total Berat Daur Ulang (kg)</Label>
          <Input
            id="totalWeight"
            name="totalWeight"
            type="number"
            defaultValue="120"
            required
            className="mt-1"
          />
        </div>
        <SubmitButton />
      </form>

      {state.summary && (
        <Alert className="bg-primary/10 border-primary/20">
          <Leaf className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary font-bold">Ringkasan Dampak Anda</AlertTitle>
          <AlertDescription className="text-primary/80">
            {state.summary}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
