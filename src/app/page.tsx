import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { AISummarizer } from "@/components/sections/AISummarizer";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      {/* Services section removed from main page as requested */}
      <Portfolio />
      <AISummarizer />
      <Contact />
      <Footer />
      <Toaster />
    </main>
  );
}
