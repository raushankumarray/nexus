"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Users, 
  MessageSquare, 
  Calendar, 
  ShieldAlert, 
  LogOut,
  Zap,
  Globe,
  Terminal,
  Cpu,
  LayoutDashboard,
  ArrowUpRight
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Active Inquiries", value: "24", icon: MessageSquare, color: "text-orange-500", href: "/admin/contacts" },
  { label: "Scheduled Meetings", value: "8", icon: Calendar, color: "text-emerald-500", href: "/admin/meetings" },
  { label: "Total Professionals", value: "112", icon: Users, color: "text-blue-500", href: "/admin/users" },
  { label: "System Load", value: "12%", icon: Activity, color: "text-purple-500", href: "#" },
];

export default function AdminDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("npb_admin_session");
    if (!session) {
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("npb_admin_session");
    router.push("/admin/login");
  };

  if (!isAuthorized) return null;

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6 md:p-12 relative overflow-hidden">
      {/* Deep Core Background */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-secondary opacity-50" />

      {/* Persistent Navigation (Logo based) */}
      <div className="flex justify-between items-center mb-12">
        <Link href="/admin" className="flex items-center gap-4 group cursor-pointer transition-all hover:scale-105 active:scale-95">
          <Logo className="w-14 h-14 border-2 border-slate-800 p-1 group-hover:border-primary transition-colors" />
          <div className="space-y-0.5">
            <h1 className="text-2xl font-headline font-black italic text-white uppercase tracking-tighter">Command <span className="text-primary">Center</span></h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Root Management</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-slate-900 border border-slate-800 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Node: NPB-MAIN-01</span>
          </div>
          <Button 
            onClick={handleLogout}
            variant="ghost" 
            className="rounded-full h-12 w-12 p-0 text-slate-500 hover:text-destructive hover:bg-destructive/10 border border-slate-800"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Real-time Heartbeat */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <Link href={stat.href} key={i}>
              <Card className="bg-slate-900/50 border-slate-800 rounded-[2.5rem] hover:border-primary/50 transition-all group overflow-hidden relative">
                <CardContent className="p-8 space-y-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-xl bg-slate-950",
                    stat.color
                  )}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
                    <div className="flex items-end gap-2">
                      <h3 className="text-4xl font-headline font-black">{stat.value}</h3>
                      <ArrowUpRight className="w-4 h-4 mb-2 text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Central Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Monitor */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="bg-slate-900/50 border-slate-800 rounded-[3rem] overflow-hidden">
              <CardHeader className="p-10 border-b border-slate-800 flex flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-headline font-black italic flex items-center gap-3">
                    <Terminal className="text-primary w-6 h-6" />
                    Infrastructure Protocol
                  </CardTitle>
                  <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Resource Allocation & Monitoring</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950 border border-slate-800">
                  <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Steady State</span>
                </div>
              </CardHeader>
              <CardContent className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-[2rem] bg-slate-950 border border-slate-800 space-y-6 group hover:border-primary transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Core</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-headline font-black italic">Module Registry</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">System-wide monitoring of provisioned software modules and user license keys.</p>
                    </div>
                    <Button variant="outline" className="w-full rounded-xl border-slate-800 text-slate-400 hover:text-white hover:bg-primary transition-all text-[10px] font-black uppercase tracking-widest">
                      Initialize Audit
                    </Button>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-slate-950 border border-slate-800 space-y-6 group hover:border-secondary transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                        <Globe className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">CDN Flow</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-headline font-black italic">Network Matrix</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">Real-time data synchronization between Begusarai core and global edge nodes.</p>
                    </div>
                    <Button variant="outline" className="w-full rounded-xl border-slate-800 text-slate-400 hover:text-white hover:bg-secondary transition-all text-[10px] font-black uppercase tracking-widest">
                      Map Traffic
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Module: Quick Actions */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="bg-slate-900 border-slate-800 rounded-[3rem] p-2">
              <div className="p-8 space-y-8">
                <div className="space-y-1">
                  <h3 className="text-xl font-headline font-black italic text-primary">Management</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Quick Portal Access</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { label: "User Directory", href: "/admin/users", icon: Users },
                    { label: "Lead Inquiries", href: "/admin/contacts", icon: MessageSquare },
                    { label: "Meeting Schedule", href: "/admin/meetings", icon: Calendar },
                    { label: "Career Openings", href: "/admin/careers", icon: Zap },
                  ].map((link, i) => (
                    <Link href={link.href} key={i}>
                      <Button className="w-full h-16 rounded-2xl bg-slate-950 border border-slate-800 hover:bg-primary hover:border-primary transition-all group justify-between px-6 text-white overflow-hidden relative">
                        <span className="flex items-center gap-3 font-headline font-black italic text-sm">
                          <link.icon className="w-4 h-4 text-primary group-hover:text-white" /> {link.label}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-white transition-all" />
                      </Button>
                    </Link>
                  ))}
                </div>

                <div className="p-6 bg-slate-950 rounded-3xl border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="text-primary w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">Terminal Alert</span>
                  </div>
                  <p className="text-[9px] font-bold text-slate-500 leading-relaxed uppercase tracking-wider">
                    All administrative actions are logged under the master session ID. Unauthorized attempts trigger IP lockdown.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
