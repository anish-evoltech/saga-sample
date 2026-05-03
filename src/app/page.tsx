import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import LogoBar from "@/components/sections/LogoBar";
import IntegrateSection from "@/components/sections/IntegrateSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ComputeSection from "@/components/sections/ComputeSection";
import HowItWorks from "@/components/sections/HowItWorks";
import MobileSection from "@/components/sections/MobileSection";
import UseCases from "@/components/sections/UseCases";
import Testimonials from "@/components/sections/Testimonials";
import Articles from "@/components/sections/Articles";
import VacuumSection from "@/components/sections/VacuumSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LogoBar />
      <IntegrateSection />
      <FeaturesSection />
      <ComputeSection />
      <HowItWorks />
      <MobileSection />
      <UseCases />
      <Testimonials />
      <Articles />
      <VacuumSection />
      <Footer />
    </main>
  );
}
