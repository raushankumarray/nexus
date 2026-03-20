"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Briefcase, 
  ArrowUpRight,
  Zap,
  Cpu,
  Globe,
  Monitor
} from "lucide-react";
import Link from "next/link";

const roles = [
  {
    title: "Senior Full Stack Engineer",
    type: "Full Time",
    location: "Remote / Begusarai",
    description: "Lead the development of scalable web architectures using React, Next.js, and Node.js.",
    category: "Engineering",
    color: "bg-orange-500",
    icon: Monitor
  },
  {
    title: "UI/UX Visual Designer",
    type: "Full Time",
    location: "Remote",
    description: "Create stunning, user-centric interfaces for our global suite of products.",
    category: "Design",
    color: "bg-blue-600",
    icon: Zap
  },
  {
    title: "AI & ML Specialist",
    type: "Contract",
    location: "Begusarai",
    description: "Integrate LLMs and predictive models into our internal optimization tools.",
    category: "AI / Data",
    color: "bg-emerald-600",
    icon: Cpu
  },
  {
    title: "Backend Specialist (Go/Node)",
    type: "Full Time",
    location: "Remote / Begusarai",
    description: "Optimize high-concurrency systems and handle complex API integrations.",
    category: "Engineering",
    color: "bg-purple-600",
    icon: Briefcase
  }
];

export default function OpportunitiesPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Hero Header */}
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
              Open <span className="italic text-yellow-300">Positions</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-bold border-l-4 border-yellow-300 pl-6">
              Browse our current job openings and find the perfect role to showcase your skills and grow with NPB Media.
            </p>
          </div>
        </div>
      </section>

      {/* Job List Section */}
      <section className="py-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roles.map((role, i) => (
              <Card 
                key={i} 
                className="group border-none shadow-2xl rounded-[3rem] bg-white overflow-hidden hover:-translate-y-2 transition-all duration-500"
              >
                <CardContent className="p-10 flex flex-col h-full space-y-8">
                  <div className="flex justify-between items-start">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center text-white transition-all duration-700 group-hover:rotate-[360deg] shadow-xl",
                      role.color
                    )}>
                      <role.icon className="w-8 h-8" />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="outline" className="px-4 py-1.5 rounded-full border-2 border-slate-100 font-black uppercase text-[10px] tracking-widest text-muted-foreground">
                        {role.type}
                      </Badge>
                      <Badge className={cn("px-4 py-1.5 rounded-full text-white border-none font-black uppercase text-[10px] tracking-widest", role.color)}>
                        {role.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4 flex-1">
                    <h3 className="text-3xl font-headline font-black italic group-hover:text-primary transition-colors">
                      {role.title}
                    </h3>
                    <div className="flex items-center gap-6 text-muted-foreground font-bold text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        {role.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        Immediate Start
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed font-semibold">
                      {role.description}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                    <Button className={cn(
                      "rounded-full px-8 h-14 text-sm font-black uppercase tracking-widest text-white border-none group/btn shadow-lg",
                      role.color
                    )}>
                      Apply Now <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </Button>
                    <Link href="/contact" className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
                      Questions?
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
