
"use client";

import React from "react";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { 
  Users, 
  CalendarDays, 
  MessageSquare, 
  Briefcase, 
  ArrowUpRight, 
  TrendingUp, 
  Activity,
  Zap,
  ShieldCheck,
  Globe,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const db = useFirestore();

  // Fetch real-time data for counters
  const usersQuery = useMemoFirebase(() => collection(db, "users"), [db]);
  const meetingsQuery = useMemoFirebase(() => collection(db, "meetings"), [db]);
  const inquiriesQuery = useMemoFirebase(() => collection(db, "inquiries"), [db]);
  const careersQuery = useMemoFirebase(() => collection(db, "careers"), [db]);

  const { data: users, isLoading: usersLoading } = useCollection(usersQuery);
  const { data: meetings, isLoading: meetingsLoading } = useCollection(meetingsQuery);
  const { data: inquiries, isLoading: inquiriesLoading } = useCollection(inquiriesQuery);
  const { data: careers, isLoading: careersLoading } = useCollection(careersQuery);

  if (usersLoading || meetingsLoading || inquiriesLoading || careersLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const stats = [
    { name: "Total Users", value: users?.length || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Meeting Requests", value: meetings?.length || 0, icon: CalendarDays, color: "text-emerald-600", bg: "bg-emerald-50" },
    { name: "Pending Inquiries", value: inquiries?.length || 0, icon: MessageSquare, color: "text-orange-600", bg: "bg-orange-50" },
    { name: "Live Careers", value: careers?.length || 0, icon: Briefcase, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <Card key={idx} className="group border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden transition-all hover:-translate-y-1">
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-12", stat.bg, stat.color)}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.name}</p>
                <h3 className="text-4xl font-headline font-black italic text-slate-900">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System Health Card */}
        <Card className="lg:col-span-2 border-none shadow-2xl rounded-[3rem] bg-slate-950 text-white overflow-hidden p-2">
          <div className="p-10 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-widest">
                <Activity className="w-4 h-4 animate-pulse" /> Live Infrastructure
              </div>
              <h2 className="text-4xl font-headline font-black italic">Nexus <span className="text-primary">Health</span></h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: "Auth Server", status: "Active", icon: ShieldCheck, color: "text-emerald-400" },
                { label: "Firestore DB", status: "Active", icon: Zap, color: "text-yellow-400" },
                { label: "Global CDN", status: "Active", icon: Globe, color: "text-blue-400" },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 space-y-4">
                  <item.icon className={cn("w-8 h-8", item.color)} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</p>
                    <p className="text-sm font-bold">{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Actions Card */}
        <Card className="border-none shadow-xl rounded-[3rem] bg-white p-2">
          <div className="p-8 space-y-6">
            <h3 className="text-xl font-headline font-black italic flex items-center gap-2">
              <TrendingUp className="text-primary w-5 h-5" /> Growth Tasks
            </h3>
            <div className="space-y-4">
              {[
                "Schedule onboarding for new users",
                "Review pending career applications",
                "Verify secure meeting credentials",
                "Audit global infrastructure access"
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group cursor-pointer hover:border-primary transition-all">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                  <p className="text-xs font-bold text-slate-600 group-hover:text-slate-900">{task}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
