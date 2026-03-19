"use client";

import React from "react";
import { 
  Search, 
  Map, 
  PenTool, 
  Code2, 
  ShieldCheck, 
  Rocket, 
  RefreshCw,
  ArrowRight,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    num: "01",
    title: "Discovery & Consultation",
    desc: "We understand your business goals, technical requirements, and target audience through deep-dive workshops.",
    icon: Search,
    color: "group-hover:text-orange-500",
    bg: "bg-orange-500/10",
    glow: "shadow-orange-500/20",
  },
  {
    num: "02",
    title: "Strategic Planning",
    desc: "Our team prepares a precise roadmap and scalable architecture for highly efficient development cycles.",
    icon: Map,
    color: "group-hover:text-blue-500",
    bg: "bg-blue-500/10",
    glow: "shadow-blue-500/20",
  },
  {
    num: "03",
    title: "UI/UX Design",
    desc: "Creating visually engaging and user-friendly interfaces that maximize user retention and brand impact.",
    icon: PenTool,
    color: "group-hover:text-emerald-500",
    bg: "bg-emerald-500/10",
    glow: "shadow-emerald-500/20",
  },
  {
    num: "04",
    title: "Development",
    desc: "Our expert developers build secure, scalable, and high-performance systems using the modern tech stack.",
    icon: Code2,
    color: "group-hover:text-indigo-500",
    bg: "bg-indigo-500/10",
    glow: "shadow-indigo-500/20",
  },
  {
    num: "05",
    title: "Testing & QA",
    desc: "Ensuring the product meets the highest performance and security standards through rigorous automated testing.",
    icon: ShieldCheck,
    color: "group-hover:text-purple-500",
    bg: "bg-purple-500/10",
    glow: "shadow-purple-500/20",
  },
  {
    num: "06",
    title: "Deployment",
    desc: "Launching the software smoothly in the production environment with continuous monitoring and zero downtime.",
    icon: Rocket,
    color: "group-hover:text-pink-500",
    bg: "bg-pink-500/10",
    glow: "shadow-pink-500/20",
  },
  {
    num: "07",
    title: "Maintenance & Support",
    desc: "Providing ongoing updates, improvements, and round-the-clock technical support for peak performance.",
    icon: RefreshCw,
    color: "group-hover:text-primary",
    bg: "bg-primary/10",
    glow: "shadow-primary/20",
  }
];

export function Process() {
  return (
    <section id="process" className="py-20 bg-background relative overflow-hidden">
      {/* Dynamic Background Patterns */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
              Our Workflow
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">
              The <span className="text-primary italic">Process</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A systematic, data-driven approach to building resilient digital products.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-tighter">
            <span className="flex items-center gap-2"><Search className="w-4 h-4 text-primary" /> Discovery</span>
            <ArrowRight className="w-4 h-4" />
            <span className="flex items-center gap-2"><Rocket className="w-4 h-4 text-primary" /> Launch</span>
            <ArrowRight className="w-4 h-4" />
            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Scale</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className={cn(
                "group relative p-8 rounded-[2.5rem] bg-white border border-border/50 shadow-sm transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 overflow-hidden animate-in fade-in slide-in-from-bottom",
                idx === steps.length - 1 && "lg:col-span-2 xl:col-span-1"
              )}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Background Animated Scanning Light Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

              {/* Step Number Background */}
              <div className="absolute -top-6 -right-6 text-[10rem] font-black text-slate-50/50 group-hover:text-primary/5 transition-colors duration-700 pointer-events-none select-none">
                {step.num}
              </div>

              <div className="relative z-10 h-full flex flex-col">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-[360deg] shadow-sm mb-8",
                  step.bg,
                  "text-slate-400 group-hover:bg-primary group-hover:text-white"
                )}>
                  <step.icon className="w-8 h-8" />
                </div>

                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-primary/40 group-hover:text-primary transition-colors">STEP {step.num}</span>
                    <div className="h-px flex-1 bg-border/50 group-hover:bg-primary/20 transition-colors" />
                  </div>
                  
                  <h3 className="text-2xl font-bold font-headline leading-tight group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed text-sm opacity-80 group-hover:opacity-100 transition-opacity">
                    {step.desc}
                  </p>
                </div>

                {/* 'Working' Indicator shown on hover */}
                <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">In Progress</span>
                </div>
              </div>

              {/* Corner Glow Accent */}
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent to-primary/10 rounded-tl-[4rem] translate-x-12 translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700" />
            </div>
          ))}

          {/* Final Call to Action card */}
          <div className="xl:col-span-1 p-8 rounded-[2.5rem] bg-foreground text-white flex flex-col justify-center items-center text-center space-y-6 animate-in fade-in zoom-in duration-700 delay-700 group overflow-hidden relative">
            <div className="absolute inset-0 grid-bg opacity-10" />
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10 space-y-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                <Zap className="text-primary w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold font-headline">Ready to Start?</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Let&apos;s turn your vision into a scalable digital product.</p>
              <button className="w-full py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
