"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, ShieldCheck, Heart, Lightbulb, Eye, Target, CheckCircle2 } from "lucide-react";

const values = [
  {
    title: "Innovation",
    description: "We constantly explore new technologies to build future-ready solutions.",
    icon: Lightbulb,
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    title: "Quality",
    description: "Every product goes through strict QA to ensure top reliability.",
    icon: ShieldCheck,
    color: "text-secondary",
    bg: "bg-secondary/10"
  },
  {
    title: "Transparency",
    description: "We maintain open communication throughout the entire process.",
    icon: Eye,
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    title: "Customer Success",
    description: "Our success depends on yours. We grow together.",
    icon: Heart,
    color: "text-primary",
    bg: "bg-primary/10"
  }
];

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-6 animate-in fade-in slide-in-from-left duration-1000 ease-out">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border shadow-sm text-primary text-xs font-bold uppercase tracking-wider">
                <Rocket className="w-3.5 h-3.5" />
                Who We Are
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">
                Engineering <span className="text-primary italic">Reliability</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                NPB Media is a technology-driven company committed to building reliable, high-quality digital products for the modern market.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Startups & Small Businesses",
                  "Enterprise Scale Solutions",
                  "Complex Business Logic",
                  "Operational Efficiency"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary w-4 h-4" />
                    <span className="font-semibold text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-right duration-1000 ease-out delay-200">
            <Card className="border-none shadow-xl bg-white rounded-[2rem] p-3 transition-all hover:translate-x-1">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-headline font-bold">Our Vision</CardTitle>
                  <p className="text-muted-foreground text-sm mt-1">
                    To become a trusted technology partner for businesses worldwide.
                  </p>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-xl bg-white rounded-[2rem] p-3 transition-all hover:translate-x-1">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-headline font-bold">Our Mission</CardTitle>
                  <p className="text-muted-foreground text-sm mt-1">
                    To deliver innovative software solutions that solve real-world problems.
                  </p>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom duration-1000 ease-out">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Core <span className="text-primary">Values</span></h2>
            <p className="text-muted-foreground text-sm">The principles guiding our engineering excellence.</p>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div 
                key={idx} 
                style={{ animationDelay: `${idx * 100}ms` }}
                className="group p-8 bg-white rounded-[2rem] shadow-lg hover:shadow-xl transition-all duration-500 border border-transparent hover:border-primary/20 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom fill-mode-both"
              >
                <div className={`w-12 h-12 rounded-2xl ${value.bg} ${value.color} flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
