"use client";

import React from "react";
import { Search, Map, PenTool, Code2, ShieldCheck, Rocket, RefreshCw } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Discovery & Consultation",
    desc: "We understand your business goals, technical requirements, and target audience.",
    icon: Search,
    color: "bg-primary"
  },
  {
    num: "02",
    title: "Strategic Planning",
    desc: "Our team prepares a roadmap and architecture for efficient development.",
    icon: Map,
    color: "bg-secondary"
  },
  {
    num: "03",
    title: "UI/UX Design",
    desc: "Creating visually engaging and user-friendly interfaces.",
    icon: PenTool,
    color: "bg-accent"
  },
  {
    num: "04",
    title: "Development",
    desc: "Our developers build secure, scalable, and high-performance systems.",
    icon: Code2,
    color: "bg-primary"
  },
  {
    num: "05",
    title: "Testing & QA",
    desc: "Ensuring the product meets performance and security standards.",
    icon: ShieldCheck,
    color: "bg-secondary"
  },
  {
    num: "06",
    title: "Deployment",
    desc: "Launching the software smoothly in the production environment.",
    icon: Rocket,
    color: "bg-accent"
  },
  {
    num: "07",
    title: "Maintenance & Support",
    desc: "Providing ongoing updates, improvements, and technical support.",
    icon: RefreshCw,
    color: "bg-foreground"
  }
];

export function Process() {
  return (
    <section id="process" className="py-32 bg-muted/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-32 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-widest uppercase">
            Our Workflow
          </div>
          <h2 className="text-5xl md:text-6xl font-headline font-bold">The <span className="text-primary italic">Process</span></h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
            A systematic, data-driven approach to building resilient digital products.
          </p>
        </div>

        <div className="relative">
          {/* Central connection line for desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 hidden lg:block -translate-x-1/2 rounded-full" />
          
          <div className="space-y-24 lg:space-y-0">
            {steps.map((step, idx) => (
              <div key={idx} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-0 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2 px-0 lg:px-16 flex flex-col justify-center animate-in fade-in slide-in-from-bottom duration-700">
                  <div className={`group p-12 bg-white rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-primary/10 ${idx % 2 !== 0 ? 'lg:text-right' : ''}`}>
                    <span className="text-6xl font-headline font-black text-primary/10 mb-6 block group-hover:text-primary/20 transition-colors">{step.num}</span>
                    <h3 className="text-3xl font-bold mb-6 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {step.desc}
                    </p>
                  </div>
                </div>
                
                {/* Visual Node */}
                <div className="relative z-10 w-24 h-24 rounded-[2rem] bg-white border-8 border-muted shadow-2xl flex items-center justify-center text-primary group transition-all duration-500 hover:rotate-12 hover:scale-110">
                  <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 rounded-[1.5rem] transition-opacity" />
                  <step.icon className="w-10 h-10" />
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