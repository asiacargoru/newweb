const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const db = require('../db'); // ваш PostgreSQL

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Генерация новости (ТОЛЬКО НА СЕРВЕРЕ)
router.post('/generate-news', async (req, res) => {
  try {
    const { topic, keywords, category } = req.body;
    
    // OpenAI запрос идет С СЕРВЕРА, не из браузера
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{
        role: 'user',
        content: `Напиши SEO-статью для логистической компании на тему: "${topic}". 
        Ключевые слова: ${keywords.join(', ')}. 
        Формат JSON: {"title": "...", "excerpt": "...", "content": "<p>...</p>"}`
      }],
      response_format: { type: 'json_object' },
    });

    const article = JSON.parse(completion.choices[0].message.content);
    const slug = transliterate(article.title);

    // Сохраняем в ВАШУ PostgreSQL
    const result = await db.query(
      `INSERT INTO news (slug, title, excerpt, content, category, published) 
       VALUES ($1, $2, $3, $4, $5, false) 
       RETURNING *`,
      [slug, article.title, article.excerpt, article.content, category]
    );

    res.json({ success: true, article: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка генерации' });
  }
});

// Получение новостей для фронтенда
router.get('/news', async (req, res) => {
  const result = await db.query(
    'SELECT * FROM news WHERE published = true ORDER BY date DESC'
  );
  res.json(result.rows);
});

// Сохранение лида из формы
router.post('/lead', async (req, res) => {
  const { name, phone, email, country, cargo } = req.body;
  
  // Сохраняем в ВАШУ БД (данные не покидают Россию)
  await db.query(
    'INSERT INTO leads (name, phone, email, country, cargo) VALUES ($1, $2, $3, $4, $5)',
    [name, phone, email, country, cargo]
  );
  
  // Отправка в Bitrix (российский сервис)
  await fetch('https://asia-trans-cargo.bitrix24.ru/rest/...', {
    method: 'POST',
    body: JSON.stringify({ /* ... */ })
  });
  
  res.json({ success: true });
});

module.exports = router;
