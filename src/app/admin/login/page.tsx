
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Loader2, ArrowLeft, Lock, KeyRound } from "lucide-react";
import { useAuth, useUser } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const ADMIN_EMAIL = "adminr@npbmedia.com";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user && user.email === ADMIN_EMAIL) {
      router.push("/admin/dashboard");
    }
  }, [user, router]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user.email !== ADMIN_EMAIL) {
          throw new Error("Unauthorized: Access restricted to Master Administrator.");
        }
        toast({ title: "Nexus Established", description: "Welcome, Master Administrator." });
        router.push("/admin/dashboard");
      })
      .catch((error: any) => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: error.message,
        });
      });
  };

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* High Security Aesthetic */}
      <div className="absolute inset-0 grid-bg opacity-5" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        <Link href="/login" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors group">
          <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" /> Standard Portal
        </Link>

        <Card className="border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl rounded-[3rem] overflow-hidden text-white">
          <CardHeader className="space-y-4 text-center pb-2 pt-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary/20 animate-pulse">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-3xl font-headline font-black italic">
                  NPB <span className="text-primary">Admin</span>
                </CardTitle>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Master Level 04 Clearance</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-10 pt-6 space-y-8">
            <div className="p-6 bg-primary/10 border border-primary/20 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest justify-center">
                <KeyRound className="w-3 h-3" /> System Credentials
              </div>
              <div className="text-center space-y-1">
                <p className="text-xs font-bold text-white/90">{ADMIN_EMAIL}</p>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Password: Admin@88</p>
              </div>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Administrator ID</Label>
                  <Input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@npbmedia.com" 
                    className="h-14 rounded-2xl border-white/10 bg-white/5 focus:border-primary focus:bg-white/10 text-white transition-all font-medium px-6" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Encryption Key</Label>
                  <Input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="h-14 rounded-2xl border-white/10 bg-white/5 focus:border-primary focus:bg-white/10 text-white transition-all font-medium px-6" 
                    required
                  />
                </div>
              </div>
              
              <Button disabled={isLoading} className="w-full h-16 rounded-2xl text-xl font-headline bg-primary text-white hover:bg-white hover:text-primary transition-all duration-500 shadow-2xl group border-none">
                 {isLoading ? <Loader2 className="animate-spin" /> : "Authorize Link"} <ShieldCheck className="ml-2 w-5 h-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <p className="text-center text-[10px] font-black uppercase tracking-widest text-slate-600">NPB Media Proprietary Infrastructure</p>
      </div>
    </main>
  );
}
