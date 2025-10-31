/**
 * Баннер согласия: уведомляет пользователя о политике cookie и ПДн.
 * Сохраняет согласие в localStorage. Можно расширить фиксацией на backend.
 */
'use client';

import { useEffect, useState } from 'react';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('atc_consent');
    setVisible(!consent);
  }, []);

  function accept() {
    localStorage.setItem('atc_consent', JSON.stringify({ accepted: true, ts: Date.now() }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 16, left: 16, right: 16,
      padding: 16, background: '#111', color: '#fff', borderRadius: 8,
      zIndex: 9999,
      boxShadow: '0 8px 24px rgba(0,0,0,0.35)'
    }}>
      <p>
        Мы используем cookie и обрабатываем персональные данные в соответствии с Политикой конфиденциальности.
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <a href="/(legal)/privacy" style={{ color: '#0bf' }}>Политика</a>
        <a href="/(legal)/cookie-policy" style={{ color: '#0bf' }}>Cookie</a>
        <button onClick={accept} style={{ marginLeft: 'auto' }}>Согласен</button>
      </div>
    </div>
  );
}