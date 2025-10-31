import { CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Получение заявки",
    description: "Вы отправляете запрос с параметрами груза. Мы рассчитываем стоимость за 30 минут.",
    time: "День 1"
  },
  {
    number: "02", 
    title: "Подготовка документов",
    description: "Оформляем контракт, инвойс, упаковочный лист. Проверяем сертификаты на товар.",
    time: "День 1-2"
  },
  {
    number: "03",
    title: "Забор груза в Китае",
    description: "Наш склад в Китае принимает груз, проверяет количество и качество, делает фото-отчет.",
    time: "День 2-3"
  },
  {
    number: "04",
    title: "Консолидация и отправка",
    description: "Упаковка, маркировка, погрузка в контейнер. Бронирование места на рейсе/судне.",
    time: "День 3-5"
  },
  {
    number: "05",
    title: "Транспортировка",
    description: "Груз в пути. Онлайн-трекинг 24/7. Информируем о всех этапах движения.",
    time: "3-35 дней"
  },
  {
    number: "06",
    title: "Таможенное оформление",
    description: "Декларирование на границе РФ. Уплата пошлин. Получение разрешительных документов.",
    time: "1-3 дня"
  },
  {
    number: "07",
    title: "Доставка получателю",
    description: "Доставка до вашего склада или терминала. Передача всех документов.",
    time: "1-2 дня"
  }
];

const DeliveryTimeline = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Как проходит доставка из Китая
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Прозрачный процесс работы на каждом этапе. Вы всегда в курсе, где находится ваш груз.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-blue via-brand-red to-brand-blue hidden sm:block"></div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="relative flex gap-6 items-start group"
                >
                  {/* Number circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-red flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-lg">{step.number}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-brand-red/50 to-transparent sm:hidden"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-sm group-hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-xl font-bold text-card-foreground">
                        {step.title}
                      </h3>
                      <span className="px-3 py-1 bg-accent/10 text-accent-foreground rounded-full text-sm whitespace-nowrap">
                        {step.time}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success state */}
          <div className="mt-12 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl p-6 sm:p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Груз доставлен успешно!
            </h3>
            <p className="text-muted-foreground">
              Полный комплект документов для бухгалтерии передан. Готовы принять ваш следующий заказ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryTimeline;
