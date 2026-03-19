
"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Layout, Server, Database, Cloud, Cpu, Code2, Globe, Laptop } from "lucide-react";

const stack = [
  {
    category: "Frontend",
    icon: Laptop,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    items: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS", "Vue.js"]
  },
  {
    category: "Backend",
    icon: Server,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    items: ["Node.js", "Python", "PHP", "Java", "Go"]
  },
  {
    category: "Databases",
    icon: Database,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase"]
  },
  {
    category: "Cloud Platforms",
    icon: Cloud,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    items: ["AWS", "Azure", "Google Cloud", "Vercel"]
  }
];

export function TechStack() {
  return (
    <section id="tech-stack" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-bold uppercase tracking-widest">
            <Cpu className="w-4 h-4" />
            Our Stack
          </div>
          <h2 className="text-5xl md:text-6xl font-headline font-bold">
            Modern <span className="text-primary italic">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
            We work with the industry's most robust and scalable tech ecosystem to deliver powerful solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stack.map((group, idx) => (
            <div 
              key={idx} 
              className="group p-8 bg-white rounded-[2.5rem] border border-transparent shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-2xl ${group.bg} flex items-center justify-center transition-transform group-hover:rotate-12 duration-500`}>
                  <group.icon className={`w-7 h-7 ${group.color}`} />
                </div>
                <h3 className="text-2xl font-bold font-headline">{group.category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {group.items.map((tech, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className={`px-4 py-2 text-sm font-medium rounded-xl border-2 transition-all duration-300 hover:bg-foreground hover:text-white cursor-default`}
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
