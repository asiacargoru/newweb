'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface NewsItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  published: boolean;
  created_at: string;
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const response = await fetch('/api/admin/news');
      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Failed to load news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить эту новость?')) return;

    try {
      await fetch(`/api/admin/news/${id}`, {
        method: 'DELETE',
      });
      loadNews();
    } catch (error) {
      alert('Ошибка удаления');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Новости</h1>
        <Button
          onClick={() => router.push('/admin/generate')}
          className="!bg-brand-blue"
        >
          <Plus className="w-4 h-4 mr-2" />
          Создать новость
        </Button>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    {item.published ? (
                      <Badge className="bg-green-100 text-green-800">
                        Опубликовано
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Черновик</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.category} • {formatDate(item.created_at)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    URL: /news/{item.slug}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/news/${item.id}/edit`)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {news.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-4">Новостей пока нет</p>
              <Button onClick={() => router.push('/admin/generate')}>
                Создать первую новость
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
