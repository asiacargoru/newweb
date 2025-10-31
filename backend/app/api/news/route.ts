import { NextResponse } from 'next/server';

export async function GET() {
  // Вызываем ВАШ backend API (на том же сервере)
  const response = await fetch('http://localhost:3001/api/news');
  const data = await response.json();
  
  return NextResponse.json(data);
}
