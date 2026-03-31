import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PainPoint from "@/components/PainPoint";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import PortfolioSection from "@/components/PortfolioSection";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PainPoint />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <PortfolioSection />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
