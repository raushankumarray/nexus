"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Cpu, Layers } from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";

export function Hero() {
  // Added optional chaining to prevent crash if data is missing
  const heroImage = PlaceHolderImages?.find((img) => img.id === "hero-abstract");

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 -skew-x-12 translate-x-1/4 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            Empowering Digital Evolution
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-headline font-bold leading-[1.1]">
            Transforming <span className="text-primary italic">Ideas</span> Into <span className="text-gradient">Digital Reality</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
            We engineer sophisticated software solutions that drive growth and redefine industry standards. Modern tech, human-centric design.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="rounded-full px-8 h-14 text-lg font-headline shadow-xl shadow-primary/20">
              Start Your Project <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg font-headline border-2 hover:bg-secondary/10">
              View Portfolio
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-8">
            <div className="flex flex-col">
              <span className="text-3xl font-bold">250+</span>
              <span className="text-sm text-muted-foreground">Projects Delivered</span>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="flex flex-col">
              <span className="text-3xl font-bold">15+</span>
              <span className="text-sm text-muted-foreground">Expert Engineers</span>
            </div>
          </div>
        </div>

        <div className="relative animate-in fade-in zoom-in duration-1000 delay-200">
          <div className="relative w-full aspect-[4/5] sm:aspect-square overflow-hidden rounded-[2rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            {heroImage ? (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Layers className="text-muted-foreground w-12 h-12" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
          </div>

          {/* Floating UI Elements */}
          <div className="absolute -top-10 -right-10 bg-white p-6 rounded-2xl shadow-xl animate-float border border-primary/10 hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <Cpu className="text-primary" />
              </div>
              <div>
                <p className="font-bold">AI Core Active</p>
                <p className="text-xs text-muted-foreground">Processing Data Stream</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-10 -left-10 bg-foreground text-white p-6 rounded-2xl shadow-xl animate-float [animation-delay:1.5s] hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <Layers className="text-white" />
              </div>
              <div>
                <p className="font-bold">System Architecture</p>
                <p className="text-xs text-slate-300">Scalable & Secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
