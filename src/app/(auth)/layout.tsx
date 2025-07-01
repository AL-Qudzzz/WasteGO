"use client";

import {
  Recycle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
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
import React, { useEffect } from "react";
import { BottomNav } from "@/components/layout/bottom-nav";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/auth-context";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !userData) {
      router.replace('/login');
    }
  }, [loading, userData, router]);

  const name = userData?.companyName || userData?.fullName || "User";
  const email = userData?.email || "...";
  const avatarFallback = (name.split(' ').map(n => n[0]).join('') || 'U').substring(0,2).toUpperCase();

  if (loading || !userData) {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <header className="flex justify-between items-center p-4 border-b bg-background sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Recycle className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold text-primary hidden sm:block">
              WasteGo
            </h1>
          </div>
          <Skeleton className="h-10 w-[200px] rounded-md" />
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-96 w-full" />
          </div>
        </main>
      </div>
    )
  }


  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="flex justify-between items-center p-4 border-b bg-background sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Recycle className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold text-primary hidden sm:block">
            WasteGo
          </h1>
        </div>
        <UserMenu name={name} email={email} avatarFallback={avatarFallback} handleLogout={logout} />
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


function UserMenu({name, email, avatarFallback, handleLogout}: {name: string; email: string, avatarFallback: string, handleLogout: () => void}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 flex items-center justify-between w-full sm:w-auto px-2 sm:min-w-[200px]">
                   <div className="flex items-center gap-2">
                     <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/40x40.png" alt="User avatar" data-ai-hint="user avatar" />
                        <AvatarFallback>{avatarFallback}</AvatarFallback>
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
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" /><span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
