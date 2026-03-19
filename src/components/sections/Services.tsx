"use client";

import React from "react";
import { Code2, Globe, Smartphone, Building2, Cloud, Network, ArrowRight, Zap, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Custom Software",
    description: "Bespoke software solutions tailored to your unique business requirements.",
    icon: Code2,
    color: "bg-orange-500",
    shadow: "shadow-orange-500/20",
    accent: "border-orange-500/20",
  },
  {
    title: "Web Applications",
    description: "Secure, scalable, and high-performance apps using modern frameworks.",
    icon: Globe,
    color: "bg-blue-500",
    shadow: "shadow-blue-500/20",
    accent: "border-blue-500/20",
  },
  {
    title: "Mobile Apps",
    description: "Feature-rich mobile applications for Android and iOS platforms.",
    icon: Smartphone,
    color: "bg-emerald-500",
    shadow: "shadow-emerald-500/20",
    accent: "border-emerald-500/20",
  },
  {
    title: "Enterprise Solutions",
    description: "Systems to streamline business operations and increase productivity.",
    icon: Building2,
    color: "bg-indigo-500",
    shadow: "shadow-indigo-500/20",
    accent: "border-indigo-500/20",
  },
  {
    title: "Cloud Solutions",
    description: "Infrastructure setup, migration, and optimization for scale.",
    icon: Cloud,
    color: "bg-purple-500",
    shadow: "shadow-purple-500/20",
    accent: "border-purple-500/20",
  },
  {
    title: "API Integration",
    description: "Seamless integration between platforms and third-party services.",
    icon: Network,
    color: "bg-pink-500",
    shadow: "shadow-pink-500/20",
    accent: "border-pink-500/20",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-muted/20 relative overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 animate-in fade-in slide-in-from-bottom duration-1000 ease-out">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Our Expertise
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">
              Our <span className="text-primary italic">Services</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Powerful solutions combining creativity, technology, and strategy.
            </p>
          </div>
          <div className="hidden md:block">
            <Zap className="w-10 h-10 text-primary animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={cn(
                "group relative border-2 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 rounded-[2.5rem] overflow-hidden bg-white animate-in fade-in slide-in-from-bottom fill-mode-both",
                service.accent
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="space-y-6 p-8">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg text-white",
                  service.color,
                  service.shadow
                )}>
                  <service.icon className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-xl font-headline font-bold group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground/80">
                    {service.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <div className="px-8 pb-8">
                <button className="text-sm font-bold text-primary flex items-center gap-2 group/btn hover:underline underline-offset-4 decoration-2">
                  Learn More 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}