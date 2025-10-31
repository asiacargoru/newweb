'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ContactModal from '@/components/sections/home/ContactModal';

const ModalForm = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Нужна консультация?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Оставьте заявку и получите расчет стоимости доставки в течение 15 минут
          </p>

          {/* Контейнер с волнами */}
          <div className="relative inline-block">
            {/* Волны */}
            <span className="absolute inset-0 rounded-full animate-ping-slow bg-brand-red/30 scale-100" />
            <span className="absolute inset-0 rounded-full animate-ping-slower bg-brand-red/20 scale-75" />
            <span className="absolute inset-0 rounded-full animate-ping-slowest bg-brand-red/10 scale-50" />

            {/* Кнопка */}
            <Button
              size="lg"
              onClick={() => setModalOpen(true)}
              className="relative z-10 !bg-brand-red hover:!bg-brand-red/90 text-white font-semibold px-10 py-6 text-lg shadow-lg rounded-full"
            >
              Получить расчет
            </Button>
          </div>
        </div>
      </section>

      <ContactModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
};

export default ModalForm;
