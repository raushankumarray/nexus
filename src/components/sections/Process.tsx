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
    <section id="process" className="py-24 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h4 className="text-primary font-bold tracking-widest uppercase text-sm">Our Workflow</h4>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">The <span className="text-primary italic">Process</span></h2>
          <p className="text-muted-foreground text-lg">
            A systematic approach to building resilient digital products.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden lg:block" />
          
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, idx) => (
              <div key={idx} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="w-full lg:w-1/2 px-0 lg:px-12 flex flex-col justify-center">
                  <div className={`p-8 bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition-all ${idx % 2 !== 0 ? 'lg:text-right' : ''}`}>
                    <span className="text-4xl font-headline font-black text-primary/20 mb-4 block">{step.num}</span>
                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
                
                {/* Node */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-white border-4 border-primary shadow-xl flex items-center justify-center text-primary">
                  <step.icon className="w-8 h-8" />
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
