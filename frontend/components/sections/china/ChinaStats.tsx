import { TrendingUp, Package, Users, Award } from "lucide-react";

const stats = [
  {
    icon: Package,
    number: "15,000+",
    label: "Контейнеров доставлено",
    description: "За время работы"
  },
  {
    icon: Users,
    number: "1,200+",
    label: "Довольных клиентов",
    description: "Постоянно с нами"
  },
  {
    icon: TrendingUp,
    number: "98%",
    label: "Доставка в срок",
    description: "Без задержек"
  },
  {
    icon: Award,
    number: "10+",
    label: "Лет на рынке",
    description: "Опыт и экспертиза"
  }
];

const ChinaStats = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-brand-blue to-brand-blue/90 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Цифры, которые говорят за нас
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Результаты работы с доставкой из Китая в Россию
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/15 transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-white/70">{stat.description}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Каждый день мы помогаем российским компаниям импортировать товары из Китая. 
            От небольших партий для малого бизнеса до крупных промышленных грузов.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChinaStats;
