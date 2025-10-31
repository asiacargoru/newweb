'use client'

import { Calculator } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const CustomsCalculator = () => {
  const [cost, setCost] = useState("");
  const [duty, setDuty] = useState("10");
  const [result, setResult] = useState<any>(null);

  const calculateDuties = () => {
    const costNum = parseFloat(cost);
    if (isNaN(costNum) || costNum <= 0) return;

    const dutyRate = parseFloat(duty) / 100;
    const dutyAmount = costNum * dutyRate;
    const vat = (costNum + dutyAmount) * 0.20; // НДС 20%
    const customsFee = 750; // Таможенный сбор (примерно)
    const total = dutyAmount + vat + customsFee;

    setResult({
      cost: costNum,
      duty: dutyAmount,
      vat: vat,
      customsFee: customsFee,
      total: total
    });
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-light-blue-accent text-brand-red px-4 py-2 rounded-full mb-6">
            <Calculator className="w-5 h-5" />
            <span className="font-semibold">Онлайн калькулятор</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Калькулятор <span className="text-brand-red">таможенных платежей</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Рассчитайте примерную стоимость таможенного оформления вашего груза
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Предварительный расчет</CardTitle>
              <CardDescription>
                Введите данные о грузе для расчета таможенных платежей. Точный расчет производится после анализа документов.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <Label htmlFor="cost" className="text-base mb-2 block">
                    Стоимость товара (USD)
                  </Label>
                  <Input
                    id="cost"
                    type="number"
                    placeholder="10000"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>

                <div>
                  <Label htmlFor="duty" className="text-base mb-2 block">
                    Ставка пошлины
                  </Label>
                  <Select value={duty} onValueChange={setDuty}>
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
              </div>

              <Button 
                size="lg" 
                onClick={calculateDuties}
                className="w-full bg-brand-red hover:bg-brand-red/90 text-white text-lg h-14 mb-8"
              >
                <Calculator className="w-5 h-5 mr-2" />
                Рассчитать платежи
              </Button>

              {result && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-secondary/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Результаты расчета:</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-muted-foreground">Стоимость товара:</span>
                        <span className="text-lg font-semibold">{formatCurrency(result.cost)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-muted-foreground">Таможенная пошлина ({duty}%):</span>
                        <span className="text-lg font-semibold text-orange-600">{formatCurrency(result.duty)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-muted-foreground">НДС (20%):</span>
                        <span className="text-lg font-semibold text-orange-600">{formatCurrency(result.vat)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span className="text-muted-foreground">Таможенный сбор:</span>
                        <span className="text-lg font-semibold text-orange-600">{formatCurrency(result.customsFee)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 bg-brand-red/10 rounded-lg p-4">
                        <span className="text-lg font-bold">Итого к оплате:</span>
                        <span className="text-2xl font-bold text-brand-red">{formatCurrency(result.total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 text-sm">
                    <p className="text-blue-900 dark:text-blue-100">
                      <strong>Обратите внимание:</strong> Это приблизительный расчет. Точная сумма зависит от правильности классификации товара, курса валют на день оплаты и других факторов. Для точного расчета отправьте нам заявку.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-brand-blue mb-2">0-20%</div>
              <div className="text-sm text-muted-foreground">Ставка пошлины<br/>в зависимости от товара</div>
            </Card>
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-brand-blue mb-2">20%</div>
              <div className="text-sm text-muted-foreground">НДС на большинство<br/>импортных товаров</div>
            </Card>
            <Card className="text-center p-6">
              <div className="text-3xl font-bold text-brand-blue mb-2">750 ₽</div>
              <div className="text-sm text-muted-foreground">Таможенный сбор<br/>за оформление</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomsCalculator;
