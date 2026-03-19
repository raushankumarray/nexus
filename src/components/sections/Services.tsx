"use client";

import React from "react";
import { Code2, Globe, Smartphone, Building2, Cloud, Network, ArrowRight, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Custom Software Development",
    description: "We design and develop custom software solutions tailored to your unique business requirements.",
    icon: Code2,
    color: "bg-primary",
    accent: "border-primary/20",
  },
  {
    title: "Web Application Development",
    description: "Secure, scalable, and high-performance web applications using modern frameworks.",
    icon: Globe,
    color: "bg-secondary",
    accent: "border-secondary/20",
  },
  {
    title: "Mobile Application Development",
    description: "Feature-rich mobile applications for Android and iOS platforms.",
    icon: Smartphone,
    color: "bg-accent",
    accent: "border-accent/20",
  },
  {
    title: "Enterprise Software Solutions",
    description: "Advanced software systems to streamline business operations and increase productivity.",
    icon: Building2,
    color: "bg-primary",
    accent: "border-primary/20",
  },
  {
    title: "Cloud Solutions",
    description: "Cloud infrastructure setup, migration, and optimization for scalable business systems.",
    icon: Cloud,
    color: "bg-secondary",
    accent: "border-secondary/20",
  },
  {
    title: "API Development & Integration",
    description: "Seamless integration between platforms, applications, and third-party services.",
    icon: Network,
    color: "bg-foreground",
    accent: "border-foreground/20",
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              Our Expertise
            </div>
            <h2 className="text-5xl md:text-6xl font-headline font-bold">Our <span className="text-primary italic">Services</span></h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              We deliver powerful solutions that combine creativity, technology, and strategy to drive real results.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <div className="h-1 w-32 bg-primary rounded-full mb-4 hidden md:block" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={cn(
                "group relative border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 rounded-[3rem] overflow-hidden bg-white",
                service.accent
              )}
            >
              <CardHeader className="space-y-8 p-10">
                <div className={cn(
                  "w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-xl",
                  service.color
                )}>
                  <service.icon className="text-white w-10 h-10" />
                </div>
                <div className="space-y-4">
                  <CardTitle className="text-3xl font-headline font-bold group-hover:text-primary transition-colors">{service.title}</CardTitle>
                  <CardDescription className="text-lg leading-relaxed text-muted-foreground/80">
                    {service.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <div className="px-10 pb-10">
                <button className="text-base font-bold text-primary flex items-center gap-2 group/btn hover:underline underline-offset-8">
                  Learn More 
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                </button>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-[5rem] -z-10 transition-all duration-700 group-hover:scale-125 group-hover:bg-primary/10" />
              <div className="absolute bottom-4 right-4 w-12 h-12 bg-muted/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <Zap className="w-5 h-5 text-primary" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}