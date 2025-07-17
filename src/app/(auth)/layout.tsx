
'use client';

import {
  Recycle,
  LogOut,
  ChevronDown,
  Home,
  ClipboardList,
  Coins,
  History,
  Calendar,
  Info,
  User,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React, { useEffect } from 'react';
import { BottomNav } from '@/components/layout/bottom-nav';
import { usePathname, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/auth-context';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

function UserMenu({
  name,
  email,
  avatarFallback,
  handleLogout,
}: {
  name: string;
  email: string;
  avatarFallback: string;
  handleLogout: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 flex items-center justify-between w-full sm:w-auto px-2 sm:min-w-[200px]"
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src="https://placehold.co/40x40.png"
                alt="User avatar"
                data-ai-hint="user avatar"
              />
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
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


function DashboardNavMenu() {
    const pathname = usePathname();
    const { userData } = useAuth();
    const { toast } = useToast();
    const isSubscribed = userData?.subscription?.status === 'active';

    const menuItems = [
        { label: 'Home', href: '/', icon: Home, active: pathname === '/' },
        { label: 'Dashboard', href: '/dashboard', icon: User, active: pathname.startsWith('/dashboard'), role: 'user'},
        { label: 'Status', href: '/submission-status', icon: ClipboardList, active: pathname === '/submission-status' },
        { label: 'Riwayat', href: '/history', icon: History, active: pathname === '/history' },
        { label: 'Poin', href: '/dashboard/points', icon: Coins, active: pathname === '/dashboard/points' },
        { label: 'Jadwal', href: isSubscribed ? '/schedule' : '#', icon: Calendar, active: pathname === '/schedule', requireSubscription: true },
        { label: 'Tentang Kami', href: '/about-us', icon: Info, active: pathname === '/about-us' },
    ];
    
     const handleMenuClick = (e: React.MouseEvent, requiresSubscription: boolean | undefined) => {
        if (requiresSubscription && !isSubscribed) {
            e.preventDefault();
            toast({
                variant: "destructive",
                title: "Akses Ditolak",
                description: "Anda harus berlangganan untuk mengakses fitur ini.",
            });
        }
    };

    return (
        <SidebarMenu>
            {menuItems.filter(item => !item.role || item.role === userData?.role).map((item, index) => (
                <SidebarMenuItem key={index}>
                     <Link href={item.href} onClick={(e) => handleMenuClick(e, item.requireSubscription)}>
                        <SidebarMenuButton isActive={item.active} className={cn(item.requireSubscription && !isSubscribed && "text-muted-foreground cursor-not-allowed")}>
                            <item.icon />
                            {item.label}
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}


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

  const name = userData?.companyName || userData?.fullName || 'User';
  const email = userData?.email || '...';
  const avatarFallback = (name.split(' ')[0][0] || 'U').toUpperCase();

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
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
           <div className="flex items-center gap-2 p-2">
                <Recycle className="w-8 h-8 text-primary" />
                <h1 className="text-xl font-bold text-primary">WasteGo</h1>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <DashboardNavMenu />
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <Settings/>
                        Settings
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="flex min-h-screen w-full flex-col">
          <header className="flex justify-between items-center p-2 border-b bg-background sticky top-0 z-10 h-16">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-xl font-bold text-primary hidden sm:block md:hidden">
                    WasteGo
                </h1>
            </div>
            <UserMenu
              name={name}
              email={email}
              avatarFallback={avatarFallback}
              handleLogout={logout}
            />
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background pb-24 transition-all duration-300">
            {children}
          </main>
          <div>
            <BottomNav />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
