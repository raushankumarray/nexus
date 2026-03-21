
"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { 
  Users, 
  MessageSquare, 
  CalendarDays, 
  Briefcase, 
  ArrowRight, 
  Loader2, 
  ShieldAlert,
  Zap,
  TrendingUp,
  Activity
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ADMIN_EMAILS = ["raushankumarray96@gmail.com", "admin@npbmedia.com"];

export default function AdminDashboard() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();

  // Fetch counts for dashboard stats
  const usersQuery = useMemoFirebase(() => db ? collection(db, "users") : null, [db]);
  const inquiriesQuery = useMemoFirebase(() => db ? collection(db, "inquiries") : null, [db]);
  const meetingsQuery = useMemoFirebase(() => db ? collection(db, "meetings") : null, [db]);
  const careersQuery = useMemoFirebase(() => db ? collection(db, "careers") : null, [db]);

  const { data: users } = useCollection(usersQuery);
  const { data: inquiries } = useCollection(inquiriesQuery);
  const { data: meetings } = useCollection(meetingsQuery);
  const { data: careers } = useCollection(careersQuery);

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const isAdmin = user && ADMIN_EMAILS.includes(user.email || "");

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mb-8 border-2 border-destructive/20 animate-pulse">
          <ShieldAlert className="w-12 h-12 text-destructive" />
        </div>
        <h1 className="text-4xl font-headline font-black text-white italic mb-4">Access Denied</h1>
        <p className="text-slate-400 max-w-md mb-8">This portal is restricted to NPB Media authorized personnel. Please sign in with an administrator account.</p>
        <Link href="/login">
          <Button className="rounded-full px-10 h-14 bg-primary text-white">Return to Login</Button>
        </Link>
      </main>
    );
  }

  const stats = [
    { label: "Total Users", value: users?.length || 0, icon: Users, color: "bg-blue-600", href: "/admin/users" },
    { label: "Active Inquiries", value: inquiries?.length || 0, icon: MessageSquare, color: "bg-orange-500", href: "/admin/contacts" },
    { label: "Scheduled Meetings", value: meetings?.length || 0, icon: CalendarDays, color: "bg-emerald-600", href: "/admin/meetings" },
    { label: "Job Postings", value: careers?.length || 0, icon: Briefcase, color: "bg-purple-600", href: "/admin/careers" },
  ];

  return (
    <main className="min-h-screen bg-slate-900 flex flex-col relative overflow-hidden">
      <Navbar />
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px]" />
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-20 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-primary text-[10px] font-black uppercase tracking-widest">
              <Zap className="w-3 h-3" /> System Intelligence
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-black text-white italic leading-none">
              Admin <span className="text-primary">Nexus</span>
            </h1>
            <p className="text-slate-400 text-lg font-medium">Global command center for NPB Media infrastructure.</p>
          </div>
          
          <div className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center gap-6 backdrop-blur-xl">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Status</p>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Nominal
              </div>
            </div>
            <Activity className="text-white/20 w-8 h-8" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, i) => ( stat.href ? (
            <Link key={i} href={stat.href}>
              <Card className="bg-white/5 border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all group overflow-hidden cursor-pointer h-full">
                <CardContent className="p-8 space-y-6">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:rotate-12 group-hover:scale-110", stat.color)}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-4xl font-headline font-black text-white">{stat.value}</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Manage <ArrowRight className="w-3 h-3" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ) : null ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-primary to-accent border-none rounded-[3rem] p-1 shadow-2xl group overflow-hidden">
            <div className="bg-slate-900 rounded-[2.8rem] h-full p-10 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <TrendingUp className="text-primary w-10 h-10" />
                <h3 className="text-3xl font-headline font-black text-white italic">Strategic Insight</h3>
                <p className="text-slate-400 leading-relaxed font-medium">Review inquiries and consultation requests to identify emerging market trends and service demand.</p>
              </div>
              <Link href="/admin/contacts">
                <Button className="w-full h-16 rounded-2xl bg-primary text-white hover:bg-white hover:text-slate-900 transition-all font-headline text-xl italic group">
                  View Market Inquiries <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="bg-white/5 border-white/10 rounded-[3rem] p-10 flex flex-col justify-between space-y-8 backdrop-blur-xl">
            <div className="space-y-4">
              <Users className="text-blue-500 w-10 h-10" />
              <h3 className="text-3xl font-headline font-black text-white italic">User Ecosystem</h3>
              <p className="text-slate-400 leading-relaxed font-medium">Monitor user registration and detailed profile growth across the global NPB Media network.</p>
            </div>
            <Link href="/admin/users">
              <Button variant="outline" className="w-full h-16 rounded-2xl border-2 border-white/10 text-white hover:bg-white hover:text-slate-900 transition-all font-headline text-xl italic">
                Analyze User Data
              </Button>
            </Link>
          </Card>
        </div>
      </div>
      <Footer />
    </main>
  );
}
