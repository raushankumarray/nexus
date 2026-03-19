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
    quote: "Great communication, quality development, and on-time delivery. They truly understand business goals.",
    author: "Business Owner",
    role: "CEO, Global Logistics",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h4 className="text-primary font-bold tracking-widest uppercase text-sm">Client Feedback</h4>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Why Businesses <span className="text-primary italic">Trust Us</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {feedback.map((item, idx) => (
            <Card key={idx} className="border-none shadow-2xl rounded-[2.5rem] bg-white p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                <Quote className="w-24 h-24" />
              </div>
              <CardContent className="space-y-8 p-0">
                <div className="flex gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-2xl font-medium leading-relaxed italic">
                  "{item.quote}"
                </p>
                <div className="pt-6 border-t border-muted">
                  <h4 className="text-xl font-bold">{item.author}</h4>
                  <p className="text-muted-foreground">{item.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
