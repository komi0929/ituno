import { BentoGrid } from "@/components/landing/BentoGrid";
import { Footer } from "@/components/landing/Footer";
import { GlobalHeader } from "@/components/landing/GlobalHeader";
import { HeroSection } from "@/components/landing/HeroSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <GlobalHeader />
      <main>
        <HeroSection />
        <BentoGrid />
      </main>
      <Footer />
    </div>
  );
}
