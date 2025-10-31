import { Country } from '@/lib/countries';

export default function CountryFAQ({ country }: { country: Country }) {
  const faqs = [
    {
      q: `Какие сроки доставки из ${country.name}?`,
      a: 'Обычно 10-21 день в зависимости от типа груза и таможни.',
    },
    {
      q: `Какие документы нужны для доставки из ${country.name}?`,
      a: 'Инвойс, упаковочный лист, сертификаты (если требуются).',
    },
    {
      q: 'Можно ли отследить груз?',
      a: 'Да, предоставляем номер отслеживания и регулярные обновления.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-12">
          Часто задаваемые вопросы
        </h2>
        
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <details key={i} className="bg-white p-6 rounded-lg cursor-pointer">
              <summary className="font-bold text-lg">{faq.q}</summary>
              <p className="text-gray-600 mt-4">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
