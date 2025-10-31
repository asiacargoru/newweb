import { Award, FileCheck, Shield, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CertificationTypes = () => {
  const certifications = [
    {
      type: "certificate",
      icon: Award,
      title: "Сертификаты соответствия",
      description: "Обязательная сертификация для товаров из перечня ТР ТС",
      items: [
        {
          name: "Сертификат соответствия ТР ТС",
          products: "Электроника, игрушки, одежда, обувь, детские товары",
          term: "1-5 лет",
          cost: "от 15 000 ₽",
          required: true
        },
        {
          name: "Сертификат ГОСТ Р",
          products: "Промышленное оборудование, инструменты, стройматериалы",
          term: "1-3 года",
          cost: "от 20 000 ₽",
          required: true
        },
        {
          name: "Пожарный сертификат",
          products: "Отделочные материалы, кабельная продукция, мебель",
          term: "1-5 лет",
          cost: "от 25 000 ₽",
          required: true
        }
      ]
    },
    {
      type: "declaration",
      icon: FileCheck,
      title: "Декларации соответствия",
      description: "Оформляются самим производителем или импортером",
      items: [
        {
          name: "Декларация о соответствии ТР ТС",
          products: "Бытовая техника, текстиль, посуда, косметика",
          term: "1-5 лет",
          cost: "от 8 000 ₽",
          required: true
        },
        {
          name: "Декларация о соответствии ГОСТ Р",
          products: "Продукты питания, упаковка, расходные материалы",
          term: "1-3 года",
          cost: "от 10 000 ₽",
          required: false
        }
      ]
    },
    {
      type: "permits",
      icon: Shield,
      title: "Разрешительные документы",
      description: "Специальные разрешения для отдельных категорий товаров",
      items: [
        {
          name: "СГР (Свидетельство о государственной регистрации)",
          products: "Косметика, БАДы, парфюмерия, средства гигиены",
          term: "Бессрочно",
          cost: "от 30 000 ₽",
          required: true
        },
        {
          name: "РУ (Регистрационное удостоверение)",
          products: "Медицинские изделия, оборудование, препараты",
          term: "5 лет",
          cost: "от 150 000 ₽",
          required: true
        },
        {
          name: "Фитосанитарный сертификат",
          products: "Растения, семена, деревянная упаковка, корма",
          term: "Разовый",
          cost: "от 5 000 ₽",
          required: true
        },
        {
          name: "Ветеринарный сертификат",
          products: "Продукты животного происхождения, корма для животных",
          term: "Разовый",
          cost: "от 5 000 ₽",
          required: true
        }
      ]
    },
    {
      type: "optional",
      icon: AlertCircle,
      title: "Отказные письма",
      description: "Подтверждение отсутствия необходимости сертификации",
      items: [
        {
          name: "Отказное письмо",
          products: "Товары, не подлежащие обязательной сертификации",
          term: "Разовое",
          cost: "от 3 000 ₽",
          required: false
        },
        {
          name: "Письмо о несоответствии",
          products: "Промышленное оборудование, комплектующие",
          term: "Разовое",
          cost: "от 3 000 ₽",
          required: false
        }
      ]
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Виды <span className="text-brand-red">сертификации</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Полный обзор разрешительных документов для импорта. Определим, какие сертификаты нужны именно для вашего товара.
          </p>
        </div>

        <Tabs defaultValue="certificate" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            {certifications.map((cert) => (
              <TabsTrigger key={cert.type} value={cert.type} className="flex items-center gap-2">
                <cert.icon className="w-4 h-4" />
                <span className="hidden md:inline">{cert.title.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {certifications.map((cert) => (
            <TabsContent key={cert.type} value={cert.type}>
              <Card className="border-2">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <cert.icon className="w-8 h-8 text-brand-red" />
                  </div>
                  <CardTitle className="text-2xl">{cert.title}</CardTitle>
                  <CardDescription className="text-base">{cert.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {cert.items.map((item, index) => (
                      <Card key={index} className="border-2 hover:border-brand-red/30 transition-colors">
                        <CardContent className="pt-8 px-6 pb-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                                {item.name}
                                {item.required && (
                                  <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full">
                                    Обязательно
                                  </span>
                                )}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                <strong>Применяется для:</strong> {item.products}
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Срок действия</div>
                              <div className="font-semibold text-brand-blue">{item.term}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Стоимость</div>
                              <div className="font-semibold text-brand-red">{item.cost}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Important Notice */}
        <Card className="mt-12 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/20 dark:to-orange-900/20 border-2 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-3 text-orange-900 dark:text-orange-100">
                  Важная информация о сертификации
                </h3>
                <ul className="space-y-2 text-orange-800 dark:text-orange-200">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-red mt-1">•</span>
                    <span>Ввоз товаров без обязательных сертификатов запрещен и грозит штрафами</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-red mt-1">•</span>
                    <span>Определение необходимых документов требует экспертизы - не рискуйте</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-red mt-1">•</span>
                    <span>Оформление некоторых сертификатов занимает до 2 месяцев - планируйте заранее</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-red mt-1">•</span>
                    <span>Неправильно оформленные документы не принимаются таможней</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CertificationTypes;
