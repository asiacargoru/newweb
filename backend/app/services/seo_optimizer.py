from typing import List, Dict, Any

try:
    import textstat  # оценка читаемости
except Exception:
    textstat = None


class SEOOptimizer:
    def analyze_keyword_density(self, content: str, keywords: List[str]) -> Dict[str, Any]:
        """Проверка плотности ключевых слов (оптимум 1-2%). Возвращает % по каждому слову."""
        total_words = max(len([w for w in content.split() if w.strip()]), 1)
        densities = {}
        lower_content = content.lower()
        for kw in keywords:
            kw_low = kw.lower()
            count = lower_content.count(kw_low)
            densities[kw] = round((count / total_words) * 100, 3)
        return {"total_words": total_words, "densities": densities, "recommended": "1-2%"}

    def check_readability(self, content: str) -> Dict[str, Any]:
        """Индекс читаемости (Flesch Reading Ease, если доступен textstat)."""
        if textstat is None:
            return {"flesch": None, "note": "textstat не установлен"}
        try:
            flesch = textstat.flesch_reading_ease(content)
        except Exception:
            flesch = None
        return {"flesch": flesch}

    def validate_structure(self, content: str) -> Dict[str, Any]:
        """Проверка структуры заголовков: наличие H1/H2/H3 или Markdown-эквивалентов."""
        lines = content.splitlines()
        h1 = sum(1 for l in lines if l.strip().startswith("# ") or l.strip().lower().startswith("<h1"))
        h2 = sum(1 for l in lines if l.strip().startswith("## ") or l.strip().lower().startswith("<h2"))
        h3 = sum(1 for l in lines if l.strip().startswith("### ") or l.strip().lower().startswith("<h3"))
        return {"h1": h1, "h2": h2, "h3": h3, "ok": h1 >= 1 and h2 >= 2}

    def generate_schema_markup(self, article: Dict[str, Any]) -> Dict[str, Any]:
        """Генерация Schema.org Article разметки."""
        return {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.get("title"),
            "datePublished": article.get("published_at"),
            "articleSection": [h for h in article.get("outline", [])],
            "keywords": ", ".join(article.get("keywords", [])),
        }