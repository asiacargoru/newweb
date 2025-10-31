'use client'

import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingDown, Clock, Package, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  client: string;
  direction: string;
  industry: string;
  savings: string | null;
  time: string | null;
  volume: string | null;
}

const CaseShowcaseDynamic = () => {
  const [featuredCases, setFeaturedCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cases')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setFeaturedCases(Array.isArray(data) ? data.slice(0, 3) : []);
      })
      .catch(err => {
        console.error('Failed to load cases:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4 text-center">
          Загрузка кейсов...
        </div>
      </section>
    );
  }

  if (featuredCases.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Реальные кейсы наших клиентов
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Узнайте как мы помогли бизнесу сэкономить время и деньги на международной логистике
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-8">
          {featuredCases.map((caseStudy) => (
            <Link key={caseStudy.id} href={`/cases/${caseStudy.slug}`}>
              <Card className="group h-full hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 hover:border-red-500">
                <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-50 overflow-hidden">
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-semibold text-blue-600">
                    {caseStudy.industry}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold mb-3">
                    <MapPin className="w-4 h-4" />
                    {caseStudy.direction}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-blue-600 transition-colors line-clamp-2">
                    {caseStudy.title}
                  </h3>

                  <div className="grid grid-cols-1 gap-3 mb-4">
                    {caseStudy.savings && (
                      <div className="flex items-start gap-2">
                        <TrendingDown className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-green-600">{caseStudy.savings}</div>
                          <div className="text-xs text-muted-foreground">экономия средств</div>
                        </div>
                      </div>
                    )}
                    
                    {caseStudy.time && (
                      <div className="flex items-start gap-2">
                        <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-blue-600">{caseStudy.time}</div>
                          <div className="text-xs text-muted-foreground">срок доставки</div>
                        </div>
                      </div>
                    )}
                    
                    {caseStudy.volume && (
                      <div className="flex items-start gap-2">
                        <Package className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-red-600">{caseStudy.volume}</div>
                          <div className="text-xs text-muted-foreground">объем груза</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Клиент:</p>
                    <p className="font-semibold text-foreground">{caseStudy.client}</p>
                  </div>

                  <div className="mt-4 text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Подробнее о кейсе
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/cases">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-12">
              Смотреть все кейсы
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseShowcaseDynamic;
