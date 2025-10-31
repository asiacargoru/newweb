import Image, { StaticImageData } from 'next/image';

type CountryHeroProps = {
  name: string;
  flag: React.ReactNode;
  description: string;
  image: string | StaticImageData;
};

export function CountryHero({ name, flag, description, image }: CountryHeroProps) {
  return (
    <section className="relative h-[600px] bg-gradient-to-br from-blue-900 to-blue-700">
      {/* Фоновое изображение */}
      <div className="absolute inset-0">
        <Image src={image} alt={name} fill className="object-cover opacity-30" />
      </div>
      
      {/* Контент */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <div className="text-6xl mb-4">{flag}</div>
          <h1 className="text-5xl font-bold mb-6">
            Грузоперевозки из {name}
          </h1>
          <p className="text-xl mb-8">{description}</p>
          <button className="bg-red-600 px-8 py-4 rounded-lg text-lg">
            Рассчитать стоимость
          </button>
        </div>
      </div>
    </section>
  );
}
