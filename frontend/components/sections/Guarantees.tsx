import { Shield, Clock, FileCheck, Headphones, Award, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

const guarantees = [
  {
    icon: Shield,
    title: "Страхование груза",
    description: "100% страхование всех грузов от потери и повреждения. Полное возмещение в случае форс-мажора.",
  },
  {
    icon: Clock,
    title: "Соблюдение сроков",
    description: "Гарантируем доставку в оговоренные сроки. При задержке по нашей вине — компенсация 5% стоимости за каждый день.",
  },
  {
    icon: FileCheck,
    title: "Прозрачность расчетов",
    description: "Все расходы фиксируются в договоре. Никаких скрытых платежей и доплат. Финальная цена = цена в договоре.",
  },
  {
    icon: Headphones,
    title: "Поддержка 24/7",
    description: "Персональный менеджер на связи круглосуточно. Ответим на любой вопрос в течение 15 минут.",
  },
  {
    icon: Award,
    title: "Лицензии и сертификаты",
    description: "Лицензия таможенного брокера ФТС, ИАТА, сертификаты ISO. Работаем официально с 2010 года.",
  },
  {
    icon: Lock,
    title: "Конфиденциальность",
    description: "NDA по требованию. Вся информация о грузах конфиденциальна и не передается третьим лицам.",
  },
];

const Guarantees = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Наши <span className="text-accent">гарантии</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Мы берем на себя все риски и гарантируем безопасность вашего груза на каждом этапе
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {guarantees.map((guarantee, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 group relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="mb-4">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-colors">
                    <guarantee.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">
                  {guarantee.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {guarantee.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust badge */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="p-8 bg-accent/5 border-accent/20 border-2">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Award className="w-6 h-6 text-accent" />
                <h3 className="text-2xl font-bold">Работаем официально и прозрачно</h3>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Заключаем официальные договоры, предоставляем все закрывающие документы для бухгалтерии. 
                Вы можете проверить нашу компанию в ЕГРЮЛ и убедиться в нашей надежности.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>ИНН: 7731387839</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>ОГРН: 5177746090220</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Лицензия ФТС</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Guarantees;
