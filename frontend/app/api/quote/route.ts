/**
 * Next.js API route: /api/quote
 * Принимает POST-запрос и отправляет в backend (FastAPI).
 * Источник backend определяется приоритетно через BACKEND_URL.
 */
import { NextResponse } from 'next/server';

const BACKEND = (process.env.BACKEND_URL?.replace(/\/$/, '')
  || process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '')
  || 'http://127.0.0.1:8000');
const API_V1 = BACKEND.endsWith('/api/v1')
  ? BACKEND
  : BACKEND.endsWith('/api')
    ? `${BACKEND}/v1`
    : `${BACKEND}/api/v1`;

export async function POST(req: Request) {
  const data = await req.json();
  try {
    // Пока что отправляем на leads (есть в backend). Позже можно сменить на /quotes
    const res = await fetch(`${API_V1}/leads/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, source: 'quote' }),
    });
    const json = await res.json().catch(() => ({}));
    return NextResponse.json(json, { status: res.status });
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to calculate quote' }, { status: 500 });
  }
}