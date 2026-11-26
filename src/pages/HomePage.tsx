import { Hero } from "../components/Hero";
import { ServicesCarousel } from "../components/ServicesCarousel";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { Metrics } from "../components/Metrics";
import { ClientCases } from "../components/ClientCases";
import { VideoTestimonials } from "../components/VideoTestimonials";
import { Comparison } from "../components/Comparison";
import { FounderNote } from "../components/FounderNote";
import { Contact } from "../components/Contact";
import { HomeFaq } from "../components/HomeFaq";
import { AuthorByline } from "../components/AuthorByline";

export function HomePage() {
  return (
    <>
      <Hero />
      <ServicesCarousel />
      <ProcessTimeline />
      <Metrics />
      <ClientCases />
      <VideoTestimonials />
      <Comparison />
      <FounderNote />
      <HomeFaq />
      <AuthorByline />
      <Contact />
    </>
  );
}
