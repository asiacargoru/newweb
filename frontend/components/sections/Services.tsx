import { Ship, Plane, Train, Package } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: Ship,
    title: "Морские перевозки",
    description: "Контейнерные и сборные грузы. FCL и LCL доставка из всех портов Азии",
  },
  {
    icon: Plane,
    title: "Авиаперевозки",
    description: "Срочная доставка грузов авиатранспортом. Оптимальные сроки и тарифы",
  },
  {
    icon: Train,
    title: "Ж/Д перевозки",
    description: "Железнодорожные перевозки по маршруту Китай-Европа-Россия",
  },
  {
    icon: Package,
    title: "Таможенное оформление",
    description: "Полное таможенное сопровождение и оформление документов",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Наши услуги
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Комплексные логистические решения для вашего бизнеса
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card group"
            >
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <service.icon className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
