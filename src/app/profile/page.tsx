"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ArrowLeft,
  Loader2,
  Settings,
  CreditCard,
  Bell
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const router = useRouter();

  const userDocRef = useMemoFirebase(() => {
    if (!user || !db) return null;
    return doc(db, "users", user.uid);
  }, [user, db]);

  const { data: profileData, isLoading: isProfileLoading } = useDoc(userDocRef);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login");
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="font-headline font-black uppercase tracking-widest text-xs">Accessing Portal...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const infoItems = [
    { label: "Full Name", value: profileData?.fullName || user.displayName || "N/A", icon: User },
    { label: "Email Address", value: user.email, icon: Mail },
    { label: "Mobile Number", value: profileData?.mobile || "N/A", icon: Phone },
    { label: "Date of Birth", value: profileData?.dob || "N/A", icon: Calendar },
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Profile Header */}
      <section className="relative pt-32 pb-20 overflow-hidden vibrant-gradient text-white">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom duration-1000">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-headline font-black leading-[0.9] tracking-tighter drop-shadow-2xl">
              Profile
            </h1>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Sidebar: Profile Summary */}
            <div className="lg:col-span-4 space-y-8">
              <Card className="border-none shadow-2xl rounded-[3rem] bg-white overflow-hidden p-2">
                <CardContent className="p-10 text-center space-y-6">
                  <div className="relative mx-auto w-32 h-32">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    <Avatar className="w-32 h-32 border-4 border-primary/20 shadow-xl relative z-10">
                      <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                      <AvatarFallback className="bg-primary text-white text-4xl font-black">
                        {getInitials(user.displayName || profileData?.fullName)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-2xl font-headline font-black italic">{profileData?.fullName || user.displayName || "NPB User"}</h3>
                    <p className="text-muted-foreground font-medium text-sm">{user.email}</p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-center gap-4">
                    <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2 hover:border-primary hover:text-primary">
                      <Settings className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2 hover:border-blue-600 hover:text-blue-600">
                      <Bell className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-2 hover:border-emerald-600 hover:text-emerald-600">
                      <CreditCard className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="p-10 rounded-[3rem] bg-foreground text-white space-y-6 relative overflow-hidden group">
                <div className="absolute inset-0 grid-bg opacity-10" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-primary w-6 h-6" />
                    <h4 className="text-xl font-headline font-black italic">Security Guard</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="font-bold text-slate-300">Provider</span> 
                      <span className="font-black text-primary uppercase text-xs">{profileData?.provider || "OAuth"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-2">
                      <span className="font-bold text-slate-300">Status</span> 
                      <span className="text-emerald-400 font-black text-xs uppercase">Active</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 pt-2">
                      <Clock className="w-4 h-4" /> Member since {profileData?.createdAt ? new Date(profileData.createdAt.seconds * 1000).toLocaleDateString() : 'Recent'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Detailed Information */}
            <div className="lg:col-span-8 space-y-8">
              <Card className="border-none shadow-2xl rounded-[3rem] bg-white overflow-hidden p-2">
                <CardHeader className="p-10 md:p-16 pb-0">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20 mb-4">
                    <User className="w-4 h-4" />
                    Personal Details
                  </div>
                  <CardTitle className="text-3xl font-headline font-black italic">Manage Your <span className="text-primary">Identity</span></CardTitle>
                </CardHeader>
                
                <CardContent className="p-10 md:p-16 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {infoItems.map((item, idx) => (
                      <div key={idx} className="group relative p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-primary/20 hover:bg-white transition-all duration-500">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <item.icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</span>
                        </div>
                        <p className="text-xl font-headline font-black break-words">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-slate-100 space-y-6">
                    <h4 className="text-xl font-headline font-black italic">Account Controls</h4>
                    <div className="flex flex-wrap gap-4">
                      <Button className="rounded-full px-8 h-14 font-black uppercase tracking-widest text-xs bg-primary hover:bg-foreground shadow-lg border-none">
                        Edit Profile
                      </Button>
                      <Button variant="outline" className="rounded-full px-8 h-14 font-black uppercase tracking-widest text-xs border-2 hover:bg-slate-50">
                        Update Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Export / Privacy Feature */}
              <div className="relative group p-1 md:p-1.5 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-[3rem] shadow-2xl overflow-hidden">
                <div className="bg-white rounded-[2.8rem] p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="absolute inset-0 grid-bg opacity-5" />
                  <div className="relative z-10 space-y-2 text-center md:text-left">
                    <h4 className="text-2xl font-headline font-black italic">Security Hub</h4>
                    <p className="text-muted-foreground font-semibold">Your data is encrypted with AES-256 standards right here in India.</p>
                  </div>
                  <Button className="relative z-10 rounded-full px-10 h-16 font-headline text-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/20 border-none">
                    Security Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
