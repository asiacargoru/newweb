import { TrendingUp, Users, Globe, Award } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "98%",
    label: "Грузов доставлены в срок",
    color: "brand-blue"
  },
  {
    icon: Users,
    value: "500+",
    label: "Постоянных клиентов",
    color: "brand-red"
  },
  {
    icon: Globe,
    value: "19",
    label: "Стран-партнеров",
    color: "brand-blue"
  },
  {
    icon: Award,
    value: "15 лет",
    label: "На рынке логистики",
    color: "brand-red"
  }
];

const ServiceStats = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-brand-blue to-brand-blue/90 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Цифры, которые говорят за нас
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Результаты нашей работы в цифрах
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group cursor-default"
            >
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all group-hover:bg-white/20">
                <stat.icon className="w-10 h-10 text-white" />
              </div>
              <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-base text-white/90 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { title: "Прозрачность", desc: "Полный контроль на каждом этапе доставки" },
            { title: "Надежность", desc: "Работаем по договору с гарантиями" },
            { title: "Экспертиза", desc: "Знаем все тонкости международной логистики" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-white/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceStats;