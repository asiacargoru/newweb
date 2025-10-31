'use client'

import { useState } from "react";
import { Calculator, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Маппинг кодов стран для соответствия с Битрикс
const countryToBitrixId: Record<string, string> = {
  "CN": "1456",  // Китай
  "TR": "686",   // Турция
  "AE": "518",   // ОАЭ
  "IN": "1588",  // Индия
  "JP": "538",   // Япония
  "TH": "2006",  // Таиланд
  "BD": "1578",  // Бангладеш
  "VN": "516",   // Вьетнам
  "IR": "520",   // Иран
  "KR": "1406",  // Корея
  "MY": "2018",  // Малайзия
  "PH": "1568",  // Филиппины
  "ID": "526",   // Индонезия
  "MM": "532",   // Мьянма
  "TW": "536",   // Тайвань
  "AU": "530",   // Австралия
  "NZ": "524",   // Новая Зеландия
  "EG": "2020",  // Египет
  "RS": "2022",  // Сербия
};

const SimpleCalculator = () => {
  const { toast } = useToast();
  
  // Delivery calculator state
  const [country, setCountry] = useState("");
  const [transport, setTransport] = useState("");
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState("");
  
  // Customs calculator state
  const [goodsCost, setGoodsCost] = useState("");
  const [dutyRate, setDutyRate] = useState("10");
  const [goodsDescription, setGoodsDescription] = useState("");
  
  // Contact info
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  // Dialog state
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [dialogMode, setDialogMode] = useState<'delivery' | 'customs'>('delivery');
  
  // Consent state
  const [agreed, setAgreed] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Results
  const [customsResult, setCustomsResult] = useState<any>(null);

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

  const transportTypes = [
    { value: "air", label: "Авиа" },
    { value: "sea", label: "Море" },
    { value: "rail", label: "ЖД" },
    { value: "auto", label: "Авто" },
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
    setDialogMode('delivery');
    setShowContactDialog(true);
  };

  const calculateCustoms = () => {
    const costNum = parseFloat(goodsCost);
    if (isNaN(costNum) || costNum <= 0) {
      toast({
        title: "Ошибка",
        description: "Укажите корректную стоимость товара",
        variant: "destructive",
      });
      return;
    }

    const rate = parseFloat(dutyRate) / 100;
    const duty = costNum * rate;
    const vat = (costNum + duty) * 0.20;
    const customsFee = 750;
    const total = duty + vat + customsFee;

    setCustomsResult({
      cost: costNum,
      duty,
      vat,
      customsFee,
      total,
    });
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
      const transportLabel = transportTypes.find(t => t.value === transport)?.label || 'Не указан';
      
      let cargoDescription = '';
      
      if (dialogMode === 'delivery') {
        cargoDescription = `Расчет доставки: Страна: ${countryLabel}, Транспорт: ${transportLabel}, Вес: ${weight}кг`;
        if (volume) {
          cargoDescription += `, Объем: ${volume}м³`;
        }
      } else {
        cargoDescription = `Расчет таможни: Стоимость товара: $${goodsCost}, Ставка пошлины: ${dutyRate}%`;
        if (customsResult) {
          cargoDescription += `, Итого платежей: ${formatCurrency(customsResult.total)}`;
        }
        if (goodsDescription) {
          cargoDescription += `, Описание: ${goodsDescription}`;
        }
      }
      
      // Найти числовой ID страны для отправки в Битрикс
      const countryId = countryToBitrixId[country] || country;
      
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name || 'Не указано',
          phone: phone.replace(/\D/g, ''), // Убираем все нецифровые символы
          country: countryId ? Number(countryId) : undefined,
          cargo: cargoDescription,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Отправка целей Яндекс.Метрики и Google Analytics
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

        // Reset form
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

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
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
              Рассчитайте стоимость <span className="text-accent">доставки и растаможки</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Получите предварительный расчет всех расходов за 2 минуты
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Card className="border-2 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Комплексный расчет доставки и таможни</CardTitle>
                <CardDescription>
                  Рассчитайте стоимость доставки груза и таможенных платежей в одном калькуляторе
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="delivery" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="delivery">Доставка</TabsTrigger>
                    <TabsTrigger value="customs">Таможня</TabsTrigger>
                  </TabsList>

                  <TabsContent value="delivery" className="space-y-6">
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
                        <Label htmlFor="transport" className="text-base mb-2 block">
                          Вид транспорта
                        </Label>
                        <Select value={transport} onValueChange={setTransport}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Выберите транспорт" />
                          </SelectTrigger>
                          <SelectContent>
                            {transportTypes.map((t) => (
                              <SelectItem key={t.value} value={t.value}>
                                {t.label}
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
                      className="!w-full bg-brand-red-100 hover:bg-brand-red/90 text-white text-lg h-14"
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      Запросить расчет у менеджера
                    </Button>

                    <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 text-sm">
                      <p className="text-brand-blue dark:text-blue-100">
                        <strong>Индивидуальный расчет:</strong> Наш менеджер рассчитает точную стоимость доставки с учетом всех особенностей вашего груза и предложит оптимальный маршрут.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="customs" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="goodsCost" className="text-base mb-2 block">
                          Стоимость товара (USD) *
                        </Label>
                        <Input
                          id="goodsCost"
                          type="number"
                          placeholder="10000"
                          value={goodsCost}
                          onChange={(e) => setGoodsCost(e.target.value)}
                          className="text-lg h-12"
                        />
                      </div>

                      <div>
                        <Label htmlFor="dutyRate" className="text-base mb-2 block">
                          Ставка пошлины
                        </Label>
                        <Select value={dutyRate} onValueChange={setDutyRate}>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0% - Электроника</SelectItem>
                            <SelectItem value="5">5% - Инструменты</SelectItem>
                            <SelectItem value="10">10% - Текстиль</SelectItem>
                            <SelectItem value="12.5">12.5% - Обувь кожаная</SelectItem>
                            <SelectItem value="15">15% - Одежда</SelectItem>
                            <SelectItem value="20">20% - Мебель</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="goodsDescription" className="text-base mb-2 block">
                          Описание товара (необязательно)
                        </Label>
                        <Textarea
                          id="goodsDescription"
                          placeholder="Опишите ваш товар для более точного расчета ВЭД кода и ставки пошлины..."
                          value={goodsDescription}
                          onChange={(e) => setGoodsDescription(e.target.value)}
                          rows={3}
                          className="resize-none"
                        />
                      </div>
                    </div>

                    <Button 
                      size="lg" 
                      onClick={calculateCustoms}
                      className="!w-full bg-brand-red-100 hover:bg-accent/90 text-accent-foreground text-lg h-14"
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      Рассчитать таможню
                    </Button>

                    {customsResult && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="bg-secondary/50 rounded-xl p-6">
                          <h3 className="text-lg font-semibold mb-4">Таможенные платежи:</h3>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center pb-3 border-b">
                              <span className="text-muted-foreground">Стоимость товара:</span>
                              <span className="text-lg font-semibold">{formatCurrency(customsResult.cost)}</span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-3 border-b">
                              <span className="text-muted-foreground">Пошлина ({dutyRate}%):</span>
                              <span className="text-lg font-semibold text-orange-600">{formatCurrency(customsResult.duty)}</span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-3 border-b">
                              <span className="text-muted-foreground">НДС (20%):</span>
                              <span className="text-lg font-semibold text-orange-600">{formatCurrency(customsResult.vat)}</span>
                            </div>
                            
                            <div className="flex justify-between items-center pb-3 border-b">
                              <span className="text-muted-foreground">Таможенный сбор:</span>
                              <span className="text-lg font-semibold text-orange-600">{formatCurrency(customsResult.customsFee)}</span>
                            </div>
                            
                            <div className="flex justify-between items-center pt-3 bg-accent/10 rounded-lg p-4">
                              <span className="text-lg font-bold">Итого:</span>
                              <span className="text-2xl font-bold text-accent">{formatCurrency(customsResult.total)}</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 text-sm">
                          <p className="text-blue-900 dark:text-blue-100">
                            <strong>Важно:</strong> Это предварительный расчет. Точная сумма зависит от правильности классификации товара по ТН ВЭД, курса валют и других факторов.
                          </p>
                        </div>

                        <Button 
                          size="lg" 
                          onClick={() => {
                            setDialogMode('customs');
                            setShowContactDialog(true);
                          }}
                          className="w-full bg-brand-red hover:bg-brand-red/90 text-white text-lg h-14"
                        >
                          Получить точный расчет от менеджера
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {dialogMode === 'delivery' ? 'Запрос расчета доставки' : 'Точный расчет таможни'}
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
              {/* Summary of entered data */}
              <div className="bg-secondary/50 rounded-lg p-4 space-y-2 text-sm">
                <h4 className="font-semibold mb-2">Данные для расчета:</h4>
                {dialogMode === 'delivery' ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Страна:</span>
                      <span className="font-medium">
                        {countries.find(c => c.value === country)?.label}
                      </span>
                    </div>
                    {transport && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Транспорт:</span>
                        <span className="font-medium">
                          {transportTypes.find(t => t.value === transport)?.label}
                        </span>
                      </div>
                    )}
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
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Стоимость товара:</span>
                      <span className="font-medium">${goodsCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ставка пошлины:</span>
                      <span className="font-medium">{dutyRate}%</span>
                    </div>
                    {customsResult && (
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-muted-foreground">Предварительно:</span>
                        <span className="font-bold text-accent">
                          {formatCurrency(customsResult.total)}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Contact form */}
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

                {/* Privacy consent */}
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

      {/* Privacy Policy Dialog */}
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
          <Button onClick={() => setShowPrivacyModal(false)} className="mt-6 !bg-brand-blue hover:!bg-brand-blue/90">
            Принять
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SimpleCalculator;
