"use client";

import { Shield, FileCheck, Search, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const CustomsHero = () => {
  const scrollToForm = () => {
    document.getElementById('customs-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-brand-blue via-brand-blue/95 to-brand-blue/90 text-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Shield className="w-5 h-5 text-brand-red" />
            <span className="text-sm font-semibold">Лицензированный таможенный брокер ФТС России</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Таможенное оформление
            <span className="block text-brand-red mt-2">под ключ</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Профессиональное таможенное оформление грузов из стран Азии. Декларирование, сертификация, классификация товаров. Гарантия прохождения таможни.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="!bg-brand-red hover:bg-brand-red/90 text-white text-lg px-8"
            >
              Получить консультацию
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 border-white text-white hover:bg-white/20 text-lg px-8"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Наши услуги
            </Button>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: Shield,
              title: "Лицензия ФТС",
              description: "Официальный таможенный представитель"
            },
            {
              icon: FileCheck,
              title: "15 лет опыта",
              description: "Оформили более 50 000 деклараций"
            },
            {
              icon: Search,
              title: "Все виды товаров",
              description: "Работаем с любыми категориями"
            },
            {
              icon: Award,
              title: "Гарантия результата",
              description: "Успешное прохождение таможни"
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 mx-auto mb-4 text-brand-red" />
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomsHero;
