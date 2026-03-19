"use client";

import React from "react";
import { 
  ShoppingBag, 
  Stethoscope, 
  GraduationCap, 
  Wallet, 
  Truck, 
  Home, 
  PlayCircle, 
  Layers,
  Globe,
  ArrowRight
} from "lucide-react";

const industries = [
  { name: "E-Commerce", icon: ShoppingBag },
  { name: "Healthcare", icon: Stethoscope },
  { name: "Education", icon: GraduationCap },
  { name: "FinTech", icon: Wallet },
  { name: "Logistics", icon: Truck },
  { name: "Real Estate", icon: Home },
  { name: "Media", icon: PlayCircle },
  { name: "SaaS", icon: Layers }
];

export function Industries() {
  return (
    <section id="industries" className="py-20 bg-foreground text-white overflow-hidden relative">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-primary text-xs font-bold uppercase tracking-widest">
                <Globe className="w-3.5 h-3.5" />
                Sector Expertise
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">
                Industries We <span className="text-primary italic">Serve</span>
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                NPB Media develops tailored software solutions for diverse global industries with engineering precision.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-1 border-l-4 border-primary pl-4">
                <span className="text-4xl font-black text-white">2+</span>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Years Experience</p>
              </div>
              <div className="space-y-1 border-l-4 border-secondary pl-4">
                <span className="text-4xl font-black text-white">Global</span>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Support</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {industries.map((industry, idx) => (
              <div 
                key={idx} 
                className="group p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                  <industry.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base group-hover:text-primary transition-colors">{industry.name}</h3>
                <ArrowRight className="w-4 h-4 mt-2 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
