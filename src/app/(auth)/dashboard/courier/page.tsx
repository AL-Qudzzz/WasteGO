import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ListTodo,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const tasks = [
  {
    id: "TSK001",
    address: "123 Green St, Eco City",
    time: "10:00 AM - 12:00 PM",
    status: "Scheduled",
    contact: "John Doe",
    phone: "555-1234",
  },
  {
    id: "TSK002",
    address: "456 Recycle Ave, Metropolis",
    time: "1:00 PM - 3:00 PM",
    status: "Scheduled",
    contact: "Jane Smith",
    phone: "555-5678",
  },
  {
    id: "TSK003",
    address: "789 Nature Ln, Sustainability Town",
    time: "Completed at 9:30 AM",
    status: "Completed",
    contact: "Sam Wilson",
    phone: "555-9012",
  },
];

export default function CourierDashboardPage() {
  const activeTasks = tasks.filter((t) => t.status !== "Completed");
  const completedTasks = tasks.filter((t) => t.status === "Completed");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Today's Tasks</h1>
        <p className="text-muted-foreground">
          Here are your assigned pickups for today.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ListTodo className="h-6 w-6 text-primary" />
          Active Pickups ({activeTasks.length})
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {activeTasks.map((task) => (
            <Card key={task.id} className="bg-white">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Pickup #{task.id}</CardTitle>
                    <CardDescription>{task.contact}</CardDescription>
                  </div>
                  <Badge variant="default" className="bg-accent text-accent-foreground">
                    {task.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-1 text-muted-foreground" />
                  <span className="font-medium">{task.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>{task.time}</span>
                </div>
                 <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>{task.phone}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1">
                    <Truck className="mr-2 h-4 w-4" />
                    Start Pickup
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Navigate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-green-600" />
          Completed Pickups ({completedTasks.length})
        </h2>
        <Card className="bg-white">
          <CardContent className="p-0">
            <div className="divide-y">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-2"
                >
                  <div>
                    <p className="font-semibold">
                      #{task.id} - {task.address}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {task.time}
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                    Completed
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
