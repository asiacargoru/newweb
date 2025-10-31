/*
 * API клиент для запросов к backend через переписанные маршруты /api/*.
 * База: NEXT_PUBLIC_API_BASE (по умолчанию '/api/v1').
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '/api/v1';

// Базовые типы (используются в старых компонентах)
export type Country = {
  id: string;
  code: string;
  name?: string; // совместимость со старыми компонентами
  flagEmoji?: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
};

export type Service = {
  id: string;
  name: string;
  mode?: string;
  description?: string;
  country_code?: string;
};

export type LeadPayload = {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  country_code?: string;
  service_id?: string;
};

// Новые типы, совпадающие с backend схемами
export type CountryOut = {
  id: string;
  code: string;
  name_ru: string;
  name_en: string;
  flag_emoji: string;
  is_active: boolean;
  seo_data: Record<string, unknown>;
  created_at: string;
  articles_count: number;
  services: Service[];
  seo?: {
    id: string;
    title?: string;
    description?: string;
    keywords?: string[];
  } | null;
};

export type ArticleOut = {
  id: string;
  slug: string;
  title: string;
  content: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords: string[];
  status: string;
  country_id?: string | null;
  auto_generated: boolean;
  views_count: number;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
};

export type PaginatedArticles = {
  items: ArticleOut[];
  total: number;
  limit: number;
  offset: number;
};

export type CaseStudyOut = {
  id: string;
  slug: string;
  title: string;
  content: string;
  client_name?: string | null;
  cargo_type?: string | null;
  delivery_time?: number | null;
  images: string[];
  country_id: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type PaginatedCaseStudies = {
  items: CaseStudyOut[];
  total: number;
  limit: number;
  offset: number;
};

async function apiFetch<T>(path: string, init: RequestInit & { retry?: number; fallback?: T } = {}): Promise<T> {
  const url = `${API_BASE}${path}`;
  const { retry = 1, fallback, ...rest } = init;

  const exec = async () => {
    const res = await fetch(url, {
      ...rest,
      headers: {
        'Content-Type': 'application/json',
        ...(rest.headers || {}),
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`API ${url} failed: ${res.status} ${res.statusText} ${text}`);
    }
    return res.json() as Promise<T>;
  };

  try {
    return await exec();
  } catch (e) {
    if (retry > 0) return await apiFetch<T>(path, { ...init, retry: retry - 1 });
    if (typeof fallback !== 'undefined') {
      console.warn('apiFetch fallback for', path, e);
      return fallback as T;
    }
    throw e as Error;
  }
}

// Старые хелперы (оставляем для совместимости)
export async function getCountries(): Promise<Country[]> {
  // Возвращаем упрощённые данные для старых компонентов
  const full = await apiFetch<CountryOut[]>(`/countries/`, { fallback: [] as CountryOut[] });
  return full.map((c) => ({ id: c.id, code: c.code, name: c.name_ru, flagEmoji: c.flag_emoji }));
}

export async function getArticles(limit = 3): Promise<Article[]> {
  const p = new URLSearchParams({ limit: String(limit) });
  const res = await apiFetch<PaginatedArticles>(`/articles/?${p.toString()}`, { fallback: { items: [], total: 0, limit, offset: 0 } as PaginatedArticles });
  return res.items.map((a) => ({ id: a.id, slug: a.slug, title: a.title, seo_title: a.seo_title, seo_description: a.seo_description, created_at: a.created_at }));
}

export async function getServicesByCountry(countryCode: string): Promise<Service[]> {
  return apiFetch<Service[]>(`/services/?country_code=${encodeURIComponent(countryCode)}`, { fallback: [] as Service[] });
}

export async function createLead(payload: LeadPayload): Promise<{ id: string } & Record<string, unknown>> {
  return apiFetch(`/leads`, { method: 'POST', body: JSON.stringify(payload) });
}

export async function createConsent(consent: { type: string; accepted: boolean; version?: string }): Promise<{ id: string } & Record<string, unknown>> {
  return apiFetch(`/consents`, { method: 'POST', body: JSON.stringify(consent) });
}

export async function checkConsent(consentId: string): Promise<{ valid: boolean } & Record<string, unknown>> {
  return apiFetch(`/consents/${encodeURIComponent(consentId)}`);
}

// Новые хелперы для страниц стран
export async function getCountry(code: string): Promise<CountryOut | null> {
  try {
    const c = await apiFetch<CountryOut>(`/countries/${encodeURIComponent(code)}`);
    return c;
  } catch (e) {
    console.warn('getCountry failed', e);
    return null;
  }
}

export async function getCountriesFull(): Promise<CountryOut[]> {
  return apiFetch<CountryOut[]>(`/countries/`, { fallback: [] as CountryOut[] });
}

export async function getPublishedArticlesByCountry(countryId: string, limit = 6): Promise<ArticleOut[]> {
  const p = new URLSearchParams({ status_filter: 'published', country_id: countryId, limit: String(limit) });
  const res = await apiFetch<PaginatedArticles>(`/articles/?${p.toString()}`, { fallback: { items: [], total: 0, limit, offset: 0 } as PaginatedArticles });
  return res.items;
}

export async function getPublishedCaseStudiesByCountry(countryId: string, limit = 6): Promise<CaseStudyOut[]> {
  const p = new URLSearchParams({ status_filter: 'published', country_id: countryId, limit: String(limit) });
  const res = await apiFetch<PaginatedCaseStudies>(`/case-studies/?${p.toString()}`, { fallback: { items: [], total: 0, limit, offset: 0 } as PaginatedCaseStudies });
  return res.items;
}

export async function getCaseStudy(slug: string): Promise<CaseStudyOut | null> {
  try {
    return await apiFetch<CaseStudyOut>(`/case-studies/${encodeURIComponent(slug)}`);
  } catch (e) {
    console.warn('getCaseStudy failed', e);
    return null;
  }
}