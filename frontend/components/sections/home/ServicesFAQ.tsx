'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "Какие документы нужны для отправки груза?",
    answer: "Для отправки груза необходимы: инвойс (счет от поставщика), упаковочный лист, контракт с поставщиком. Наши менеджеры помогут подготовить все необходимые документы и проконсультируют по каждому этапу."
  },
  {
    question: "Сколько времени занимает доставка из Китая?",
    answer: "Время доставки зависит от выбранного способа: морская доставка - 25-35 дней, железнодорожная - 14-18 дней, авиадоставка - 3-7 дней. Точные сроки рассчитываются индивидуально с учетом маршрута и таможенного оформления."
  },
  {
    question: "Как рассчитывается стоимость доставки?",
    answer: "Стоимость зависит от веса/объема груза, типа транспорта, маршрута и дополнительных услуг. Мы используем правило объемного веса (1 м³ = 167 кг для авиа, 1 м³ = 1 тонна для моря). Итоговая стоимость включает доставку, таможенное оформление и все сопутствующие расходы."
  },
  {
    question: "Что входит в таможенное оформление?",
    answer: "Таможенное оформление включает: подготовку декларации, уплату пошлин и НДС, получение разрешительных документов, сертификацию (при необходимости), взаимодействие с таможенными органами. Мы берем на себя весь процесс от А до Я."
  },
  {
    question: "Можно ли застраховать груз?",
    answer: "Да, мы предлагаем страхование грузов на весь период транспортировки. Стоимость страховки составляет 0.5-1% от стоимости груза в зависимости от типа товара и маршрута. Это защитит вас от непредвиденных ситуаций."
  },
  {
    question: "Как отслеживать груз?",
    answer: "После отправки груза вы получите трек-номер для отслеживания. Также наши менеджеры регулярно информируют о статусе доставки на каждом этапе: погрузка, транзит, таможня, доставка на склад."
  },
  {
    question: "Есть ли минимальный объем для отправки?",
    answer: "Минимального объема нет - мы работаем как с мелкими отправлениями от 1 кг, так и с крупными промышленными партиями. Для небольших грузов предлагаем сборные контейнеры (LCL), что позволяет существенно снизить стоимость."
  },
  {
    question: "Какие товары нельзя перевозить?",
    answer: "Запрещены к перевозке: оружие, наркотики, взрывчатые вещества, радиоактивные материалы. Для некоторых категорий товаров (продукты питания, медикаменты, химия) требуются специальные разрешения. Мы консультируем по каждому конкретному случаю."
  }
];

const ServicesFAQ = () => {
  const handleCall = () => {
    window.location.href = "tel:+74993254994";
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-brand-blue/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Частые вопросы
            </h2>
            <p className="text-lg text-muted-foreground">
              Ответы на популярные вопросы о наших услугах
            </p>
          </div>

          {/* Аккордеон */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:shadow-lg transition-all"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Блок "Не нашли ответ?" */}
          <div className="mt-12 text-center bg-gradient-to-r from-brand-blue/10 to-brand-red/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-2">
              Не нашли ответ на свой вопрос?
            </h3>
            <p className="text-muted-foreground mb-4">
              Свяжитесь с нами, и мы с радостью ответим на все ваши вопросы
            </p>

            <Button
              size="lg"
              onClick={handleCall}
              className="!bg-brand-red hover:!bg-brand-red/90 text-white font-semibold px-10 py-6 text-lg shadow-lg group"
            >
              Позвонить&nbsp;нам
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesFAQ;
