'use client';

import { useEffect, useState } from 'react';
import { Country } from '@/lib/countries';

export default function CountryNews({ country }: { country: Country }) {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/news?country=${country.code}&limit=3`)
      .then(res => res.json())
      .then(data => setNews(Array.isArray(data) ? data : []))
      .catch(() => setNews([]));
  }, [country.code]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Новости о логистике из {country.name}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map(article => (
            <div key={article.id} className="border rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
              <a href={`/news/${article.slug}`} className="text-blue-600 font-semibold">
                Читать →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
