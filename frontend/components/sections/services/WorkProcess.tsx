import { Card } from "@/components/ui/card";
import { MessageSquare, FileText, Ship, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Заявка и консультация",
    description: "Оставьте заявку или позвоните нам. Наши менеджеры проконсультируют по всем вопросам и подберут оптимальное решение"
  },
  {
    icon: FileText,
    number: "02",
    title: "Расчет и договор",
    description: "Рассчитываем точную стоимость доставки, согласовываем условия и заключаем договор"
  },
  {
    icon: Ship,
    number: "03",
    title: "Доставка и таможня",
    description: "Организуем перевозку, оформляем все таможенные документы, контролируем груз на всех этапах"
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Получение груза",
    description: "Доставляем груз по указанному адресу, передаем все документы и закрываем сделку"
  }
];

const WorkProcess = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background to-brand-blue/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Как мы работаем
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Простой и прозрачный процесс от заявки до получения груза
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-blue via-brand-red to-brand-blue opacity-20" 
               style={{ width: 'calc(100% - 8rem)', left: '4rem' }}></div>
          
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="relative p-6 bg-card hover:shadow-xl transition-all duration-300 group"
            >
              {/* Step number badge */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-red text-white font-bold text-lg flex items-center justify-center shadow-lg">
                {step.number}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <step.icon className="w-8 h-8 text-brand-blue" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-card-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-brand-blue/10 to-brand-red/10 rounded-2xl p-8 max-w-2xl">
            <p className="text-lg font-semibold text-foreground mb-2">
              ⏱️ Среднее время обработки заявки
            </p>
            <p className="text-4xl font-bold text-brand-red mb-2">15 минут</p>
            <p className="text-sm text-muted-foreground">
              Мы ценим ваше время и работаем быстро
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;