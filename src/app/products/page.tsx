"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Sparkles, 
  ArrowRight, 
  Rocket, 
  Zap, 
  Layers,
  ShieldCheck,
  Globe
} from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Hero Overview Section */}
      <section className="relative pt-32 pb-20 overflow-hidden vibrant-gradient text-white">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/20 border-2 border-white/30 text-white text-sm font-black uppercase tracking-widest shadow-xl backdrop-blur-md">
                <Package className="w-5 h-5 text-yellow-300" />
                Product Ecosystem
              </div>
              <h1 className="text-6xl md:text-8xl font-headline font-black leading-[0.9] tracking-tighter drop-shadow-2xl">
                The Next Gen <span className="italic text-yellow-300">Digital Tools</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-bold border-l-4 border-yellow-300 pl-6">
                We are currently engineering a suite of proprietary SaaS products designed to streamline enterprise workflows and empower global businesses right from Begusarai.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3 text-white/80 font-black uppercase tracking-widest text-xs">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> Enterprise Grade
                </div>
                <div className="flex items-center gap-3 text-white/80 font-black uppercase tracking-widest text-xs">
                  <Globe className="w-5 h-5 text-blue-400" /> Global Scale
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000 delay-300">
              <div className="p-12 bg-white/10 backdrop-blur-xl rounded-[4rem] border border-white/20 shadow-2xl space-y-8">
                <div className="w-20 h-20 bg-yellow-300 rounded-3xl flex items-center justify-center rotate-12 shadow-2xl">
                  <Rocket className="text-primary w-10 h-10" />
                </div>
                <h3 className="text-4xl font-headline font-black italic">Building the Future</h3>
                <p className="text-lg font-medium leading-relaxed opacity-90">
                  Our internal R&D lab is working on advanced AI-driven platforms and high-performance infrastructure tools that will redefine efficiency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative group p-1 md:p-2 bg-gradient-to-br from-primary via-accent to-secondary rounded-[4rem] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
            <div className="bg-white rounded-[3.8rem] p-16 md:p-32 text-center space-y-10 relative overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-5" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <Zap className="text-primary w-12 h-12" />
                </div>
                <h2 className="text-5xl md:text-7xl font-headline font-black italic">
                  Something <span className="text-primary">Incredible</span> is Loading
                </h2>
                <p className="text-muted-foreground text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                  Our proprietary product lineup is under heavy development. We're meticulously crafting every feature to ensure it meets our high standards of quality and performance.
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 max-w-4xl mx-auto">
                <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-4">
                  <Layers className="text-primary w-8 h-8 mx-auto" />
                  <h4 className="font-headline font-black italic text-xl">Scalable</h4>
                  <p className="text-sm text-muted-foreground font-semibold">Built to grow with your business demands.</p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-4">
                  <Sparkles className="text-secondary w-8 h-8 mx-auto" />
                  <h4 className="font-headline font-black italic text-xl">Intuitive</h4>
                  <p className="text-sm text-muted-foreground font-semibold">User experiences designed for effortless flow.</p>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-4">
                  <Zap className="text-accent w-8 h-8 mx-auto" />
                  <h4 className="font-headline font-black italic text-xl">Fast</h4>
                  <p className="text-sm text-muted-foreground font-semibold">Optimized for lightning-quick performance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-5xl mx-auto px-6 text-center space-y-12 relative z-10">
          <h2 className="text-4xl md:text-6xl font-headline font-black italic">Need a Custom Solution <span className="text-primary">Now?</span></h2>
          <p className="text-white/60 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            While our products are in the lab, our expert team is available to build bespoke software tailored specifically to your needs.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button size="lg" className="rounded-full px-16 h-20 text-xl font-headline bg-primary text-white hover:bg-white hover:text-primary transition-all duration-500 shadow-2xl group active:scale-95">
                Talk to Our Team <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
