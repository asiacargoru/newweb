'use client';

import { useState } from "react";
import { Calculator, Plane, Ship, Train, Truck as TruckIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UnifiedCalculator = () => {
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
  
  // Results
  const [deliveryResult, setDeliveryResult] = useState<any>(null);
  const [customsResult, setCustomsResult] = useState<any>(null);

  const transportRates: Record<string, { price: number; days: string; icon: any; unit?: string }> = {
    "china-air": { price: 2.5, days: "12-15", icon: Plane },
    "china-sea": { price: 850, days: "35-40", icon: Ship, unit: "контейнер 20ft" },
    "china-rail": { price: 1.8, days: "20-25", icon: Train },
    "china-auto": { price: 2.2, days: "15-20", icon: TruckIcon },
    "turkey-air": { price: 3.5, days: "5-7", icon: Plane },
    "turkey-auto": { price: 2.8, days: "10-12", icon: TruckIcon },
    "uae-air": { price: 4.0, days: "7-10", icon: Plane },
    "india-air": { price: 3.2, days: "8-12", icon: Plane },
    "india-sea": { price: 1200, days: "40-45", icon: Ship, unit: "контейнер 20ft" },
  };

  const calculateDelivery = () => {
    const weightNum = parseFloat(weight);
    const volumeNum = parseFloat(volume);
    
    if (!country || !transport || isNaN(weightNum)) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    const rateKey = `${country}-${transport}` as keyof typeof transportRates;
    const rate = transportRates[rateKey];
    
    if (!rate) return;

    const isContainer = rate.unit === "контейнер 20ft";
    const cost = isContainer ? rate.price : rate.price * weightNum;
    const insuranceCost = cost * 0.02;
    const handlingFee = isContainer ? 150 : weightNum * 0.5;
    const total = cost + insuranceCost + handlingFee;

    setDeliveryResult({
      cost,
      insurance: insuranceCost,
      handling: handlingFee,
      total,
      days: rate.days,
      isContainer,
    });
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

  const handleSubmitQuote = () => {
    if (!phone || phone.length < 10) {
      toast({
        title: "Ошибка",
        description: "Укажите корректный номер телефона",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Заявка отправлена!",
      description: "Наш менеджер свяжется с вами в течение 15 минут",
    });

    // Reset form
    setPhone("");
    setName("");
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
    <section id="calculator" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
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
                          <SelectItem value="china">Китай</SelectItem>
                          <SelectItem value="turkey">Турция</SelectItem>
                          <SelectItem value="uae">ОАЭ</SelectItem>
                          <SelectItem value="india">Индия</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="transport" className="text-base mb-2 block">
                        Вид транспорта *
                      </Label>
                      <Select value={transport} onValueChange={setTransport}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Выберите транспорт" />
                        </SelectTrigger>
                        <SelectContent>
                          {country === "china" && (
                            <>
                              <SelectItem value="air">Авиа (12-15 дней, $2.5/кг)</SelectItem>
                              <SelectItem value="sea">Море (35-40 дней, $850/контейнер)</SelectItem>
                              <SelectItem value="rail">ЖД (20-25 дней, $1.8/кг)</SelectItem>
                              <SelectItem value="auto">Авто (15-20 дней, $2.2/кг)</SelectItem>
                            </>
                          )}
                          {country === "turkey" && (
                            <>
                              <SelectItem value="air">Авиа (5-7 дней, $3.5/кг)</SelectItem>
                              <SelectItem value="auto">Авто (10-12 дней, $2.8/кг)</SelectItem>
                            </>
                          )}
                          {country === "uae" && (
                            <SelectItem value="air">Авиа (7-10 дней, $4.0/кг)</SelectItem>
                          )}
                          {country === "india" && (
                            <>
                              <SelectItem value="air">Авиа (8-12 дней, $3.2/кг)</SelectItem>
                              <SelectItem value="sea">Море (40-45 дней, $1200/контейнер)</SelectItem>
                            </>
                          )}
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
                    onClick={calculateDelivery}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg h-14"
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    Рассчитать доставку
                  </Button>

                  {deliveryResult && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="bg-secondary/50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">Стоимость доставки:</h3>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center pb-3 border-b">
                            <span className="text-muted-foreground">Стоимость перевозки:</span>
                            <span className="text-lg font-semibold">{formatCurrency(deliveryResult.cost)}</span>
                          </div>
                          
                          <div className="flex justify-between items-center pb-3 border-b">
                            <span className="text-muted-foreground">Страхование (2%):</span>
                            <span className="text-lg font-semibold">{formatCurrency(deliveryResult.insurance)}</span>
                          </div>
                          
                          <div className="flex justify-between items-center pb-3 border-b">
                            <span className="text-muted-foreground">Обработка груза:</span>
                            <span className="text-lg font-semibold">{formatCurrency(deliveryResult.handling)}</span>
                          </div>
                          
                          <div className="flex justify-between items-center pb-3 border-b">
                            <span className="text-muted-foreground">Срок доставки:</span>
                            <span className="text-lg font-semibold text-accent">{deliveryResult.days} дней</span>
                          </div>
                          
                          <div className="flex justify-between items-center pt-3 bg-accent/10 rounded-lg p-4">
                            <span className="text-lg font-bold">Итого:</span>
                            <span className="text-2xl font-bold text-accent">{formatCurrency(deliveryResult.total)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg h-14"
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
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {/* Contact form for quote */}
              {(deliveryResult || customsResult) && (
                <div className="mt-8 p-6 bg-accent/5 rounded-xl border-2 border-accent/20 animate-fade-in">
                  <h3 className="text-xl font-bold mb-4">Получите точный расчет от менеджера</h3>
                  <p className="text-muted-foreground mb-6">
                    Оставьте телефон и мы перезвоним в течение 15 минут с точным расчетом и ответами на все вопросы
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="calc-name">Ваше имя</Label>
                      <Input
                        id="calc-name"
                        placeholder="Иван"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="calc-phone">Телефон *</Label>
                      <Input
                        id="calc-phone"
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleSubmitQuote}
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90"
                  >
                    Получить точный расчет
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UnifiedCalculator;

