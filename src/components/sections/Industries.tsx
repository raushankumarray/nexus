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
  { name: "E-Commerce", icon: ShoppingBag, color: "bg-orange-500" },
  { name: "Healthcare", icon: Stethoscope, color: "bg-blue-600" },
  { name: "Education", icon: GraduationCap, color: "bg-emerald-600" },
  { name: "FinTech", icon: Wallet, color: "bg-indigo-600" },
  { name: "Logistics", icon: Truck, color: "bg-purple-600" },
  { name: "Real Estate", icon: Home, color: "bg-pink-600" },
  { name: "Media & Entertainment", icon: PlayCircle, color: "bg-red-600" },
  { name: "SaaS Platforms", icon: Layers, color: "bg-cyan-600" }
];

export function Industries() {
  return (
    <section id="industries" className="py-32 bg-foreground text-white overflow-hidden relative">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[200px] -z-10 animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 border-2 border-white/20 text-primary text-sm font-black uppercase tracking-widest shadow-2xl">
                <Globe className="w-5 h-5" />
                Sector Expertise
              </div>
              <h2 className="text-6xl md:text-8xl font-headline font-black leading-tight italic">
                Industries We <span className="text-primary">Serve</span>
              </h2>
              <p className="text-2xl text-slate-300 leading-relaxed max-w-xl font-semibold">
                NPB Media develops tailored software solutions for diverse global industries with engineering precision.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
              <div className="space-y-2 border-l-8 border-primary pl-6">
                <span className="text-6xl font-black text-white italic">10+</span>
                <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Projects</p>
              </div>
              <div className="space-y-2 border-l-8 border-secondary pl-6">
                <span className="text-6xl font-black text-white italic">7+</span>
                <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Global Clients</p>
              </div>
              <div className="space-y-2 border-l-8 border-primary pl-6">
                <span className="text-6xl font-black text-white italic">2+</span>
                <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Years Exp</p>
              </div>
              <div className="space-y-2 border-l-8 border-secondary pl-6">
                <span className="text-6xl font-black text-white italic">Global</span>
                <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Network</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {industries.map((industry, idx) => (
              <div 
                key={idx} 
                className="group p-10 bg-white/5 border-2 border-white/10 rounded-[3.5rem] hover:bg-white/10 hover:border-primary/50 transition-all duration-700 hover:-translate-y-4 hover:scale-105 relative overflow-hidden"
              >
                <div className={`w-16 h-16 rounded-[1.8rem] ${industry.color} flex items-center justify-center text-white mb-8 group-hover:scale-125 group-hover:rotate-[360deg] transition-all duration-700 shadow-2xl`}>
                  <industry.icon className="w-8 h-8" />
                </div>
                <h3 className="font-black text-2xl group-hover:text-primary transition-colors font-headline italic">{industry.name}</h3>
                <ArrowRight className="w-8 h-8 mt-6 text-white/30 group-hover:text-primary group-hover:translate-x-4 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}