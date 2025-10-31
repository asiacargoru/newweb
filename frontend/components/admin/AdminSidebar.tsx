'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  Newspaper, 
  Briefcase, 
  Users, 
  LogOut,
  Sparkles 
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Дашборд', icon: LayoutDashboard },
    { href: '/admin/news', label: 'Новости', icon: Newspaper },
    { href: '/admin/cases', label: 'Кейсы', icon: Briefcase },
    { href: '/admin/leads', label: 'Заявки', icon: Users },
    { href: '/admin/generate', label: 'AI Генерация', icon: Sparkles },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-brand-blue text-white p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Админ-панель</h2>
        <p className="text-sm text-white/70">Азия Транс Карго</p>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-white/20'
                  : 'hover:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: '/admin/login' })}
        className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Выход
      </button>
    </div>
  );
}
