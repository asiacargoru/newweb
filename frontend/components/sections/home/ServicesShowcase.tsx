'use client'

import { Plane, Ship, Train, Truck, FileCheck, Award, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    icon: Plane,
    title: "Авиадоставка",
    description: "Быстрая доставка для срочных грузов",
    features: ["12-15 дней", "От $2.5/кг", "Страховка включена"],
    link: "/services",
  },
  {
    icon: Ship,
    title: "Морская доставка",
    description: "Экономичное решение для крупных партий",
    features: ["35-40 дней", "От $850 за 20ft", "FCL и LCL"],
    link: "/services",
  },
  {
    icon: Train,
    title: "ЖД доставка",
    description: "Оптимальный баланс цены и скорости",
    features: ["20-25 дней", "От $1.8/кг", "Без перегрузок"],
    link: "/services",
  },
  {
    icon: Truck,
    title: "Автодоставка",
    description: "Доставка из Китая, Турции и ближних стран",
    features: ["15-20 дней", "От $2.2/кг", "Дверь-дверь"],
    link: "/services",
  },
  {
    icon: FileCheck,
    title: "Таможенное оформление",
    description: "Полный цикл таможенных процедур",
    features: ["2-3 дня", "Все категории", "Гарантия прохождения"],
    link: "/services/customs",
  },
  {
    icon: Award,
    title: "Сертификация",
    description: "Получение всех необходимых документов",
    features: ["ЕАС сертификаты", "Декларации ТР ТС", "СГР"],
    link: "/services/customs",
  },
];

const ServicesShowcase = () => {
  const scrollToCalculator = () => {
    const element = document.getElementById("calculator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Комплексные решения для вашего бизнеса
          </h2>
          <p className="text-lg text-muted-foreground">
            От выкупа товара до доставки на склад — один партнер для всей цепочки поставок
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {services.map((service, idx) => (
            <Link key={idx} href={service.link}>
              <Card className="group h-full border-2 hover:border-brand-red/30 transition-all duration-300 hover:shadow-xl cursor-pointer">
                <CardContent className="p-8 pt-8">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-brand-light-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-brand-red" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-brand-red transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Arrow - всегда видимая */}
                  <div className="flex items-center text-sm font-medium text-brand-blue group-hover:text-brand-red/80 transition-colors">
                    Подробнее
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg"
            onClick={scrollToCalculator}
            className="!bg-brand-red hover:!bg-brand-red/90 text-white font-semibold px-10 py-6 text-lg shadow-lg group"
          >
            Рассчитать стоимость
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Получите расчет в течение 15 минут
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
