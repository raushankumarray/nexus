import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      {/* Content Placeholder */}
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
          Welcome to NPB <span className="text-primary italic">Nexus</span>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-2xl">
          The main sections have been cleared. You can now begin adding your custom UI/UX components here.
        </p>
      </div>

      <Footer />
      <Toaster />
    </main>
  );
}
