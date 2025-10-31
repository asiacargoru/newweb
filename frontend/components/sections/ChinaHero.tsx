'use client';

import { Button } from "@/components/ui/button";
import { Ship, Plane, Train, Truck, ArrowRight } from "lucide-react";

const ChinaHero = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-br from-brand-blue via-brand-blue/95 to-brand-blue/90 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">Собственные офисы в 5 городах Китая</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in leading-tight">
            Доставка из Китая в Россию
            <span className="block text-brand-red mt-2">от 3 дней</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in leading-relaxed">
            Все виды транспорта: морские, авиа, ж/д и автоперевозки. Полное таможенное оформление. Прозрачные цены без скрытых комиссий.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-brand-red hover:bg-brand-red/90 text-white shadow-lg hover:shadow-xl transition-all group"
            >
              Рассчитать стоимость
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => document.getElementById('delivery-methods')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
            >
              Способы доставки
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {[
              { icon: Ship, label: "Морем", time: "25-35 дней", color: "blue" },
              { icon: Plane, label: "Авиа", time: "3-7 дней", color: "red" },
              { icon: Train, label: "Ж/Д", time: "14-18 дней", color: "blue" },
              { icon: Truck, label: "Авто", time: "10-14 дней", color: "red" }
            ].map((method, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-all group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <method.icon className={`w-8 h-8 mx-auto mb-2 text-white group-hover:scale-110 transition-transform`} />
                <div className="text-white font-semibold text-sm mb-1">{method.label}</div>
                <div className="text-white/70 text-xs">{method.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChinaHero;

