import { Shield, Award, CheckCircle, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const CustomsLicense = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* License Info */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-light-blue-accent text-brand-red px-4 py-2 rounded-full mb-6">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Официальная аккредитация</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Лицензированный таможенный брокер
              </h2>
              
              <p className="text-lg text-muted-foreground mb-6">
                Азия Транс Карго имеет официальную лицензию таможенного представителя, выданную Федеральной таможенной службой России. Мы несем полную юридическую ответственность за правильность оформления документов и соблюдение таможенного законодательства.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Включены в реестр таможенных представителей ФТС",
                  "Профессиональная ответственность застрахована на 100 млн ₽",
                  "Специалисты с квалификационным аттестатом таможенного брокера",
                  "Аккредитация во всех таможенных постах России"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: Award,
                  number: "15+",
                  label: "лет на рынке",
                  description: "Опыт работы"
                },
                {
                  icon: Users,
                  number: "50 000+",
                  label: "деклараций",
                  description: "Успешно оформлено"
                },
                {
                  icon: CheckCircle,
                  number: "99.8%",
                  label: "успешных",
                  description: "Прохождение без задержек"
                },
                {
                  icon: Shield,
                  number: "24/7",
                  label: "поддержка",
                  description: "Консультации экспертов"
                }
              ].map((stat, index) => (
                <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300 hover:border-brand-red/50">
                  <CardContent className="p-6 pt-6 text-center">
                    <stat.icon className="w-12 h-12 mx-auto mb-4 text-brand-red" />
                    <div className="text-3xl font-bold text-brand-blue mb-2">{stat.number}</div>
                    <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomsLicense;
