
"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Activity, 
  ShieldAlert,
  ArrowUpRight,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    { label: "Active Users", value: "1,248", icon: Users, color: "text-blue-500" },
    { label: "System Health", value: "99.9%", icon: Activity, color: "text-emerald-500" },
    { label: "Security Alerts", value: "0", icon: ShieldAlert, color: "text-primary" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-8">
            <div className="space-y-1">
              <h1 className="text-4xl font-headline font-black italic flex items-center gap-3">
                <LayoutDashboard className="w-10 h-10 text-primary" />
                Admin <span className="text-primary">Dashboard</span>
              </h1>
              <p className="text-muted-foreground font-medium">Welcome back, NPB Administrator.</p>
            </div>
            <Link href="/login">
              <Button variant="outline" className="rounded-full border-2 border-primary/20 hover:bg-primary/5 font-black uppercase tracking-widest text-xs">
                <LogOut className="mr-2 w-4 h-4" /> Sign Out
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <Card key={i} className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden group">
                <CardContent className="p-8 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <stat.icon className={`w-8 h-8 ${stat.color} group-hover:text-white`} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-headline font-black italic">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 border-none shadow-xl rounded-[3rem] bg-white p-10 space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-headline font-black italic">Recent Activity</h3>
                <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-primary">View All <ArrowUpRight className="ml-1 w-3 h-3" /></Button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <p className="font-bold text-sm">New user registration: User_{i}92</p>
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground uppercase">2 mins ago</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="border-none shadow-xl rounded-[3rem] bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative z-10 space-y-6">
                <Settings className="w-10 h-10 text-primary" />
                <h3 className="text-2xl font-headline font-black italic">System Settings</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Manage your global infrastructure nodes and API security parameters.</p>
                <Button className="w-full h-14 rounded-2xl bg-white text-slate-900 hover:bg-primary hover:text-white font-black uppercase tracking-widest text-xs transition-all">
                  Open Config
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
