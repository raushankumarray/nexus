"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SERVICES_DATA } from "@/app/lib/services-data";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  return (
    <main className="relative bg-background">
      <Navbar />
      
      <section className="pt-32 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              Comprehensive Solutions
            </div>
            <h1 className="text-5xl md:text-6xl font-headline font-bold">
              Our Specialized <span className="text-primary italic">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We provide end-to-end digital transformation services, combining technical excellence with strategic innovation to help your business lead in a digital-first world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* You can manually add more services here by copying the block below */}
            {SERVICES_DATA.map((service, index) => (
              <Card 
                key={index} 
                className={cn(
                  "group relative border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2",
                  service.accent
                )}
              >
                <CardHeader className="space-y-6">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300",
                    service.color
                  )}>
                    <service.icon className="text-white w-7 h-7" />
                  </div>
                  <div className="space-y-3">
                    <CardTitle className="text-2xl font-headline font-bold">{service.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <div className="px-6 pb-6">
                  <Button variant="link" className="p-0 text-sm font-bold text-primary flex items-center gap-2 group/btn">
                    Learn More 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-24 p-12 bg-foreground text-white rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-10" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl font-headline font-bold">Ready to start your next project?</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Our team of expert engineers and designers are ready to help you build the future. Let&apos;s discuss your requirements today.
              </p>
              <Button size="lg" className="rounded-full px-12 h-14 text-lg font-headline bg-primary hover:bg-primary/90">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
