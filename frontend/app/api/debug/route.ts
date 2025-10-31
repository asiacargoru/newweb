import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    console.log('🔍 Checking database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Not set');

    // Тест подключения
    const testQuery = await db.query('SELECT NOW()');
    console.log('✅ Database connection successful');

    // Проверяем таблицы
    const articlesCheck = await db.query(`
      SELECT COUNT(*) as count FROM articles WHERE status = 'published'
    `);
    console.log('📰 Articles:', articlesCheck.rows[0]);

    const casesCheck = await db.query(`
      SELECT COUNT(*) as count FROM case_studies WHERE status = 'published'
    `);
    console.log('📦 Cases:', casesCheck.rows[0]);

    // Получаем примеры
    const sampleArticles = await db.query(`
      SELECT id, title, slug FROM articles WHERE status = 'published' LIMIT 3
    `);
    
    const sampleCases = await db.query(`
      SELECT id, title, slug FROM case_studies WHERE status = 'published' LIMIT 3
    `);

    return NextResponse.json({
      status: 'success',
      database: 'connected',
      articles: {
        count: articlesCheck.rows[0]?.count || 0,
        samples: sampleArticles.rows
      },
      cases: {
        count: casesCheck.rows[0]?.count || 0,
        samples: sampleCases.rows
      }
    });

  } catch (error: any) {
    console.error('❌ Database error:', error.message);
    return NextResponse.json({
      status: 'error',
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
