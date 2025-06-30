"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  Recycle,
  LayoutDashboard,
  Truck,
  Users,
  Newspaper,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { BottomNav } from "@/components/layout/bottom-nav";

const navItems = {
  user: [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/schedule", label: "Schedule Pickup", icon: Truck },
  ],
  courier: [{ href: "/dashboard", label: "Tasks", icon: LayoutDashboard }],
  admin: [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/manage-users", label: "Users", icon: Users },
    { href: "/dashboard/manage-pickups", label: "Pickups", icon: Truck },
    { href: "/dashboard/manage-content", label: "Articles", icon: Newspaper },
  ],
};

// This is a mock. In a real app, this would come from a user context.
const useRole = () => {
    const pathname = usePathname();
    if (pathname.includes('/admin')) return { role: 'admin', name: 'Admin User', email: 'admin@wastego.com'};
    if (pathname.includes('/courier')) return { role: 'courier', name: 'Courier', email: 'courier@wastego.com'};
    return { role: 'user', name: 'Household User', email: 'user@wastego.com'};
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { role, name, email } = useRole();
  const currentNavItems = navItems[role as keyof typeof navItems] || navItems.user;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Recycle className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary group-data-[collapsible=icon]:hidden">
              WasteGo
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {currentNavItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href="#">
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
           <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout">
                  <Link href="/login">
                    <LogOut />
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
             </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex justify-between items-center p-4 border-b bg-background sticky top-0 z-10">
          <SidebarTrigger />
          <UserMenu name={name} email={email} />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background pb-24">
            {children}
        </main>
        <div className="md:hidden">
            <BottomNav />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}


function UserMenu({name, email}: {name: string; email: string}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 flex items-center justify-between w-full sm:w-[200px] px-2">
                   <div className="flex items-center gap-2">
                     <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/40x40.png" alt="User avatar" data-ai-hint="user avatar" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-medium truncate">{name}</p>
                    </div>
                   </div>
                    <ChevronDown className="h-4 w-4 ml-2 hidden sm:block" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/login"><LogOut className="mr-2 h-4 w-4" /><span>Log out</span></Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
