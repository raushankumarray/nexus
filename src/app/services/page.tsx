
"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Globe, 
  Smartphone, 
  Building2, 
  Cloud, 
  Network, 
  BarChart3, 
  Palette,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap
} from "lucide-react";
import Link from "next/link";

const detailedServices = [
  {
    title: "Custom Software Development",
    description: "We build bespoke software solutions tailored to your unique business logic and workflows. Whether you need to modernize legacy systems or build a new platform from the ground up, our engineering team ensures your software is scalable, secure, and high-performing.",
    icon: Code2,
    features: ["Bespoke Architecture", "Legacy Modernization", "Full-stack Engineering"],
    color: "bg-orange-500",
    shadow: "shadow-orange-500/20"
  },
  {
    title: "Web Application Development",
    description: "Our web solutions are built using the latest modern frameworks like React and Next.js. We focus on delivering lightning-fast performance, SEO optimization, and a seamless responsive experience across all devices and browsers.",
    icon: Globe,
    features: ["Progressive Web Apps", "E-commerce Platforms", "SaaS Dashboards"],
    color: "bg-blue-600",
    shadow: "shadow-blue-600/20"
  },
  {
    title: "Mobile Application Development",
    description: "We create feature-rich mobile applications for Android and iOS that provide a native-like experience. Our apps are designed to be intuitive, scalable, and future-ready, ensuring high user retention and engagement.",
    icon: Smartphone,
    features: ["iOS & Android Native", "Cross-platform Development", "App Store Optimization"],
    color: "bg-emerald-600",
    shadow: "shadow-emerald-600/20"
  },
  {
    title: "Enterprise Software Solutions",
    description: "Streamline your business operations with our robust enterprise systems. From ERP and CRM integrations to custom internal management tools, we help large-scale organizations increase productivity and operational efficiency.",
    icon: Building2,
    features: ["Workflow Automation", "ERP/CRM Systems", "Data Governance"],
    color: "bg-indigo-600",
    shadow: "shadow-indigo-600/20"
  },
  {
    title: "Cloud Infrastructure & DevOps",
    description: "Leverage the power of AWS, Azure, and Google Cloud with our expert cloud services. We handle everything from cloud migration and serverless architecture to continuous integration and automated deployment pipelines.",
    icon: Cloud,
    features: ["Cloud Migration", "Serverless Architecture", "CI/CD Pipelines"],
    color: "bg-purple-600",
    shadow: "shadow-purple-600/20"
  },
  {
    title: "API Development & Integration",
    description: "Connect your digital ecosystem with secure and scalable APIs. We specialize in building custom RESTful and GraphQL APIs, as well as integrating third-party SaaS tools to ensure your platforms talk to each other seamlessly.",
    icon: Network,
    features: ["Custom API Design", "Microservices Integration", "Third-party Syncing"],
    color: "bg-pink-600",
    shadow: "shadow-pink-600/20"
  },
  {
    title: "AI & Data Analytics",
    description: "Turn your raw data into actionable business insights. Our team integrates advanced machine learning models, predictive analytics, and automated decision-making tools into your existing infrastructure to give you a competitive edge.",
    icon: BarChart3,
    features: ["Predictive Modeling", "NLP & Chatbots", "Data Visualization"],
    color: "bg-cyan-600",
    shadow: "shadow-cyan-600/20"
  },
  {
    title: "UI/UX Experience Design",
    description: "Great software starts with a great user experience. Our designers focus on creating modern, professional, and intuitive interfaces that minimize friction and maximize user satisfaction and conversion rates.",
    icon: Palette,
    features: ["User Research", "Prototyping", "Visual Design Systems"],
    color: "bg-rose-600",
    shadow: "shadow-rose-600/20"
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Overview / Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-foreground text-white">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-primary" />
              Our Core Expertise
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
              Powerful Solutions for your <span className="text-primary italic">Digital Evolution</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl font-medium">
              At NPB Media, we combine engineering precision with creative strategy to build digital products that drive real business growth. Explore our full range of technical services.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {detailedServices.map((service, idx) => (
              <Card 
                key={idx} 
                className="group border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col md:flex-row"
              >
                <div className={`md:w-1/3 p-10 flex flex-col items-center justify-center text-white relative overflow-hidden ${service.color}`}>
                  <div className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <service.icon className="w-20 h-20 mb-4 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500 relative z-10" />
                  <Badge variant="outline" className="border-white/40 text-white font-bold uppercase tracking-widest text-[10px] relative z-10">
                    Service {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </Badge>
                </div>
                
                <CardContent className="md:w-2/3 p-10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-headline font-bold italic group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-medium">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-[10px] font-black uppercase tracking-widest text-muted-foreground border">
                          <CheckCircle2 className="w-3 h-3 text-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-muted mt-6 flex items-center justify-between">
                    <Button variant="ghost" className="p-0 h-auto font-black text-xs uppercase tracking-widest hover:bg-transparent hover:text-primary transition-colors group/btn">
                      Request Details <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                    </Button>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed CTA / Consultation Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-primary text-xs font-black uppercase tracking-widest shadow-xl">
            <CheckCircle2 className="w-4 h-4" />
            Ready to Build?
          </div>
          <h2 className="text-5xl md:text-7xl font-headline font-black leading-tight italic drop-shadow-lg">
            Let's create the next big <span className="text-foreground">thing together.</span>
          </h2>
          <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto font-medium">
            Contact our team today for a free technical consultation. We'll help you define your roadmap and deliver a solution that scales.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <Link href="/contact">
              <Button size="lg" className="rounded-full px-12 h-16 text-lg font-headline bg-white text-primary hover:bg-foreground hover:text-white transition-all shadow-2xl group">
                Contact Our Experts <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-headline border-2 border-white/50 text-white hover:bg-white/10 transition-all">
              Download Portfolio
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
