
"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Sparkles, 
  ArrowRight, 
  Rocket, 
  Zap, 
  Layers,
  ShieldCheck,
  Globe,
  ShoppingCart,
  CheckCircle2,
  Code2,
  Layout,
  Smartphone,
  Building2,
  Cloud,
  Network,
  Palette,
  Server,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useUser, useFirestore, useDoc, useMemoFirebase, updateDocumentNonBlocking, setDocumentNonBlocking } from "@/firebase";
import { doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const PRODUCT_CATALOG = [
  {
    id: "custom-software",
    title: "Custom Software Development",
    description: "Bespoke engineering for complex business logic and high-performance workflows.",
    marketValue: 150000,
    icon: Code2,
    color: "bg-orange-500",
    features: ["Bespoke Architecture", "Scalable Engine", "Enterprise Security"]
  },
  {
    id: "web-app",
    title: "Web Application Development",
    description: "Modern, reactive web platforms built with Next.js and high-speed data sync.",
    marketValue: 85000,
    icon: Layout,
    color: "bg-blue-600",
    features: ["SEO Optimized", "Responsive UI", "Admin Dashboard"]
  },
  {
    id: "mobile-app",
    title: "Mobile Application Development",
    description: "High-performance iOS and Android apps with native-feel interactions.",
    marketValue: 120000,
    icon: Smartphone,
    color: "bg-emerald-600",
    features: ["Cross-platform", "Real-time Sync", "App Store Ready"]
  },
  {
    id: "enterprise-solutions",
    title: "Enterprise Solutions",
    description: "Robust ERP, CRM, and internal automation tools for large-scale operations.",
    marketValue: 250000,
    icon: Building2,
    color: "bg-indigo-600",
    features: ["Workflow Automation", "Centralized Data", "Custom Reports"]
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Services",
    description: "Automated deployment, containerization, and infrastructure as code.",
    marketValue: 60000,
    icon: Cloud,
    color: "bg-purple-600",
    features: ["99.9% Uptime", "CI/CD Pipeline", "AWS/Azure/GCP"]
  },
  {
    id: "api-integration",
    title: "API Development & Integration",
    description: "Secure bridges between your systems and third-party SaaS environments.",
    marketValue: 45000,
    icon: Network,
    color: "bg-pink-600",
    features: ["REST/GraphQL", "Legacy Sync", "Secure Gateway"]
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Experience Design",
    description: "Stunning, user-centric interfaces designed to maximize retention.",
    marketValue: 35000,
    icon: Palette,
    color: "bg-rose-600",
    features: ["Interactive Prototypes", "Design System", "User Research"]
  },
  {
    id: "web-hosting",
    title: "Enterprise Web Hosting",
    description: "High-speed, managed hosting solutions with 24/7 technical monitoring.",
    marketValue: 12000,
    icon: Server,
    color: "bg-cyan-600",
    features: ["SSL Protection", "Daily Backups", "Edge Delivery"]
  }
];

export default function ProductsPage() {
  const { user } = useUser();
  const db = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Fetch current cart
  const cartRef = useMemoFirebase(() => {
    if (!user || !db) return null;
    return doc(db, "carts", user.uid);
  }, [user, db]);
  const { data: cartData } = useDoc(cartRef);

  const handleAddToCart = (product: typeof PRODUCT_CATALOG[0]) => {
    if (!user) {
      toast({ 
        title: "Auth Protocol Required", 
        description: "Please sign in to provision modules to your secure cart." 
      });
      router.push("/login");
      return;
    }

    setLoadingId(product.id);

    const currentItems = cartData?.items || [];
    const existingItemIndex = currentItems.findIndex((item: any) => item.productId === product.id);
    
    let newItems;
    if (existingItemIndex > -1) {
      newItems = [...currentItems];
      newItems[existingItemIndex].quantity += 1;
    } else {
      newItems = [
        ...currentItems,
        {
          productId: product.id,
          title: product.title,
          price: product.marketValue,
          quantity: 1,
          image: `https://picsum.photos/seed/${product.id}/400/400`
        }
      ];
    }

    const cartPayload = {
      userId: user.uid,
      items: newItems,
      totalAmount: newItems.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0),
      updatedAt: new Date().toISOString()
    };

    if (!cartData) {
      setDocumentNonBlocking(cartRef!, { ...cartPayload, createdAt: new Date().toISOString() }, { merge: true });
    } else {
      updateDocumentNonBlocking(cartRef!, cartPayload);
    }

    setTimeout(() => {
      setLoadingId(null);
      toast({
        title: "Module Provisioned",
        description: `${product.title} has been added to your media cart.`,
      });
    }, 600);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <Navbar />

      {/* Hero Overview Section */}
      <section className="relative pt-32 pb-20 overflow-hidden vibrant-gradient text-white">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/20 border-2 border-white/30 text-white text-sm font-black uppercase tracking-widest shadow-xl backdrop-blur-md">
                <Package className="w-5 h-5 text-yellow-300" />
                Software Marketplace
              </div>
              <h1 className="text-6xl md:text-8xl font-headline font-black leading-[0.9] tracking-tighter drop-shadow-2xl">
                The Next Gen <span className="italic text-yellow-300">Digital Tools</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-bold border-l-4 border-yellow-300 pl-6">
                Provision high-performance software modules tailored for global business growth. Choose your stack and start building.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3 text-white/80 font-black uppercase tracking-widest text-xs">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> Enterprise Grade
                </div>
                <div className="flex items-center gap-3 text-white/80 font-black uppercase tracking-widest text-xs">
                  <Globe className="w-5 h-5 text-blue-400" /> Secure Provisioning
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000 delay-300">
              <div className="p-12 bg-white/10 backdrop-blur-xl rounded-[4rem] border border-white/20 shadow-2xl space-y-8">
                <div className="w-20 h-20 bg-yellow-300 rounded-3xl flex items-center justify-center rotate-12 shadow-2xl">
                  <Rocket className="text-primary w-10 h-10" />
                </div>
                <h3 className="text-4xl font-headline font-black italic">Building the Future</h3>
                <p className="text-lg font-medium leading-relaxed opacity-90">
                  Access our proprietary lineup of scalable infrastructure tools and bespoke software products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-headline font-black italic">Select Your <span className="text-primary">Modules</span></h2>
            <p className="text-muted-foreground text-xl font-medium max-w-2xl mx-auto">High-performance digital products with transparent market values.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {PRODUCT_CATALOG.map((product) => (
              <Card 
                key={product.id} 
                className="group border-none shadow-2xl rounded-[3rem] bg-white overflow-hidden hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
              >
                <div className={cn(
                  "h-48 flex flex-col items-center justify-center text-white relative transition-all duration-700",
                  product.color
                )}>
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <product.icon className="w-16 h-16 mb-2 transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 relative z-10" />
                  <div className="absolute top-6 right-6">
                    <Zap className="w-5 h-5 text-white/40 group-hover:text-yellow-300 transition-colors" />
                  </div>
                </div>

                <CardContent className="flex-1 p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-headline font-black italic leading-tight group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-semibold leading-relaxed">
                      {product.description}
                    </p>
                    <div className="space-y-2">
                      {product.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Market Value</p>
                        <p className="text-2xl font-headline font-black text-primary">₹{product.marketValue.toLocaleString()}</p>
                      </div>
                      <Badge variant="secondary" className="bg-slate-50 text-slate-500 font-black text-[8px] uppercase tracking-widest px-3 py-1">Verified</Badge>
                    </div>

                    <Button 
                      onClick={() => handleAddToCart(product)}
                      disabled={loadingId === product.id}
                      className="w-full rounded-2xl h-14 bg-primary text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-105 transition-all group/btn"
                    >
                      {loadingId === product.id ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          Provision Module <ShoppingCart className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="max-w-5xl mx-auto px-6 text-center space-y-12 relative z-10">
          <h2 className="text-4xl md:text-6xl font-headline font-black italic">Need a Custom Solution <span className="text-primary">Now?</span></h2>
          <p className="text-white/60 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            While our modules cover core enterprise needs, our expert team is available to build bespoke software tailored specifically to your unique vision.
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button size="lg" className="rounded-full px-16 h-20 text-xl font-headline bg-primary text-white hover:bg-white hover:text-primary transition-all duration-500 shadow-2xl group active:scale-95 border-none">
                Talk to Our Team <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
