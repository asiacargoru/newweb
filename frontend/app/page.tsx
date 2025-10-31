import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import PremiumHero from "@/components/sections/home/PremiumHero";
import ServicesShowcase from "@/components/sections/home/ServicesShowcase";
import StatsSection from "@/components/sections/home/StatsSection";
import Countries from "@/components/sections/home/Countries";
import Advantages from "@/components/sections/home/Advantages";
import Guarantees from "@/components/sections/home/Guarantees";
import FloatingContactButton from "@/components/sections/home/FloatingContactButton";
import AdditionalServices from "@/components/sections/home/AdditionalServices";
import ProcessSteps from "@/components/sections/home/ProcessSteps";
import Reviews from "@/components/sections/home/Reviews";
import ModalForm from "@/components/sections/home/ModalForm";
import LatestNews from "@/components/sections/home/LatestNewsDynamic";
import CaseShowcase from "@/components/sections/home/CaseShowcaseDynamic";
import TrustIndicators from '@/components/sections/home/TrustIndicators';
import UnifiedCalculator from '@/components/sections/home/UnifiedCalculator';
import ServicesFAQ from '@/components/sections/home/ServicesFAQ';


export const metadata: Metadata = {
  title: 'Азия Транс Карго - Международные логистические услуги из Азии',
  description: 'Азия Транс Карго — надежный партнер в международной логистике. Доставка грузов из Китая, Турции, ОАЭ, Индии и других стран Азии. Быстро, безопасно, выгодно.',
  keywords: 'логистика из Азии, доставка из Китая, грузоперевозки из Турции, международная логистика, транспортные услуги, морские перевозки, авиаперевозки, железнодорожные перевозки',
  
  openGraph: {
    title: 'Азия Транс Карго - Международные логистические услуги',
    description: 'Доставка грузов из стран Азии. Надежная логистика от профессионалов.',
    type: 'website',
    locale: 'ru_RU',
    url: 'https://asiacargo.su',
    siteName: 'Азия Транс Карго',
  },
  
  alternates: {
    canonical: 'https://asiacargo.su',
  },
  
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  // JSON-LD структурированные данные
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Азия Транс Карго",
    "description": "Международная логистическая компания",
   "url": "https://asiacargo.su",
"telephone": "+7 (499) 325-49-94",
"email": "info@asiacargo.ru",

    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU",
      "addressLocality": "Москва"
    },
    "service": {
      "@type": "Service",
      "serviceType": "Международная логистика и грузоперевозки"
    }
  };

  // Скелеты мгновенно видны на сервере, пока грузятся секции
  const SectionSkeleton = ({ height = 320 }: { height?: number }) => (
    <div className="animate-pulse rounded-lg bg-muted" style={{ height }} />
  );

  const CaseShowcaseDynamic = dynamic(() => import('@/components/sections/home/CaseShowcaseDynamic'), {
    ssr: false,
    loading: () => <SectionSkeleton height={360} />,
  });

  const LatestNewsDynamic = dynamic(() => import('@/components/sections/home/LatestNewsDynamic'), {
    ssr: false,
    loading: () => <SectionSkeleton height={280} />,
  });

  return (
    <>
      {/* JSON-LD временно отключен для устранения ошибки парсинга */}

      <div className="min-h-screen bg-background">
        <main className="pt-18">
          <PremiumHero />
          <TrustIndicators />
          <ServicesShowcase />
          <Countries />
          <UnifiedCalculator />
          <CaseShowcaseDynamic />

          <Advantages />
          <Guarantees />
          <AdditionalServices />
          <ProcessSteps />
          <Reviews />
          <ServicesFAQ />
       <LatestNewsDynamic />

          <ModalForm />
        </main>
      </div>
    </>
  );
}
