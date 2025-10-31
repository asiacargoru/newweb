'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function GeneratePage() {
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [category, setCategory] = useState('Новости компании');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    if (!topic) {
      toast.error('Укажите тему статьи');
      return;
    }

    setLoading(true);

    try {
      // 1. Генерация через AI
      const generateResponse = await fetch('/api/admin/generate/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          keywords: keywords.split(',').map(k => k.trim()).filter(Boolean),
          category,
        }),
      });

      const generatedArticle = await generateResponse.json();

      if (!generateResponse.ok) {
        throw new Error(generatedArticle.error || 'Ошибка генерации');
      }

      // 2. Сохранение в БД
      const saveResponse = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...generatedArticle,
          published: false,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error('Ошибка сохранения');
      }

      const savedArticle = await saveResponse.json();

      toast.success('Статья сгенерирована!');
      router.push(`/admin/news/${savedArticle.id}/edit`);

    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-brand-blue" />
            Генерация статьи через AI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="topic">Тема статьи *</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Новые маршруты доставки из Индии"
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              О чем будет статья? Будьте конкретны.
            </p>
          </div>

          <div>
            <Label htmlFor="keywords">Ключевые слова (через запятую)</Label>
            <Input
              id="keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="доставка из Индии, грузоперевозки, логистика"
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Для SEO оптимизации
            </p>
          </div>

          <div>
            <Label htmlFor="category">Категория</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Новости компании">Новости компании</SelectItem>
                <SelectItem value="Законодательство">Законодательство</SelectItem>
                <SelectItem value="Акции">Акции</SelectItem>
                <SelectItem value="Статьи">Статьи</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2 text-blue-900">
              💡 Советы для лучшего результата:
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Укажите конкретную тему, а не общую</li>
              <li>• Добавьте 3-5 ключевых слов</li>
              <li>• AI создаст SEO-оптимизированную статью</li>
              <li>• После генерации можно отредактировать</li>
            </ul>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading || !topic}
            className="w-full !bg-brand-blue"
            size="lg"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Генерация через AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Сгенерировать статью
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
