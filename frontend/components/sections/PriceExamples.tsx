import { Plane, Ship, Train, TruckIcon, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const priceExamples = [
  {
    country: "Китай",
    routes: [
      {
        icon: Plane,
        type: "Авиа",
        price: "$2.5/кг",
        time: "12-15 дней",
        popular: true,
        includes: ["Доставка до склада РФ", "Трекинг 24/7", "Страховка включена"],
      },
      {
        icon: Ship,
        type: "Море (FCL)",
        price: "$850",
        time: "35-40 дней",
        unit: "контейнер 20ft",
        includes: ["Доставка до порта РФ", "Таможенное оформление", "Хранение 5 дней"],
      },
      {
        icon: Train,
        type: "ЖД",
        price: "$1.8/кг",
        time: "20-25 дней",
        includes: ["Доставка до склада РФ", "Без перегрузок", "Экологично"],
      },
      {
        icon: TruckIcon,
        type: "Авто",
        price: "$2.2/кг",
        time: "15-20 дней",
        includes: ["Доставка до двери", "Гибкий график", "Подходит для LCL"],
      },
    ],
  },
  {
    country: "Турция",
    routes: [
      {
        icon: Plane,
        type: "Авиа",
        price: "$3.5/кг",
        time: "5-7 дней",
        popular: true,
        includes: ["Быстрая доставка", "Таможенное оформление", "Страховка"],
      },
      {
        icon: TruckIcon,
        type: "Авто",
        price: "$2.8/кг",
        time: "10-12 дней",
        includes: ["Дверь-дверь", "Без перегрузок", "Любые объемы"],
      },
    ],
  },
  {
    country: "ОАЭ",
    routes: [
      {
        icon: Plane,
        type: "Авиа",
        price: "$4.0/кг",
        time: "7-10 дней",
        popular: true,
        includes: ["Экспресс доставка", "Страховка груза", "Сертификация"],
      },
    ],
  },
  {
    country: "Индия",
    routes: [
      {
        icon: Plane,
        type: "Авиа",
        price: "$3.2/кг",
        time: "8-12 дней",
        includes: ["Быстрая доставка", "Трекинг", "Страхование"],
      },
      {
        icon: Ship,
        type: "Море (FCL)",
        price: "$1200",
        time: "40-45 дней",
        unit: "контейнер 20ft",
        includes: ["До порта РФ", "Оформление", "Хранение"],
      },
    ],
  },
];

const PriceExamples = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-accent border-accent">
            Прозрачные цены
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Примеры стоимости <span className="text-accent">доставки</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Реальные цены на популярные направления. Все включено: доставка, страховка, документы
          </p>
        </div>

        <div className="space-y-12 max-w-7xl mx-auto">
          {priceExamples.map((country, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-3">
                <span className="w-2 h-8 bg-accent rounded-full"></span>
                {country.country}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {country.routes.map((route, routeIdx) => (
                  <Card 
                    key={routeIdx}
                    className={`p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group ${
                      route.popular ? "border-accent border-2" : ""
                    }`}
                  >
                    {route.popular && (
                      <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                        Популярно
                      </Badge>
                    )}
                    
                    <div className="mb-4">
                      <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors mb-4">
                        <route.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-1">{route.type}</div>
                      <div className="text-3xl font-bold text-foreground mb-1">
                        {route.price}
                      </div>
                      {route.unit && (
                        <div className="text-xs text-muted-foreground">{route.unit}</div>
                      )}
                      <div className="text-sm font-medium text-accent mt-2">
                        ⏱ {route.time}
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-border pt-4">
                      <div className="text-sm font-medium mb-2">Включено:</div>
                      {route.includes.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="inline-block p-6 bg-accent/5 border-accent/20">
            <p className="text-sm text-muted-foreground mb-2">
              💡 <strong>Важно:</strong> Указаны средние цены на 2024 год. Точная стоимость зависит от характеристик груза, сезона и текущих тарифов.
            </p>
            <p className="text-sm text-muted-foreground">
              Для точного расчета воспользуйтесь нашим калькулятором выше или свяжитесь с менеджером.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PriceExamples;
