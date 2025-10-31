import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const countrySlug = searchParams.get('country');

  const result = await db.query(`
    SELECT 
      dt.slug,
      dt.name,
      dc.days_min,
      dc.days_max,
      dc.cost_per_kg,
      dc.details
    FROM delivery_content dc
    JOIN delivery_types dt ON dc.delivery_type_id = dt.id
    JOIN countries c ON dc.country_id = c.id
    WHERE c.slug = $1
  `, [countrySlug]);

  return NextResponse.json(result.rows);
}
