import { Metadata } from 'next';
import dynamic from 'next/dynamic';
const ContactSection = dynamic(() => import('@/components/sections/Contact'), { ssr: false });

export const metadata: Metadata = {
  title: 'Контакты - Азия Транс Карго',
  description: 'Свяжитесь с нами для получения консультации по международным грузоперевозкам. Офис в Москве. Телефон +7 (499) 325-49-94',
  keywords: 'контакты, Азия Транс Карго, связаться с нами, офис в Москве, консультация по логистике',
  
  openGraph: {
    title: 'Контакты - Азия Транс Карго',
    description: 'Свяжитесь с нами для получения консультации по международным грузоперевозкам',
    type: 'website',
    locale: 'ru_RU',
    url: 'https://asiacargo.su/contacts',
    siteName: 'Азия Транс Карго',
  },
  
  alternates: {
    canonical: 'https://asiacargo.su/contacts',
  },
  
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Контакты - Азия Транс Карго",
    "description": "Контактная информация компании Азия Транс Карго",
    "url": "https://asiacargo.su/contacts",
    "mainEntity": {
      "@type": "Organization",
      "name": "Азия Транс Карго",
      "telephone": "+7 (499) 325-49-94",
      "email": "info@asiacargo.ru",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Горбунова 2c3, A-411",
        "addressLocality": "Москва",
        "addressCountry": "RU"
      },
      "openingHours": "Mo-Fr 09:00-18:00"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="min-h-screen bg-background">
        <main className="pt-20">
          <ContactSection />
        </main>
      </div>
    </>
  );
}
