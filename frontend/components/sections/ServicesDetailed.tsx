'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ship, Plane, Train, Package, Clock, Shield, TrendingDown, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Ship,
    title: "Морские перевозки",
    description: "Контейнерные и сборные грузы из портов Азии",
    features: [
      "FCL - полный контейнер от 20 тонн",
      "LCL - сборный груз от 1 м³",
      "Доставка от 25-35 дней",
      "Оптимальные ставки на регулярных линиях"
    ],
    price: "от $800 за контейнер",
    color: "blue"
  },
  {
    icon: Plane,
    title: "Авиаперевозки",
    description: "Срочная доставка грузов авиатранспортом",
    features: [
      "Доставка от 3-7 дней",
      "Работа с хрупкими грузами",
      "Приоритетная таможенная очистка",
      "Контроль на всех этапах"
    ],
    price: "от $4/кг",
    color: "red"
  },
  {
    icon: Train,
    title: "Ж/Д перевозки",
    description: "Железнодорожные перевозки Китай-Европа-Россия",
    features: [
      "Доставка 14-18 дней",
      "Оптимальное соотношение цены и скорости",
      "Контейнерные перевозки",
      "Регулярные отправки"
    ],
    price: "от $1200 за контейнер",
    color: "blue"
  },
  {
    icon: Package,
    title: "Таможенное оформление",
    description: "Полное таможенное сопровождение грузов",
    features: [
      "Подготовка всех документов",
      "Декларирование товаров",
      "Сертификация продукции",
      "Консультации по ВЭД"
    ],
    price: "от 5000₽ за декларацию",
    color: "red"
  },
];

const additionalServices = [
  { icon: Clock, title: "Складское хранение", desc: "Безопасное хранение грузов" },
  { icon: Shield, title: "Страхование", desc: "Защита вашего груза" },
  { icon: TrendingDown, title: "Оптимизация затрат", desc: "Снижение логистических расходов" },
  { icon: Package, title: "Консолидация", desc: "Сборка грузов от разных поставщиков" },
];

const ServicesDetailed = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services-detailed" className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Наши услуги
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Комплексные решения для доставки любых грузов из стран Азии
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 border-border bg-card group"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-xl bg-${service.color === 'red' ? 'brand-red' : 'brand-blue'}/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <service.icon className={`w-8 h-8 text-${service.color === 'red' ? 'brand-red' : 'brand-blue'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-card-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Стоимость</div>
                  <div className="text-2xl font-bold text-foreground">{service.price}</div>
                </div>
                <Button 
                  onClick={scrollToForm}
                  className="bg-brand-red hover:bg-brand-red/90 text-white"
                >
                  Заказать
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-brand-blue/5 to-brand-red/5 rounded-2xl p-8 sm:p-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
            Дополнительные услуги
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-background shadow-md flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all group-hover:scale-110">
                  <service.icon className="w-7 h-7 text-brand-blue" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{service.title}</h4>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesDetailed;
