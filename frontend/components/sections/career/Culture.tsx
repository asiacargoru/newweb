'use client'

import Image from 'next/image';

const Culture = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Наша корпоративная культура
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Мы ценим открытость, профессионализм и командный дух. В Азия Транс Карго каждый сотрудник – важная часть успеха компании.
            </p>
            <ul className="space-y-4">
              {[
                "Открытая коммуникация на всех уровнях",
                "Поддержка инициатив и идей сотрудников",
                "Баланс работы и личной жизни",
                "Корпоративные мероприятия и тимбилдинг"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-accent w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 bg-accent-foreground rounded-full" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-slide-in-right">
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-strong">
              <Image 
                src="/images/team-culture.jpg"
                alt="Команда Азия Транс Карго"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 animate-fade-in">
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-strong">
              <Image 
                src="/images/global-network.jpg"
                alt="Глобальная сеть"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="order-1 lg:order-2 animate-slide-in-right">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Международный масштаб
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Работая в Азия Транс Карго, вы станете частью глобальной логистической сети. Опыт работы с международными проектами и партнерами по всему миру.
            </p>
            <div className="space-y-4">
              <div className="bg-secondary/50 p-5 rounded-xl border border-border">
                <div className="font-bold text-xl text-foreground mb-1">Азия-Европа</div>
                <div className="text-muted-foreground">Основное направление деятельности</div>
              </div>
              <div className="bg-secondary/50 p-5 rounded-xl border border-border">
                <div className="font-bold text-xl text-foreground mb-1">Мультимодальные перевозки</div>
                <div className="text-muted-foreground">Морские, ЖД и автоперевозки</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Culture;
