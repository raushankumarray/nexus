"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Cpu, Layers, Target, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            Engineering Reliability
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-[1.1]">
            Building Powerful <span className="text-primary italic">Software</span> for the <span className="text-gradient">Digital Future</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
            At NPB Media, we help businesses transform their ideas into scalable digital solutions. Our team specializes in developing innovative software and modern web platforms.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="rounded-full px-8 h-14 text-lg font-headline shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90">
              Start Your Project <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg font-headline border-2">
              Explore Our Services
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-primary">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-lg">Innovation</p>
                <p className="text-sm text-muted-foreground">Future-Ready Tech</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-lg">Strategy</p>
                <p className="text-sm text-muted-foreground">Data-Driven Results</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative animate-in fade-in zoom-in duration-1000 delay-200">
          <div className="relative p-8 bg-white/50 backdrop-blur-sm border border-border/50 rounded-[3rem] shadow-2xl">
            <div className="bg-foreground rounded-[2rem] p-10 text-white space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
              <div className="space-y-2">
                <h3 className="text-4xl font-headline font-bold">Our Edge</h3>
                <p className="text-slate-400 text-lg">
                  We combine creativity, technology, and strategy to deliver solutions that drive real results.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="space-y-1">
                  <span className="text-5xl font-bold text-primary">10+</span>
                  <p className="text-slate-300 font-medium">Successful Projects</p>
                </div>
                <div className="space-y-1">
                  <span className="text-5xl font-bold text-secondary">7+</span>
                  <p className="text-slate-300 font-medium">Global Clients</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center gap-4 text-sm text-slate-400">
                <Zap className="text-secondary w-5 h-5" />
                Empowering startups and enterprises globally.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
