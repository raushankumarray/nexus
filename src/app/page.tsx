
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { MainOverview } from "@/components/sections/MainOverview";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { AISummarizer } from "@/components/sections/AISummarizer";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Main Overview Section - AI & Uptime Features */}
      <MainOverview />

      {/* Core Services Preview */}
      <Services />

      {/* AI Tooling Lab */}
      <AISummarizer />

      {/* Strategic Workflow */}
      <Process />

      <Footer />
      <Toaster />
    </main>
  );
}
