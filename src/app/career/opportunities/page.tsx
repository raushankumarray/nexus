"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Briefcase, 
  ArrowUpRight,
  Zap,
  Cpu,
  Monitor,
  CheckCircle2,
  Lock
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const INITIAL_ROLES = [
  {
    id: "role-1",
    title: "Senior Full Stack Engineer",
    type: "Full Time",
    location: "Remote / Begusarai",
    description: "Lead the development of scalable web architectures using React, Next.js, and Node.js.",
    category: "Engineering",
    color: "bg-orange-500",
    icon: Monitor,
    status: "active"
  },
  {
    id: "role-2",
    title: "UI/UX Visual Designer",
    type: "Full Time",
    location: "Remote",
    description: "Create stunning, user-centric interfaces for our global suite of products.",
    category: "Design",
    color: "bg-blue-600",
    icon: Zap,
    status: "active"
  },
  {
    id: "role-3",
    title: "AI & ML Specialist",
    type: "Contract",
    location: "Begusarai",
    description: "Integrate LLMs and predictive models into our internal optimization tools.",
    category: "AI / Data",
    color: "bg-emerald-600",
    icon: Cpu,
    status: "active"
  },
  {
    id: "role-4",
    title: "Backend Specialist (Go/Node)",
    type: "Full Time",
    location: "Remote / Begusarai",
    description: "Optimize high-concurrency systems and handle complex API integrations.",
    category: "Engineering",
    color: "bg-purple-600",
    icon: Briefcase,
    status: "active"
  },
  {
    id: "role-5",
    title: "Junior QA Tester",
    type: "Full Time",
    location: "Begusarai",
    description: "Assisted in the quality assurance of our core banking modules.",
    category: "Engineering",
    color: "bg-slate-400",
    icon: CheckCircle2,
    status: "closed"
  }
];

export default function OpportunitiesPage() {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const handleApply = (id: string) => {
    if (!appliedIds.includes(id)) {
      setAppliedIds([...appliedIds, id]);
    }
  };

  const activeRoles = roles.filter(r => r.status === "active" && !appliedIds.includes(r.id));
  const closedRoles = roles.filter(r => r.status === "closed");
  const userAppliedRoles = roles.filter(r => appliedIds.includes(r.id));

  const RoleCard = ({ role, isApplied = false, isClosed = false }: { role: typeof INITIAL_ROLES[0], isApplied?: boolean, isClosed?: boolean }) => (
    <Card className="group border-none shadow-2xl rounded-[3rem] bg-white overflow-hidden hover:-translate-y-2 transition-all duration-500">
      <CardContent className="p-10 flex flex-col h-full space-y-8">
        <div className="flex justify-between items-start">
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center text-white transition-all duration-700 group-hover:rotate-[360deg] shadow-xl",
            isClosed ? "bg-slate-300" : role.color
          )}>
            {isClosed ? <Lock className="w-8 h-8" /> : <role.icon className="w-8 h-8" />}
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className="px-4 py-1.5 rounded-full border-2 border-slate-100 font-black uppercase text-[10px] tracking-widest text-muted-foreground">
              {role.type}
            </Badge>
            <Badge className={cn(
              "px-4 py-1.5 rounded-full text-white border-none font-black uppercase text-[10px] tracking-widest",
              isClosed ? "bg-slate-400" : role.color
            )}>
              {role.category}
            </Badge>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <h3 className={cn(
            "text-3xl font-headline font-black italic transition-colors",
            isClosed ? "text-slate-400" : "group-hover:text-primary"
          )}>
            {role.title}
          </h3>
          <div className="flex items-center gap-6 text-muted-foreground font-bold text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              {role.location}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              {isClosed ? "Expired" : "Immediate Start"}
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed font-semibold">
            {role.description}
          </p>
        </div>

        <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
          {isApplied ? (
            <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-sm">
              <CheckCircle2 className="w-5 h-5" />
              Application Submitted
            </div>
          ) : isClosed ? (
            <div className="text-slate-400 font-black uppercase tracking-widest text-sm">
              Applications Closed
            </div>
          ) : (
            <Button 
              onClick={() => handleApply(role.id)}
              className={cn(
                "rounded-full px-8 h-14 text-sm font-black uppercase tracking-widest text-white border-none group/btn shadow-lg",
                role.color
              )}
            >
              Apply Now <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
            </Button>
          )}
          <Link href="/contact" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
            Questions?
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 overflow-hidden vibrant-gradient text-white">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom duration-1000">
            <Link 
              href="/career" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back to Careers
            </Link>
            <h1 className="text-6xl md:text-8xl font-headline font-black leading-[0.9] tracking-tighter drop-shadow-2xl">
              Career <span className="italic text-yellow-300">Nexus</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-bold border-l-4 border-yellow-300 pl-6">
              Track your journey at NPB Media. Browse active roles, review closed listings, or manage your ongoing applications.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Tabs defaultValue="active" className="space-y-12">
            <div className="flex justify-center">
              <TabsList className="bg-slate-100 p-2 h-auto rounded-[2rem] border-2 border-slate-200">
                <TabsTrigger value="active" className="rounded-full px-10 py-4 font-headline font-black text-lg data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                  Active Openings
                </TabsTrigger>
                <TabsTrigger value="closed" className="rounded-full px-10 py-4 font-headline font-black text-lg data-[state=active]:bg-slate-800 data-[state=active]:text-white transition-all">
                  Closed Listings
                </TabsTrigger>
                <TabsTrigger value="applied" className="rounded-full px-10 py-4 font-headline font-black text-lg data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all">
                  Applied ({appliedIds.length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="active" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {activeRoles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {activeRoles.map((role) => (
                    <RoleCard key={role.id} role={role} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 space-y-6">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                    <Zap className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-3xl font-headline font-black italic">No active roles found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto font-medium">
                    Check out your "Applied" tab or stay tuned for upcoming opportunities.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="closed" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {closedRoles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 grayscale opacity-80">
                  {closedRoles.map((role) => (
                    <RoleCard key={role.id} role={role} isClosed />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 space-y-6">
                  <h3 className="text-3xl font-headline font-black italic">No archived roles</h3>
                </div>
              )}
            </TabsContent>

            <TabsContent value="applied" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              {userAppliedRoles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {userAppliedRoles.map((role) => (
                    <RoleCard key={role.id} role={role} isApplied />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 space-y-6">
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-headline font-black italic">You haven't applied yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto font-medium">
                    Explore the "Active" tab and take your first step toward joining NPB Media.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-20 p-12 rounded-[4rem] bg-foreground text-white text-center space-y-6 relative overflow-hidden group">
            <div className="absolute inset-0 grid-bg opacity-10" />
            <div className="relative z-10">
              <h3 className="text-4xl font-headline font-black italic">Don't See a Perfect Fit?</h3>
              <p className="text-white/60 text-lg font-medium max-w-xl mx-auto py-4">
                We are always on the lookout for exceptional talent. Send us your resume and tell us how you can contribute to our mission.
              </p>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-headline border-2 border-white/20 hover:bg-white hover:text-foreground transition-all duration-500">
                  Send General Application
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
