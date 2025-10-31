'use client'

import { useState } from "react";
import { Calculator, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Маппинг кодов стран для соответствия с Битрикс
const countryToBitrixId: Record<string, string> = {
  "CN": "1456",
  "TR": "686",
  "AE": "518",
  "IN": "1588",
  "JP": "538",
  "TH": "2006",
  "BD": "1578",
  "VN": "516",
  "IR": "520",
  "KR": "1406",
  "MY": "2018",
  "PH": "1568",
  "ID": "526",
  "MM": "532",
  "TW": "536",
  "AU": "530",
  "NZ": "524",
  "EG": "2020",
  "RS": "2022",
};

const SimpleCalculator = () => {
  const { toast } = useToast();
  
  const [country, setCountry] = useState("");
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState("");
  
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  
  const [agreed, setAgreed] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const countries = [
    { value: "CN", label: "Китай" },
    { value: "TR", label: "Турция" },
    { value: "AE", label: "ОАЭ" },
    { value: "IN", label: "Индия" },
    { value: "JP", label: "Япония" },
    { value: "TH", label: "Таиланд" },
    { value: "BD", label: "Бангладеш" },
    { value: "VN", label: "Вьетнам" },
    { value: "IR", label: "Иран" },
    { value: "KR", label: "Корея" },
    { value: "MY", label: "Малайзия" },
    { value: "PH", label: "Филиппины" },
    { value: "ID", label: "Индонезия" },
    { value: "MM", label: "Мьянма" },
    { value: "TW", label: "Тайвань" },
    { value: "AU", label: "Австралия" },
    { value: "NZ", label: "Новая Зеландия" },
    { value: "EG", label: "Египет" },
    { value: "RS", label: "Сербия" },
  ];

  const formatRuPhone = (value: string) => {
    let digits = value.replace(/\D/g, '');
    if (digits.startsWith('8')) {
      digits = '7' + digits.slice(1);
    }
    if (!digits.startsWith('7')) {
      digits = '7' + digits;
    }
    digits = digits.slice(0, 11);

    const parts = [digits.slice(1, 4), digits.slice(4, 7), digits.slice(7, 9), digits.slice(9, 11)];
    let result = '+7';
    if (parts[0]) result += ` (${parts[0]}` + (parts[0].length === 3 ? ')' : '');
    if (parts[1]) result += ` ${parts[1]}`;
    if (parts[2]) result += `-${parts[2]}`;
    if (parts[3]) result += `-${parts[3]}`;
    return result;
  };

  const isValidRuPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    return digits.length === 11 && digits.startsWith('7');
  };

  const handleRequestDeliveryCalculation = () => {
    if (!country || !weight) {
      toast({
        title: "Заполните обязательные поля",
        description: "Укажите страну отправления и вес груза",
        variant: "destructive",
      });
      return;
    }
    setShowContactDialog(true);
  };

  const handleSubmitQuote = async () => {
    if (!agreed) {
      setShowWarning(true);
      toast({
        title: "Требуется согласие",
        description: "Необходимо дать согласие на обработку персональных данных",
        variant: "destructive",
      });
      setTimeout(() => setShowWarning(false), 4000);
      return;
    }

    if (!isValidRuPhone(phone)) {
      toast({
        title: "Ошибка",
        description: "Введите корректный номер телефона",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    setShowWarning(false);

    try {
      const countryLabel = countries.find(c => c.value === country)?.label || 'Не указана';
      
      let cargoDescription = `Расчет доставки: Страна: ${countryLabel}, Вес: ${weight}кг`;
      if (volume) {
        cargoDescription += `, Объем: ${volume}м³`;
      }
      
      const countryId = countryToBitrixId[country] || country;
      
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name || 'Не указано',
          phone: phone.replace(/\D/g, ''),
          country: countryId ? Number(countryId) : undefined,
          cargo: cargoDescription,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (typeof window !== 'undefined') {
          if (typeof (window as any).ym !== 'undefined') {
            (window as any).ym(97096133, 'reachGoal', 'form_submit');
          }
          if (typeof (window as any).gtag !== 'undefined') {
            (window as any).gtag('event', 'form_submit', {
              event_category: 'conversion',
              event_label: 'Calculator Form',
            });
          }
        }

        setShowSuccess(true);

        setPhone("");
        setName("");
        setAgreed(false);

        setTimeout(() => {
          setShowSuccess(false);
          setShowContactDialog(false);
        }, 3000);
      } else {
        toast({
          title: "Ошибка отправки",
          description: `Ошибка: ${data.error}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      toast({
        title: "Ошибка отправки",
        description: "Попробуйте позже или позвоните нам напрямую",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section id="calculator" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-light-blue/70 text-accent px-4 py-2 rounded-full mb-6">
              <Calculator className="w-5 h-5" />
              <span className="font-semibold">Онлайн калькулятор</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Рассчитайте стоимость <span className="text-accent">доставки</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Получите предварительный расчет стоимости доставки за 2 минуты
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Расчет стоимости доставки</CardTitle>
                <CardDescription>
                  Укажите параметры вашего груза и получите индивидуальный расчет от менеджера
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="country" className="text-base mb-2 block">
                        Страна отправления *
                      </Label>
                      <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Выберите страну" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="weight" className="text-base mb-2 block">
                        Вес груза (кг) *
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="1000"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="text-lg h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="volume" className="text-base mb-2 block">
                        Объем (м³)
                      </Label>
                      <Input
                        id="volume"
                        type="number"
                        placeholder="5"
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        className="text-lg h-12"
                      />
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    onClick={handleRequestDeliveryCalculation}
                    className="w-full bg-brand-red-100 hover:bg-brand-red/90 text-white text-lg h-14"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Запросить расчет у менеджера
                  </Button>

                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 text-sm">
                    <p className="text-brand-blue dark:text-blue-100">
                      <strong>Индивидуальный расчет:</strong> Наш менеджер рассчитает точную стоимость доставки с учетом всех особенностей вашего груза и предложит оптимальный маршрут.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Запрос расчета доставки
            </DialogTitle>
            <DialogDescription>
              Оставьте свои контакты, и наш менеджер свяжется с вами в течение 15 минут для точного расчета
            </DialogDescription>
          </DialogHeader>

          {showSuccess ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Заявка отправлена!</h3>
              <p className="text-muted-foreground">
                Мы свяжемся с вами в течение 15 минут
              </p>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="bg-secondary/50 rounded-lg p-4 space-y-2 text-sm">
                <h4 className="font-semibold mb-2">Данные для расчета:</h4>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Страна:</span>
                  <span className="font-medium">
                    {countries.find(c => c.value === country)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Вес:</span>
                  <span className="font-medium">{weight} кг</span>
                </div>
                {volume && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Объем:</span>
                    <span className="font-medium">{volume} м³</span>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="dialog-name">Ваше имя</Label>
                  <Input
                    id="dialog-name"
                    placeholder="Иван"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2"
                    disabled={submitting}
                  />
                </div>
                
                <div>
                  <Label htmlFor="dialog-phone">Телефон *</Label>
                  <Input
                    id="dialog-phone"
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={phone}
                    onChange={(e) => {
                      const formatted = formatRuPhone(e.target.value);
                      setPhone(formatted);
                    }}
                    className="mt-2"
                    disabled={submitting}
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="privacy-consent"
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(!!checked)}
                  />
                  <label
                    htmlFor="privacy-consent"
                    className="text-sm text-muted-foreground leading-tight cursor-pointer"
                  >
                    Я даю согласие на обработку моих персональных данных в соответствии с{' '}
                    <button
                      type="button"
                      onClick={() => setShowPrivacyModal(true)}
                      className="text-brand-blue underline hover:text-brand-red"
                    >
                      Политикой конфиденциальности
                    </button>{' '}
                    и Федеральным законом № 152-ФЗ «О персональных данных»
                  </label>
                </div>

                {showWarning && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    Необходимо дать согласие на обработку персональных данных
                  </div>
                )}

                <Button 
                  onClick={handleSubmitQuote}
                  size="lg"
                  disabled={submitting || !agreed}
                  className="w-full bg-brand-red hover:bg-brand-red/90 text-white"
                >
                  {submitting ? 'Отправка...' : 'Отправить заявку'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showPrivacyModal} onOpenChange={setShowPrivacyModal}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Политика конфиденциальности</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm max-w-none">
            <h3 className="text-lg font-bold mt-4">1. Общие положения</h3>
            <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта asiacargo.su.</p>
            
            <p><strong>ООО "Азия Транс Карго"</strong> (ОГРН 5177746090220, ИНН 7731387839), зарегистрированное по адресу: ул. Горбунова, д. 2, стр. 3, этаж 4, помещение II, комната 25, Москва, Россия, 121596 (далее — Оператор), обрабатывает персональные данные в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ "О персональных данных".</p>
            
            <h3 className="text-lg font-bold mt-4">2. Согласие на обработку персональных данных</h3>
            <p>Отправляя заявку через форму на сайте, вы свободно, своей волей и в своем интересе выражаете безусловное согласие на обработку своих персональных данных Оператором.</p>
            
            <h3 className="text-lg font-bold mt-4">3. Категории обрабатываемых персональных данных</h3>
            <p>Согласие дается на обработку следующих категорий персональных данных:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Имя</li>
              <li>Адрес электронной почты (E-mail)</li>
              <li>Номер телефона</li>
              <li>Пункт отправления (страна/город)</li>
              <li>Описание груза, вес, объем</li>
            </ul>
            
            <h3 className="text-lg font-bold mt-4">4. Цели обработки персональных данных</h3>
            <p>Персональные данные обрабатываются в следующих целях:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Предоставление услуг грузоперевозки</li>
              <li>Подготовка коммерческих предложений</li>
              <li>Направление уведомлений об услугах</li>
              <li>Ответы на запросы клиентов</li>
            </ul>
            
            <h3 className="text-lg font-bold mt-4">5. Передача персональных данных третьим лицам</h3>
            <p>Оператор осуществляет обработку персональных данных посредством программы «1С-Битрикс24». Обработка может быть поручена ООО «1С-Битрикс» (ОГРН 5077746476209).</p>
            
            <h3 className="text-lg font-bold mt-4">6. Срок действия согласия</h3>
            <p>Настоящее согласие действует в течение всего периода хранения персональных данных, если иное не предусмотрено законодательством РФ.</p>
            
            <h3 className="text-lg font-bold mt-4">7. Отзыв согласия</h3>
            <p>Вы имеете право отозвать согласие путем направления уведомления:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Эл.почта: <a href="mailto:info@asiacargo.ru" className="text-brand-blue underline">info@asiacargo.ru</a></li>
              <li>Адрес: ул. Горбунова, д. 2, стр. 3, Москва, 121596</li>
            </ul>
            
            <h3 className="text-lg font-bold mt-4">8. Меры по защите персональных данных</h3>
            <p>Оператор принимает необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного доступа.</p>
            
            <h3 className="text-lg font-bold mt-4">9. Контактная информация</h3>
            <p>По вопросам обработки персональных данных: <a href="mailto:info@asiacargo.ru" className="text-brand-blue underline">info@asiacargo.ru</a></p>
          </div>
          <Button onClick={() => setShowPrivacyModal(false)} className="mt-6 bg-brand-blue hover:bg-brand-blue/90">
            Принять
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SimpleCalculator;