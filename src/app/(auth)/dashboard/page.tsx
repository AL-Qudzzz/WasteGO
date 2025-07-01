
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchedulePickupForm } from "@/components/dashboard/user/schedule-pickup-form";
import { PickupHistory } from "@/components/dashboard/user/pickup-history";
import { ImpactSummary } from "@/components/dashboard/user/impact-summary";

function DashboardContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const defaultTab = (tab === 'history' || tab === 'impact') ? tab : 'schedule';

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="schedule">Jadwalkan Penjemputan</TabsTrigger>
        <TabsTrigger value="history">Riwayat Penjemputan</TabsTrigger>
        <TabsTrigger value="impact">Ringkasan Dampak</TabsTrigger>
      </TabsList>
      <TabsContent value="schedule" className="mt-6">
          <SchedulePickupForm />
      </TabsContent>
      <TabsContent value="history" className="mt-6">
          <PickupHistory />
      </TabsContent>
      <TabsContent value="impact" className="mt-6">
          <ImpactSummary />
      </TabsContent>
    </Tabs>
  );
}

export default function UserDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dasbor Pengguna</h1>
        <p className="text-muted-foreground">Kelola penjemputan sampah dan lihat dampak lingkungan Anda.</p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
