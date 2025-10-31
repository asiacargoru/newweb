'use client';

import { Plane, Ship, Train, Truck, FileCheck, Award, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    icon: Plane,
    title: "Авиадоставка",
    description: "Самый быстрый способ доставки из Азии. Идеально для срочных и ценных грузов.",
    features: ["12-15 дней из Китая", "От $2.5/кг", "Страховка включена", "Трекинг 24/7"],
    color: "from-blue-500 to-cyan-500",
    link: "/china-delivery",
  },
  {
    icon: Ship,
    title: "Морская доставка",
    description: "Экономичное решение для крупных партий. Контейнерные и сборные грузы.",
    features: ["35-40 дней", "От $850 за 20ft", "FCL и LCL", "Хранение 5 дней"],
    color: "from-blue-600 to-blue-800",
    link: "/china-delivery",
  },
  {
    icon: Train,
    title: "ЖД доставка",
    description: "Оптимальное соотношение цены и скорости. Экологичный вид транспорта.",
    features: ["20-25 дней", "От $1.8/кг", "Без перегрузок", "Любые объемы"],
    color: "from-green-500 to-emerald-600",
    link: "/china-delivery",
  },
  {
    icon: Truck,
    title: "Автодоставка",
    description: "Доставка из Китая, Турции и ближних стран. Гибкий график и маршруты.",
    features: ["15-20 дней", "От $2.2/кг", "Дверь-дверь", "Подходит для LCL"],
    color: "from-orange-500 to-red-500",
    link: "/china-delivery",
  },
  {
    icon: FileCheck,
    title: "Таможенное оформление",
    description: "Полный цикл таможенных процедур. Лицензия таможенного брокера ФТС.",
    features: ["2-3 дня оформления", "Все категории товаров", "Расчет платежей", "Гарантия прохождения"],
    color: "from-purple-500 to-indigo-600",
    link: "/customs",
  },
  {
    icon: Award,
    title: "Сертификация",
    description: "Получение всех необходимых сертификатов и деклараций соответствия.",
    features: ["ЕАС сертификаты", "Декларации ТР ТС", "СГР для косметики", "Экспертная поддержка"],
    color: "from-pink-500 to-rose-600",
    link: "/customs",
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
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-accent border-accent">
            Полный спектр услуг
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Решаем <span className="text-accent">все задачи</span> логистики
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            От выкупа товара до доставки на ваш склад. Один исполнитель для всей цепочки поставок.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {services.map((service, idx) => (
            <Card 
              key={idx}
              className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 hover:border-accent/50"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <div className="p-8 relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Button 
                  variant="ghost" 
                  className="w-full group/btn hover:bg-accent/10"
                  onClick={() => window.location.href = service.link}
                >
                  Подробнее
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg"
            onClick={scrollToCalculator}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-10 py-7 text-lg shadow-xl group"
          >
            Рассчитать стоимость услуг
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;

