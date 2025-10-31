"use client";

import Link from "next/link";
import ReviewsCarousel from "./ReviewsCarousel";
import { useEffect, useState } from "react";

type Review = {
  author: string;
  text: string;
  rating: number;
  date?: string;
  avatar?: string;
};

export default function Reviews() {
  const [items, setItems] = useState<Review[]>([]);
  const [rating, setRating] = useState(4.8);
  const [gradesCount, setGradesCount] = useState(38);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setRating(data.rating || 4.8);
          setGradesCount(data.gradesCount || 38);
          setItems(data.reviews || []); // Убрали slice - берем все отзывы!
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section 
      className="py-16" 
      style={{ 
        backgroundColor: '#F7F7F7', 
        fontFamily: "'YS Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" 
      }}
    >
      <div className="container mx-auto px-4">
        <h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12" 
          style={{ color: '#000000' }}
        >
          Отзывы наших клиентов
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto mb-8 items-stretch">
          
          <div 
            className="rounded-lg p-6 h-full" 
            style={{ backgroundColor: '#F0F0F0', border: 'none' }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span style={{ 
                  fontSize: "18px", 
                  fontWeight: 600, 
                  color: '#000000',
                  lineHeight: '1.2'
                }}>
                  Азия Транс Карго
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#1A1A73E8"/>
                  <path d="M9 16.17l-3.88-3.88L3 14.41 9 20.41 21 8.41l-2.12-2.12L9 16.17z" fill="#FFFFFF" />
                </svg>
              </div>

              <div className="flex gap-4" style={{ fontSize: '14px', color: '#999999', borderBottom: '1px solid #D4D4D4', paddingBottom: '8px' }}>
                <span style={{ color: '#000000', fontWeight: 500, borderBottom: '2px solid #000000', paddingBottom: '8px', marginBottom: '-9px' }}>Обзор</span>
                <span>Товары и услуги</span>
                <span>Фото</span>
              </div>

              <div className="flex items-end gap-3 py-4" style={{ backgroundColor: '#E6E6E6', borderRadius: '8px', padding: '20px' }}>
                <div style={{ fontSize: '56px', fontWeight: 700, color: '#000000', lineHeight: '1' }}>
                  {String(rating).replace('.', ',')}
                </div>
                <div className="flex flex-col gap-1 pb-2">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={i < Math.round(rating) ? '#FC0' : '#D4D4D4'} xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <div style={{ fontSize: '14px', color: '#000000' }}>
                    {gradesCount} оценок
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 py-2">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="4" fill="#FC3F1D"/>
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="700" fontFamily="'YS Text', Arial, sans-serif">Я</text>
                </svg>
                <span style={{ fontSize: '16px', fontWeight: 500, color: '#000000' }}>Яндекс Карты</span>
              </div>

              <Link href="https://yandex.ru/maps/org/aziya_trans_kargo/70075743534/" target="_blank">
                <button 
                  className="w-full hover:bg-gray-50" 
                  style={{ 
                    padding: '12px 20px', 
                    border: '1px solid #D4D4D4', 
                    borderRadius: '8px', 
                    backgroundColor: '#FFFFFF', 
                    color: '#000000', 
                    fontSize: '14px', 
                    fontWeight: 500, 
                    cursor: 'pointer' 
                  }}
                >
                  Оставить отзыв
                </button>
              </Link>
            </div>
          </div>

          <div className="md:col-span-2 h-full">
            {items.length > 0 ? (
              <ReviewsCarousel reviews={items} />
            ) : (
              <div style={{ color: '#999', textAlign: 'center', padding: '40px' }}>
                Загрузка отзывов...
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <Link 
            href="https://yandex.ru/maps/org/aziya_trans_kargo/70075743534/" 
            target="_blank" 
            style={{ color: '#0094FF', fontSize: '14px', textDecoration: 'none' }} 
            className="hover:underline"
          >
            Больше отзывов на Яндекс.Картах
          </Link>
        </div>
      </div>
    </section>
  );
}
