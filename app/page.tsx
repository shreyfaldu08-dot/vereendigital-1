import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Numbers from "@/components/sections/Numbers";
import TypeWall from "@/components/motion/TypeWall";
import ServiceRail from "@/components/sections/ServiceRail";
import CrossRails from "@/components/motion/CrossRails";
import Proof from "@/components/sections/Proof";
import Arc from "@/components/sections/Arc";
import Approach from "@/components/sections/Approach";
import Process from "@/components/sections/Process";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Numbers />
      <TypeWall word="Services" rows={6} perRow={5} />
      <ServiceRail />
      <CrossRails
        title="Our proven work"
        top={["AI SEO", "Technical SEO", "Schema", "Entity signals", "Core Web Vitals"]}
        bottom={["Google Ads", "Meta Ads", "ChatGPT Ads", "Citation tracking", "Content"]}
      />
      <Proof />
      <Arc />
      <Approach />
      <Process />
      <CTA />
    </>
  );
}
