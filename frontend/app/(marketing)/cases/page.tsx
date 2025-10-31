import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, Clock, Package, MapPin } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';
import { notFound } from "next/navigation";

type CaseRow = {
  id: number | string;
  slug: string;
  title: string;
  image?: string | null;
  image_url?: string | null;
  industry?: string | null;
  direction?: string | null;
  client?: string | null;
  results?: {
    savings?: string | null;
    time?: string | null;
    volume?: string | null;
  };
  results_savings?: string | null;
  results_time?: string | null;
  results_volume?: string | null;
};

export default async function CasesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/api/cases`, { cache: 'no-store' });
  if (!res.ok) {
    notFound();
  }
  const cases: CaseRow[] = await res.json();

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Кейсы и истории успеха
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Реальные примеры работы с клиентами и достигнутые результаты в международной логистике
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {cases.map((c) => {
            const image = c.image ?? c.image_url ?? undefined;
            const savings = c.results?.savings ?? c.results_savings ?? undefined;
            const time = c.results?.time ?? c.results_time ?? undefined;
            const volume = c.results?.volume ?? c.results_volume ?? undefined;
            return (
              <Link key={String(c.id)} href={`/cases/${c.slug}`}>
                <Card className="group h-full hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-2 hover:border-brand-red/50">
                  {image && (
                    <div className="relative aspect-video bg-gradient-to-br from-brand-blue/20 to-brand-light-blue overflow-hidden">
                      <Image
                        src={image}
                        alt={c.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {c.industry && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand-blue">
                          {c.industry}
                        </div>
                      )}
                    </div>
                  )}

                  <CardContent className="p-6">
                    {c.direction && (
                      <div className="flex items-center gap-2 text-sm text-brand-blue font-semibold mb-3">
                        <MapPin className="w-4 h-4" />
                        {c.direction}
                      </div>
                    )}

                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-brand-blue transition-colors">
                      {c.title}
                    </h3>

                    <div className="grid grid-cols-1 gap-3 mb-4">
                      {savings && (
                        <div className="flex items-start gap-2">
                          <TrendingDown className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-green-600">{savings}</div>
                            <div className="text-xs text-muted-foreground">экономия</div>
                          </div>
                        </div>
                      )}
                      {time && (
                        <div className="flex items-start gap-2">
                          <Clock className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-brand-blue">{time}</div>
                            <div className="text-xs text-muted-foreground">срок</div>
                          </div>
                        </div>
                      )}
                      {volume && (
                        <div className="flex items-start gap-2">
                          <Package className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-brand-red">{volume}</div>
                            <div className="text-xs text-muted-foreground">объем</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {c.client && (
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">Клиент: <span className="font-semibold text-foreground">{c.client}</span></p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}