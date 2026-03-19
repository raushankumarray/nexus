"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Rocket, ShieldCheck, Heart, Lightbulb, CheckCircle2, Eye, Target } from "lucide-react";

const values = [
  {
    title: "Innovation",
    description: "We constantly explore new technologies and creative ideas to build future-ready solutions.",
    icon: Lightbulb,
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    title: "Quality",
    description: "Every product we develop goes through strict quality assurance to ensure performance and reliability.",
    icon: ShieldCheck,
    color: "text-secondary",
    bg: "bg-secondary/10"
  },
  {
    title: "Transparency",
    description: "We maintain open communication with clients throughout the entire development process.",
    icon: Eye,
    color: "text-accent",
    bg: "bg-accent/10"
  },
  {
    title: "Customer Success",
    description: "Our success depends on the success of our clients. We grow together.",
    icon: Heart,
    color: "text-primary",
    bg: "bg-primary/10"
  }
];

export function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <div className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-primary font-bold tracking-widest uppercase text-sm">Who We Are</h4>
              <h2 className="text-4xl md:text-5xl font-headline font-bold leading-tight">
                Engineering <span className="italic">Reliability</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                NPB Media is a technology-driven software development company committed to building reliable and high-quality digital products.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team of developers, designers, and technology experts work together to create solutions that solve complex business challenges and improve operational efficiency. We partner with startups, small businesses, and enterprises to deliver powerful software solutions tailored to their needs.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <Card className="border-none shadow-xl bg-white rounded-[2rem]">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Eye className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-headline">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg">
                  To become a trusted technology partner for businesses worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-white rounded-[2rem]">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <Target className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-headline">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg">
                  To deliver innovative software solutions that solve real-world problems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-headline font-bold">Our Core <span className="text-primary">Values</span></h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="group p-8 bg-white rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-primary/10">
                <div className={`w-14 h-14 rounded-2xl ${value.bg} ${value.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
                  <value.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
