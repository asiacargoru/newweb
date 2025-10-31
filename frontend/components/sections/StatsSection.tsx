import { TrendingUp, Users, Package, Globe } from "lucide-react";

const stats = [
  {
    icon: Package,
    value: "5000+",
    label: "Успешных доставок",
    color: "text-blue-500",
  },
  {
    icon: Users,
    value: "800+",
    label: "Довольных клиентов",
    color: "text-green-500",
  },
  {
    icon: Globe,
    value: "15",
    label: "Стран в портфолио",
    color: "text-purple-500",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Своевременных доставок",
    color: "text-orange-500",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="mb-4 flex justify-center">
                <div className="w-20 h-20 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-foreground/20 transition-all duration-300">
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2 group-hover:text-accent transition-colors">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
