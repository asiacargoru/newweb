'use client';

import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/sections/home/ContactModal";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
          <Link href="/" className="flex flex-col items-center gap-1">
  <Image 
    src="/logo.webp" 
    alt="Азия Транс Карго" 
    width={100} 
    height={100}
    className="h-auto w-auto"
  />
 </Link>


            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-foreground hover:text-brand-blue transition-colors">
                Главная
              </Link>
              
              <Link href="/contacts" className="text-foreground hover:text-brand-blue transition-colors">
                Контакты
              </Link>
            </nav>

            {/* Contact Info & CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                <a href="tel:+74993254994" className="flex items-center gap-2 text-brand-blue font-semibold hover:text-brand-red transition-colors">
                  <Phone className="w-4 h-4" />
                  +7 (499) 325-49-94
                </a>
          
              </div>
              
              <Button 
                onClick={() => setModalOpen(true)}
                className="!bg-brand-red hover:!bg-brand-red/90 text-white"
              >
                Получить расчет
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-brand-blue transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border">
              <nav className="flex flex-col gap-4">
                <Link 
                  href="/" 
                  className="text-foreground hover:text-brand-blue transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Главная
                </Link>
                <Link 
                  href="/about" 
                  className="text-foreground hover:text-brand-blue transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  О Компании
                </Link>
                <Link 
                  href="/services" 
                  className="text-foreground hover:text-brand-blue transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Услуги
                </Link>
                <Link 
                  href="/about" 
                  className="text-foreground hover:text-brand-blue transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  О нас
                </Link>
                <Link href="/news" className="text-foreground hover:text-brand-blue transition-colors">
  Новости
</Link>
                <Link 
                  href="/contacts" 
                  className="text-foreground hover:text-brand-blue transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Контакты
                </Link>
                
                <div className="pt-4 border-t border-border">
                  <a href="tel:+74993254994" className="flex items-center gap-2 text-brand-blue font-semibold py-2">
                    <Phone className="w-4 h-4" />
                    +7 (499) 325-49-94
                  </a>
                  <a href="mailto:info@asiacargo.ru" className="flex items-center gap-2 text-muted-foreground py-2">
                    <Mail className="w-4 h-4" />
                    info@asiacargo.ru
                  </a>
                </div>

                <Button 
                  onClick={() => {
                    setModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="!bg-brand-red hover:!bg-brand-red/90 text-white mt-2"
                >
                  Получить расчет
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Modal */}
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
};

export default Header;
