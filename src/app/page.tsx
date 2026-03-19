import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { Process } from "@/components/sections/Process";
import { TechStack } from "@/components/sections/TechStack";
import { Portfolio } from "@/components/sections/Portfolio";
import { AISummarizer } from "@/components/sections/AISummarizer";
import { Careers } from "@/components/sections/Careers";
import { Contact } from "@/components/sections/Contact";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Home Overview */}
      <Hero />
      
      {/* About Us Overview */}
      <WhoWeAre />
      
      {/* Services Overview */}
      <Services />
      
      {/* Technology Overview */}
      <TechStack />
      
      {/* Products Overview */}
      <Portfolio />
      
      {/* Sector Expertise */}
      <Industries />
      
      {/* Workflow Process */}
      <Process />
      
      {/* AI Overview (Internal Innovation) */}
      <AISummarizer />
      
      {/* Career Overview */}
      <Careers />
      
      {/* Contact Us Overview */}
      <Contact />
      
      <Footer />
      <Toaster />
    </main>
  );
}
