import { Hero } from "../components/Hero";
import { AgencySnapshot } from "../components/AgencySnapshot";
import { VideoTestimonials } from "../components/VideoTestimonials";
import { WhyManifesto } from "../components/WhyManifesto";
import { Principles } from "../components/Principles";
import { ServicesCarousel } from "../components/ServicesCarousel";
import { ClientCases } from "../components/ClientCases";
import { Comparison } from "../components/Comparison";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { Metrics } from "../components/Metrics";
import { FounderNote } from "../components/FounderNote";
import { Contact } from "../components/Contact";

export function HomePage() {
  return (
    <>
      <Hero />
      <AgencySnapshot />
      <VideoTestimonials />
      <WhyManifesto />
      <Principles />
      <ServicesCarousel />
      <ClientCases />
      <Comparison />
      <ProcessTimeline />
      <Metrics />
      <FounderNote />
      <Contact />
    </>
  );
}
