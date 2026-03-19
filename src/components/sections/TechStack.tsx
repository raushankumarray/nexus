"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Server, Database, Cloud, Cpu, Laptop } from "lucide-react";

const stack = [
  {
    category: "Frontend",
    icon: Laptop,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    items: ["React", "Next.js", "Tailwind CSS", "Vue.js", "TypeScript"]
  },
  {
    category: "Backend",
    icon: Server,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    items: ["Node.js", "Python", "PHP", "Java", "Go"]
  },
  {
    category: "Databases",
    icon: Database,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase"]
  },
  {
    category: "Cloud",
    icon: Cloud,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    items: ["AWS", "Azure", "Google Cloud", "Vercel"]
  }
];

export function TechStack() {
  return (
    <section id="tech-stack" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" />
            Our Stack
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">
            Modern <span className="text-primary italic">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Scalable tech ecosystems for high-performance solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stack.map((group, idx) => (
            <div 
              key={idx} 
              className="group p-6 bg-white rounded-[2rem] border border-transparent shadow-sm hover:shadow-xl hover:border-primary/10 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-xl ${group.bg} flex items-center justify-center transition-transform group-hover:rotate-6 duration-500`}>
                  <group.icon className={`w-5 h-5 ${group.color}`} />
                </div>
                <h3 className="text-xl font-bold font-headline">{group.category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {group.items.map((tech, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="px-3 py-1 text-xs font-medium rounded-lg border-2 transition-all duration-300 hover:bg-foreground hover:text-white cursor-default"
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