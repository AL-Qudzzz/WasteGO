import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, BarChart, Users, Truck } from "lucide-react";

const users = [
  { id: 'USR001', name: 'Household User', email: 'user@wastego.com', role: 'user', joined: '2023-10-01' },
  { id: 'USR002', name: 'Courier', email: 'courier@wastego.com', role: 'courier', joined: '2023-09-15' },
  { id: 'USR003', name: 'Eco Partner', email: 'mitra@wastego.com', role: 'mitra', joined: '2023-11-05' },
  { id: 'USR004', name: 'Admin User', email: 'admin@wastego.com', role: 'admin', joined: '2023-08-20' },
];

const pickups = [
    { id: 'PCK001', userId: 'USR001', address: '123 Green St', status: 'Completed', courierId: 'USR002', date: '2023-11-10' },
    { id: 'PCK002', userId: 'USR001', address: '123 Green St', status: 'Scheduled', courierId: null, date: '2023-11-12' },
    { id: 'PCK003', userId: 'USR003', address: '789 Nature Ln', status: 'En Route', courierId: 'USR002', date: '2023-11-11' },
]

const articles = [
    { id: 'ART001', title: 'The Importance of Recycling Plastic', author: 'Admin User', date: '2023-10-15', status: 'Published' },
    { id: 'ART002', title: 'How to Reduce Household Waste', author: 'Admin User', date: '2023-10-25', status: 'Published' },
    { id: 'ART003', title: 'Understanding Your Environmental Impact', author: 'Admin User', date: '2023-11-01', status: 'Draft' },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Control Panel</h1>
        <p className="text-muted-foreground">Manage your application from one central hub.</p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
            <p className="text-xs text-muted-foreground">+50 in the last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pickups This Month</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+832</div>
            <p className="text-xs text-muted-foreground">+120 from last month</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recycling Rate</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pickups">
        <TabsList>
          <TabsTrigger value="pickups">Pickups</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="pickups" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Pickup Requests</CardTitle>
                    <CardDescription>Manage and assign pickup requests.</CardDescription>
                </div>
                <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" /> New Pickup</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Courier</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pickups.map(p => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.id}</TableCell>
                      <TableCell>{p.userId}</TableCell>
                      <TableCell>{p.address}</TableCell>
                      <TableCell><Badge variant={p.status === 'Completed' ? 'default' : p.status === 'En Route' ? 'secondary' : 'outline'}>{p.status}</Badge></TableCell>
                      <TableCell>{p.courierId || 'Unassigned'}</TableCell>
                      <TableCell>{p.date}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4"/></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>{p.courierId ? "Re-assign" : "Assign"} Courier</DropdownMenuItem>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card>
             <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>View and manage all users in the system.</CardDescription>
                </div>
                <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add User</Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined</TableHead>
                             <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map(u => (
                            <TableRow key={u.id}>
                                <TableCell>{u.id}</TableCell>
                                <TableCell>{u.name}</TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell><Badge variant="secondary">{u.role}</Badge></TableCell>
                                <TableCell>{u.joined}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4"/></Button></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>View Activity</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Content Management</CardTitle>
                    <CardDescription>Create and manage articles and other content.</CardDescription>
                </div>
                <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" /> New Article</Button>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead><span className="sr-only">Actions</span></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {articles.map(a => (
                            <TableRow key={a.id}>
                                <TableCell className="font-medium">{a.title}</TableCell>
                                <TableCell>{a.author}</TableCell>
                                <TableCell>{a.date}</TableCell>
                                <TableCell><Badge variant={a.status === 'Published' ? 'default' : 'outline'}>{a.status}</Badge></TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4"/></Button></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>{a.status === 'Published' ? 'Unpublish' : 'Publish'}</DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
