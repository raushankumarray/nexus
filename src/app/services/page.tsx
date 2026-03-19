"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Code2, 
  Globe, 
  Smartphone, 
  Palette, 
  Cloud, 
  Link2, 
  ShoppingBag, 
  Wrench, 
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ALL_SERVICES = [
  {
    title: "Custom Software Development",
    description: "Every business is unique. Our specialised services focus on building tailored applications designed specifically for your workflow and business goals.",
    icon: Code2,
    color: "bg-orange-500",
    provides: ["Business management software", "Automation tools", "CRM & ERP systems", "Enterprise applications", "SaaS platform development"],
    benefits: ["Improved efficiency", "Custom features", "Scalable architecture"]
  },
  {
    title: "Web Application Development",
    description: "Modern web applications that are fast, responsive, and secure. We help businesses provide seamless digital experiences for customers and teams.",
    icon: Globe,
    color: "bg-blue-600",
    provides: ["Custom web platforms", "SaaS applications", "Admin dashboards", "Progressive Web Apps (PWA)", "Business portals"],
    tech: ["React", "Node.js", "PHP", "Modern Frameworks"]
  },
  {
    title: "Mobile App Development",
    description: "Powerful mobile applications that deliver smooth performance and excellent user experiences on smartphones and tablets.",
    icon: Smartphone,
    color: "bg-emerald-500",
    provides: ["Android & iOS Development", "Cross-platform apps", "E-commerce & Startup apps", "Enterprise mobile solutions"]
  },
  {
    title: "UI/UX Design",
    description: "Great software requires intuitive design. Our experts create interfaces that are both visually appealing and easy to use.",
    icon: Palette,
    color: "bg-pink-500",
    provides: ["Product interface design", "Mobile app UI design", "Web platform design", "UX optimisation", "Prototyping & Wireframes"]
  },
  {
    title: "Cloud & DevOps Solutions",
    description: "Deploy, manage, and scale applications efficiently using modern cloud infrastructure and DevOps practices.",
    icon: Cloud,
    color: "bg-indigo-500",
    provides: ["Cloud architecture setup", "Infrastructure automation", "CI/CD Pipelines", "Cloud migration"],
    tech: ["AWS", "Microsoft Azure", "Google Cloud"]
  },
  {
    title: "API Development & Integration",
    description: "Modern applications rely on seamless connectivity. Our API services ensure smooth integration across platforms.",
    icon: Link2,
    color: "bg-purple-500",
    provides: ["REST API development", "Third-party integrations", "Payment gateway integration", "Microservices architecture"]
  },
  {
    title: "E-Commerce Solutions",
    description: "Powerful e-commerce platforms that help businesses sell products and services online efficiently.",
    icon: ShoppingBag,
    color: "bg-red-500",
    provides: ["Secure payment integration", "Product management systems", "Order tracking", "Customer accounts", "Scalable online stores"]
  },
  {
    title: "Software Maintenance & Support",
    description: "Our support services ensure your applications remain secure, stable, and up-to-date.",
    icon: Wrench,
    color: "bg-slate-700",
    provides: ["Performance optimisation", "Bug fixing", "Feature updates", "Security monitoring", "System upgrades"]
  },
  {
    title: "Technology Consulting",
    description: "Our consultants help businesses choose the right tools, frameworks, and architecture for their projects.",
    icon: Lightbulb,
    color: "bg-amber-500",
    provides: ["Software architecture planning", "Technology stack selection", "Digital transformation strategy", "Startup MVP planning"]
  }
];

const INDUSTRIES = [
  "E-Commerce", "Healthcare", "Finance", "Education", 
  "Logistics", "Real Estate", "Media & Entertainment", "SaaS Platforms"
];

const REASONS = [
  "Experienced software development team",
  "Modern technology stack",
  "Agile development process",
  "Transparent communication",
  "Scalable and secure solutions",
  "Long-term technical support"
];

export default function ServicesPage() {
  return (
    <main className="relative bg-background min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Engineering Excellence
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
              Our <span className="text-primary italic">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              At NPB Media, we provide a wide range of technology solutions designed to help businesses grow, innovate, and succeed in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_SERVICES.map((service, idx) => (
              <Card 
                key={idx} 
                className="group bg-white border-none shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-[2.5rem] overflow-hidden flex flex-col h-full animate-in fade-in slide-in-from-bottom fill-mode-both"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <CardHeader className="p-8 space-y-6">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:scale-110 group-hover:rotate-6 duration-500 shadow-lg",
                    service.color
                  )}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-3">
                    <CardTitle className="text-2xl font-headline font-bold group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {service.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-6 flex-1">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/50">What we provide</h4>
                    <ul className="space-y-2">
                      {service.provides.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 font-medium">
                          <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {service.benefits && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/50">Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.benefits.map((benefit, i) => (
                          <Badge key={i} variant="secondary" className="bg-primary/5 text-primary border-primary/10 hover:bg-primary/10">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.tech && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/50">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.tech.map((t, i) => (
                          <Badge key={i} variant="outline" className="border-2 font-bold text-[10px] rounded-lg">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries & Why Choose Us Hub */}
      <section className="py-24 px-6 relative overflow-hidden bg-foreground text-white">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Industries */}
            <div className="space-y-12">
              <div className="space-y-4">
                <Badge className="bg-primary/20 text-primary border-primary/30">Sector Expertise</Badge>
                <h2 className="text-4xl md:text-5xl font-headline font-bold">Industries We <span className="text-primary italic">Serve</span></h2>
                <p className="text-slate-400 text-lg">NPB Media provides tailored software solutions for diverse global sectors.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {INDUSTRIES.map((industry, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group">
                    <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
                    <span className="font-bold text-sm tracking-wide">{industry}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="space-y-12">
              <div className="space-y-4">
                <Badge className="bg-secondary/20 text-secondary border-secondary/30">Competitive Edge</Badge>
                <h2 className="text-4xl md:text-5xl font-headline font-bold">Why Choose <span className="text-primary italic">NPB Media</span></h2>
              </div>
              <div className="space-y-4">
                {REASONS.map((reason, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/30 transition-all">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span className="text-lg font-medium">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & CTA */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="bg-muted p-12 md:p-20 rounded-[4rem] text-center space-y-12 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <h2 className="text-3xl font-headline font-bold uppercase tracking-widest text-primary">Our Mission</h2>
              <p className="text-3xl md:text-4xl font-headline font-bold leading-tight max-w-3xl mx-auto italic">
                "To deliver innovative software solutions that solve real-world problems and help businesses succeed in the digital age."
              </p>
            </div>

            <div className="h-px bg-border max-w-xs mx-auto" />

            <div className="space-y-8 relative z-10">
              <div className="space-y-4">
                <h3 className="text-4xl font-headline font-bold">Start Your Project</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Looking for reliable software development services? Partner with NPB Media to build powerful digital solutions for your business.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-full px-12 h-16 text-lg font-headline bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group">
                  Request a Quote <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-headline border-2">
                  Learn About Our Process
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
