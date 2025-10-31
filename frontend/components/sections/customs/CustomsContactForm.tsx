'use client'

import { useState } from "react";
import { Phone, Mail, MapPin, CheckCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "Имя должно содержать минимум 2 символа" }).max(100),
  phone: z.string().trim().min(10, { message: "Введите корректный номер телефона" }).max(20),
  email: z.string().trim().email({ message: "Введите корректный email" }).max(255),
  message: z.string().trim().min(10, { message: "Сообщение должно содержать минимум 10 символов" }).max(2000)
});

const CustomsContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время для консультации по таможенному оформлению.",
      });
      
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: any = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
        
        toast({
          title: "Ошибка валидации",
          description: "Пожалуйста, проверьте правильность заполнения полей",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="customs-form" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Получить <span className="text-brand-red">консультацию эксперта</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Оставьте заявку и получите бесплатную консультацию таможенного брокера, расчет стоимости и сроков оформления
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardContent className="p-8 pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-2">
                        Ваше имя *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Иван Иванов"
                        className={`h-12 ${errors.name ? 'border-red-500' : ''}`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                        Телефон *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+7 (999) 123-45-67"
                        className={`h-12 ${errors.phone ? 'border-red-500' : ''}`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="info@example.com"
                      className={`h-12 ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold mb-2">
                      Описание груза и ваш вопрос *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Опишите ваш товар, страну происхождения и интересующие вопросы..."
                      rows={6}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-brand-red hover:bg-brand-red/90 text-white text-lg h-14"
                  >
                    {isSubmitting ? "Отправка..." : "Получить консультацию"}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <a href="#" className="text-brand-red hover:underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Guarantees */}
          <div className="space-y-6">
            {/* Contact Details */}
            <Card className="border-2">
              <CardContent className="p-6 pt-6">
                <h3 className="text-xl font-bold mb-6">Контакты</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-red flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Телефон</div>
                      <a href="tel:+74951234567" className="text-brand-red hover:underline">
                        +7 (499) 325-49-94
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-brand-red flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Email</div>
                      <a href="mailto:info@asiacargo.ru" className="text-brand-red hover:underline">
                        info@asiacargo.ru
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-red flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold">Офис в Москве</div>
                      <div className="text-sm text-muted-foreground">
                        ул. Горбунова 2c3, A-411<br />
                        БЦ "Сетунь Гранд Плаза"
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guarantees */}
            <Card className="border-2 bg-gradient-to-br from-brand-blue to-brand-blue/90 text-white">
              <CardContent className="p-6 pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Наши гарантии</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Официальная лицензия ФТС",
                    "Страхование ответственности 100 млн ₽",
                    "Успешное прохождение таможни",
                    "Соблюдение сроков оформления",
                    "Фиксированная стоимость услуг",
                    "Конфиденциальность информации"
                  ].map((guarantee, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span>{guarantee}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomsContactForm;
