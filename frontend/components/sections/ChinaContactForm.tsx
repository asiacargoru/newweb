'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin } from "lucide-react";

const ChinaContactForm = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({ title: 'Заявка принята', description: 'Мы свяжемся с вами в ближайшее время.' });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact-form" className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Рассчитайте стоимость доставки из Китая
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Заполните форму, и мы подготовим персональное предложение в течение 30 минут
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Ваше имя *</Label>
                  <Input id="name" name="name" placeholder="Иван Иванов" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Компания</Label>
                  <Input id="company" placeholder="ООО Компания" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" placeholder="email@example.com" required />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="transport">Вид транспорта *</Label>
                  <Select required name="transport">
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите вид" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Морская доставка">Морская доставка</SelectItem>
                      <SelectItem value="Авиадоставка">Авиадоставка</SelectItem>
                      <SelectItem value="Ж/Д доставка">Ж/Д доставка</SelectItem>
                      <SelectItem value="Автодоставка">Автодоставка</SelectItem>
                      <SelectItem value="Не уверен, нужна консультация">Не уверен, нужна консультация</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo">Тип груза *</Label>
                  <Input id="cargo" name="cargo" placeholder="Электроника, мебель, одежда..." required />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="weight">Вес (кг)</Label>
                  <Input id="weight" name="weight" type="number" placeholder="1000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volume">Объем (м³)</Label>
                  <Input id="volume" name="volume" type="number" placeholder="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Город доставки *</Label>
                  <Input id="city" name="city" placeholder="Москва" required />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="message">Дополнительная информация</Label>
                <Textarea 
                  id="message" 
                  name="message"
                  placeholder="Опишите ваш груз, особые требования к перевозке, сроки..." 
                  rows={4}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="submit" 
                  size="lg"
                  className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white"
                >
                  Отправить заявку
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open('https://wa.me/yourphone', '_blank')}
                >
                  Написать в WhatsApp
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-brand-blue to-brand-blue/90 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Наши гарантии</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-brand-red text-lg">✓</span>
                  <span>Ответ в течение 30 минут</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red text-lg">✓</span>
                  <span>Фиксированная стоимость в договоре</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red text-lg">✓</span>
                  <span>Страхование груза включено</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-red text-lg">✓</span>
                  <span>Компенсация за задержку доставки</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-card-foreground">Контакты</h3>
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-blue flex-shrink-0 mt-1" />
                <div>
                  <div className="font-medium text-card-foreground">+7 (499) 325-49-94</div>
                  <div className="text-sm text-muted-foreground">Звонок по России бесплатный</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-blue flex-shrink-0 mt-1" />
                <div>
                  <div className="font-medium text-card-foreground">info@asiacargo.ru</div>
                  <div className="text-sm text-muted-foreground">Ответим в течение часа</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-blue flex-shrink-0 mt-1" />
                <div>
                  <div className="font-medium text-card-foreground">Москва, Россия</div>
                  <div className="text-sm text-muted-foreground">Работаем по всей РФ</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-brand-red/10 to-brand-red/5 border border-brand-red/20 rounded-xl p-6">
              <h4 className="font-bold text-card-foreground mb-2">Акция!</h4>
              <p className="text-sm text-muted-foreground">
                Первая доставка из Китая со скидкой 10%. Успейте оставить заявку до конца месяца!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChinaContactForm;

