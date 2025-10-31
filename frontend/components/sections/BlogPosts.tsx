import Link from 'next/link';
import type { ArticleOut } from '@/lib/api';

type Props = {
  title?: string;
  articles: ArticleOut[];
};

export default function BlogPosts({ title = 'Полезные статьи', articles }: Props) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground mt-2">Подборка материалов по доставке и логистике</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article key={article.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </h3>
                {article.seo_description ? (
                  <p className="text-muted-foreground text-sm line-clamp-3">{article.seo_description}</p>
                ) : null}
                <div className="mt-4 text-xs text-muted-foreground">
                  {article.published_at ? new Date(article.published_at).toLocaleDateString('ru-RU') : ''}
                </div>
                <div className="mt-4">
                  <Link href={`/blog/${article.slug}`} className="text-accent font-medium hover:underline">
                    Читать статью →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}