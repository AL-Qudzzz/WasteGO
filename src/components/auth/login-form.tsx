"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState('user');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle authentication here.
    // For this demo, we just redirect based on the selected role.
    if (role === 'admin') {
      router.push('/dashboard/admin');
    } else if (role === 'courier') {
      router.push('/dashboard/courier');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <Card className="bg-white">
      <form onSubmit={handleLogin}>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="user@example.com" required defaultValue="demo@wastego.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required defaultValue="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Sign in as</Label>
            <Select onValueChange={setRole} defaultValue={role}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">Household User</SelectItem>
                <SelectItem value="courier">Courier</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
