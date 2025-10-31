import { FileText, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CustomsDocuments = () => {
  const documentGroups = [
    {
      title: "Основные документы",
      required: true,
      documents: [
        "Внешнеторговый контракт (договор купли-продажи)",
        "Инвойс (счет) от иностранного поставщика",
        "Упаковочный лист (Packing List)",
        "Транспортные документы (CMR, коносамент, авианакладная)",
        "Паспорт сделки (при валютном контроле)"
      ]
    },
    {
      title: "Разрешительные документы",
      required: true,
      documents: [
        "Сертификат соответствия или декларация о соответствии",
        "Отказное письмо (если товар не подлежит сертификации)",
        "Санитарно-эпидемиологическое заключение (для определенных товаров)",
        "Фитосанитарный сертификат (для растительной продукции)",
        "Ветеринарный сертификат (для товаров животного происхождения)"
      ]
    },
    {
      title: "Дополнительные документы",
      required: false,
      documents: [
        "Сертификат происхождения товара (форма СТ-1, EUR.1)",
        "Техническая документация (инструкции, паспорта)",
        "Разрешение на использование товарного знака",
        "Лицензия (для подакцизных и лицензируемых товаров)",
        "Декларация о соответствии условиям безопасности"
      ]
    },
    {
      title: "Документы компании-импортера",
      required: true,
      documents: [
        "ОГРН/ИНН организации",
        "Устав организации",
        "Свидетельство о постановке на учет в налоговом органе",
        "Доверенность на таможенного представителя",
        "Договор с таможенным брокером"
      ]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Необходимые <span className="text-brand-red">документы</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Полный чек-лист документов для таможенного оформления. Мы поможем подготовить все необходимое.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {documentGroups.map((group, index) => (
            <Card key={index} className="border-2 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{group.title}</CardTitle>
                  {group.required && (
                    <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full font-semibold">
                      Обязательно
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {group.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{doc}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Card */}
        <Card className="mt-12 bg-gradient-to-r from-brand-blue to-brand-blue/90 text-white border-0 max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-start gap-6">
              <FileText className="w-12 h-12 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Не знаете, какие документы нужны для вашего товара?
                </h3>
                <p className="text-lg text-white/90 mb-6">
                  Отправьте нам описание товара и страну происхождения - мы составим точный список необходимых документов и поможем с их оформлением.
                </p>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Бесплатная консультация по документам</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Помощь в подготовке и переводе</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Проверка правильности оформления</span>
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

export default CustomsDocuments;
