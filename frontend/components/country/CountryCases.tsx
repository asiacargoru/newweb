'use client';

import { useEffect, useState } from 'react';
import { Country } from '@/lib/countries';

export default function CountryCases({ country }: { country: Country }) {
  const [cases, setCases] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/cases?country=${country.code}&limit=3`)
      .then(res => res.json())
      .then(data => setCases(Array.isArray(data) ? data : []))
      .catch(() => setCases([]));
  }, [country.code]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Кейсы доставки из {country.name}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cases.map(caseItem => (
            <div key={caseItem.id} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2">{caseItem.title}</h3>
              <p className="text-gray-600 mb-4">{caseItem.description}</p>
              <p className="text-sm text-blue-600 font-semibold">
                Время доставки: {caseItem.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
