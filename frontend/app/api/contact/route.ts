/**
 * Next.js API route: /api/contact
 * Принимает POST с данными формы и проксирует в backend /api/v1/leads
 */
import { NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:8080/api';
const API_V1 = API_BASE.endsWith('/v1') ? API_BASE : `${API_BASE}/v1`;

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const res = await fetch(`${API_V1}/leads/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    return NextResponse.json(json, { status: res.status });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to submit lead' }, { status: 500 });
  }
}