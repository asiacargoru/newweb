'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Container, Plane, Ship, MapPin, FileCheck, Truck, Shield, Globe } from "lucide-react";
import ContactModal from "@/components/sections/home/ContactModal";

const expertise = [
  {
    icon: Container,
    title: "Контейнерные перевозки",
    description: "Надежная доставка грузов контейнерами по всему миру с полной сохранностью",
    color: "from-blue-500/10 to-blue-600/10"
  },
  {
    icon: Plane,
    title: "Авиаперевозки",
    description: "Быстрая доставка срочных грузов воздушным транспортом с контролем на каждом этапе",
    color: "from-sky-500/10 to-sky-600/10"
  },
  {
    icon: Ship,
    title: "Фрахтование сухогрузов",
    description: "Организация аренды сухогрузных судов для перевозки больших объемов грузов",
    color: "from-cyan-500/10 to-cyan-600/10"
  },
  {
    icon: MapPin,
    title: "Экспедирование и портовая перевалка",
    description: "Профессиональное сопровождение и перегрузка грузов в портах для своевременной доставки",
    color: "from-teal-500/10 to-teal-600/10"
  },
  {
    icon: FileCheck,
    title: "Таможенное оформление",
    description: "Полное оформление таможенных документов и быстрое прохождение процедур без задержек",
    color: "from-green-500/10 to-green-600/10"
  },
  {
    icon: Truck,
    title: "Международные автоперевозки",
    description: "Транспортировка грузов автотранспортом по международным маршрутам с гарантией безопасности",
    color: "from-orange-500/10 to-orange-600/10"
  },
  {
    icon: Shield,
    title: "Страхование и экспедирование",
    description: "Комплексное страхование грузов и сопровождение на всех этапах транспортировки",
    color: "from-red-500/10 to-red-600/10"
  },
  {
    icon: Globe,
    title: "Мультимодальные перевозки",
    description: "Комбинированная доставка с использованием нескольких видов транспорта для оптимизации маршрута",
    color: "from-purple-500/10 to-purple-600/10"
  }
];

const AboutExpertise = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Экспертиза и опыт сотрудников
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Наши специалисты обладают глубокими знаниями в различных областях логистики и готовы решить любую задачу
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {expertise.map((item, index) => (
                <Card 
                  key={index}
                  className="p-6 border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>

            {/* CTA Section */}
            <Card className="mt-16 p-8 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 border-2 text-center animate-fade-in">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Нужен надежный партнер для международных перевозок?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Обратитесь в Азия Транс Карго для получения консультации и расчета стоимости услуг. Мы готовы предложить вам лучшие условия и высокое качество обслуживания.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => setModalOpen(true)}
                  className="!px-8 py-3 bg-brand-red text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Получить консультацию
                </button>
                <a 
                  href="tel:+74993254994" 
                  className="px-8 py-3 bg-background border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors inline-block"
                >
                  Позвонить сейчас
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
};

export default AboutExpertise;