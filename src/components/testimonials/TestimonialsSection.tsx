import { Marquee } from "@mantine/core";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsSection() {
  return (
    <section className="mt-8 flex flex-col gap-4 rise-in overflow-hidden">
      <h2 className="display-title font-bold text-4xl">Testmonials</h2>
      <span className="text-base text-(--sea-ink-soft) sm:text-lg">
        Here's a few testmonials from our beloved clients
      </span>
      <Marquee fadeEdges={true} pauseOnHover gap={16}>
        <TestimonialCard
          name="Priscilla"
          review="I can't recommend Memento Event Rentals enough. They have such a curated
          selection of vintage furniture and decor. The people at my party could
          not stop complementing me on the decor. 10/10 recommended!"
        />
        <TestimonialCard
          name="Tony"
          review="Pleasure working with Memento Party rentals. They had what I needed and setup with no hassle. Would use again."
        />
        <TestimonialCard
          name="Owen"
          review="I was in a pinch to get a party ready in short notice. So glad I contacted Memento. They were so nice over the phone and even setup for a reasonable cost. Would definitely be using them again."
        />
        <TestimonialCard
          name="Gabriela"
          review="They had what I wanted! I was having my 16 and their pieces are so unique. My friends couldn't stop complimenting how much they enjoyed the decor. Use them!"
        />
      </Marquee>
    </section>
  );
}
