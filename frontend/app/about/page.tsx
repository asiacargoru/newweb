import { Metadata } from "next";

import AboutHero from "@/components/sections/about/AboutHero";
import AboutCompany from "@/components/sections/about/AboutCompany";
import AboutAdvantages from "@/components/sections/about/AboutAdvantages";
import AboutServices from "@/components/sections/about/AboutServices";
import AboutOffices from "@/components/sections/about/AboutOffices";
import AboutExpertise from "@/components/sections/about/AboutExpertise";


export const metadata: Metadata = {
  title: "О компании Азия Транс Карго — Международная логистика и грузоперевозки",
  description: "Азия Транс Карго — надежная логистическая компания с собственными складами в Китае. Международные грузоперевозки, таможенное оформление, полный цикл логистических услуг.",
  keywords: "о компании азия транс карго, логистическая компания, международные грузоперевозки, склады в китае, таможенный брокер",
  alternates: {
    canonical: "https://asiacargo.su/about",
  },
  openGraph: {
    title: "О компании Азия Транс Карго — Международная логистика и грузоперевозки",
    description: "Азия Транс Карго — надежная логистическая компания с собственными складами в Китае. Международные грузоперевозки, таможенное оформление, полный цикл логистических услуг.",
    url: "https://asiacargo.su/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        <AboutHero />
        <AboutCompany />
        <AboutAdvantages />
        <AboutServices />
        <AboutOffices />
        <AboutExpertise />
      </main>
    </div>
  );
}