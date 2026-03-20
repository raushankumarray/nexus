
"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, ShieldCheck, Heart, Lightbulb, Eye, Target, CheckCircle2, Sparkles } from "lucide-react";

const values = [
  {
    title: "Innovation",
    description: "We constantly explore new technologies and creative ideas to build future-ready solutions.",
    icon: Lightbulb,
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    title: "Quality",
    description: "Every product we develop goes through strict quality assurance to ensure performance and reliability.",
    icon: ShieldCheck,
    color: "text-secondary",
    bg: "bg-secondary/10"
  },
  {
    title: "Transparency",
    description: "We maintain open communication with clients throughout the entire development process.",
    icon: Eye,
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    title: "Customer Success",
    description: "Our success depends on the success of our clients. We grow together.",
    icon: Heart,
    color: "text-primary",
    bg: "bg-primary/10"
  }
];

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-24 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000 ease-out">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border shadow-sm text-primary text-xs font-bold uppercase tracking-wider">
                <Rocket className="w-4 h-4" />
                Who We Are
              </div>
              <h2 className="text-5xl md:text-6xl font-headline font-bold leading-tight">
                Engineering <span className="text-primary italic">Reliability</span>
              </h2>
              <div className="space-y-4">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  NPB Media is a technology-driven software development company committed to building reliable and high-quality digital products.
                </p>
                <p className="text-lg text-muted-foreground/80 leading-relaxed">
                  Our team of developers, designers, and technology experts work together to create solutions that solve complex business challenges and improve operational efficiency. We partner with startups, small businesses, and enterprises to deliver powerful software solutions tailored to their needs.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Startups & Small Businesses",
                  "Enterprise Scale Solutions",
                  "Complex Business Logic",
                  "Operational Efficiency"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary w-5 h-5" />
                    <span className="font-bold text-base text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-right duration-1000 ease-out delay-200">
            <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] p-6 transition-all hover:translate-x-2 group">
              <CardHeader className="flex flex-row items-center gap-6 space-y-0 p-4">
                <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                  <Eye className="w-8 h-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-headline font-bold">Our Vision</CardTitle>
                  <p className="text-muted-foreground text-base mt-2">
                    To become a trusted technology partner for businesses worldwide.
                  </p>
                </div>
              </CardHeader>
            </Card>

            <Card className="border-none shadow-2xl bg-white rounded-[2.5rem] p-6 transition-all hover:translate-x-2 group">
              <CardHeader className="flex flex-row items-center gap-6 space-y-0 p-4">
                <div className="w-16 h-16 rounded-[1.5rem] bg-secondary/10 flex items-center justify-center text-secondary shrink-0 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-headline font-bold">Our Mission</CardTitle>
                  <p className="text-muted-foreground text-base mt-2">
                    To deliver innovative software solutions that solve real-world problems.
                  </p>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        <div className="space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-1000 ease-out">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Excellence Driven
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Our Core <span className="text-primary">Values</span></h2>
            <p className="text-muted-foreground text-lg">The principles guiding our engineering excellence.</p>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div 
                key={idx} 
                style={{ animationDelay: `${idx * 150}ms` }}
                className="group p-10 bg-white rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-primary/20 hover:-translate-y-3 animate-in fade-in slide-in-from-bottom fill-mode-both"
              >
                <div className={`w-16 h-16 rounded-[1.5rem] ${value.bg} ${value.color} flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 font-headline">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
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
