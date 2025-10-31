import type { Metadata } from 'next';

const SITE_NAME = 'Азия Транс Карго';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export function canonicalUrl(path = '/') {
  const base = SITE_URL.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export function baseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s — ${SITE_NAME}`,
    },
    description: 'Логистическая компания: услуги, перевозки, таможня',
    alternates: { canonical: canonicalUrl('/') },
    robots: { index: true, follow: true },
    themeColor: '#ffffff',
  };
}

export type OrganizationJsonLd = {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo?: string;
};

export function organizationJsonLd(): OrganizationJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: canonicalUrl('/logo.png'),
  };
}

export type ArticleJsonLd = {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  datePublished?: string;
  dateModified?: string;
  author?: { '@type': 'Person'; name: string } | { '@type': 'Organization'; name: string };
};

export function articleJsonLd(init: ArticleJsonLd): ArticleJsonLd {
  return init;
}