"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Cpu, Target, Zap } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Dynamic Background Elements - More Colorful */}
      <div className="absolute top-0 right-0 w-[80%] h-full bg-primary/10 -skew-x-12 translate-x-1/4 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[150px] animate-pulse delay-700" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(242,140,48,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-10 animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/20 border-2 border-primary/40 text-primary text-sm font-black tracking-widest uppercase shadow-lg shadow-primary/20">
            <Sparkles className="w-4 h-4" />
            Empowering Innovation
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-headline font-black leading-[1] tracking-tighter">
            Building Powerful <span className="text-primary italic drop-shadow-sm">Software</span> for the <span className="text-gradient">Digital Future</span>
          </h1>
          
          <p className="text-2xl text-muted-foreground max-w-xl leading-relaxed font-semibold">
            At NPB Media, we help businesses transform their ideas into scalable digital solutions. We empower companies to grow faster through future-ready tech.
          </p>
          
          <div className="flex flex-wrap gap-6 pt-6">
            <Button size="lg" className="rounded-full px-12 h-20 text-xl font-headline shadow-2xl shadow-primary/30 bg-primary hover:bg-primary/90 transition-all hover:scale-110 active:scale-95 group">
              Start Your Project <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
            </Button>
            <Link href="/services">
              <Button size="lg" variant="outline" className="rounded-full px-12 h-20 text-xl font-headline border-4 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                Explore Services
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 pt-10">
            <div className="flex items-center gap-5 group cursor-pointer">
              <div className="w-16 h-16 rounded-[2rem] bg-secondary/30 flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-xl">
                <Cpu className="w-8 h-8" />
              </div>
              <div>
                <p className="font-black text-2xl">Innovation</p>
                <p className="text-sm text-muted-foreground font-black uppercase tracking-widest">Future-Ready Tech</p>
              </div>
            </div>
            <div className="flex items-center gap-5 group cursor-pointer">
              <div className="w-16 h-16 rounded-[2rem] bg-accent/30 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white group-hover:-rotate-12 transition-all duration-500 shadow-xl">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <p className="font-black text-2xl">Strategy</p>
                <p className="text-sm text-muted-foreground font-black uppercase tracking-widest">Data-Driven Results</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative animate-in fade-in zoom-in duration-1000 delay-300 hidden lg:block">
          <div className="relative p-2 bg-gradient-to-br from-primary via-accent to-secondary rounded-[4rem] shadow-2xl">
            <div className="bg-foreground rounded-[3.8rem] p-16 text-white space-y-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/30 blur-[120px] rounded-full animate-float" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full animate-float delay-1000" />
              
              <div className="space-y-6 relative z-10">
                <h3 className="text-5xl font-headline font-black italic text-primary">Our Edge</h3>
                <p className="text-slate-300 text-2xl leading-relaxed font-medium">
                  We combine creativity, technology, and strategy to deliver solutions that drive real results.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-16 pt-6 relative z-10">
                <div className="space-y-2">
                  <span className="text-7xl font-black text-primary drop-shadow-md">10+</span>
                  <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Successful Projects</p>
                </div>
                <div className="space-y-2">
                  <span className="text-7xl font-black text-secondary drop-shadow-md">7+</span>
                  <p className="text-slate-400 font-black uppercase tracking-widest text-sm">Global Clients</p>
                </div>
              </div>

              <div className="pt-12 border-t border-white/20 flex items-center gap-6 text-lg text-slate-300 relative z-10">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center animate-bounce">
                  <Zap className="text-secondary w-7 h-7" />
                </div>
                <span className="font-bold">Empowering businesses through cutting-edge tech.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}