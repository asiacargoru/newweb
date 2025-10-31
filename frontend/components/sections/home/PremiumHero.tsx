'use client'

import { ArrowRight, Plane, Ship, Train, Truck, CheckCircle2, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ContactModal from "@/components/sections/home/ContactModal";
import { useState } from "react";

const PremiumHero = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const scrollToCalculator = () => {
    const element = document.getElementById("calculator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden bg-gradient-hero">
  
        {/* Clean subtle background */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '48px 48px',
            }} 
          />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Top Badge */}
            <div className="text-center mb-8 animate-fade-in pt-6">
              <Badge className="px-6 py-3 bg-accent/10 border-accent/30 text-primary-foreground backdrop-blur-sm text-sm font-medium">
              
                Лицензированный таможенный брокер ФТС России • С 2010 года
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center text-primary-foreground leading-[1.15] break-words px-2 mb-6 animate-scale-in">
              Международная<br />
              <span className="text-accent">логистика</span> под ключ
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl md:text-3xl text-center text-primary-foreground/90 max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Доставка из 20+ стран • Таможня • Сертификация<br />
              <span className="text-lg sm:text-xl text-primary-foreground/70">Все в одном окне. Быстро. Надежно. Выгодно.</span>
            </p>

            {/* Transport Types Showcase */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="group bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20 hover:bg-primary-foreground/10 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <Plane className="w-12 h-12 text-accent mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-lg font-bold text-primary-foreground mb-1">Авиа</div>
                <div className="text-sm text-primary-foreground/70">12-15 дней</div>
                <div className="text-accent font-semibold mt-2">$2.5/кг</div>
              </div>
              <div className="group bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20 hover:bg-primary-foreground/10 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <Ship className="w-12 h-12 text-accent mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-lg font-bold text-primary-foreground mb-1">Море</div>
                <div className="text-sm text-primary-foreground/70">35-40 дней</div>
                <div className="text-accent font-semibold mt-2">$850/20ft</div>
              </div>
              <div className="group bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20 hover:bg-primary-foreground/10 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <Train className="w-12 h-12 text-accent mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-lg font-bold text-primary-foreground mb-1">ЖД</div>
                <div className="text-sm text-primary-foreground/70">20-25 дней</div>
                <div className="text-accent font-semibold mt-2">$1.8/кг</div>
              </div>
              <div className="group bg-primary-foreground/5 backdrop-blur-sm rounded-xl p-6 border border-primary-foreground/20 hover:bg-primary-foreground/10 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                <Truck className="w-12 h-12 text-accent mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-lg font-bold text-primary-foreground mb-1">Авто</div>
                <div className="text-sm text-primary-foreground/70">15-20 дней</div>
                <div className="text-accent font-semibold mt-2">$2.2/кг</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in pt-20" style={{ animationDelay: '0.4s' }}>
              <Button 
                onClick={scrollToCalculator}
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-7 shadow-xl hover:shadow-2xl transition-all text-lg group"
              >
                Рассчитать стоимость
                <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
     
              <Button
                size="lg"
                onClick={() => setModalOpen(true)}
                className="!bg-brand-red hover:!bg-brand-red/90 text-white px-12 py-6 text-lg"
              >
                Получить консультацию
              </Button>
            </div>
             
          
          </div>
        </div>
      </section>
      
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
};

export default PremiumHero;
