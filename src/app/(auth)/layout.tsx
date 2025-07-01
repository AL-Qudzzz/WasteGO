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
import React, { useEffect, useState } from "react";
import { BottomNav } from "@/components/layout/bottom-nav";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check company collection
        const companyDocRef = doc(db, 'companies', user.uid);
        const companyDocSnap = await getDoc(companyDocRef);
        if (companyDocSnap.exists()) {
          setUserData(companyDocSnap.data());
          setLoading(false);
          return;
        }

        // Check user collection
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Use fallback data during loading or if userData is null
  const name = userData?.companyName || userData?.fullName || "User";
  const email = userData?.email || "...";
  const avatarFallback = (name.split(' ').map(n => n[0]).join('') || 'U').substring(0,2).toUpperCase();


  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="flex justify-between items-center p-4 border-b bg-background sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Recycle className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold text-primary hidden sm:block">
            WasteGo
          </h1>
        </div>
        {loading ? (
          <div className="h-8 w-8 sm:w-[200px] bg-muted rounded-full animate-pulse"></div>
        ) : (
          <UserMenu name={name} email={email} avatarFallback={avatarFallback} />
        )}
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


function UserMenu({name, email, avatarFallback}: {name: string; email: string, avatarFallback: string}) {

    const handleLogout = async () => {
      try {
        await signOut(auth);
        window.location.assign('/login');
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };
    
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
