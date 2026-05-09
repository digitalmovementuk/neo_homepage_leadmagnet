import { Hero } from "../components/Hero";
import { AgencySnapshot } from "../components/AgencySnapshot";
import { ServicesCarousel } from "../components/ServicesCarousel";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { Metrics } from "../components/Metrics";
import { ClientCases } from "../components/ClientCases";
import { VideoTestimonials } from "../components/VideoTestimonials";
import { Comparison } from "../components/Comparison";
import { FounderNote } from "../components/FounderNote";
import { Contact } from "../components/Contact";

export function HomePage() {
  return (
    <>
      <Hero />
      <AgencySnapshot />
      <ServicesCarousel />
      <ProcessTimeline />
      <Metrics />
      <ClientCases />
      <VideoTestimonials />
      <Comparison />
      <FounderNote />
      <Contact />
    </>
  );
}
