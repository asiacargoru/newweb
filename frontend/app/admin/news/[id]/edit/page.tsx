'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface NewsEditProps {
  params: {
    id: string;
  };
}

export default function NewsEditPage({ params }: NewsEditProps) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadNews();
  }, [params.id]);

  const loadNews = async () => {
    try {
      const response = await fetch(`/api/admin/news/${params.id}`);
      const data = await response.json();
      
      setTitle(data.title);
      setSlug(data.slug);
      setExcerpt(data.excerpt);
      setContent(data.content);
      setCategory(data.category || '');
      setImageUrl(data.image_url || '');
      setPublished(data.published);
    } catch (error) {
      toast.error('Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title || !slug || !excerpt || !content) {
      toast.error('Заполните обязательные поля');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/admin/news/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          category,
          imageUrl,
          published,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка сохранения');
      }

      toast.success('Новость сохранена!');
      router.push('/admin/news');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => router.push('/admin/news')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Назад к новостям
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Редактирование новости</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="title">Заголовок *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Заголовок новости"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="slug">URL (slug) *</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="novaya-novost"
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              URL: /news/{slug}
            </p>
          </div>

          <div>
            <Label htmlFor="excerpt">Краткое описание *</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Краткое описание для превью"
              rows={3}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {excerpt.length} символов (рекомендуется 140-160)
            </p>
          </div>

          <div>
            <Label htmlFor="content">Содержание *</Label>
            <div className="mt-2">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={{
                  toolbar: [
                    [{ 'header': [2, 3, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link'],
                    ['clean']
                  ],
                }}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Категория</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Новости компании">Новости компании</SelectItem>
                <SelectItem value="Законодательство">Законодательство</SelectItem>
                <SelectItem value="Акции">Акции</SelectItem>
                <SelectItem value="Статьи">Статьи</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="imageUrl">URL изображения</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="mt-2"
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="published" className="text-base">
                Опубликовать
              </Label>
              <p className="text-sm text-muted-foreground">
                Новость будет видна на сайте
              </p>
            </div>
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
            />
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="!bg-brand-blue"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Сохранение...' : 'Сохранить'}
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push('/admin/news')}
            >
              Отмена
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
