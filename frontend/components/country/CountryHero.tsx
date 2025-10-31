import { Country } from '@/lib/countries';

export default function CountryHero({ country }: { country: Country }) {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="text-6xl mb-6">{country.emoji}</div>
        <h1 className="text-5xl font-bold mb-4">{country.hero_title}</h1>
        <p className="text-xl max-w-2xl mx-auto">{country.hero_subtitle}</p>
      </div>
    </section>
  );
}
