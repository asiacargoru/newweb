import { Card } from "@/components/ui/card";

const services = [
  "Таможенное оформление",
  "Сертификация товаров",
  "Складское хранение",
  "Маркировка товаров",
  "Упаковка грузов",
  "Проверка поставщиков",
  "Страхование грузов",
  "Консолидация",
];

const AdditionalServices = () => {
  return (
    <section className="py-16 border-t-2 border-border">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-brand-blue">
          Дополнительные услуги
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((service, idx) => (
            <Card
              key={idx}
              className="p-5 text-center font-semibold text-brand-blue hover:bg-brand-blue hover:text-white hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-sm"
            >
              {service}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;
