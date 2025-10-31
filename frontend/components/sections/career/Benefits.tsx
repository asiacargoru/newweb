import { Card } from "@/components/ui/card";
import { TrendingUp, Shield, Rocket, Users, Award, Banknote } from "lucide-react";

const benefits = [
  {
    icon: Banknote,
    title: "Достойная зарплата",
    description: "Конкурентная оплата труда выше рынка и прозрачная система премирования"
  },
  {
    icon: TrendingUp,
    title: "Карьерный рост",
    description: "Четкая система развития и продвижения для каждого сотрудника"
  },
  {
    icon: Shield,
    title: "Социальный пакет",
    description: "ДМС, корпоративное обучение и программы поддержки сотрудников"
  },
  {
    icon: Rocket,
    title: "Современные технологии",
    description: "Работа с передовыми IT-системами и инструментами логистики"
  },
  {
    icon: Users,
    title: "Сильная команда",
    description: "Окружение профессионалов и поддержка опытных коллег"
  },
  {
    icon: Award,
    title: "Стабильность",
    description: "Надежный работодатель с 15+ летней историей успеха на рынке"
  }
];

const Benefits = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Мы создаем условия для профессионального роста и личного развития каждого сотрудника
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index}
                className="p-8 hover:shadow-[0_8px_24px_-8px_hsl(205_100%_15%_/_0.15)] transition-all duration-300 hover:-translate-y-1 bg-card border-border animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-accent/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-card-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
