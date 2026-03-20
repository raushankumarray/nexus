
"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Rocket, 
  Target, 
  Lightbulb, 
  ShieldCheck, 
  Heart, 
  Quote, 
  Sparkles,
  MapPin,
  ArrowRight,
  Zap,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

const values = [
  {
    title: "Innovation",
    description: "We stay up-to-date with the latest industry trends to bring fresh, creative solutions to the table.",
    icon: Lightbulb,
    color: "bg-orange-500",
    shadow: "shadow-orange-500/20"
  },
  {
    title: "Quality",
    description: "We are committed to writing clean code, building secure platforms, and delivering products that stand the test of time.",
    icon: ShieldCheck,
    color: "bg-blue-600",
    shadow: "shadow-blue-600/20"
  },
  {
    title: "Client-Centricity",
    description: "Your success is our success. We prioritize clear communication and collaborative partnerships.",
    icon: Heart,
    color: "bg-emerald-600",
    shadow: "shadow-emerald-600/20"
  }
];

export default function AboutPage() {
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
                <MapPin className="w-5 h-5 text-yellow-300" />
                Based in Begusarai
              </div>
              <h1 className="text-6xl md:text-8xl font-headline font-black leading-[0.9] tracking-tighter drop-shadow-2xl">
                About <span className="italic text-yellow-300">NPB Media</span>
              </h1>
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-bold border-l-4 border-yellow-300 pl-6">
                  Welcome to NPB Media, a dynamic software company proudly based in Begusarai. We are passionate about leveraging technology to solve complex problems and drive digital growth.
                </p>
                <p className="text-lg text-white/80 leading-relaxed max-w-xl font-medium">
                  In today’s fast-paced digital world, having reliable, scalable, and innovative software solutions is crucial. At NPB Media, we bridge the gap between your ideas and reality by delivering high-quality tech solutions tailored to your unique needs.
                </p>
              </div>
            </div>

            <div className="relative animate-in fade-in zoom-in duration-1000 delay-300 hidden lg:block">
              <div className="relative p-1 bg-white/20 backdrop-blur-xl rounded-[3rem] border border-white/30 overflow-hidden shadow-2xl">
                <div className="relative z-10 p-12 space-y-8">
                  <div className="w-20 h-20 bg-yellow-300 rounded-2xl flex items-center justify-center rotate-12 shadow-2xl">
                    <Rocket className="text-primary w-10 h-10" />
                  </div>
                  <h3 className="text-4xl font-headline font-black italic">Empowering Growth</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Zap className="text-yellow-300 w-5 h-5" />
                      <span className="font-black uppercase tracking-widest text-xs">Innovation-First Mindset</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Globe className="text-yellow-300 w-5 h-5" />
                      <span className="font-black uppercase tracking-widest text-xs">Begusarai to the World</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group animate-in fade-in slide-in-from-bottom duration-1000">
              <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] blur-2xl group-hover:bg-primary/20 transition-all" />
              <div className="relative bg-white p-12 rounded-[3rem] border-4 border-primary/20 shadow-2xl">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-primary/20">
                  <Target className="text-white w-8 h-8" />
                </div>
                <h2 className="text-4xl font-headline font-black italic mb-6">Our Mission</h2>
                <p className="text-xl text-muted-foreground leading-relaxed font-semibold">
                  To empower businesses through cutting-edge software development, ensuring our clients stay ahead in an ever-evolving digital landscape. We believe in building technology that is not only functional but also intuitive and future-proof.
                </p>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">
                  <Sparkles className="w-4 h-4" />
                  Core Principles
                </div>
                <h2 className="text-5xl font-headline font-black italic">Our <span className="text-primary">Values</span></h2>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {values.map((value, idx) => (
                  <div 
                    key={idx} 
                    className="group relative p-8 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 transition-all duration-500 overflow-hidden flex items-center gap-8 hover:-translate-y-2 hover:shadow-2xl hover:bg-primary"
                  >
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center text-white transition-all duration-500 group-hover:bg-white group-hover:text-primary shrink-0",
                      value.color,
                      value.shadow
                    )}>
                      <value.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-headline font-black group-hover:text-white transition-colors">{value.title}</h3>
                      <p className="text-muted-foreground font-semibold group-hover:text-white/80 transition-colors">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-primary text-xs font-black uppercase tracking-widest border border-white/20">
              <Quote className="w-4 h-4" />
              A Note from the Founder
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-10 bg-primary/20 rounded-[5rem] blur-[100px] opacity-50 animate-pulse" />
            <div className="relative bg-white/5 backdrop-blur-xl border-4 border-white/10 p-12 md:p-20 rounded-[4rem] shadow-2xl space-y-12">
              <Quote className="w-20 h-20 text-primary opacity-20 absolute top-10 right-10" />
              
              <p className="text-2xl md:text-4xl font-headline font-black italic leading-tight text-center relative z-10">
                "Technology is only as powerful as the positive impact it creates. At NPB Media, we started with a simple goal: to bring top-tier software solutions right here from Begusarai to the world. We are dedicated to building digital products that help our clients thrive, streamline their operations, and connect with their audiences more effectively."
              </p>

              <div className="flex flex-col items-center gap-4 border-t border-white/10 pt-12">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center border-4 border-white/20 shadow-2xl">
                  <span className="text-4xl font-black italic">R</span>
                </div>
                <div className="text-center">
                  <h4 className="text-3xl font-headline font-black text-primary">Raushan Kumar Ray</h4>
                  <p className="text-white/60 font-black uppercase tracking-[0.2em] text-sm">Founder of NPB Media</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 text-center">
            <Button size="lg" className="rounded-full px-16 h-20 text-xl font-headline bg-primary text-white hover:bg-white hover:text-primary transition-all duration-500 shadow-2xl group active:scale-95 border-none">
              Start Your Project With Us <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
