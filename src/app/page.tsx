
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
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
      <Services />
      <Portfolio />
      <AISummarizer />
      <Contact />
      <Footer />
      <Toaster />
    </main>
  );
}
