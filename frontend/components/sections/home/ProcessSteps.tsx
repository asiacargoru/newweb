const steps = [
  {
    number: 1,
    title: "Заявка",
    description: "Оставляете заявку через форму или звоните нам. Рассчитываем стоимость за 30 минут.",
  },
  {
    number: 2,
    title: "Забор груза",
    description: "Забираем товар у поставщика. Проверяем качество и комплектность при необходимости.",
  },
  {
    number: 3,
    title: "Транспортировка",
    description: "Доставляем оптимальным маршрутом. Предоставляем онлайн-отслеживание груза.",
  },
  {
    number: 4,
    title: "Таможенное оформление",
    description: "Оформляем все документы и проходим таможню. Полное сопровождение процесса.",
  },
  {
    number: 5,
    title: "Доставка",
    description: "Доставляем на ваш склад или указанный адрес. Предоставляем все документы.",
  },
];

const ProcessSteps = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Как мы работаем
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-brand-blue to-brand-blue/80 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
                  {step.number}
                </div>
                <div className="absolute inset-0 w-24 h-24 border-2 border-brand-red/30 rounded-full -m-2" />
              </div>
              
              <h4 className="text-xl font-bold mb-3 text-brand-blue">
                {step.title}
              </h4>
              
              <p className="text-muted-foreground leading-relaxed text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
