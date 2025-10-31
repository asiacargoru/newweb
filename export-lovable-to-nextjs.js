require('dotenv').config({ path: './backend/.env' }); // Используем backend настройки
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false
});

async function exportToNextJS() {
  try {
    // Получаем все компоненты из базы
    const result = await pool.query('SELECT * FROM components ORDER BY created_at');
    const components = result.rows;
    
    console.log(`📦 Найдено ${components.length} компонентов\n`);
    
    const targetDir = path.join(__dirname, 'frontend', 'components', 'lovable');
    
    // Создаём папку
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Экспортируем каждый компонент
    for (const comp of components) {
      let code = comp.code_jsx;
      
      // Добавляем 'use client' если есть хуки
      if (code.includes('useState') || code.includes('useEffect') || code.includes('onClick')) {
        if (!code.includes('use client')) {
          code = `'use client';\n\n${code}`;
        }
      }
      
      // Заменяем react-router-dom на next/link
      code = code.replace(/from ['"]react-router-dom['"]/g, 'from "next/link"');
      code = code.replace(/<Link to=/g, '<Link href=');
      
      // Заменяем img на Next Image (опционально, можно позже)
      // code = code.replace(/<img /g, '<Image ');
      
      const fileName = `${comp.name}.tsx`;
      const filePath = path.join(targetDir, fileName);
      
      fs.writeFileSync(filePath, code, 'utf-8');
      console.log(`✅ Экспортирован: ${fileName}`);
    }
    
    // Создаём index файл
    const indexContent = components
      .map(c => `export { default as ${c.name} } from './${c.name}';`)
      .join('\n');
    
    fs.writeFileSync(
      path.join(targetDir, 'index.ts'),
      indexContent,
      'utf-8'
    );
    
    console.log('\n🎉 Экспорт завершён!');
    console.log(`📂 Компоненты: ${targetDir}`);
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    await pool.end();
  }
}

exportToNextJS();
