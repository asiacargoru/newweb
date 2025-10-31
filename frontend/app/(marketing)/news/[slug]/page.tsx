'use client'

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NewsArticlePageProps {
  params: {
    slug: string;
  };
}

interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string | null;
  image_url: string | null;
  date: string;
}

export default function NewsArticlePage({ params }: NewsArticlePageProps) {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/news/${params.slug}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setArticle(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 py-16 text-center">
          Загрузка...
        </div>
      </div>
    );
  }

  if (!article) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24">
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/news">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к новостям
          </Button>
        </Link>

        {article.category && (
          <span className="inline-block px-4 py-2 bg-brand-red/10 text-brand-red text-sm font-semibold rounded-full mb-4">
            {article.category}
          </span>
        )}

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-2 text-muted-foreground mb-8">
          <Calendar className="w-5 h-5" />
          {formatDate(article.date)}
        </div>

        {article.image_url && (
          <div className="aspect-video bg-brand-light-blue overflow-hidden rounded-xl mb-8">
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/news">
            <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к новостям
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
