import { TrendingUp, Users, Package, Globe } from "lucide-react";

const stats = [
  {
    icon: Package,
    value: "5000+",
    label: "Успешных доставок",
  },
  {
    icon: Users,
    value: "800+",
    label: "Довольных клиентов",
  },
  {
    icon: Globe,
    value: "15",
    label: "Стран в портфолио",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Своевременных доставок",
  },
];

const StatsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-blue relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }} 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="text-center"
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                </div>
              </div>
              
              {/* Value */}
              <div className="text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-white/70 text-sm md:text-base font-medium">
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
