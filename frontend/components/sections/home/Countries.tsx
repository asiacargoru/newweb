'use client';

import { Globe, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const countries = [
  { name: "Китай", flag: "/images/flags/china_f.webp", link: "/services/china" },
  { name: "Турция", flag: "/images/flags/turkey_f.png", link: "/services/turkey" },
  { name: "ОАЭ", flag: "/images/flags/uae_f.webp", link: "/services/uae" },
  { name: "Индия", flag: "/images/flags/india_f.png", link: "/services/india" },
  { name: "Япония", flag: "/images/flags/japan_f.png", link: "/services/japan" },
  { name: "Таиланд", flag: "/images/flags/thailand_f.png", link: "/services/thailand" },
  { name: "Бангладеш", flag: "/images/flags/bangladesh_f.png", link: "/services/bangladesh" },
  { name: "Вьетнам", flag: "/images/flags/vietnam_f.png", link: "/services/vietnam" },
  { name: "Иран", flag: "/images/flags/iran_f.png", link: "/services/iran" },
  { name: "Корея", flag: "/images/flags/korea_f.png", link: "/services/korea" },
  { name: "Малайзия", flag: "/images/flags/malaysia_f.png", link: "/services/malaysia" },
  { name: "Филиппины", flag: "/images/flags/philippines_f.png", link: "/services/philippines" },
  { name: "Индонезия", flag: "/images/flags/indonesia_f.webp", link: "/services/indonesia" },
  { name: "Мьянма", flag: "/images/flags/myanmar_f.webp", link: "/services/myanmar" },
  { name: "Тайвань", flag: "/images/flags/taiwan_f.png", link: "/services/taiwan" },
  { name: "Австралия", flag: "/images/flags/australia_f.png", link: "/services/australia" },
  { name: "Н. Зеландия", flag: "/images/flags/new_zealand_f.png", link: "/services/new-zealand" },
  { name: "Египет", flag: "/images/flags/egypt_.webp", link: "/services/egypt" },
  { name: "Сербия", flag: "/images/flags/serbia_f.png", link: "/services/serbia" },
];

const Countries = () => {
  const handleCall = () => {
    window.location.href = "tel:+74993254994";
  };

  return (
    <section id="countries" className="py-16 sm:py-20 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Globe className="w-6 h-6 text-brand-red" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            География наших услуг
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Работаем с ведущими странами Азии, Океании и Ближнего Востока
          </p>
        </div>

        {/* Сетка стран */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {countries.map((country, index) => (
            <a
              key={index}
              href={country.link}
              className="bg-card rounded-lg p-4 flex flex-col items-center justify-center text-center 
                         hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-border 
                         group cursor-pointer"
            >
              <div className="w-20 h-14 mb-2 rounded overflow-hidden shadow-sm group-hover:shadow-md transition-shadow relative">
                <Image
                  src={country.flag}
                  alt={country.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="text-sm font-medium text-card-foreground">
                {country.name}
              </div>
            </a>
          ))}
        </div>

        {/* Блок "Не нашли нужную страну" */}
        <div className="mt-12 text-center bg-gradient-to-r from-brand-blue/10 to-brand-red/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Не нашли нужную страну?
          </h3>
          <p className="text-muted-foreground mb-4">
            Свяжитесь с нами, и мы с радостью ответим на все ваши вопросы
          </p>

          <Button
            size="lg"
            onClick={handleCall}
            className="!bg-brand-red hover:!bg-brand-red/90 text-white font-semibold px-10 py-6 text-lg shadow-lg group"
          >
            Позвонить&nbsp;нам
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Countries;
