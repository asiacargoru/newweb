import Hero from "@/components/sections/career/Hero";
import Benefits from "@/components/sections/career/Benefits";
import Stats from "@/components/sections/career/Stats";
import Culture from "@/components/sections/career/Culture";
import Testimonials from "@/components/sections/career/Testimonials";
import Vacancies from "@/components/sections/career/Vacancies";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Benefits />
      <Stats />
      <Culture />
      <Testimonials />
      <Vacancies />
     </main>
  );
};

export default Index;
