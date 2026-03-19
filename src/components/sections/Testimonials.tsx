"use client";

import React from "react";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const feedback = [
  {
    quote: "NPB Media helped us launch our software platform successfully. Their team was highly professional and responsive.",
    author: "Technology Startup Founder",
    role: "Founder, SaaS Enterprise",
    rating: 5
  },
  {
    quote: "Great communication, quality development, and on-time delivery. They truly understand business goals and deliver real value.",
    author: "Business Owner",
    role: "CEO, Global Logistics",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-32 bg-muted/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold uppercase tracking-widest">
            Client Feedback
          </div>
          <h2 className="text-5xl md:text-6xl font-headline font-bold">Why Businesses <span className="text-primary italic">Trust Us</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {feedback.map((item, idx) => (
            <Card key={idx} className="group border-none shadow-2xl rounded-[3rem] bg-white p-12 relative overflow-hidden transition-all duration-500 hover:-translate-y-2">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote className="w-32 h-32" />
              </div>
              <CardContent className="space-y-10 p-0 relative z-10">
                <div className="flex gap-1.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-3xl font-medium leading-relaxed italic text-foreground/90">
                  "{item.quote}"
                </p>
                <div className="pt-8 border-t border-muted flex items-center justify-between">
                  <div>
                    <h4 className="text-2xl font-bold text-primary">{item.author}</h4>
                    <p className="text-muted-foreground font-medium text-lg uppercase tracking-wider">{item.role}</p>
                  </div>
                  <div className="w-16 h-1 bg-primary/20 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}