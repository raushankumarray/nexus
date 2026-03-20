
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Cpu, Target, Zap } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[80%] h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse delay-700" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Empowering Innovation
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-[1.1]">
            Building Powerful <span className="text-primary italic">Software</span> for the <span className="text-gradient">Digital Future</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-lg leading-relaxed font-medium">
            At NPB Media, we help businesses transform their ideas into scalable digital solutions. Our team specializes in developing innovative software, modern web platforms, and high-performance applications that empower companies to grow faster.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="rounded-full px-10 h-16 text-lg font-headline shadow-2xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 group">
              Start Your Project <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Link href="/services">
              <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg font-headline border-2 hover:bg-muted transition-all">
                Explore Our Services
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-xl">Innovation</p>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Future-Ready Tech</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-xl">Strategy</p>
                <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Data-Driven Results</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative animate-in fade-in zoom-in duration-1000 delay-300 hidden lg:block">
          <div className="relative p-1 bg-gradient-to-br from-primary/30 via-transparent to-accent/30 rounded-[3rem]">
            <div className="bg-foreground rounded-[2.9rem] p-12 text-white space-y-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full animate-float" />
              <div className="space-y-4 relative z-10">
                <h3 className="text-4xl font-headline font-bold">Our Edge</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  We combine creativity, technology, and strategy to deliver solutions that drive real business results for startups and enterprises globally.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-12 pt-4 relative z-10">
                <div className="space-y-1">
                  <span className="text-6xl font-black text-primary">10+</span>
                  <p className="text-slate-300 font-bold uppercase tracking-widest text-xs">Successful Projects</p>
                </div>
                <div className="space-y-1">
                  <span className="text-6xl font-black text-secondary">7+</span>
                  <p className="text-slate-300 font-bold uppercase tracking-widest text-xs">Global Clients</p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex items-center gap-4 text-sm text-slate-400 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Zap className="text-secondary w-5 h-5" />
                </div>
                Empowering businesses through cutting-edge tech.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
