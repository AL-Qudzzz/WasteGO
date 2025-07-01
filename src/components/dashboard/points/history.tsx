
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PointsHistory() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Riwayat Transaksi Poin</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Riwayat transaksi akan ditampilkan di sini.</p>
            </CardContent>
        </Card>
    )
}
