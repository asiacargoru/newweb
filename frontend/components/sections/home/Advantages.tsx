import { Shield, Clock, Wallet, Users, TrendingUp, CheckCircle } from "lucide-react";

const advantages = [
  {
    icon: Shield,
    title: "Гарантия безопасности",
    description: "Страхование грузов и полный контроль на всех этапах доставки",
  },
  {
    icon: Clock,
    title: "Точные сроки",
    description: "Соблюдение сроков доставки и прозрачное отслеживание груза",
  },
  {
    icon: Wallet,
    title: "Выгодные тарифы",
    description: "Оптимальные цены благодаря прямым контрактам с перевозчиками",
  },
  {
    icon: Users,
    title: "Личный менеджер",
    description: "Персональное сопровождение и консультации на всех этапах",
  },
  {
    icon: TrendingUp,
    title: "Масштабируемость",
    description: "Работаем как с малыми партиями, так и с крупными объемами",
  },
  {
    icon: CheckCircle,
    title: "Полный комплекс услуг",
    description: "От выкупа товара до доставки на ваш склад под ключ",
  },
];

const Advantages = () => {
  return (
    <section id="advantages" className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Профессиональный подход и забота о каждом клиенте
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="flex gap-4 group"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                  <advantage.icon className="w-6 h-6 text-accent group-hover:text-accent-foreground transition-colors" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {advantage.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Advantages;
