"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const stack = [
  {
    category: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "PHP", "Java"]
  },
  {
    category: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB"]
  },
  {
    category: "Cloud Platforms",
    items: ["AWS", "Azure", "Google Cloud"]
  }
];

export function TechStack() {
  return (
    <section id="tech-stack" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h4 className="text-primary font-bold tracking-widest uppercase text-sm">Our Stack</h4>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Modern <span className="text-primary italic">Technologies</span></h2>
          <p className="text-muted-foreground text-lg">
            We work with the latest technologies to deliver powerful and scalable solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stack.map((group, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-2xl font-bold border-b pb-4">{group.category}</h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((tech, i) => (
                  <Badge 
                    key={i} 
                    variant="outline" 
                    className="px-4 py-2 text-md font-medium rounded-xl border-2 hover:bg-primary/5 hover:border-primary transition-all cursor-default"
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
