"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
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
  Zap
} from "lucide-react";

const industries = [
  { name: "E-Commerce", icon: ShoppingBag },
  { name: "Healthcare", icon: Stethoscope },
  { name: "Education", icon: GraduationCap },
  { name: "FinTech", icon: Wallet },
  { name: "Logistics", icon: Truck },
  { name: "Real Estate", icon: Home },
  { name: "Media & Entertainment", icon: PlayCircle },
  { name: "SaaS Platforms", icon: Layers }
];

export function Industries() {
  return (
    <section id="industries" className="py-24 bg-foreground text-white overflow-hidden relative">
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h4 className="text-primary font-bold tracking-widest uppercase text-sm">Sector Expertise</h4>
              <h2 className="text-5xl font-headline font-bold leading-tight">
                Industries We <span className="text-primary italic">Serve</span>
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                NPB Media develops tailored software solutions for diverse global industries, addressing unique challenges with precision.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-2">
                <span className="text-5xl font-bold text-secondary">2+</span>
                <p className="text-slate-300 font-medium">Years Experience</p>
              </div>
              <div className="space-y-2">
                <span className="text-5xl font-bold text-primary">Global</span>
                <p className="text-slate-300 font-medium">Network Reach</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {industries.map((industry, idx) => (
              <div 
                key={idx} 
                className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <industry.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
