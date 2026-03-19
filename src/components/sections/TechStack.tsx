"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Cpu } from "lucide-react";

const stack = [
  {
    category: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "PHP", "Java", "Go"]
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase"]
  },
  {
    category: "Cloud Platforms",
    items: ["AWS", "Azure", "Google Cloud", "Vercel"]
  }
];

export function TechStack() {
  return (
    <section id="tech-stack" className="py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-bold uppercase tracking-widest">
            Our Stack
          </div>
          <h2 className="text-5xl md:text-6xl font-headline font-bold">Modern <span className="text-primary italic">Technologies</span></h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
            We build with the industry's most robust and scalable tech ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {stack.map((group, idx) => (
            <div key={idx} className="group p-10 bg-muted/30 rounded-[3rem] border border-transparent hover:border-primary/20 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-xl">
              <div className="flex items-center gap-3 mb-8 border-b border-primary/20 pb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold">{group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {group.items.map((tech, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="px-5 py-2.5 text-base font-semibold rounded-2xl border-2 hover:bg-primary hover:text-white hover:border-primary transition-all cursor-default shadow-sm"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}