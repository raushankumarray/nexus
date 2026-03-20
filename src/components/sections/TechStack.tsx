
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
    items: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js", "TypeScript"]
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
    category: "Cloud Platforms",
    icon: Cloud,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    items: ["AWS", "Azure", "Google Cloud", "Vercel"]
  }
];

export function TechStack() {
  return (
    <section id="tech-stack" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-black uppercase tracking-widest">
            <Cpu className="w-4 h-4" />
            Our Stack
          </div>
          <h2 className="text-5xl md:text-6xl font-headline font-bold">
            Modern <span className="text-primary italic">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed font-medium">
            We work with the latest technologies to deliver powerful and scalable solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stack.map((group, idx) => (
            <div 
              key={idx} 
              className="group p-10 bg-white rounded-[3rem] border border-transparent shadow-xl hover:shadow-2xl hover:border-primary/10 transition-all duration-500 hover:-translate-y-3"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-[1.5rem] ${group.bg} flex items-center justify-center transition-transform group-hover:rotate-6 duration-500 shadow-sm`}>
                  <group.icon className={`w-7 h-7 ${group.color}`} />
                </div>
                <h3 className="text-2xl font-bold font-headline">{group.category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {group.items.map((tech, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="px-4 py-2 text-sm font-bold rounded-xl border-2 transition-all duration-300 hover:bg-foreground hover:text-white cursor-default"
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
