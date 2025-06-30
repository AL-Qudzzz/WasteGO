import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SchedulePickupForm } from "@/components/dashboard/user/schedule-pickup-form";
import { PickupHistory } from "@/components/dashboard/user/pickup-history";
import { ImpactSummary } from "@/components/dashboard/user/impact-summary";

export default function UserDashboardPage() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Schedule a New Pickup</CardTitle>
            <CardDescription>
              Fill out the form below to schedule a new waste pickup.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SchedulePickupForm />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pickup History</CardTitle>
            <CardDescription>
              View the status of your recent and ongoing pickups.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PickupHistory />
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Your Green Impact</CardTitle>
            <CardDescription>
              See how your recycling efforts are making a difference.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ImpactSummary />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
