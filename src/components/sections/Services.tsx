"use client";

import React from "react";
import { Code2, Globe, Smartphone, Building2, Cloud, Network, ArrowRight, Zap, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Custom Software Development",
    description: "Tailored applications designed specifically for your unique business requirements.",
    icon: Code2,
    color: "bg-orange-500",
    hoverBg: "group-hover:bg-orange-600",
    shadow: "shadow-orange-500/30",
    accent: "border-orange-500/20",
    anim: "hover:-rotate-1"
  },
  {
    title: "Web Application Development",
    description: "Secure, scalable, and high-performance web solutions using modern frameworks.",
    icon: Globe,
    color: "bg-blue-600",
    hoverBg: "group-hover:bg-blue-700",
    shadow: "shadow-blue-600/30",
    accent: "border-blue-600/20",
    anim: "hover:rotate-1"
  },
  {
    title: "Mobile Application Development",
    description: "Feature-rich mobile applications for Android and iOS platforms.",
    icon: Smartphone,
    color: "bg-emerald-600",
    hoverBg: "group-hover:bg-emerald-700",
    shadow: "shadow-emerald-600/30",
    accent: "border-emerald-600/20",
    anim: "hover:skew-x-1"
  },
  {
    title: "Enterprise Software Solutions",
    description: "Advanced systems to streamline operations and increase productivity.",
    icon: Building2,
    color: "bg-indigo-600",
    hoverBg: "group-hover:bg-indigo-700",
    shadow: "shadow-indigo-600/30",
    accent: "border-indigo-600/20",
    anim: "hover:-skew-y-1"
  },
  {
    title: "Cloud Solutions",
    description: "Infrastructure setup, migration, and optimization for scalable systems.",
    icon: Cloud,
    color: "bg-purple-600",
    hoverBg: "group-hover:bg-purple-700",
    shadow: "shadow-purple-600/30",
    accent: "border-purple-600/20",
    anim: "hover:rotate-2"
  },
  {
    title: "API Development & Integration",
    description: "Seamless connectivity between platforms and third-party services.",
    icon: Network,
    color: "bg-pink-600",
    hoverBg: "group-hover:bg-pink-700",
    shadow: "shadow-pink-600/30",
    accent: "border-pink-600/20",
    anim: "hover:-rotate-2"
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[150px] animate-pulse delay-700" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/20 border-2 border-primary/30 text-primary text-sm font-black uppercase tracking-widest shadow-md">
              <Sparkles className="w-5 h-5" />
              Our Expertise
            </div>
            <h2 className="text-6xl md:text-8xl font-headline font-black leading-tight">
              Our <span className="text-primary italic">Services</span>
            </h2>
            <p className="text-2xl text-muted-foreground leading-relaxed font-semibold">
              Hover to explore how we deliver powerful solutions that combine creativity, technology, and strategy.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-spin-slow">
              <Zap className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={cn(
                "group relative border-none transition-all duration-500 rounded-[4rem] overflow-hidden bg-white shadow-2xl p-4 min-h-[400px] flex flex-col justify-center cursor-pointer",
                service.anim
              )}
            >
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-0",
                service.hoverBg
              )} />
              
              <div className="relative z-10 p-10 flex flex-col items-center text-center transition-all duration-500 group-hover:-translate-y-4">
                <div className={cn(
                  "w-24 h-24 rounded-[2.5rem] flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-[360deg] shadow-2xl text-white mb-10",
                  service.color,
                  service.shadow
                )}>
                  <service.icon className="w-12 h-12" />
                </div>
                
                <h3 className="text-3xl font-headline font-black group-hover:text-white transition-colors mb-4">
                  {service.title}
                </h3>

                <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                  <p className="text-lg leading-relaxed text-white/90 font-medium px-4">
                    {service.description}
                  </p>
                  <div className="mt-8 flex items-center justify-center gap-2 text-white font-black">
                    Explore <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
