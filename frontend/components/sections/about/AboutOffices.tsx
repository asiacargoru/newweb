import { Card } from "@/components/ui/card";
import { MapPin, Building2, Users, Clock, DollarSign, CheckCircle2 } from "lucide-react";

const offices = [
  {
  city: "Москва",
  region: "Центральный офис",
  address: "г. Москва, ул. Горбунова 2c3, A-411, Бизнес-центр Гранд Сетунь Плаза",
  services: ["Консультации", "Расчет стоимости", "Договоры", "Координация перевозок"],
  workTime: "Пн-Пт: 9:00-18:00, Сб-Вс: Выходной",
  staff: "20+ сотрудников",
  description: "Главный офис компании с полным спектром услуг по организации международных грузоперевозок",
  phone: "+7 (499) 325-49-94",
  additionalPhones: ["+7 (499) 404-07-34"],
  email: "info@asiacargo.ru"
},
{
  city: "Владивосток",
  region: "Тихоокеанский филиал",
  address: "г. Владивосток, Портовая зона, Морской вокзал",
  services: ["Таможенное оформление", "Морские перевозки", "Портовое экспедирование", "Контейнерные перевозки", "Складское хранение"],
  workTime: "Пн-Пт: 9:00-18:00, Сб: 10:00-15:00",
  staff: "12+ сотрудников",
  description: "Крупнейший порт на Дальнем Востоке России. Обеспечиваем быструю растаможку и перевалку грузов."
},
  {
    city: "Пекин",
    region: "Офис",
    address: "Beijing, Chaoyang District",
    services: ["Управление логистикой", "Документооборот", "Контроль качества"],
    workTime: "24/7",
    staff: "15+ сотрудников",
    description: "Центр управления и ключевой логистический узел компании"
  },
  {
    city: "Шанхай",
    region: "Логистический хаб",
    address: "Shanghai, Pudong New Area",
    services: ["Морские перевозки", "Складское хранение", "Консолидация"],
    workTime: "24/7",
    staff: "12+ сотрудников",
    description: "Современный склад с развитой инфраструктурой для эффективной обработки грузов"
  },
  {
    city: "Гуанчжоу",
    region: "Центр обработки",
    address: "Guangzhou, Tianhe District",
    services: ["Распределение грузов", "Упаковка", "Сортировка"],
    workTime: "24/7",
    staff: "10+ сотрудников",
    description: "Организация и логистика грузов на южном направлении"
  },
  {
    city: "Суйфэньхэ",
    region: "Пограничный пункт",
    address: "Suifenhe, Heilongjiang",
    services: ["Таможня", "Железнодорожные перевозки", "Экспедирование"],
    workTime: "24/7",
    staff: "8+ сотрудников",
    description: "Ключевая точка для таможенного контроля и международных перевозок"
  },
  {
    city: "Хайхэ",
    region: "Многофункциональный склад",
    address: "Heihe, граница с Благовещенском",
    services: ["Склад временного хранения", "Быстрая растаможка", "Автоперевозки"],
    workTime: "24/7",
    staff: "6+ сотрудников",
    description: "Расширение сети складов для более быстрой и надежной доставки"
  }
];

const advantages = [
  {
    icon: DollarSign,
    title: "Снижение стоимости",
    description: "Собственные склады исключают посредников, что значительно снижает конечную стоимость перевозки"
  },
  {
    icon: Users,
    title: "Русскоязычная поддержка",
    description: "Наши сотрудники говорят по-русски, что исключает языковой барьер и недопонимания"
  },
  {
    icon: CheckCircle2,
    title: "Минимум бюрократии",
    description: "Комплектация, таможенное оформление и документальное сопровождение без проволочек"
  },
  {
    icon: Clock,
    title: "Быстрая обработка",
    description: "Оптимизированные процессы позволяют сократить время обработки и отправки грузов"
  }
];

const AboutOffices = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Представительства и склады в России и Китае
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Собственная складская сеть в ключевых городах Китая для максимально эффективной логистики и быстрой доставки
            </p>
          </div>

          {/* Offices Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {offices.map((office, index) => (
              <Card 
                key={index}
                className="p-6 border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-6 h-6 text-red-500" />
                      <h3 className="text-xl font-bold text-foreground">{office.city}</h3>
                    </div>
                    <p className="text-sm text-primary font-medium">{office.region}</p>
                  </div>
                </div>

                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {office.description}
                </p>
               
              </Card>
            ))}
          </div>

          {/* Advantages Section */}
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/5 border-2 animate-fade-in">
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Преимущества наших складов в Китае
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((advantage, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center mx-auto mb-4">
                    <advantage.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{advantage.title}</h4>
                  <p className="text-sm text-muted-foreground">{advantage.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-muted-foreground mb-4">
                Работайте с <strong className="text-foreground">Азия Транс Карго</strong> — надежным партнером Вашей логистики
              </p>
              <p className="text-sm text-muted-foreground">
                Свяжитесь с нами сегодня и узнайте, как мы можем помочь вашему бизнесу расти и развиваться без лишних хлопот
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutOffices;