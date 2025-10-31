'use client'

import Image from "next/image";

const countries = [
  { name: "Китай", flag: "/images/flags/china_f.webp" },
  { name: "Турция", flag: "/images/flags/turkey_f.png" },
  { name: "ОАЭ", flag: "/images/flags/uae_f.webp" },
  { name: "Индия", flag: "/images/flags/india_f.png" },
  { name: "Япония", flag: "/images/flags/japan_f.png" },
  { name: "Таиланд", flag: "/images/flags/thailand_f.png" },
  { name: "Бангладеш", flag: "/images/flags/bangladesh_f.png" },
  { name: "Вьетнам", flag: "/images/flags/vietnam_f.png" },
  { name: "Иран", flag: "/images/flags/iran_f.png" },
  { name: "Корея", flag: "/images/flags/korea_f.png" },
  { name: "Малайзия", flag: "/images/flags/malaysia_f.png" },
  { name: "Филиппины", flag: "/images/flags/philippines_f.png" },
  { name: "Индонезия", flag: "/images/flags/indonesia_f.webp" },
  { name: "Мьянма", flag: "/images/flags/myanmar_f.webp" },
  { name: "Тайвань", flag: "/images/flags/taiwan_f.png" },
  { name: "Австралия", flag: "/images/flags/australia_f.png" },
  { name: "Н. Зеландия", flag: "/images/flags/new_zealand_f.png" },
  { name: "Египет", flag: "/images/flags/egypt_.webp" },
  { name: "Сербия", flag: "/images/flags/serbia_f.png" },
];

const FlagsCarousel = () => {
  return (
    <section className="py-10 bg-brand-blue overflow-hidden">
      <div className="relative">
        <div className="flex animate-scroll hover:pause-animation">
          {/* Первый набор флагов */}
          <div className="flex gap-8 px-4 flex-shrink-0">
            {countries.map((country, index) => (
              <div
                key={`set1-${index}`}
                className="flex flex-col items-center gap-3 min-w-[110px] hover:-translate-y-1 transition-transform"
              >
                <div className="w-[85px] h-[57px] rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow relative">
                  <Image
                    src={country.flag}
                    alt={country.name}
                    fill
                    className="object-cover"
                    sizes="85px"
                  />
                </div>
                <span className="text-sm text-white/90 font-medium whitespace-nowrap">
                  {country.name}
                </span>
              </div>
            ))}
          </div>

          {/* Второй набор флагов (дубликат) */}
          <div className="flex gap-8 px-4 flex-shrink-0">
            {countries.map((country, index) => (
              <div
                key={`set2-${index}`}
                className="flex flex-col items-center gap-3 min-w-[110px] hover:-translate-y-1 transition-transform"
              >
                <div className="w-[85px] h-[57px] rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow relative">
                  <Image
                    src={country.flag}
                    alt={country.name}
                    fill
                    className="object-cover"
                    sizes="85px"
                  />
                </div>
                <span className="text-sm text-white/90 font-medium whitespace-nowrap">
                  {country.name}
                </span>
              </div>
            ))}
          </div>

          {/* Третий набор флагов (для идеальной бесшовности) */}
          <div className="flex gap-8 px-4 flex-shrink-0">
            {countries.map((country, index) => (
              <div
                key={`set3-${index}`}
                className="flex flex-col items-center gap-3 min-w-[110px] hover:-translate-y-1 transition-transform"
              >
                <div className="w-[85px] h-[57px] rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow relative">
                  <Image
                    src={country.flag}
                    alt={country.name}
                    fill
                    className="object-cover"
                    sizes="85px"
                  />
                </div>
                <span className="text-sm text-white/90 font-medium whitespace-nowrap">
                  {country.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlagsCarousel;
