
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PointsSummary } from "@/components/dashboard/points/summary";
import { PointsHistory } from "@/components/dashboard/points/history";
import { PointsRewards } from "@/components/dashboard/points/rewards";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function UserPointsPage() {
  return (
    <div className="space-y-6">
      <Link href="/" className="flex items-center gap-2 mb-2 text-sm text-foreground font-medium">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Home
      </Link>
      <div>
        <h1 className="text-2xl font-bold">Poin Anda</h1>
        <p className="text-muted-foreground">Kelola poin reward Anda dan tukarkan dengan hadiah menarik.</p>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Ringkasan</TabsTrigger>
          <TabsTrigger value="history">Riwayat</TabsTrigger>
          <TabsTrigger value="rewards">Hadiah</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="mt-6">
            <PointsSummary />
        </TabsContent>
        <TabsContent value="history" className="mt-6">
            <PointsHistory />
        </TabsContent>
        <TabsContent value="rewards" className="mt-6">
            <PointsRewards />
        </TabsContent>
      </Tabs>
    </div>
  );
}
