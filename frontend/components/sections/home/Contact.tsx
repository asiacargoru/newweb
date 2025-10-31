'use client'

import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка принята",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Свяжитесь с нами
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Готовы ответить на ваши вопросы и рассчитать стоимость доставки
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Контактная информация
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-light-blue-accent flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-1">Телефон</div>
                    <a href="tel:+1234567890" className="text-muted-foreground hover:text-accent transition-colors">
                      +7 (499) 325-49-94
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-light-blue-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-1">Email</div>
                    <a href="mailto:info@asiacargo.ru" className="text-muted-foreground hover:text-accent transition-colors">
                      info@asiacargo.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-light-blue-accent flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground mb-1">Офис</div>
                    <p className="text-muted-foreground">
                                            г. Москва, ул. Горбунова 2c3, A-411
                    </p>
                  </div>
                </div>
              </div>
            </div>

          <div className="bg-card rounded-lg p-6 border border-border">
  <h4 className="font-semibold text-foreground mb-3">Режим работы</h4>
  <div className="space-y-2 text-sm text-muted-foreground">
    <div className="flex justify-between">
      <span>Понедельник - Пятница:</span>
      <span className="font-medium text-foreground">9:00 - 18:00</span>
    </div>
    <div className="flex justify-between">
      <span>Суббота - Воскресенье:</span>
      <span className="font-medium text-foreground">Выходной</span>
    </div>
    <div className="pt-2 mt-2 border-t font-medium border-border">
      <div className="flex justify-between text-brand-red">
        <span>Прием заявок:</span>
        <span className="font-medium text-brand-red">Круглосуточно</span>
      </div>
    </div>
  </div>
</div>

          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-lg p-6 sm:p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                  Ваше имя *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Иван Иванов"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                  Эл. почта *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="ivan@example.com"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-2">
                  Телефон
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (499) 325-49-94"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
                  Сообщение *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Расскажите о вашем грузе и маршруте доставки..."
                  rows={5}
                  className="w-full resize-none"
                />
              </div>

              <Button type="submit" size="lg" className="!w-full bg-brand-red/100 hover:bg-accent/90">
                Отправить заявку
                <Send className="ml-2 w-4 h-4" />
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
