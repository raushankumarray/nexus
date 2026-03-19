
"use client";

import React from "react";
import { Code2, Cloud, Shield, Zap, Layout, BarChart3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Custom Software Development",
    description: "High-performance bespoke software solutions tailored to your specific business logic and workflows.",
    icon: Code2,
    color: "bg-primary",
    accent: "border-primary/20",
  },
  {
    title: "Cloud Infrastructure",
    description: "Scalable, secure, and cost-effective cloud solutions using AWS, Azure, and Google Cloud platforms.",
    icon: Cloud,
    color: "bg-secondary",
    accent: "border-secondary/20",
  },
  {
    title: "Cybersecurity Systems",
    description: "Robust security frameworks to protect your valuable data and digital assets from modern threats.",
    icon: Shield,
    color: "bg-accent",
    accent: "border-accent/20",
  },
  {
    title: "Performance Optimization",
    description: "Auditing and optimizing existing systems for lightning-fast speeds and efficient resource usage.",
    icon: Zap,
    color: "bg-primary",
    accent: "border-primary/20",
  },
  {
    title: "UI/UX Experience Design",
    description: "Stunning, intuitive interfaces designed to maximize user engagement and conversion rates.",
    icon: Layout,
    color: "bg-secondary",
    accent: "border-secondary/20",
  },
  {
    title: "Data Analytics & AI",
    description: "Turning raw data into actionable insights with advanced machine learning and data engineering.",
    icon: BarChart3,
    color: "bg-foreground",
    accent: "border-foreground/20",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl font-headline font-bold">Our Core <span className="text-primary italic">Expertise</span></h2>
          <p className="text-muted-foreground text-lg">
            We combine deep technical proficiency with industry-leading practices to deliver excellence across every digital touchpoint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
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
                <button className="text-sm font-bold text-primary flex items-center gap-2 group/btn">
                  Explore More 
                  <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                </button>
              </div>
              
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-all group-hover:scale-150" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
