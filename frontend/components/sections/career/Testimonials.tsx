'use client'

import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
  
    text: "За 3 года в компании я выросла от младшего специалиста до руководителя отдела. Здесь действительно ценят профессионализм и дают возможность развиваться.",
  
  },
  {
 
    text: "Работа с международными проектами, современный ритм и отличная команда. Рад, что сделал выбор в пользу Азия Транс Карго.",
  
  },
  {

    text: "Компания заботится о сотрудниках: от качественного онбординга до постоянного развития. Здесь комфортно работать и расти профессионально.",
   
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Что говорят наши сотрудники
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Реальные отзывы людей, которые уже работают в Азия Транс Карго
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-8 bg-card border-border hover:shadow-strong transition-all duration-300 animate-scale-in relative"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <Quote className="h-10 w-10 text-accent/20 mb-4" />
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
            
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
