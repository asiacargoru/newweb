import { Search, AlertTriangle, TrendingDown, CheckCircle, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const VEDCodeGuide = () => {
  const examples = [
    {
      category: "Электроника",
      wrongCode: "8517 62 000 0",
      wrongDuty: "15%",
      rightCode: "8517 12 000 0",
      rightDuty: "0%",
      savings: "~150 000 ₽",
      description: "Смартфоны vs. сотовые телефоны"
    },
    {
      category: "Текстиль",
      wrongCode: "6307 90 980 0",
      wrongDuty: "12.5%",
      rightCode: "6302 22 100 0",
      rightDuty: "6.5%",
      savings: "~60 000 ₽",
      description: "Постельное белье правильной классификации"
    },
    {
      category: "Обувь",
      wrongCode: "6403 99 910 0",
      wrongDuty: "15%",
      rightCode: "6404 19 900 0",
      rightDuty: "10%",
      savings: "~50 000 ₽",
      description: "Спортивная vs. повседневная обувь"
    }
  ];

  const commonMistakes = [
    {
      icon: AlertTriangle,
      title: "Неточное описание товара",
      problem: "Общее описание без указания технических характеристик",
      solution: "Детальное техническое описание с указанием материалов, функций, назначения"
    },
    {
      icon: AlertTriangle,
      title: "Игнорирование примечаний",
      problem: "Не учитываются примечания к группам и разделам ТН ВЭД",
      solution: "Внимательное изучение всех примечаний перед классификацией"
    },
    {
      icon: AlertTriangle,
      title: "Ошибки в многокомпонентных товарах",
      problem: "Неправильное определение основного компонента",
      solution: "Применение правил классификации многокомпонентных изделий"
    }
  ];

  const tips = [
    "ВЭД код состоит из 10 цифр и определяет ставку таможенной пошлины",
    "Первые 6 цифр - международная классификация HS, следующие 4 - код ЕАЭС",
    "Неправильный код может привести к переплате пошлин до 20%",
    "Таможня имеет право корректировать код при обнаружении ошибки",
    "Предварительное решение ФТС о классификации действует 3 года"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-light-blue-accent text-brand-red px-4 py-2 rounded-full mb-6">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">Экспертные знания</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Гайд по <span className="text-brand-red">ВЭД кодам</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Правильная классификация товара может сэкономить до 20% таможенных платежей. Узнайте, как избежать типичных ошибок.
          </p>
        </div>

        {/* Why VED Code Matters */}
        <Alert className="mb-12 border-brand-red/30 bg-brand-red/5">
          <Search className="h-5 w-5 text-brand-red" />
          <AlertDescription className="text-base">
            <strong className="text-brand-red">Важно:</strong> От правильности выбора кода ТН ВЭД ЕАЭС зависит размер таможенной пошлины, НДС, необходимость получения разрешительных документов и применение мер нетарифного регулирования.
          </AlertDescription>
        </Alert>

        {/* Real Examples */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Реальные примеры экономии на правильном коде
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {examples.map((example, index) => (
              <Card key={index} className="border-2 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">{example.category}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Wrong Classification */}
                  <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2 text-red-600 dark:text-red-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-semibold text-sm">Неправильно</span>
                    </div>
                    <div className="text-sm mb-1">Код: {example.wrongCode}</div>
                    <div className="text-lg font-bold text-red-600 dark:text-red-400">
                      Пошлина: {example.wrongDuty}
                    </div>
                  </div>

                  {/* Right Classification */}
                  <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2 text-green-600 dark:text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-semibold text-sm">Правильно</span>
                    </div>
                    <div className="text-sm mb-1">Код: {example.rightCode}</div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      Пошлина: {example.rightDuty}
                    </div>
                  </div>

                  {/* Savings */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm text-muted-foreground">Экономия на партии:</span>
                    <span className="text-xl font-bold text-green-600 flex items-center gap-1">
                      <TrendingDown className="w-5 h-5" />
                      {example.savings}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Типичные ошибки при классификации
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commonMistakes.map((mistake, index) => (
              <Card key={index} className="border-2 border-orange-200 dark:border-orange-900">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                    <mistake.icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <CardTitle className="text-lg">{mistake.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">Проблема:</div>
                    <p className="text-sm text-muted-foreground">{mistake.problem}</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">Решение:</div>
                    <p className="text-sm text-muted-foreground">{mistake.solution}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Expert Tips */}
        <Card className="bg-gradient-to-br from-brand-blue to-brand-blue/90 text-white border-0">
          <CardContent className="p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              Что нужно знать о кодах ТН ВЭД
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <CheckCircle className="w-6 h-6 text-brand-red flex-shrink-0 mt-0.5" />
                  <span className="text-white/90">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default VEDCodeGuide;
