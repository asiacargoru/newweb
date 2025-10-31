import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const revalidate = 60;

export async function GET() {
  try {
    const result = await db.query(`
      SELECT 
        id, 
        slug, 
        title, 
        client_name as client,
        country_id,
        cargo_type,
        delivery_time as time,
        images,
        created_at
      FROM case_studies
      WHERE status = 'published'
      ORDER BY created_at DESC
      LIMIT 50
    `);

    const rows = result.rows || [];
    const mapped = rows.map((c: any) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      client: c.client ?? 'Не указан',
      direction: c.country_id ?? 'Международная доставка',
      industry: c.cargo_type ?? 'Логистика',
      savings: null,
      time: c.time ? `${c.time} дней` : null,
      volume: null,
    }));

    return NextResponse.json(mapped, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error: any) {
    console.error('Database error (cases):', error);
    return NextResponse.json([]);
  }
}
