import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../utils/supabaseClient';
import { useProfile } from '../context/ProfileContext';
import { LogIn, Key, Mail, AlertCircle, Sparkles, UserPlus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';

export function AdminLogin() {
  const navigate = useNavigate();
  const { user } = useProfile();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // If already logged in, redirect to admin panel
  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (mode === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        navigate('/admin');
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;
        
        // If Supabase is configured with confirmation email, tell them to check email.
        // Otherwise, they might be logged in directly.
        if (data.session) {
          navigate('/admin');
        } else {
          setSuccessMsg('Registration successful! Please check your email or try logging in.');
          setMode('login');
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-navy via-[hsl(220,55%,12%)] to-gray-950 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(218,165,32,0.04),transparent_40%)] pointer-events-none" />

      <Card className="w-full max-w-md bg-white/5 dark:bg-gray-900/40 backdrop-blur-xl border border-white/10 dark:border-gray-800 shadow-2xl relative overflow-hidden transition-all duration-300">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-gold to-blue-600" />
        
        <CardHeader className="text-center pt-8">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4 animate-pulse">
            <Key className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
            Admin Portal <Sparkles className="w-4 h-4 text-gold" />
          </CardTitle>
          <CardDescription className="text-gray-400 text-xs">
            {mode === 'login' 
              ? 'Sign in to access and edit your portfolio data.' 
              : 'Register your admin credentials for this website.'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-950/20 border-red-900/50 text-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="text-xs">{error}</AlertDescription>
              </Alert>
            )}

            {successMsg && (
              <Alert className="bg-green-950/20 border-green-900/50 text-green-200">
                <AlertCircle className="h-4 w-4 text-green-400" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription className="text-xs">{successMsg}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold text-gray-300">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 h-10 bg-white/5 border-white/10 text-white placeholder-gray-500 focus-visible:ring-blue-500 text-sm"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-semibold text-gray-300">Password</Label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 h-10 bg-white/5 border-white/10 text-white placeholder-gray-500 focus-visible:ring-blue-500 text-sm"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-10 mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-blue-500/10 active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : mode === 'login' ? (
                <span className="flex items-center gap-1.5 justify-center">
                  <LogIn className="w-4 h-4" /> Sign In
                </span>
              ) : (
                <span className="flex items-center gap-1.5 justify-center">
                  <UserPlus className="w-4 h-4" /> Register Admin
                </span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 pt-2 pb-6 text-center border-t border-white/5">
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-xs text-gray-400 hover:text-blue-400 transition-colors py-1 hover:underline"
            disabled={loading}
          >
            {mode === 'login' 
              ? "First time here? Register as Admin" 
              : "Already have an account? Sign In"}
          </button>
          <a
            href="/"
            className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← Back to Portfolio Website
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
