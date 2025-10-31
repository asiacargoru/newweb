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
        content,
        category,
        image_url,
        created_at as date,
        status
      FROM articles
      WHERE status = 'published'
      ORDER BY created_at DESC
      LIMIT 50
    `);

    const rows = result.rows || [];
    const mapped = rows.map((a: any) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      excerpt: typeof a.content === 'string'
        ? a.content.replace(/<[^>]*>/g, '').slice(0, 180)
        : '',
      category: a.category ?? null,
      image_url: a.image_url ?? null,
      date: a.date ?? new Date().toISOString(),
    }));

    return NextResponse.json(mapped, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error: any) {
    console.error('Database error (news):', error);
    return NextResponse.json([]);
  }
}
