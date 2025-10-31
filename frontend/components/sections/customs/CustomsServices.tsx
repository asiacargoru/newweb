"use client";

import { FileText, Award, Search, Briefcase, Calculator, Globe, Shield, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CustomsServices = () => {
  const services = [
    {
      icon: FileText,
      title: "Таможенное декларирование",
      description: "Подача электронных таможенных деклараций всех типов",
      details: [
        "Декларация на товары (ДТ)",
        "Транзитная декларация (ТД)",
        "Временный ввоз и вывоз",
        "Переработка на таможенной территории"
      ],
      price: "от 5 000 ₽"
    },
    {
      icon: Search,
      title: "Классификация и подбор ВЭД кодов",
      description: "Точное определение кодов ТН ВЭД ЕАЭС для вашего товара",
      details: [
        "Анализ товарной номенклатуры",
        "Подбор кода с минимальной ставкой пошлины",
        "Экспертное заключение по классификации",
        "Предварительные решения ФТС"
      ],
      price: "от 3 000 ₽"
    },
    {
      icon: Award,
      title: "Сертификация и декларирование",
      description: "Получение всех необходимых разрешительных документов",
      details: [
        "Сертификаты соответствия ГОСТ Р",
        "Декларации соответствия ТР ТС",
        "Отказные письма",
        "Санитарно-эпидемиологические заключения"
      ],
      price: "от 8 000 ₽"
    },
    {
      icon: Calculator,
      title: "Расчет таможенных платежей",
      description: "Точный предварительный расчет всех обязательных платежей",
      details: [
        "Таможенные пошлины",
        "НДС и акцизы",
        "Таможенные сборы",
        "Оптимизация платежей"
      ],
      price: "бесплатно"
    },
    {
      icon: Briefcase,
      title: "Таможенное представительство",
      description: "Полное представление ваших интересов на таможне",
      details: [
        "Взаимодействие с таможенными органами",
        "Подготовка и подача документов",
        "Присутствие при досмотре",
        "Решение спорных вопросов"
      ],
      price: "от 7 000 ₽"
    },
    {
      icon: Globe,
      title: "Внешнеторговый контракт",
      description: "Экспертная помощь в составлении и проверке контрактов",
      details: [
        "Проверка условий поставки Incoterms",
        "Анализ валютного контроля",
        "Минимизация рисков",
        "Соответствие законодательству"
      ],
      price: "от 10 000 ₽"
    },
    {
      icon: Shield,
      title: "Валютный контроль",
      description: "Полное сопровождение валютных операций",
      details: [
        "Паспорт сделки",
        "Справки о валютных операциях",
        "Подтверждающие документы",
        "Взаимодействие с банком"
      ],
      price: "от 5 000 ₽"
    },
    {
      icon: Clock,
      title: "Срочное оформление",
      description: "Ускоренное таможенное оформление в кратчайшие сроки",
      details: [
        "Оформление за 24 часа",
        "Приоритетная подача декларации",
        "Работа в выходные и праздники",
        "Личный менеджер проекта"
      ],
      price: "от 15 000 ₽"
    }
  ];

  const scrollToForm = () => {
    document.getElementById('customs-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Полный спектр <span className="text-brand-red">таможенных услуг</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Профессиональное сопровождение на всех этапах таможенного оформления. От подбора ВЭД кода до получения разрешения на выпуск товара.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-100"
            >
              <CardHeader>
               <div className="w-16 h-16 bg-brand-light-blue-accent rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
  <service.icon className="w-8 h-8 text-brand-red" />
</div>

                <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-brand-red mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-2xl font-bold text-brand-blue">{service.price}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={scrollToForm}
                    className="hover:bg-brand-red hover:text-white hover:border-brand-red"
                  >
                    Заказать
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Block */}
        <Card className="bg-gradient-to-r from-brand-blue to-brand-blue/90 text-white border-0">
          <CardContent className="p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Нужна консультация по таможенному оформлению?
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Наши эксперты помогут разобраться в любой ситуации и предложат оптимальное решение для вашего груза
            </p>
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="!bg-brand-red hover:bg-brand-red/90 text-white text-lg px-8"
            >
              Получить бесплатную консультацию
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CustomsServices;
