"use client";

import React from "react";
import { Search, Map, PenTool, Code2, ShieldCheck, Rocket, RefreshCw } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We understand your goals and technical requirements.",
    icon: Search,
  },
  {
    num: "02",
    title: "Planning",
    desc: "A roadmap and architecture for efficient development.",
    icon: Map,
  },
  {
    num: "03",
    title: "Design",
    desc: "Creating visually engaging and user-friendly interfaces.",
    icon: PenTool,
  },
  {
    num: "04",
    title: "Development",
    desc: "Building secure, scalable, and high-performance systems.",
    icon: Code2,
  },
  {
    num: "05",
    title: "QA & Testing",
    desc: "Ensuring top performance and security standards.",
    icon: ShieldCheck,
  },
  {
    num: "06",
    title: "Deployment",
    desc: "Launching smoothly in the production environment.",
    icon: Rocket,
  },
  {
    num: "07",
    title: "Support",
    desc: "Ongoing updates and technical maintenance.",
    icon: RefreshCw,
  }
];

export function Process() {
  return (
    <section id="process" className="py-20 bg-muted/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
            Our Workflow
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">The <span className="text-primary italic">Process</span></h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A systematic, data-driven approach to resilient digital products.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10 hidden lg:block -translate-x-1/2 rounded-full" />
          
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, idx) => (
              <div key={idx} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2 px-0 lg:px-12 flex flex-col justify-center animate-in fade-in slide-in-from-bottom duration-700">
                  <div className={`group p-8 bg-white rounded-[2rem] shadow-lg hover:shadow-xl transition-all duration-500 border border-transparent hover:border-primary/10 ${idx % 2 !== 0 ? 'lg:text-right' : ''}`}>
                    <span className="text-4xl font-headline font-black text-primary/10 mb-4 block group-hover:text-primary/20 transition-colors">{step.num}</span>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
                
                {/* Visual Node */}
                <div className="relative z-10 w-16 h-16 rounded-[1.2rem] bg-white border-4 border-muted shadow-xl flex items-center justify-center text-primary group transition-all duration-500 hover:rotate-6 hover:scale-105">
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 rounded-[1rem] transition-opacity" />
                  <step.icon className="w-7 h-7" />
                </div>
                
                <div className="w-full lg:w-1/2 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
