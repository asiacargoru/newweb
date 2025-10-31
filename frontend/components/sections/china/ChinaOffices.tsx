import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const offices = [
  {
    city: "Шанхай",
    region: "Shanghai",
    address: "Pudong New District, Shanghai Tower",
    services: ["Морской порт", "Авиа терминал", "Склад временного хранения"],
    workTime: "Пн-Пт: 9:00-18:00 (GMT+8)",
    staff: "5 специалистов",
    description: "Главный офис в крупнейшем торговом центре Китая"
  },
  {
    city: "Гуанчжоу", 
    region: "Guangdong",
    address: "Tianhe District, International Trade Center",
    services: ["Морской порт", "Работа с поставщиками", "Контроль качества"],
    workTime: "Пн-Пт: 9:00-18:00 (GMT+8)",
    staff: "4 специалиста",
    description: "Офис в центре производственного региона"
  },
  {
    city: "Пекин",
    region: "Beijing",
    address: "Chaoyang District, CBD Area",
    services: ["Авиа терминал", "Деловые переговоры", "VIP-сопровождение"],
    workTime: "Пн-Пт: 9:00-18:00 (GMT+8)",
    staff: "3 специалиста",
    description: "Представительство для деловых клиентов"
  },
  {
    city: "Шэньчжэнь",
    region: "Guangdong",
    address: "Futian District, Trade Plaza",
    services: ["Электроника", "Гаджеты", "Экспресс-доставка"],
    workTime: "Пн-Пт: 9:00-18:00 (GMT+8)",
    staff: "4 специалиста",
    description: "Специализация на высокотехнологичных товарах"
  },
  {
    city: "Циндао",
    region: "Shandong",
    address: "Shinan District, Port Area",
    services: ["Морской порт", "Контейнерные перевозки", "Складская логистика"],
    workTime: "Пн-Пт: 9:00-18:00 (GMT+8)",
    staff: "3 специалиста",
    description: "Офис в стратегически важном порту"
  }
];

const ChinaOffices = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Наши офисы в Китае
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Собственные представительства в ключевых городах обеспечивают быстрое реагирование и контроль на каждом этапе
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {offices.map((office, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 border-border bg-card group"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-brand-red/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-red/20 transition-colors">
                  <MapPin className="w-6 h-6 text-brand-red" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-card-foreground">{office.city}</h3>
                  <p className="text-sm text-muted-foreground">{office.region}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 italic">
                {office.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-brand-blue" />
                  <span>{office.address}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 flex-shrink-0 text-brand-blue" />
                  <span>{office.workTime}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="text-sm font-semibold text-card-foreground mb-2">
                  Специализация офиса:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {office.services.map((service, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-accent/10 text-accent-foreground rounded text-xs"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{office.staff}</span> на связи 24/7
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-brand-blue to-brand-blue/90 rounded-2xl p-8 sm:p-12 text-center text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Преимущества наших офисов в Китае
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              { icon: Phone, title: "Прямая связь", desc: "С поставщиками и портами" },
              { icon: MapPin, title: "Контроль качества", desc: "Проверка перед отправкой" },
              { icon: Clock, title: "Быстрая реакция", desc: "Решение вопросов на месте" },
              { icon: Mail, title: "Русский персонал", desc: "Понимаем ваши задачи" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <item.icon className="w-10 h-10 mx-auto mb-3 text-white opacity-90" />
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChinaOffices;
