import { Card } from "@/components/ui/card";
import { Truck, Train, Plane, Ship, FileText, Warehouse, Package, Shield } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Автомобильные перевозки",
    description: "Быстрая и надёжная доставка по автодорогам. Идеально для доставки «от двери до двери»"
  },
  {
    icon: Train,
    title: "Железнодорожные перевозки",
    description: "Эффективное решение для тяжёлых и крупногабаритных грузов. Стабильные сроки и надёжная логистика"
  },
  {
    icon: Plane,
    title: "Воздушные перевозки",
    description: "Максимально быстрая доставка на любые расстояния. Оптимально для срочных и ценных отправлений"
  },
  {
    icon: Ship,
    title: "Морские перевозки",
    description: "Экономичный вариант для международной логистики. Подходит для крупных партий и длинных маршрутов"
  },
  {
    icon: FileText,
    title: "Таможенное оформление",
    description: "Полное оформление таможенных документов и быстрое прохождение процедур без задержек"
  },
  {
    icon: Warehouse,
    title: "Складские услуги",
    description: "Хранение, консолидация и сортировка грузов на наших складах в России и Китае"
  },
  {
    icon: Package,
    title: "Упаковка и переупаковка",
    description: "Профессиональная упаковка грузов с учетом особенностей транспортировки и требований безопасности"
  },
  {
    icon: Shield,
    title: "Страхование грузов",
    description: "Комплексное страхование грузов и сопровождение на всех этапах транспортировки"
  }
];

const AboutServices = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Наши услуги
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Полный спектр логистических решений для вашего бизнеса
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="p-6 border-2 hover:border-accent/50 hover:shadow-lg transition-all duration-300 group animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Additional Services */}
          <Card className="mt-12 p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Комплексные решения для перевозки
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Документооборот</h4>
                <p className="text-sm text-muted-foreground">Оформление всех необходимых документов для международной перевозки</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Складирование</h4>
                <p className="text-sm text-muted-foreground">Краткосрочное и долгосрочное хранение грузов на наших складах</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Логистика</h4>
                <p className="text-sm text-muted-foreground">Разработка оптимальных маршрутов и схем доставки</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
