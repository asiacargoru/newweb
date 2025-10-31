import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calculator, ArrowRight } from "lucide-react";
import ContactModal from "@/components/ContactModal";

const PriceCalculator = () => {
  const [transportType, setTransportType] = useState("");
  const [weight, setWeight] = useState("");
  const [country, setCountry] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const handleCalculate = () => {
    setModalOpen(true);
  };

  return (
    <>
    <section className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-brand-red/10 border border-brand-red/20 rounded-full">
              <Calculator className="w-5 h-5 text-brand-red" />
              <span className="text-sm font-semibold text-brand-red">Калькулятор стоимости</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Рассчитайте стоимость доставки
            </h2>
            <p className="text-lg text-muted-foreground">
              Получите предварительный расчет за 1 минуту
            </p>
          </div>

          <Card className="p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="transport">Тип транспорта</Label>
                <Select value={transportType} onValueChange={setTransportType}>
                  <SelectTrigger id="transport">
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sea">Морской</SelectItem>
                    <SelectItem value="air">Авиа</SelectItem>
                    <SelectItem value="rail">Железнодорожный</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Страна отправления</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Выберите страну" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="china">Китай</SelectItem>
                    <SelectItem value="turkey">Турция</SelectItem>
                    <SelectItem value="uae">ОАЭ</SelectItem>
                    <SelectItem value="india">Индия</SelectItem>
                    <SelectItem value="other">Другая</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Вес груза (кг)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Введите вес"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="volume">Объем (м³)</Label>
                <Input
                  id="volume"
                  type="number"
                  placeholder="Введите объем"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-brand-blue/5 to-brand-red/5 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Примерная стоимость</div>
                  <div className="text-3xl font-bold text-foreground">
                    {transportType && country && weight ? "от $" + (parseFloat(weight) * 2).toFixed(0) : "— —"}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground max-w-xs">
                  *Точная стоимость рассчитывается индивидуально
                </div>
              </div>
            </div>

            <Button 
              onClick={handleCalculate}
              className="w-full bg-brand-red hover:bg-brand-red/90 text-white text-lg py-6 group"
              size="lg"
            >
              Получить точный расчет
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Отправим подробный расчет на email в течение 15 минут
            </p>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            {[
              { title: "Без скрытых платежей", desc: "Все включено в стоимость" },
              { title: "Гибкие тарифы", desc: "Скидки для постоянных клиентов" },
              { title: "Прозрачность", desc: "Детализация всех расходов" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
};

export default PriceCalculator;