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
import { useDocumentHead } from "../lib/useDocumentHead";
import { routeHead } from "../content/route-meta";

export function HomePage() {
  // Kopfdaten zentral in content/route-meta.ts.
  useDocumentHead(routeHead("/"));
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
