'use client'

import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
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

const LatestNewsDynamic = () => {
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setLatestNews(Array.isArray(data) ? data.slice(0, 3) : []);
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
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          Загрузка новостей...
        </div>
      </section>
    );
  }

  if (latestNews.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Новости и статьи
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Актуальная информация о наших услугах и изменениях в законодательстве
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-8">
          {latestNews.map((article) => (
            <Link key={article.id} href={`/news/${article.slug}`}>
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                {article.image_url && (
                  <div className="aspect-video bg-blue-100 overflow-hidden">
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  {article.category && (
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full mb-3">
                      {article.category}
                    </span>
                  )}
                  
                  <h3 className="text-xl font-bold mb-3 text-foreground hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.date)}
                    </div>
                    <span className="text-blue-600 font-medium flex items-center gap-1">
                      Читать
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/news">
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
              Все новости
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestNewsDynamic;
