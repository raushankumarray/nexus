"use client";

import React from "react";
import { Code2, Globe, Smartphone, Building2, Cloud, Network, ArrowRight } from "lucide-react";
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
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h4 className="text-primary font-bold tracking-widest uppercase text-sm">Our Expertise</h4>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Our <span className="text-primary italic">Services</span></h2>
          <p className="text-muted-foreground text-lg">
            We deliver powerful solutions that combine creativity, technology, and strategy to drive real results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={cn(
                "group relative border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 rounded-[2.5rem] overflow-hidden",
                service.accent
              )}
            >
              <CardHeader className="space-y-6 p-8">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-lg shadow-black/5",
                  service.color
                )}>
                  <service.icon className="text-white w-8 h-8" />
                </div>
                <div className="space-y-3">
                  <CardTitle className="text-2xl font-headline font-bold">{service.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <div className="px-8 pb-8">
                <button className="text-sm font-bold text-primary flex items-center gap-2 group/btn">
                  Learn More 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-all group-hover:scale-150" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
