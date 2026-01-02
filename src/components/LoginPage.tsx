import { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, GraduationCap, Users } from 'lucide-react';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'user'>('user');
  const login = useDashboardStore((state) => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // No authentication restrictions in development
    login(username || 'Demo User', role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl gradient-primary mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Language & Learning Foundation
          </h1>
          <p className="text-muted-foreground mt-2">
            Educational Monitoring Dashboard
          </p>
        </div>

        <Card className="shadow-card border-border/50">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-display">Welcome Back</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-3">
                <Label>Select Role</Label>
                <RadioGroup
                  value={role}
                  onValueChange={(value) => setRole(value as 'admin' | 'user')}
                  className="grid grid-cols-2 gap-3"
                >
                  <Label
                    htmlFor="user-role"
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      role === 'user'
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <RadioGroupItem value="user" id="user-role" />
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="font-medium">User</span>
                    </div>
                  </Label>
                  <Label
                    htmlFor="admin-role"
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      role === 'admin'
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <RadioGroupItem value="admin" id="admin-role" />
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-accent" />
                      <span className="font-medium">Admin</span>
                    </div>
                  </Label>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full h-11 gradient-accent text-accent-foreground font-medium shadow-md hover:opacity-90 transition-opacity">
                Sign In to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Development mode - Click sign in to enter dashboard
        </p>
      </div>
    </div>
  );
}
