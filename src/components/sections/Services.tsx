
"use client";

import React from "react";
import { Code2, Globe, Smartphone, Building2, Cloud, Network, ArrowRight, Zap, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Custom Software Development",
    description: "We design and develop custom software solutions tailored to your unique business requirements.",
    icon: Code2,
    color: "bg-orange-500",
    shadow: "shadow-orange-500/20",
    accent: "border-orange-500/20",
  },
  {
    title: "Web Application Development",
    description: "Secure, scalable, and high-performance web applications using modern frameworks.",
    icon: Globe,
    color: "bg-blue-500",
    shadow: "shadow-blue-500/20",
    accent: "border-blue-500/20",
  },
  {
    title: "Mobile Application Development",
    description: "Feature-rich mobile applications for Android and iOS platforms.",
    icon: Smartphone,
    color: "bg-emerald-500",
    shadow: "shadow-emerald-500/20",
    accent: "border-emerald-500/20",
  },
  {
    title: "Enterprise Software Solutions",
    description: "Advanced software systems to streamline business operations and increase productivity.",
    icon: Building2,
    color: "bg-indigo-500",
    shadow: "shadow-indigo-500/20",
    accent: "border-indigo-500/20",
  },
  {
    title: "Cloud Solutions",
    description: "Cloud infrastructure setup, migration, and optimization for scalable business systems.",
    icon: Cloud,
    color: "bg-purple-500",
    shadow: "shadow-purple-500/20",
    accent: "border-purple-500/20",
  },
  {
    title: "API Development & Integration",
    description: "Seamless integration between platforms, applications, and third-party services.",
    icon: Network,
    color: "bg-pink-500",
    shadow: "shadow-pink-500/20",
    accent: "border-pink-500/20",
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 bg-muted/20 relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Our Expertise
            </div>
            <h2 className="text-5xl md:text-6xl font-headline font-bold">
              Our <span className="text-primary italic">Services</span>
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              We deliver powerful solutions that combine creativity, technology, and strategy to drive real results.
            </p>
          </div>
          <div className="hidden md:block">
            <Zap className="w-12 h-12 text-primary animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={cn(
                "group relative border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 rounded-[3rem] overflow-hidden bg-white",
                service.accent
              )}
            >
              <CardHeader className="space-y-8 p-10">
                <div className={cn(
                  "w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-xl text-white",
                  service.color,
                  service.shadow
                )}>
                  <service.icon className="w-10 h-10" />
                </div>
                <div className="space-y-4">
                  <CardTitle className="text-3xl font-headline font-bold group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-lg leading-relaxed text-muted-foreground/80">
                    {service.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <div className="px-10 pb-10">
                <button className="text-base font-bold text-primary flex items-center gap-2 group/btn hover:underline underline-offset-8 decoration-2">
                  Learn More 
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                </button>
              </div>
              
              {/* Dynamic hover reveal element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
