'use client';

import { Truck, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import FlagsCarousel from '@/components/layout/FlagsCarousel';
import FloatingContactMenu from '@/components/layout/FloatingContactMenu';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12">
          <FlagsCarousel />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex flex-col space-y-3">
                              
                {/* Название компании */}
                <div>
                  <div className="font-bold text-xl leading-tight mb-1">
                    Азия Транс Карго
                  </div>
                  {/* Слоган */}
                  <p className="text-sm text-primary-foreground/80">
                    Создаем маршруты. Доставляем результат
                  </p>
                </div>
                 {/* Social Media */}
              <div className="flex gap-3 mb-4">
                <a 
                  href="https://t.me/asiatranscargo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accent/90 transition-all hover:scale-110"
                  aria-label="Telegram"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </a>
                
                <a 
                  href="https://vk.com/asiatranscargo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:bg-accent/90 transition-all hover:scale-110"
                  aria-label="VK"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.25 14.14h-1.41c-.46 0-.6-.37-1.43-1.19-.72-.72-1.04-.82-1.22-.82-.25 0-.32.07-.32.41v1.09c0 .29-.09.46-1.01.46-1.5 0-3.16-.91-4.33-2.6-1.77-2.51-2.26-4.41-2.26-4.8 0-.18.07-.35.41-.35h1.41c.31 0 .43.14.55.48.62 1.77 1.67 3.32 2.1 3.32.16 0 .24-.07.24-.48v-1.86c-.06-.99-.58-1.08-.58-1.43 0-.15.13-.29.33-.29h2.21c.26 0 .36.14.36.45v2.51c0 .26.12.36.19.36.16 0 .29-.1.58-.39 1.04-1.17 1.79-2.97 1.79-2.97.1-.21.24-.35.55-.35h1.41c.34 0 .42.17.34.45-.16.71-1.84 3.58-1.84 3.58-.13.21-.18.3 0 .53.13.18.56.55.85.88.53.58 1.05 1.04 1.18 1.38.13.34-.07.51-.41.51z"/>
                  </svg>
                </a>
              </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Услуги
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById("countries")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Страны
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById("advantages")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Преимущества
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Контакты
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Морские перевозки</li>
                <li>Авиаперевозки</li>
                <li>Ж/Д перевозки</li>
                <li>Таможенное оформление</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              
             
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
                  <a href="tel:+74993254994" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    +7 (499) 325-49-94
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
                  <a href="mailto:info@asiacargo.ru" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors break-all">
                    info@asiacargo.ru
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
                  <span className="text-primary-foreground/80">
                    г. Москва<br />
                    ул. Горбунова 2c3, A-411
                  </span>
                </li>
              </ul>
              
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
            <p>&copy; {currentYear} Азия Транс Карго. Все права защищены.</p>
          </div>
        </div>
      </footer>
      
      {/* Floating Contact Menu - будет отображаться на всех страницах */}
      <FloatingContactMenu />
    </>
  );
};

export default Footer;
