import { About } from "@/components/About";
import { Charts } from "@/components/Charts";
import { Community } from "@/components/Community";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowToBuy } from "@/components/HowToBuy";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="content">
        <Hero />
        <About />
        <HowToBuy />
        <Community />
        <Charts />
        <Footer />
      </main>
    </>
  );
}
