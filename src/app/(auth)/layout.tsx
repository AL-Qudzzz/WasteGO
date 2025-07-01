"use client";

import {
  Recycle,
  LogOut,
  ChevronDown,
  User,
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

// This is a mock. In a real app, this would come from a user context.
const useRole = () => {
    const pathname = usePathname();
    if (pathname.includes('/admin')) return { role: 'admin', name: 'Admin User', email: 'admin@wastego.com'};
    if (pathname.includes('/courier')) return { role: 'courier', name: 'Courier', email: 'courier@wastego.com'};
    if (pathname.includes('/company')) return { role: 'company', name: 'PT Eco Solutions', email: 'contact@ecosolutions.com'};
    return { role: 'user', name: 'Household User', email: 'user@wastego.com'};
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { name, email } = useRole();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="flex justify-between items-center p-4 border-b bg-background sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Recycle className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold text-primary hidden sm:block">
            WasteGo
          </h1>
        </div>
        <UserMenu name={name} email={email} />
      </header>
      <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background pb-24">
          {children}
      </main>
      <div>
        <BottomNav />
      </div>
    </div>
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
