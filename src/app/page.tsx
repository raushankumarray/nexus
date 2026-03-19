import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      
      {/* 
          Main content area cleared. 
          You can now manually add your sections below.
          Example:
          <section id="custom-hero" className="pt-32 pb-20 px-6">
            <h1 className="text-4xl font-bold">My Custom Section</h1>
          </section>
      */}
      
      <div className="pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center space-y-6">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-5xl md:text-7xl font-headline font-bold">
            Your New <span className="text-primary italic">Homepage</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The default sections have been removed. You can now start building your custom layout manually by adding components or HTML structures directly into this file.
          </p>
        </div>
      </div>

      <Footer />
      <Toaster />
    </main>
  );
}
