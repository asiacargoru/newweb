'use client'

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Newspaper, Briefcase, Users, TrendingUp } from 'lucide-react';

interface Stats {
  newsCount: number;
  casesCount: number;
  leadsCount: number;
  publishedNews: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    newsCount: 0,
    casesCount: 0,
    leadsCount: 0,
    publishedNews: 0,
  });

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Дашборд</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Всего новостей
            </CardTitle>
            <Newspaper className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newsCount}</div>
            <p className="text-xs text-muted-foreground">
              Опубликовано: {stats.publishedNews}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Кейсов
            </CardTitle>
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.casesCount}</div>
            <p className="text-xs text-muted-foreground">
              Всего кейсов
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Заявок
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.leadsCount}</div>
            <p className="text-xs text-muted-foreground">
              За все время
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Активность
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+12%</div>
            <p className="text-xs text-muted-foreground">
              За последний месяц
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Быстрые действия</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/admin/generate" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">🤖 Сгенерировать статью</h3>
                <p className="text-sm text-muted-foreground">
                  Создать новую статью с помощью AI
                </p>
              </CardContent>
            </Card>
          </a>

          <a href="/admin/news" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">📰 Управление новостями</h3>
                <p className="text-sm text-muted-foreground">
                  Редактировать и публиковать новости
                </p>
              </CardContent>
            </Card>
          </a>

          <a href="/admin/leads" className="block">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">📋 Посмотреть заявки</h3>
                <p className="text-sm text-muted-foreground">
                  Новые заявки от клиентов
                </p>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>
    </div>
  );
}
