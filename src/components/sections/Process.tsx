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
  Zap,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    num: "01",
    title: "Discovery & Consultation",
    desc: "Understanding your business goals and technical requirements through deep-dive workshops.",
    icon: Search,
    color: "bg-orange-500",
    hoverColor: "group-hover:bg-orange-600",
  },
  {
    num: "02",
    title: "Strategic Planning",
    desc: "Preparing a precise roadmap and scalable architecture for efficient development.",
    icon: Map,
    color: "bg-blue-600",
    hoverColor: "group-hover:bg-blue-700",
  },
  {
    num: "03",
    title: "UI/UX Design",
    desc: "Creating visually engaging and user-friendly interfaces that maximize brand impact.",
    icon: PenTool,
    color: "bg-emerald-600",
    hoverColor: "group-hover:bg-emerald-700",
  },
  {
    num: "04",
    title: "Development",
    desc: "Our expert developers build secure, scalable, and high-performance systems.",
    icon: Code2,
    color: "bg-indigo-600",
    hoverColor: "group-hover:bg-indigo-700",
  },
  {
    num: "05",
    title: "Testing & QA",
    desc: "Ensuring the product meets the highest standards through rigorous automated testing.",
    icon: ShieldCheck,
    color: "bg-purple-600",
    hoverColor: "group-hover:bg-purple-700",
  },
  {
    num: "06",
    title: "Deployment",
    desc: "Launching the software smoothly in production with continuous monitoring.",
    icon: Rocket,
    color: "bg-pink-600",
    hoverColor: "group-hover:bg-pink-700",
  },
  {
    num: "07",
    title: "Maintenance & Support",
    desc: "Providing ongoing updates, improvements, and round-the-clock technical support to keep your systems running perfectly.",
    icon: RefreshCw,
    color: "bg-primary",
    hoverColor: "group-hover:bg-primary-foreground group-hover:text-primary",
  }
];

export function Process() {
  return (
    <section id="process" className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border-2 border-primary/30 text-primary text-sm font-black uppercase tracking-widest shadow-md">
              Our Workflow
            </div>
            <h2 className="text-6xl md:text-8xl font-headline font-black leading-[0.9]">
              The <span className="text-primary italic">Process</span>
            </h2>
            <p className="text-2xl text-muted-foreground leading-relaxed font-semibold">
              Hover over each step to see our detailed style of working.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-6 text-sm font-black text-muted-foreground uppercase tracking-widest">
            <span className="flex items-center gap-3 text-orange-500 animate-pulse"><Search className="w-6 h-6" /> Discovery</span>
            <ArrowRight className="w-6 h-6 opacity-30" />
            <span className="flex items-center gap-3 text-blue-600"><Rocket className="w-6 h-6" /> Launch</span>
            <ArrowRight className="w-6 h-6 opacity-30" />
            <span className="flex items-center gap-3 text-emerald-600"><Zap className="w-6 h-6" /> Scale</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className={cn(
                "group relative p-12 rounded-[4rem] bg-white border-none shadow-2xl transition-all duration-700 overflow-hidden min-h-[450px] flex flex-col cursor-help",
                idx % 2 === 0 ? "hover:rotate-1" : "hover:-rotate-1"
              )}
            >
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-0",
                step.hoverColor
              )} />
              
              <div className="absolute -top-12 -right-12 text-[14rem] font-black text-slate-100 group-hover:text-white/10 transition-colors duration-700 pointer-events-none select-none z-0">
                {step.num}
              </div>

              <div className="relative z-10 h-full flex flex-col flex-1">
                <div className={cn(
                  "w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-700 group-hover:scale-125 group-hover:rotate-[360deg] shadow-2xl mb-12 text-white",
                  step.color
                )}>
                  <step.icon className="w-10 h-10" />
                </div>

                <div className="space-y-8 flex-1">
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-black text-primary/40 group-hover:text-white transition-colors">STEP {step.num}</span>
                    <div className="h-1 flex-1 bg-primary/10 group-hover:bg-white/30 transition-colors" />
                  </div>
                  
                  <h3 className="text-3xl font-black font-headline leading-tight group-hover:text-white transition-colors italic">
                    {step.title}
                  </h3>
                  
                  {/* Content revealed on hover */}
                  <div className="overflow-hidden max-h-0 group-hover:max-h-60 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
                    <p className="text-xl text-muted-foreground leading-relaxed font-semibold group-hover:text-white transition-all pt-4">
                      {step.desc}
                    </p>
                    
                    {/* Special indicator for Step 7 */}
                    {step.num === "07" && (
                      <div className="mt-8 flex items-center gap-3 py-3 px-5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white animate-pulse">
                        <Activity className="w-5 h-5" />
                        <span className="text-sm font-black uppercase tracking-widest">Active 24/7 Support</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-auto pt-8 flex items-center gap-4 opacity-100 group-hover:opacity-0 transition-opacity">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Hover for Details</span>
                </div>
              </div>
            </div>
          ))}

          <div className="xl:col-span-1 p-12 rounded-[4rem] bg-gradient-to-br from-primary to-accent text-white flex flex-col justify-center items-center text-center space-y-10 group overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 grid-bg opacity-10" />
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative z-10 space-y-8">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-125 transition-transform shadow-xl">
                <Zap className="text-white w-12 h-12" />
              </div>
              <h4 className="text-4xl font-black font-headline italic">Ready to Start?</h4>
              <p className="text-white/80 text-xl leading-relaxed font-medium">Let&apos;s turn your vision into a scalable digital product.</p>
              <button className="w-full py-6 bg-white text-primary hover:bg-white/90 rounded-[2rem] text-2xl font-black transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-4">
                Get in Touch <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
