import { notFound } from 'next/navigation';
import { ArrowLeft, TrendingDown, Clock, Package, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type CaseRow = {
  id: number | string;
  slug: string;
  title: string;
  image?: string | null;
  image_url?: string | null;
  industry?: string | null;
  direction?: string | null;
  client?: string | null;
  challenge?: string | null;
  solution?: string | null;
  results?: {
    savings?: string | null;
    time?: string | null;
    volume?: string | null;
    other?: string | null;
  };
  results_savings?: string | null;
  results_time?: string | null;
  results_volume?: string | null;
  results_other?: string | null;
};

export default async function CasePage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/api/cases/${params.slug}`, { cache: 'no-store' });
  if (res.status === 404) {
    notFound();
  }
  if (!res.ok) {
    notFound();
  }
  const caseStudy: CaseRow = await res.json();

  const image = caseStudy.image ?? caseStudy.image_url ?? undefined;
  const savings = caseStudy.results?.savings ?? caseStudy.results_savings ?? undefined;
  const time = caseStudy.results?.time ?? caseStudy.results_time ?? undefined;
  const volume = caseStudy.results?.volume ?? caseStudy.results_volume ?? undefined;
  const other = caseStudy.results?.other ?? caseStudy.results_other ?? undefined;

  return (
    <div className="min-h-screen bg-background pt-24">
      <article className="container mx-auto px-4 py-16 max-w-5xl">
        <Link href="/cases">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к кейсам
          </Button>
        </Link>

        <div className="mb-8">
          {caseStudy.industry && (
            <span className="inline-block px-4 py-2 bg-brand-blue/10 text-brand-blue text-sm font-semibold rounded-full mb-4">
              {caseStudy.industry}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {caseStudy.title}
          </h1>

          {caseStudy.direction && (
            <div className="flex items-center gap-2 text-lg text-brand-blue font-semibold">
              <MapPin className="w-5 h-5" />
              {caseStudy.direction}
            </div>
          )}
        </div>

        {image && (
          <div className="aspect-video bg-gradient-to-br from-brand-blue/20 to-brand-light-blue overflow-hidden rounded-xl mb-12">
            <img
              src={image}
              alt={caseStudy.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {savings && (
            <Card className="border-2 border-green-100">
              <CardContent className="p-6 text-center">
                <TrendingDown className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {savings}
                </div>
                <div className="text-sm text-muted-foreground">экономия средств</div>
              </CardContent>
            </Card>
          )}

          {time && (
            <Card className="border-2 border-brand-light-blue">
              <CardContent className="p-6 text-center">
                <Clock className="w-12 h-12 text-brand-blue mx-auto mb-3" />
                <div className="text-3xl font-bold text-brand-blue mb-2">
                  {time}
                </div>
                <div className="text-sm text-muted-foreground">срок доставки</div>
              </CardContent>
            </Card>
          )}

          {volume && (
            <Card className="border-2 border-red-100">
              <CardContent className="p-6 text-center">
                <Package className="w-12 h-12 text-brand-red mx-auto mb-3" />
                <div className="text-3xl font-bold text-brand-red mb-2">
                  {volume}
                </div>
                <div className="text-sm text-muted-foreground">объем груза</div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <h2 className="text-2xl font-bold mb-4">Клиент</h2>
          <p className="text-lg mb-8">{caseStudy.client}</p>

          <h2 className="text-2xl font-bold mb-4">Задача</h2>
          <p className="text-lg mb-8">{caseStudy.challenge}</p>

          <h2 className="text-2xl font-bold mb-4">Решение</h2>
          <p className="text-lg mb-8">{caseStudy.solution}</p>

          {other && (
            <>
              <h2 className="text-2xl font-bold mb-4">Дополнительно</h2>
              <div className="flex items-start gap-3 bg-brand-light-blue/30 p-6 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-brand-blue flex-shrink-0 mt-1" />
                <p className="text-lg">{other}</p>
              </div>
            </>
          )}
        </div>

        <div className="pt-8 border-t border-border">
          <Link href="/cases">
            <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к кейсам
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}