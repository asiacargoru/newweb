import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const reviews = [
  {
    avatar: "ИП",
    name: "Ирина Петрова",
    company: "Магазин текстиля",
    text: "Работаем с Азия Транс Карго уже 2 года. Регулярно возим ткани из Турции. Всегда четко, в срок, без задержек. Менеджеры на связи 24/7. Рекомендую!",
  },
  {
    avatar: "АС",
    name: "Алексей Смирнов",
    company: 'ООО "СтройКомплект"',
    text: "Доставляли оборудование из Китая. Большой объем, сложная таможня. Ребята справились отлично, помогли со всеми документами. Груз пришел в срок.",
  },
  {
    avatar: "МК",
    name: "Мария Козлова",
    company: "Интернет-магазин",
    text: "Первый раз заказывали доставку из Кореи. Очень переживали. Азия Транс Карго все объяснили, провели за ручку. Товар пришел даже раньше срока!",
  },
];

const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="url(#grad)"
    className="w-5 h-5 drop-shadow-sm"
  >
    <defs>
      <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#FFD580" />
        <stop offset="100%" stopColor="#FFB84D" />
      </linearGradient>
    </defs>
    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const Reviews = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Отзывы наших клиентов
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
          {reviews.map((review, idx) => (
            <Card
              key={idx}
              className="relative p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-border overflow-hidden"
            >
              {/* Градиентная полоса слева */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-blue to-brand-red rounded-l-md" />

              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-brand-blue to-brand-blue/80 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-foreground">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.company}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed italic">
                "{review.text}"
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="https://yandex.ru/profile/70075743534?lang=ru"
            target="_blank"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
            >
              Все отзывы
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
