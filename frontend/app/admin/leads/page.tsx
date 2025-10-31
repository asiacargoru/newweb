'use client'

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, Package, MapPin, Calendar } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  country: string;
  cargo: string;
  created_at: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const response = await fetch('/api/admin/leads');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Failed to load leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCountryName = (countryId: string) => {
    const countries: Record<string, string> = {
      '1456': 'Китай',
      '686': 'Турция',
      '518': 'ОАЭ',
      '1588': 'Индия',
      '538': 'Япония',
      '2006': 'Таиланд',
      '1578': 'Бангладеш',
      '516': 'Вьетнам',
      '520': 'Иран',
      '1406': 'Корея',
      '2018': 'Малайзия',
      '1568': 'Филиппины',
      '526': 'Индонезия',
      '532': 'Мьянма',
      '536': 'Тайвань',
      '530': 'Австралия',
      '524': 'Новая Зеландия',
      '2020': 'Египет',
      '2022': 'Сербия',
    };
    return countries[countryId] || countryId;
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Заявки</h1>
        <p className="text-muted-foreground">
          Всего заявок: {leads.length}
        </p>
      </div>

      <div className="space-y-4">
        {leads.map((lead) => (
          <Card key={lead.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{lead.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {formatDate(lead.created_at)}
                  </div>
                </div>
                <Badge>Новая</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-blue" />
                  <div>
                    <div className="text-xs text-muted-foreground">Телефон</div>
                    <a href={`tel:${lead.phone}`} className="font-medium hover:text-brand-blue">
                      {lead.phone}
                    </a>
                  </div>
                </div>

                {lead.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-brand-blue" />
                    <div>
                      <div className="text-xs text-muted-foreground">Email</div>
                      <a href={`mailto:${lead.email}`} className="font-medium hover:text-brand-blue">
                        {lead.email}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-brand-blue" />
                  <div>
                    <div className="text-xs text-muted-foreground">Страна</div>
                    <div className="font-medium">{getCountryName(lead.country)}</div>
                  </div>
                </div>

                {lead.cargo && (
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-brand-blue" />
                    <div>
                      <div className="text-xs text-muted-foreground">Груз</div>
                      <div className="font-medium">{lead.cargo}</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {leads.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">Заявок пока нет</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
