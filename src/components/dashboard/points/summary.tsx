
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Trash2, Factory, Coins } from "lucide-react";

const wasteCategories = [
    {
        name: "Household Waste",
        percentage: "45% dari total",
        points: "+180 poin",
        icon: <Home className="w-6 h-6 text-primary-foreground" />
    },
    {
        name: "Food Waste",
        percentage: "30% dari total",
        points: "+120 poin",
        icon: <Trash2 className="w-6 h-6 text-primary-foreground" />
    },
    {
        name: "Factory Waste",
        percentage: "25% dari total",
        points: "+100 poin",
        icon: <Factory className="w-6 h-6 text-primary-foreground" />
    }
];


export function PointsSummary() {
    return (
        <div className="space-y-6">
            <Card className="bg-primary text-primary-foreground shadow-lg">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-primary-foreground">Total Poin</CardTitle>
                        <Coins className="w-6 h-6 text-primary-foreground/80"/>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">2.450</p>
                    <p className="text-sm text-primary-foreground/80 mt-1">Poin dapat ditukar dengan berbagai hadiah</p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-2xl font-bold text-primary">+325</p>
                        <p className="text-sm text-muted-foreground">Poin bulan ini</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-2xl font-bold text-primary">12</p>
                        <p className="text-sm text-muted-foreground">Transaksi bulan ini</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Kategori Sampah Terbanyak</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {wasteCategories.map((category, index) => (
                        <div key={index} className="flex items-center">
                            <div className="bg-primary p-3 rounded-full mr-4">
                                {category.icon}
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold">{category.name}</p>
                                <p className="text-sm text-muted-foreground">{category.percentage}</p>
                            </div>
                            <p className="font-semibold text-primary">{category.points}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
