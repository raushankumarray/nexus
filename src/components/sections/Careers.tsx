"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight, Zap } from "lucide-react";

export function Careers() {
  return (
    <section id="careers" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-foreground p-16 md:p-28 rounded-[4rem] text-white flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
          
          <div className="space-y-8 relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold uppercase tracking-wider">
              <Users className="w-4 h-4" />
              Join the Team
            </div>
            <h2 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
              Careers at <span className="text-primary italic">NPB Media</span>
            </h2>
            <p className="text-2xl text-white/70 leading-relaxed font-light">
              We are looking for talented developers, designers, and innovators. If you're passionate about building the next generation of digital tools, we want to hear from you.
            </p>
            <div className="flex items-center gap-6 text-primary font-bold">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>Remote First</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span>Modern Stack</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 shrink-0">
            <Button size="lg" className="rounded-full px-16 h-20 text-2xl font-headline bg-white text-foreground hover:bg-primary hover:text-white transition-all duration-500 shadow-2xl group active:scale-95">
              View Positions <ArrowRight className="ml-4 w-8 h-8 transition-transform group-hover:translate-x-3" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}