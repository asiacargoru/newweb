import { ArrowRight, FileSearch, FileCheck, Shield, Truck, CheckCircle } from "lucide-react";

const CustomsProcess = () => {
  const steps = [
    {
      icon: FileSearch,
      title: "1. Анализ документов",
      description: "Проверяем контракт, инвойс, упаковочный лист. Определяем правильный ВЭД код и необходимые сертификаты.",
      time: "1-2 часа",
      details: [
        "Проверка контракта на соответствие требованиям",
        "Анализ товарной номенклатуры",
        "Определение мер нетарифного регулирования"
      ]
    },
    {
      icon: FileCheck,
      title: "2. Подготовка документов",
      description: "Оформляем все необходимые разрешительные документы: сертификаты, декларации соответствия, отказные письма.",
      time: "3-7 дней",
      details: [
        "Получение сертификатов соответствия",
        "Оформление деклараций о соответствии",
        "Подготовка дополнительных разрешений"
      ]
    },
    {
      icon: Shield,
      title: "3. Подача декларации",
      description: "Регистрируем электронную таможенную декларацию в системе ФТС. Производим расчет и уплату таможенных платежей.",
      time: "4-6 часов",
      details: [
        "Заполнение таможенной декларации",
        "Расчет таможенных платежей",
        "Регистрация в системе ФТС"
      ]
    },
    {
      icon: Truck,
      title: "4. Таможенный контроль",
      description: "Взаимодействуем с таможенными органами, присутствуем при досмотре (если назначен), отвечаем на запросы.",
      time: "1-3 дня",
      details: [
        "Контроль прохождения проверки",
        "Присутствие при досмотре груза",
        "Ответы на дополнительные запросы"
      ]
    },
    {
      icon: CheckCircle,
      title: "5. Выпуск товара",
      description: "Получаем разрешение на выпуск товара. Передаем вам полный комплект документов с отметками таможни.",
      time: "1-2 часа",
      details: [
        "Получение разрешения на выпуск",
        "Оформление итоговых документов",
        "Передача документов клиенту"
      ]
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Как проходит <span className="text-brand-red">таможенное оформление</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Прозрачный процесс от подачи документов до получения груза. На каждом этапе вы получаете детальную информацию о статусе оформления.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-8 top-24 w-0.5 h-full bg-gradient-to-b from-brand-red to-brand-red/30" />
              )}

              <div className="flex flex-col md:flex-row gap-6 mb-12 relative">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-brand-red to-brand-red/80 rounded-2xl flex items-center justify-center shadow-lg">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-card rounded-2xl p-6 md:p-8 shadow-lg border-2 border-transparent hover:border-brand-red/30 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <h3 className="text-2xl font-bold mb-2 md:mb-0">{step.title}</h3>
                    <span className="inline-flex items-center gap-2 bg-brand-light-blue-accent text-brand-blue px-4 py-2 rounded-full text-sm font-semibold">
                      ⏱️ {step.time}
                    </span>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    {step.description}
                  </p>

                  <div className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Summary */}
        <div className="mt-16 bg-gradient-to-r from-brand-blue to-brand-blue/90 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Среднее время таможенного оформления: 7-14 дней
          </h3>
          <p className="text-lg text-white/90 mb-6">
            Срок зависит от типа товара, наличия необходимых сертификатов и выбора таможенного поста
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
              <div className="text-3xl font-bold">24 часа</div>
              <div className="text-sm text-white/80">Срочное оформление</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
              <div className="text-3xl font-bold">99.8%</div>
              <div className="text-sm text-white/80">Выпуск с первого раза</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3">
              <div className="text-3xl font-bold">0 ₽</div>
              <div className="text-sm text-white/80">Доплат и скрытых комиссий</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomsProcess;
