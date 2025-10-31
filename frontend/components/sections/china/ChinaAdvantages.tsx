import { Shield, Clock, DollarSign, Users, Award, HeadphonesIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

const advantages = [
  {
    icon: Shield,
    title: "Собственные офисы в Китае",
    description: "5 представительств в ключевых городах для прямого контроля качества и оперативного решения вопросов"
  },
  {
    icon: Clock,
    title: "Отправки каждый день",
    description: "Регулярные рейсы всеми видами транспорта. Не нужно ждать накопления груза для отправки"
  },
  {
    icon: DollarSign,
    title: "Прозрачные цены",
    description: "Фиксированные ставки без скрытых комиссий. Все дополнительные расходы согласовываются заранее"
  },
  {
    icon: Users,
    title: "Работа с поставщиками",
    description: "Помогаем найти надежных производителей, проверяем качество товара перед отправкой"
  },
  {
    icon: Award,
    title: "Опыт более 10 лет",
    description: "Доставили свыше 15 000 контейнеров. Знаем все нюансы китайской логистики и таможни"
  },
  {
    icon: HeadphonesIcon,
    title: "Поддержка 24/7",
    description: "Русскоязычные менеджеры всегда на связи. Решаем любые вопросы в режиме реального времени"
  }
];

const ChinaAdvantages = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Почему выбирают нас для доставки из Китая
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Комплексный подход и многолетний опыт работы с китайским рынком
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 border-border bg-card group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-blue/20 transition-colors">
                  <advantage.icon className="w-6 h-6 text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-brand-blue/5 to-brand-red/5 rounded-2xl p-8 sm:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Комплексное решение для вашего бизнеса
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Мы не просто перевозчики - мы ваши партнеры в Китае. Помогаем на всех этапах: 
              от поиска поставщиков до доставки товара на ваш склад. 
              Сопровождаем каждую отправку и берем на себя все риски и заботы.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
                <span>Страхование грузов</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-red"></div>
                <span>Сертификация продукции</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
                <span>Складское хранение</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-red"></div>
                <span>Упаковка и маркировка</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChinaAdvantages;
