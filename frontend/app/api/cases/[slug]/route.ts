import { NextResponse } from 'next/server';
import db from '@/lib/db';

// GET /api/cases/[slug] — один кейс по slug из БД
export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const result = await db.query(
      `SELECT * FROM cases WHERE slug = $1 AND published = true LIMIT 1`,
      [params.slug]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}