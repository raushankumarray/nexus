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
  { name: "E-Commerce", icon: ShoppingBag, color: "from-orange-500 to-red-500" },
  { name: "Healthcare", icon: Stethoscope, color: "from-blue-500 to-cyan-500" },
  { name: "Education", icon: GraduationCap, color: "from-green-500 to-emerald-500" },
  { name: "FinTech", icon: Wallet, color: "from-purple-500 to-indigo-500" },
  { name: "Logistics", icon: Truck, color: "from-yellow-500 to-orange-500" },
  { name: "Real Estate", icon: Home, color: "from-pink-500 to-rose-500" },
  { name: "Media & Entertainment", icon: PlayCircle, color: "from-red-500 to-orange-500" },
  { name: "SaaS Platforms", icon: Layers, color: "from-indigo-500 to-blue-500" }
];

export function Industries() {
  return (
    <section id="industries" className="py-32 bg-foreground text-white overflow-hidden relative">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-primary text-sm font-bold uppercase tracking-widest">
                <Globe className="w-4 h-4" />
                Sector Expertise
              </div>
              <h2 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
                Industries We <span className="text-primary italic">Serve</span>
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
                NPB Media develops tailored software solutions for diverse global industries, addressing unique challenges with engineering precision.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-3 border-l-4 border-primary pl-6">
                <span className="text-6xl font-black text-white">2+</span>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Years Experience</p>
              </div>
              <div className="space-y-3 border-l-4 border-secondary pl-6">
                <span className="text-6xl font-black text-white">Global</span>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Reach & Support</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {industries.map((industry, idx) => (
              <div 
                key={idx} 
                className="group p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl rounded-full" />
                
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
                  <industry.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{industry.name}</h3>
                <ArrowRight className="w-5 h-5 mt-4 text-white/30 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}