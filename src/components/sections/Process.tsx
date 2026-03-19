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
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    num: "01",
    title: "Discovery & Consultation",
    desc: "We understand your business goals, technical requirements, and target audience.",
    icon: Search,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    num: "02",
    title: "Strategic Planning",
    desc: "Our team prepares a roadmap and architecture for efficient development.",
    icon: Map,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    num: "03",
    title: "UI/UX Design",
    desc: "Creating visually engaging and user-friendly interfaces.",
    icon: PenTool,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    num: "04",
    title: "Development",
    desc: "Our developers build secure, scalable, and high-performance systems.",
    icon: Code2,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
  {
    num: "05",
    title: "Testing & QA",
    desc: "Ensuring the product meets performance and security standards.",
    icon: ShieldCheck,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    num: "06",
    title: "Deployment",
    desc: "Launching the software smoothly in the production environment.",
    icon: Rocket,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    num: "07",
    title: "Maintenance & Support",
    desc: "Providing ongoing updates, improvements, and technical support.",
    icon: RefreshCw,
    color: "text-primary",
    bg: "bg-primary/10",
  }
];

export function Process() {
  return (
    <section id="process" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
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
            <span>Discovery</span>
            <ArrowRight className="w-4 h-4" />
            <span>Launch</span>
            <ArrowRight className="w-4 h-4" />
            <span>Scale</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className={cn(
                "group relative p-8 rounded-[2.5rem] bg-white border border-border/50 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden animate-in fade-in slide-in-from-bottom",
                idx === steps.length - 1 && "lg:col-span-2 xl:col-span-1"
              )}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Subtle background number */}
              <div className="absolute -top-4 -right-4 text-9xl font-black text-slate-50 group-hover:text-primary/5 transition-colors duration-500 pointer-events-none select-none">
                {step.num}
              </div>

              <div className="relative z-10 space-y-6">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-sm",
                  step.bg,
                  step.color
                )}>
                  <step.icon className="w-7 h-7" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-primary font-code">{step.num}</span>
                    <h3 className="text-xl font-bold font-headline leading-tight group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br from-transparent to-primary/5 rounded-tl-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}

          {/* Final Call to Action integrated into the grid */}
          <div className="xl:col-span-1 p-8 rounded-[2.5rem] bg-foreground text-white flex flex-col justify-center items-center text-center space-y-4 animate-in fade-in zoom-in duration-700 delay-700">
            <h4 className="text-xl font-bold font-headline">Ready to Start?</h4>
            <p className="text-slate-400 text-sm">Let's discuss your project today.</p>
            <button className="w-full py-3 bg-primary hover:bg-primary/90 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-primary/20">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
