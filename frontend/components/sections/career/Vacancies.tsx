'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";

const vacancies = [
    {
    title: "Менеджер по продажам",
    location: "Москва",
    type: "Полная занятость",
    description: "Развитие клиентской базы, продажа логистических услуг корпоративным клиентам"
  }
];

const Vacancies = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Открытые вакансии
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Найдите свою идеальную позицию и начните карьеру в международной логистике
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {vacancies.map((vacancy, index) => (
            <Card 
              key={index}
              className="p-6 bg-card border-border hover:shadow-medium transition-all duration-300 hover:border-accent/30 animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-bold mb-3 text-card-foreground group-hover:text-accent transition-colors">
                {vacancy.title}
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {vacancy.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {vacancy.location}
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  {vacancy.type}
                </div>
              </div>
           <Button 
  variant="ghost" 
  className="w-full justify-between hover:text-accent"
  asChild
>
  <a 
    href="https://hh.ru/employer/3020136" 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center justify-between w-full"
  >
    Подробнее
    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
  </a>
</Button>
            </Card>
          ))}
        </div>
        
        <div className="text-center animate-fade-in">
  <p className="text-muted-foreground mb-4">
    Не нашли подходящую вакансию?
  </p>
  <Button variant="outline" size="lg" asChild>
    <a href="mailto:info@asiacargo.ru?subject=Отклик на вакансию">
      Отправить резюме
    </a>
  </Button>
</div>
      </div>
    </section>
  );
};

export default Vacancies;
