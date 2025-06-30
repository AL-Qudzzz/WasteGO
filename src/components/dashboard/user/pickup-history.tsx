import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, Truck } from "lucide-react";

const pickups = [
  {
    id: "PCK001",
    date: "2023-11-10",
    wasteType: "Plastic, Paper",
    status: "Completed",
  },
  {
    id: "PCK002",
    date: "2023-11-05",
    wasteType: "Metal",
    status: "Completed",
  },
  {
    id: "PCK003",
    date: "2023-11-12",
    wasteType: "Glass",
    status: "En Route",
  },
  {
    id: "PCK004",
    date: "2023-11-15",
    wasteType: "Plastic",
    status: "Scheduled",
  },
];

const statusConfig = {
    Completed: {
        icon: CheckCircle,
        color: "bg-green-100 text-green-800 border-green-200",
        iconColor: "text-green-600"
    },
    "En Route": {
        icon: Truck,
        color: "bg-blue-100 text-blue-800 border-blue-200 animate-pulse",
        iconColor: "text-blue-600"
    },
    Scheduled: {
        icon: Clock,
        color: "bg-amber-100 text-amber-800 border-amber-200",
        iconColor: "text-amber-600"
    }
}

export function PickupHistory() {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Waste Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pickups.map((pickup) => {
            const config = statusConfig[pickup.status as keyof typeof statusConfig];
            return (
              <TableRow key={pickup.id}>
                <TableCell className="font-medium">{pickup.date}</TableCell>
                <TableCell>{pickup.wasteType}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("gap-1.5", config.color)}>
                     <config.icon className={cn("h-3.5 w-3.5", config.iconColor)} />
                    {pickup.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{pickup.id}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
