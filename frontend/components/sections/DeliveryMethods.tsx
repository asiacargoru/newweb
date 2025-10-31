'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ship, Plane, Train, Truck, Clock, DollarSign, Package, CheckCircle } from "lucide-react";

const deliveryMethods = [
  {
    icon: Ship,
    title: "Морская доставка из Китая",
    subtitle: "Оптимальный вариант для крупных партий",
    time: "25-35 дней",
    price: "от $800/контейнер",
    description: "Самый экономичный способ доставки больших объемов грузов. Контейнерные и сборные перевозки из всех крупных портов Китая.",
    features: [
      "FCL - полный контейнер 20'/40'",
      "LCL - сборный груз от 1 м³",
      "Отправка из портов: Шанхай, Нингбо, Циндао, Гуанчжоу",
      "Прямые линии до Владивостока, Новороссийска, Санкт-Петербурга",
      "Страхование груза включено",
      "Отслеживание контейнера онлайн"
    ],
    suitable: ["Мебель и оборудование", "Стройматериалы", "Оптовые партии товаров", "Негабаритные грузы"],
    color: "blue"
  },
  {
    icon: Plane,
    title: "Авиадоставка из Китая",
    subtitle: "Максимальная скорость доставки",
    time: "3-7 дней",
    price: "от $4/кг",
    description: "Экспресс-доставка для срочных и ценных грузов. Вылеты ежедневно из аэропортов Пекина, Шанхая, Гуанчжоу и других городов.",
    features: [
      "Доставка от 1 кг",
      "Приоритетная таможенная очистка",
      "Температурный режим для хрупких грузов",
      "Работа с опасными грузами ADR",
      "Доставка до двери по России",
      "Страхование на полную стоимость"
    ],
    suitable: ["Электроника и гаджеты", "Образцы продукции", "Хрупкие грузы", "Медицинское оборудование"],
    color: "red"
  },
  {
    icon: Train,
    title: "Железнодорожная доставка",
    subtitle: "Оптимальное соотношение цены и скорости",
    time: "14-18 дней",
    price: "от $1200/контейнер",
    description: "Надежный способ доставки контейнерных грузов по маршруту Китай-Европа-Россия через КПП Забайкальск, Достык, Алашанькоу.",
    features: [
      "Регулярные отправки 2-3 раза в неделю",
      "Контейнеры 20'/40'/45' HC",
      "Фиксированные сроки доставки",
      "Минимальный риск повреждений",
      "Экологичный вид транспорта",
      "Доставка в любой регион России"
    ],
    suitable: ["Промышленное оборудование", "Автозапчасти", "Бытовая техника", "Текстиль и одежда"],
    color: "blue"
  },
  {
    icon: Truck,
    title: "Автомобильная доставка",
    subtitle: "Гибкие маршруты и условия",
    time: "10-14 дней",
    price: "от $1500/фура",
    description: "Прямая доставка автотранспортом для грузов среднего объема. Идеально для доставки до конкретного адреса без перегрузок.",
    features: [
      "Доставка от 1 тонны",
      "Машины 3-20 тонн, тентованные/рефрижераторы",
      "Прямые рейсы без перегрузок",
      "Проезд через КПП Забайкальск, Благовещенск",
      "GPS-мониторинг в реальном времени",
      "Экспедирование на границе"
    ],
    suitable: ["Партии средних размеров", "Скоропортящиеся товары", "Адресная доставка", "Нестандартные грузы"],
    color: "red"
  }
];

const DeliveryMethods = () => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="delivery-methods" className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Способы доставки из Китая
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Выбирайте оптимальный вид транспорта в зависимости от типа груза, срочности и бюджета. Мы организуем доставку любой сложности.
          </p>
        </div>

        <div className="space-y-8">
          {deliveryMethods.map((method, index) => (
            <Card 
              key={index}
              className="p-6 sm:p-8 lg:p-10 hover:shadow-2xl transition-all duration-300 border-border bg-card"
            >
              <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-${method.color === 'red' ? 'brand-red' : 'brand-blue'}/10 flex items-center justify-center flex-shrink-0`}>
                      <method.icon className={`w-8 h-8 text-${method.color === 'red' ? 'brand-red' : 'brand-blue'}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-card-foreground mb-1">
                        {method.title}
                      </h3>
                      <p className="text-muted-foreground">{method.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {method.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
                      <Package className="w-5 h-5 text-brand-blue" />
                      Особенности и преимущества
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {method.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-card-foreground mb-3">
                      Подходит для:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {method.suitable.map((item, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-accent/10 text-accent-foreground rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-accent/5 to-accent/10 rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-brand-blue" />
                      <div>
                        <div className="text-xs text-muted-foreground">Срок доставки</div>
                        <div className="text-lg font-bold text-foreground">{method.time}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-brand-blue" />
                      <div>
                        <div className="text-xs text-muted-foreground">Стоимость</div>
                        <div className="text-lg font-bold text-foreground">{method.price}</div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={scrollToForm}
                    className="w-full bg-brand-red hover:bg-brand-red/90 text-white"
                    size="lg"
                  >
                    Рассчитать доставку
                  </Button>

                  <Button 
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={() => window.open('https://wa.me/yourphone', '_blank')}
                  >
                    Консультация
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryMethods;

