import { FileText, Package, Ship, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Заявка и расчет",
    description: "Вы отправляете заявку с описанием груза. Мы рассчитываем стоимость за 2 часа и подбираем оптимальный маршрут.",
    timeline: "2 часа",
  },
  {
    icon: Package,
    number: "02",
    title: "Сбор и отправка",
    description: "Принимаем груз на складе отправления, проверяем документы, упаковываем и отправляем выбранным транспортом.",
    timeline: "1-3 дня",
  },
  {
    icon: Ship,
    number: "03",
    title: "Доставка и отслеживание",
    description: "Груз в пути. Вы получаете трек-номер для отслеживания. Наш менеджер на связи 24/7 и информирует о статусе.",
    timeline: "5-40 дней",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Таможня и выдача",
    description: "Оформляем декларацию, оплачиваем пошлины, получаем разрешения. Груз доставляется на ваш склад или терминал.",
    timeline: "2-5 дней",
  },
];

const HowWeWork = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Как мы <span className="text-accent">работаем</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Простой и понятный процесс доставки от заявки до получения груза
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection line for desktop */}
            <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0" />
            
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step card */}
                <div className="bg-card rounded-xl p-6 border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative z-10">
                  {/* Number badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6 mx-auto">
                    <step.icon className="w-8 h-8 text-accent" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-center mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground text-center mb-4 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Timeline badge */}
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium">
                      ⏱ {step.timeline}
                    </span>
                  </div>
                </div>

                {/* Connector arrow for mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-accent/50 to-accent/0" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">
                Поддержка на всех<br />этапах доставки
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="text-3xl font-bold text-accent mb-2">100%</div>
              <div className="text-sm text-muted-foreground">
                Прозрачность<br />и контроль груза
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border text-center">
              <div className="text-3xl font-bold text-accent mb-2">15 мин</div>
              <div className="text-sm text-muted-foreground">
                Среднее время<br />ответа менеджера
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
