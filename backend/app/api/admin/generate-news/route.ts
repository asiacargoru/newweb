import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Проксируем запрос на ВАШ backend
  // OpenAI запрос делается НА СЕРВЕРЕ, не в браузере
  const response = await fetch('http://localhost:3001/api/admin/generate-news', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  
  const data = await response.json();
  return NextResponse.json(data);
}
