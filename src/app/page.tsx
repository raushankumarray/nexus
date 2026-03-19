import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Industries } from "@/components/sections/Industries";
import { AISummarizer } from "@/components/sections/AISummarizer";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Code2, Users, Cpu, Layers } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Home Overview */}
      <Hero />
      
      {/* Quick Overview Grid - Teasers for Separate Pages */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-headline font-bold">Discover NPB <span className="text-primary italic">Nexus</span></h2>
            <p className="text-muted-foreground">Expert solutions across every dimension of digital transformation.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "About Us", desc: "Our vision, mission and reliability standards.", icon: Users, href: "/about" },
              { title: "Services", desc: "Custom software and cloud infrastructure.", icon: Code2, href: "/services" },
              { title: "Technology", desc: "Modern tech stack for high-performance.", icon: Cpu, href: "/technology" },
              { title: "Products", desc: "Showcasing our high-impact solutions.", icon: Layers, href: "/products" },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group p-8 bg-white rounded-[2.5rem] border hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{item.desc}</p>
                <span className="text-xs font-bold text-primary flex items-center gap-2">
                  Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Process */}
      <Process />
      
      {/* Sector Expertise */}
      <Industries />
      
      {/* AI Overview (Internal Innovation) */}
      <AISummarizer />
      
      <Footer />
      <Toaster />
    </main>
  );
}
