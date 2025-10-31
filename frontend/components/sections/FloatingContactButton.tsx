'use client';

import { useState } from "react";
import { MessageCircle, Phone, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: Phone,
      title: "Позвонить",
      description: "+7 (499) 325-49-94",
      action: () => window.location.href = "tel:+7XXXXXXXXXX",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: MessageCircle,
      title: "Написать в WhatsApp",
      description: "Оператор онлайн",
      action: () => window.open("https://wa.me/79776882067?text=Здравствуйте! Интересует доставка из Азии", "_blank"),
      color: "bg-emerald-500 hover:bg-emerald-600",
    },
    {
      icon: Mail,
      title: "Написать Email",
      description: "info@asiacargo.ru",
      action: () => window.location.href = "mailto:info@asiacargo.ru",
      color: "bg-blue-500 hover:bg-blue-600",
    },
  ];

  return (
    <>
      {/* Main floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        {isOpen && (
          <Card className="absolute bottom-20 right-0 w-80 p-4 shadow-2xl animate-fade-in mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Свяжитесь с нами</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Выберите удобный способ связи. Наши менеджеры готовы ответить на ваши вопросы 24/7
            </p>

            <div className="space-y-3">
              {contactOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    option.action();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-left group"
                >
                  <div className={`w-10 h-10 rounded-full ${option.color} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110`}>
                    <option.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm mb-0.5">{option.title}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Операторы онлайн</span>
              </div>
            </div>
          </Card>
        )}

        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className={`h-16 w-16 rounded-full shadow-2xl transition-all hover:scale-110 ${
            isOpen 
              ? "bg-muted hover:bg-muted" 
              : "bg-accent hover:bg-accent/90 animate-pulse"
          }`}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <MessageCircle className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></span>
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default FloatingContactButton;

