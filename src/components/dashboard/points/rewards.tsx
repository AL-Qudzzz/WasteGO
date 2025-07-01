
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PointsRewards() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Hadiah Tersedia</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Daftar hadiah yang dapat ditukar akan ditampilkan di sini.</p>
            </CardContent>
        </Card>
    )
}
