import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-headline font-bold">Welcome to NPB Nexus</h1>
          <p className="text-muted-foreground">The landing page is ready for your new content.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
