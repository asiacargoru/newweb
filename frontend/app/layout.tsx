// app/layout.tsx
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ConsentBanner from '@/components/shared/ConsentBanner';
// import YandexMetrika from '@/components/shared/YandexMetrika';
// import { Toaster } from 'sonner';

export const metadata = {
  title: 'Азия Транс Карго',
  description: 'Грузоперевозки из стран Азии',
  icons: {
  icon: '/favicon.png', 
  },
};

export const viewport = {
  themeColor: '#1E3A8A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Header />
        {children}
        <Footer />
        <ConsentBanner />
        {/** <YandexMetrika /> */}
        {/** <Toaster richColors /> */}
      </body>
    </html>
  );
}
