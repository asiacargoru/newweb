import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get('country');

  // Временные данные - потом подключи БД
  const services: Record<string, any[]> = {
    china: [
      { id: 1, name: 'Доставка по воздуху', description: '3-5 дней' },
      { id: 2, name: 'Доставка по морю', description: '15-21 день' },
      { id: 3, name: 'Таможенное оформление', description: 'Полный спектр' },
    ],
    turkey: [
      { id: 1, name: 'Доставка по дороге', description: '5-7 дней' },
      { id: 2, name: 'Складские услуги', description: 'В Турции и России' },
      { id: 3, name: 'Упаковка и маркировка', description: 'Профессиональная' },
    ],
    korea: [
      { id: 1, name: 'Авиадоставка', description: '4-6 дней' },
      { id: 2, name: 'Консолидация груза', description: 'Экономия 20%' },
      { id: 3, name: 'Страховка груза', description: '100% защита' },
    ],
  };

  return NextResponse.json(services[country as string] || []);
}
