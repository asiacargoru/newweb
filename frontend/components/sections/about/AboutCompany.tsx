import { Card } from "@/components/ui/card";
import { Target, Eye, Heart } from "lucide-react";
import Image from "next/image";

const AboutCompany = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Description with Image */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
            <div className="prose prose-lg max-w-none animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                О компании Азия Транс Карго
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">Азия Транс Карго</strong> – современная логистическая компания, специализирующаяся на международных грузоперевозках. Мы организуем доставку грузов из Китая, Турции, стран Азии в Россию, а также выполняем грузоперевозки по России и СНГ.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Наши клиенты получают полный комплекс логистических услуг – от разработки маршрута до таможенного оформления и складского хранения. Мы стремимся к долгосрочному сотрудничеству, предлагая клиентам полный спектр услуг: от планирования и выбора оптимального транспорта до доставки груза в любую точку России.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Компания Азия Транс Карго – это надежный партнер для бизнеса, которому можно доверить самые ответственные проекты.
              </p>
            </div>

            {/* Office Image */}
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl animate-slide-in-right">
              <Image
                src="/images/office.webp"
                alt="Офис Азия Транс Карго"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-2 hover:border-primary/50 transition-all duration-300 animate-slide-in-left">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Наша миссия</h3>
              <p className="text-muted-foreground leading-relaxed">
                Сделать международную логистику доступной, прозрачной и безопасной для каждого бизнеса
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-primary/50 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Наше видение</h3>
              <p className="text-muted-foreground leading-relaxed">
                Стать ведущей логистической компанией на рынке грузоперевозок между Азией и Россией
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-primary/50 transition-all duration-300 animate-slide-in-right">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Наши ценности</h3>
              <p className="text-muted-foreground leading-relaxed">
                Надежность, честность, индивидуальный подход к каждому клиенту и забота о качестве
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompany;