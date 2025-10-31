import { Globe } from "lucide-react";

const countries = [
  { name: "Китай", flag: "🇨🇳" },
  { name: "Турция", flag: "🇹🇷" },
  { name: "ОАЭ", flag: "🇦🇪" },
  { name: "Индия", flag: "🇮🇳" },
  { name: "Япония", flag: "🇯🇵" },
  { name: "Таиланд", flag: "🇹🇭" },
  { name: "Бангладеш", flag: "🇧🇩" },
  { name: "Вьетнам", flag: "🇻🇳" },
  { name: "Иран", flag: "🇮🇷" },
  { name: "Корея", flag: "🇰🇷" },
  { name: "Малайзия", flag: "🇲🇾" },
  { name: "Филиппины", flag: "🇵🇭" },
  { name: "Индонезия", flag: "🇮🇩" },
  { name: "Мьянма", flag: "🇲🇲" },
  { name: "Тайвань", flag: "🇹🇼" },
  { name: "Австралия", flag: "🇦🇺" },
  { name: "Н. Зеландия", flag: "🇳🇿" },
  { name: "Египет", flag: "🇪🇬" },
  { name: "Сербия", flag: "🇷🇸" },
];

const Countries = () => {
  return (
    <section id="countries" className="py-16 sm:py-20 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Globe className="w-6 h-6 text-accent" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            География наших услуг
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Работаем с ведущими странами Азии, Океании и Ближнего Востока
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {countries.map((country, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-4 flex flex-col items-center justify-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-border group"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                {country.flag}
              </div>
              <div className="text-sm font-medium text-card-foreground">
                {country.name}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            Не нашли нужную страну? Свяжитесь с нами — мы найдем решение!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Countries;
