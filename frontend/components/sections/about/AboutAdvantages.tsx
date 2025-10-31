import { Card } from "@/components/ui/card";
import { Shield, Truck, FileCheck, Users, Clock, Award, DollarSign, Headphones } from "lucide-react";

const advantages = [
  {
    icon: Shield,
    title: "Лицензия таможенного брокера",
    description: "Официальная лицензия ФТС России позволяет нам эффективно решать все вопросы таможенного оформления и минимизировать риски задержек"
  },
  {
    icon: Truck,
    title: "Собственный автопарк",
    description: "Наличие собственного автопарка позволяет контролировать все этапы перевозки и обеспечивать высокую надежность и оперативность доставки"
  },
  {
    icon: Users,
    title: "Индивидуальный подход",
    description: "Персональный менеджер для каждого клиента, который знает все нюансы вашего бизнеса и оперативно решает любые вопросы"
  },
  {
    icon: Clock,
    title: "Работаем 24/7",
    description: "Круглосуточная поддержка и мониторинг грузов. Вы всегда можете связаться с нами и узнать актуальный статус доставки"
  },
  {
    icon: DollarSign,
    title: "Выгодные тарифы",
    description: "Собственные склады в Китае и прямые контракты с перевозчиками позволяют предлагать оптимальные цены без посредников"
  },
  {
    icon: Award,
    title: "Опыт и экспертиза",
    description: "Более 8 лет успешной работы на рынке международной логистики. Наша команда — это профессионалы с многолетним опытом"
  },
  {
    icon: FileCheck,
    title: "Полное документальное сопровождение",
    description: "Берем на себя все документы: от оформления контрактов до получения сертификатов и прохождения таможни"
  },
  {
    icon: Headphones,
    title: "Русскоязычная поддержка в Китае",
    description: "Наши сотрудники в китайских офисах говорят по-русски, что полностью исключает языковой барьер и недопонимания"
  }
];

const AboutAdvantages = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Преимущества Азия Транс Карго
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Почему более 5000 компаний выбрали нас своим логистическим партнером
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <Card 
                key={index}
                className="p-6 border-2 hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <advantage.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {advantage.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAdvantages;
