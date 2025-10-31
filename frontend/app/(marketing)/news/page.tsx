'use client'

import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Link from "next/link";

interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string | null;
  image_url: string | null;
  date: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setNews(data);
      })
      .catch(err => {
        console.error('Failed to load news:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 py-16 text-center">
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Новости и статьи
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Актуальная информация о наших услугах, изменениях в законодательстве и специальных предложениях
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {news.map((article) => (
            <Link key={article.id} href={`/news/${article.slug}`}>
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                {article.image_url && (
                  <div className="aspect-video bg-brand-light-blue overflow-hidden">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  {article.category && (
                    <span className="inline-block px-3 py-1 bg-brand-red/10 text-brand-red text-xs font-semibold rounded-full mb-3">
                      {article.category}
                    </span>
                  )}
                  
                  <h3 className="text-xl font-bold mb-3 text-foreground hover:text-brand-blue transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.date)}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
