export type Country = {
  code: string;
  slug: string;        // ← для URL
  name: string;
  emoji: string;
  description: string;
  hero_title: string;
  hero_subtitle: string;
  seo_title: string;
  seo_description: string;
};

export const COUNTRIES: Record<string, Country> = {
  india: {
    code: 'IN',
    slug: 'india',
    name: 'Индия',
    emoji: '🇮🇳',
    description: 'Доставка товаров из Индии',
    hero_title: 'Логистика из Индии',
    hero_subtitle: 'Текстиль, специи, косметика и промышленные товары',
    seo_title: 'Доставка из Индии в Россию | Asia Trans Cargo',
    seo_description: 'Логистические услуги из Индии с таможенным оформлением.',
  },
  china: {
    code: 'CN',
    slug: 'china',
    name: 'Китай',
    emoji: '🇨🇳',
    description: 'Доставка товаров из Китая',
    hero_title: 'Логистика из Китая',
    hero_subtitle: 'Электроника, текстиль, оборудование',
    seo_title: 'Доставка из Китая в Россию | Asia Trans Cargo',
    seo_description: 'Профессиональная логистика из Китая.',
  },
  turkey: {
    code: 'TR',
    slug: 'turkey',
    name: 'Турция',
    emoji: '🇹🇷',
    description: 'Доставка товаров из Турции',
    hero_title: 'Логистика из Турции',
    hero_subtitle: 'Текстиль, мебель, косметика',
    seo_title: 'Доставка из Турции в Россию | Asia Trans Cargo',
    seo_description: 'Логистика из Турции для российских бизнесов.',
  },
  korea: {
    code: 'KR',
    slug: 'korea',
    name: 'Южная Корея',
    emoji: '🇰🇷',
    description: 'Доставка товаров из Кореи',
    hero_title: 'Логистика из Кореи',
    hero_subtitle: 'Электроника, косметика, гаджеты',
    seo_title: 'Доставка из Кореи в Россию | Asia Trans Cargo',
    seo_description: 'Прямая доставка из Южной Кореи.',
  },
};

export const COUNTRY_CODES = Object.keys(COUNTRIES);
