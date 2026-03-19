"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Cpu, Target, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[80%] h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse delay-700" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-10 animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4" />
            Empowering Innovation
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-[1.05]">
            Building Powerful <span className="text-primary italic">Software</span> for the <span className="text-gradient">Digital Future</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
            At NPB Media, we help businesses transform their ideas into scalable digital solutions. Our team specializes in developing innovative software, modern web platforms, and high-performance applications.
          </p>
          
          <div className="flex flex-wrap gap-5 pt-4">
            <Button size="lg" className="rounded-full px-10 h-16 text-lg font-headline shadow-2xl shadow-primary/30 bg-primary hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 group">
              Start Your Project <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Link href="/services">
              <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg font-headline border-2 hover:bg-muted transition-all">
                Explore Services
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-xl">Innovation</p>
                <p className="text-sm text-muted-foreground font-medium">Future-Ready Tech</p>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-xl">Strategy</p>
                <p className="text-sm text-muted-foreground font-medium">Data-Driven Results</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative animate-in fade-in zoom-in duration-1000 delay-300">
          <div className="relative p-1 bg-gradient-to-br from-primary/30 via-transparent to-accent/30 rounded-[3rem]">
            <div className="bg-foreground rounded-[2.9rem] p-12 text-white space-y-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 blur-[80px] rounded-full animate-float" />
              <div className="space-y-4 relative z-10">
                <h3 className="text-4xl font-headline font-bold">Our Edge</h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  We combine creativity, technology, and strategy to deliver solutions that drive real results for startups and enterprises globally.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-10 pt-4 relative z-10">
                <div className="space-y-2">
                  <span className="text-6xl font-black text-primary">10+</span>
                  <p className="text-slate-300 font-bold uppercase tracking-wider text-xs">Successful Projects</p>
                </div>
                <div className="space-y-2">
                  <span className="text-6xl font-black text-secondary">7+</span>
                  <p className="text-slate-300 font-bold uppercase tracking-wider text-xs">Global Clients</p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex items-center gap-4 text-sm text-slate-400 relative z-10">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Zap className="text-secondary w-4 h-4" />
                </div>
                Empowering businesses to grow faster through tech.
              </div>
            </div>
          </div>
          {/* Decorative floating card */}
          <div className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-2xl animate-float delay-500 hidden sm:block">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm font-bold text-foreground">Cloud Systems Online</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}