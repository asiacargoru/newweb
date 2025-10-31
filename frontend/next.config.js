/** @type {import('next').NextConfig} */
const BACKEND_ORIGIN = process.env.BACKEND_ORIGIN ?? 'http://127.0.0.1:8000';

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
  { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=(), interest-cohort=()' },
];

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: (() => {
      try {
        const u = new URL(BACKEND_ORIGIN);
        const backendPattern = {
          protocol: u.protocol.replace(':', ''),
          hostname: u.hostname,
          port: u.port || undefined,
          pathname: '/**',
        };
        return [
          backendPattern,
          { protocol: 'https', hostname: 'asiacargo.su', pathname: '/**' },
          { protocol: 'http', hostname: 'asiacargo.su', pathname: '/**' },
        ];
      } catch {
        return [
          { protocol: 'https', hostname: 'asiacargo.su', pathname: '/**' },
          { protocol: 'http', hostname: 'asiacargo.su', pathname: '/**' },
        ];
      }
    })(),
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Сохраняем локальные Next.js API роуты
        { source: '/api/auth/:path*', destination: '/api/auth/:path*' },
        { source: '/api/admin/:path*', destination: '/api/admin/:path*' },
        { source: '/api/news/:path*', destination: '/api/news/:path*' },
        { source: '/api/cases/:path*', destination: '/api/cases/:path*' },
        { source: '/api/lead', destination: '/api/lead' },
        { source: '/api/contact', destination: '/api/contact' },
        { source: '/api/quote', destination: '/api/quote' },
      ],
      afterFiles: [
        // Остальные API-запросы проксируем на backend origin
        { source: '/api/:path*', destination: `${BACKEND_ORIGIN}/api/:path*` },
      ],
    };
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
    ];
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

module.exports = nextConfig;