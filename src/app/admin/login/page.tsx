
"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/Logo";
import { useRouter } from "next/navigation";
import { Lock, ShieldAlert, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function AdminLoginPage() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Credentials provided by user: adminr / Admin@88
    if (userid === "adminr" && password === "Admin@88") {
      toast({
        title: "Access Granted",
        description: "Welcome to the internal dashboard.",
      });
      router.push("/admin/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Invalid admin credentials.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col relative overflow-hidden">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6 pt-32 pb-20 relative z-10">
        {/* Dark Mode Background Accents */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[150px] -z-10 animate-pulse" />
        
        <div className="w-full max-w-md space-y-6">
          <Link href="/login" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors group">
            <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Media Login
          </Link>

          <Card className="border-none shadow-2xl rounded-[3rem] bg-slate-800 text-white overflow-hidden animate-in fade-in zoom-in duration-700">
            <CardHeader className="space-y-4 text-center pb-2">
              <div className="flex flex-col items-center gap-2 group">
                <Logo className="w-16 h-16 transition-transform group-hover:scale-110 duration-500" />
                <span className="font-headline font-black text-2xl text-primary">Media</span>
              </div>
              <div className="space-y-1">
                <CardTitle className="text-3xl font-headline font-black italic flex items-center justify-center gap-3">
                  <ShieldAlert className="text-primary w-8 h-8" />
                  Internal <span className="text-primary">Auth</span>
                </CardTitle>
                <CardDescription className="text-sm font-medium text-slate-400">
                  Restricted to NPB Media authorized personnel.
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="p-8 pt-4 space-y-6">
              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Admin UserID</Label>
                    <Input 
                      value={userid}
                      onChange={(e) => setUserid(e.target.value)}
                      placeholder="Enter ID" 
                      className="h-14 rounded-2xl border-2 border-slate-700 bg-slate-900/50 focus:border-primary focus:bg-slate-900 transition-all text-lg font-medium px-6 text-white" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Admin Password</Label>
                    <Input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••" 
                      className="h-14 rounded-2xl border-2 border-slate-700 bg-slate-900/50 focus:border-primary focus:bg-slate-900 transition-all text-lg font-medium px-6 text-white" 
                      required
                    />
                  </div>
                </div>
                
                <Button className="w-full h-16 rounded-2xl text-xl font-headline bg-primary text-white hover:bg-white hover:text-slate-900 transition-all duration-500 shadow-xl shadow-primary/20 group relative overflow-hidden border-none">
                   Access Dashboard <Lock className="ml-2 w-5 h-5 transition-transform group-hover:rotate-12" />
                </Button>
              </form>
              
              <div className="pt-6 border-t border-slate-700 text-center">
                <div className="flex items-center gap-2 justify-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <ShieldAlert className="w-3 h-3 text-primary" /> Session logging is active
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  );
}
