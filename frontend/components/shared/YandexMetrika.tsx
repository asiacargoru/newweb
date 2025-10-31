/**
 * Яндекс.Метрика: подключается только после согласия пользователя.
 * Идентификатор счётчика берётся из NEXT_PUBLIC_YM_ID.
 */
'use client';

import { useEffect } from 'react';

export default function YandexMetrika() {
  useEffect(() => {
    const consentRaw = typeof window !== 'undefined' ? localStorage.getItem('atc_consent') : null;
    let isAccepted = false;
    try { isAccepted = !!(consentRaw && JSON.parse(consentRaw).accepted); } catch {}
    const id = process.env.NEXT_PUBLIC_YM_ID;
    if (!isAccepted || !id) return;

    if (document.getElementById('ym-external')) return;

    const external = document.createElement('script');
    external.id = 'ym-external';
    external.async = true;
    external.src = 'https://mc.yandex.ru/metrika/tag.js';
    external.onload = () => {
      // @ts-ignore
      if (typeof window !== 'undefined' && typeof (window as any).ym === 'function') {
        // @ts-ignore
        (window as any).ym(Number(id), 'init', { clickmap:true, trackLinks:true, accurateTrackBounce:true });
      }
    };
    document.head.appendChild(external);

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${id}" style="position:absolute; left:-9999px;" alt="" /></div>`;
    document.body.appendChild(noscript);
  }, []);

  return null;
}