
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PointsSummary } from "@/components/dashboard/points/summary";
import { PointsHistory } from "@/components/dashboard/points/history";
import { PointsRewards } from "@/components/dashboard/points/rewards";
import { ArrowLeft, Coins, Loader2 } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";


export default function UserPointsPage() {
  const { userData, loading } = useAuth();
  
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
      
      <Card className="bg-primary text-primary-foreground shadow-lg">
          <CardHeader>
              <div className="flex justify-between items-center">
                  <CardTitle className="text-primary-foreground">Total Poin</CardTitle>
                  <Coins className="w-6 h-6 text-primary-foreground/80"/>
              </div>
          </CardHeader>
          <CardContent>
              {loading ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : (
                <p className="text-4xl font-bold">
                  {(userData?.points || 0).toLocaleString('id-ID')}
                </p>
              )}
              <p className="text-sm text-primary-foreground/80 mt-1">Poin dapat ditukar dengan berbagai hadiah</p>
          </CardContent>
      </Card>

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
