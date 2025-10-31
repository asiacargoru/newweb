'use client'

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image src="/images/hero-bg.jpg" alt="" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/85" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
              
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground leading-tight">
            Стройте карьеру<br />в <span className="text-accent">Азия Транс Карго</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Присоединяйтесь к команде профессионалов международной логистики. 
            Стабильность, развитие и достойная оплата труда.
          </p>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;