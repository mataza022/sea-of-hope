import { Hero } from "@/components/home/hero";
import { QuickHelp } from "@/components/home/quick-help";
import { ServicesGrid } from "@/components/home/services-grid";
import { ImpactStats } from "@/components/home/impact-stats";
import { Testimonials } from "@/components/home/testimonials";
import { DonateCTA } from "@/components/home/donate-cta";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <QuickHelp />
      <ServicesGrid />
      <ImpactStats />
      <Testimonials />
      <DonateCTA />
    </main>
  );
}
