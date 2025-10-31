'use client';

import { useEffect, useState } from 'react';
import { Country } from '@/lib/countries';

export default function CountryServices({ country }: { country: Country }) {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    // Загружени услуг для этой страны из API/БД
    fetch(`/api/services?country=${country.code}`)
      .then(res => res.json())
      .then(data => setServices(data || []))
      .catch(() => setServices([]));
  }, [country.code]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Услуги для {country.name}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.length > 0 ? (
            services.map(service => (
              <div key={service.id} className="p-6 border rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <button className="text-blue-600 font-semibold hover:underline">
                  Узнать больше →
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Услуги загружаются...</p>
          )}
        </div>
      </div>
    </section>
  );
}
