'use client';

import { ArrowRight, Plane, Ship, Train, Truck, CheckCircle2, Globe, Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PremiumHero = () => {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Animated Transport Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Plane className="absolute top-20 left-10 w-12 h-12 text-accent/20 animate-float" style={{ animationDelay: '0s' }} />
        <Ship className="absolute top-40 right-20 w-16 h-16 text-accent/15 animate-float" style={{ animationDelay: '1s' }} />
        <Train className="absolute bottom-40 left-20 w-14 h-14 text-accent/20 animate-float" style={{ animationDelay: '2s' }} />
        <Truck className="absolute bottom-20 right-10 w-12 h-12 text-accent/15 animate-float" style={{ animationDelay: '1.5s' }} />
        <Globe className="absolute top-1/2 left-5 w-10 h-10 text-primary-foreground/10 animate-pulse-slow" />
        <Globe className="absolute top-1/3 right-5 w-8 h-8 text-primary-foreground/10 animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top Badge */}
          <div className="text-center mb-8 animate-fade-in">
            <Badge className="px-6 py-3 bg-accent/10 border-accent/30 text-primary-foreground backdrop-blur-sm text-sm font-medium">
              <Shield className="w-4 h-4 mr-2 inline" />
              Лицензированный таможенный брокер ФТС России
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center text-primary-foreground leading-tight mb-6 animate-scale-in">
            Международная<br />
            <span className="text-accent">логистика</span> под ключ
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl md:text-3xl text-center text-primary-foreground/90 max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Доставка из Азии • Таможня • Сертификация<br />
            <span className="text-lg sm:text-xl text-primary-foreground/70">Все в одном окне. Быстро. Надежно. Выгодно.</span>
          </p>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 animate-slide-in-left">
              <Clock className="w-10 h-10 text-accent mb-3" />
              <div className="text-2xl font-bold text-primary-foreground mb-1">от 12 дней</div>
              <div className="text-sm text-primary-foreground/80">Доставка из Китая авиа</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CheckCircle2 className="w-10 h-10 text-accent mb-3" />
              <div className="text-2xl font-bold text-primary-foreground mb-1">от $2.5/кг</div>
              <div className="text-sm text-primary-foreground/80">Оптимальные тарифы</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 animate-slide-in-right">
              <Shield className="w-10 h-10 text-accent mb-3" />
              <div className="text-2xl font-bold text-primary-foreground mb-1">100%</div>
              <div className="text-sm text-primary-foreground/80">Гарантия прохождения таможни</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={scrollToCalculator}
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-7 shadow-xl hover:shadow-2xl transition-all text-lg group"
            >
              Рассчитать стоимость
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={scrollToContact}
              size="lg" 
              variant="outline"
              className="bg-primary-foreground/10 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 font-semibold px-10 py-7 text-lg backdrop-blur-sm"
            >
              Получить консультацию
            </Button>
          </div>

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

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-primary-foreground/70 text-sm animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span>5000+ успешных доставок</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span>15 лет на рынке</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span>Офисы в 5 городах Китая</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default PremiumHero;

