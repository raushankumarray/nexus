
"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { LogIn, Sparkles, ShieldCheck, UserPlus, Lock } from "lucide-react";

export default function LoginPage() {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic for standard user login
  };

  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6 pt-32 pb-20 relative z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10 animate-pulse delay-700" />
        
        <div className="w-full max-w-md space-y-6">
          <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[3rem] bg-white overflow-hidden animate-in fade-in zoom-in duration-700">
            <CardHeader className="space-y-4 text-center pb-2">
              <div className="flex flex-col items-center gap-2 group">
                <Logo className="w-16 h-16 transition-transform group-hover:scale-110 duration-500" />
                <span className="font-headline font-black text-2xl text-[#00008B]">Media</span>
              </div>
              <div className="space-y-1">
                <CardTitle className="text-3xl font-headline font-black italic">
                  Welcome <span className="text-primary">Back</span>
                </CardTitle>
                <CardDescription className="text-sm font-medium">
                  Enter your credentials to access the NPB Nexus.
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="p-8 pt-4 space-y-6">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">
                      Email Address
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter Email" 
                      className="h-14 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6" 
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">
                        Password
                      </Label>
                      <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">
                        Forgot?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="Enter Password" 
                      className="h-14 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:border-primary focus:bg-white transition-all text-lg font-medium px-6" 
                      required
                    />
                  </div>
                </div>
                
                <Button className="w-full h-16 rounded-2xl text-xl font-headline bg-primary text-white hover:bg-foreground transition-all duration-500 shadow-xl shadow-primary/20 group relative overflow-hidden border-none">
                   Sign In <LogIn className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
              
              <div className="text-center space-y-4 pt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-muted-foreground font-black tracking-widest">Or</span></div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Link href="/signup">
                    <Button variant="outline" className="w-full h-14 rounded-2xl border-2 border-slate-100 hover:border-primary hover:bg-primary/5 font-black uppercase tracking-widest text-xs group">
                      <UserPlus className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                      Create New Account
                    </Button>
                  </Link>
                  <Link href="/admin/login">
                    <Button variant="outline" className="w-full h-14 rounded-2xl border-2 border-slate-100 bg-slate-800 text-white hover:bg-slate-900 font-black uppercase tracking-widest text-xs group">
                      <Lock className="mr-2 w-4 h-4 text-primary" />
                      Internal Login Page
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center gap-4 justify-center pt-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Secure
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Nexus AI
                  </div>
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
