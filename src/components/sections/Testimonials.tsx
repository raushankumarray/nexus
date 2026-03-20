
"use client";

import React, { useRef } from "react";
import { Quote, Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
  },
  {
    quote: "Innovative solutions and a dedicated team. They transformed our legacy systems into a modern, scalable architecture.",
    author: "Operations Director",
    role: "Director, Fintech Corp",
    rating: 5
  },
  {
    quote: "Excellent support and modern technology stack. NPB Media is our go-to partner for all digital transformation projects.",
    author: "Marketing Manager",
    role: "Lead, E-commerce Hub",
    rating: 5
  }
];

export function Testimonials() {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            Client Feedback
          </div>
          <h2 className="text-5xl md:text-6xl font-headline font-bold">
            Why Businesses <span className="text-primary italic">Trust Us</span>
          </h2>
          <p className="text-muted-foreground text-lg">Hear from our partners about how we've helped them succeed in the digital age.</p>
        </div>

        <div className="relative px-4 sm:px-12">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4 md:-ml-8">
              {feedback.map((item, idx) => (
                <CarouselItem key={idx} className="pl-4 md:pl-8 md:basis-1/2 lg:basis-1/2">
                  <Card className="h-full group border-none shadow-xl hover:shadow-2xl rounded-[2.5rem] bg-white p-8 md:p-12 relative overflow-hidden transition-all duration-500 hover:-translate-y-2">
                    <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                      <Quote className="w-24 h-24 md:w-32 md:h-32" />
                    </div>
                    <CardContent className="h-full space-y-8 md:space-y-12 p-0 relative z-10 flex flex-col justify-between">
                      <div className="space-y-6">
                        <div className="flex gap-1.5">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-secondary text-secondary" />
                          ))}
                        </div>
                        <p className="text-xl md:text-2xl font-medium leading-relaxed italic text-foreground/90 font-headline">
                          "{item.quote}"
                        </p>
                      </div>
                      <div className="pt-8 border-t border-muted flex items-center justify-between">
                        <div>
                          <h4 className="text-xl font-bold text-primary font-headline">{item.author}</h4>
                          <p className="text-muted-foreground font-bold text-xs md:text-sm uppercase tracking-widest">{item.role}</p>
                        </div>
                        <div className="w-12 h-1 bg-primary/20 rounded-full" />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom navigation arrows hidden on small mobile, visible on tablet+ */}
            <div className="hidden sm:block">
              <CarouselPrevious className="absolute -left-4 lg:-left-12 h-12 w-12 border-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-lg" />
              <CarouselNext className="absolute -right-4 lg:-right-12 h-12 w-12 border-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-lg" />
            </div>
          </Carousel>
        </div>

        {/* Mobile Page Indicators (Optional visual cue) */}
        <div className="flex justify-center gap-2 mt-8 sm:hidden">
          {feedback.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-primary/20" />
          ))}
        </div>
      </div>
    </section>
  );
}
