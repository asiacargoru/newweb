"use client";

import React, { useEffect, useRef, useState } from "react";

type Review = {
  author: string;
  text: string;
  rating: number;
  date?: string;
  avatar?: string;
};

const Star = ({ filled }: { filled: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#FC0" : "#E6E6E6"} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const ReviewCard = ({ review }: { review: Review }) => {
  const authorName = review.author || "Аноним";
  const reviewText = review.text || "";
  const reviewRating = review.rating || 5;
  const reviewDate = review.date || "";

  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    // Проверяем, выходит ли текст за высоту контейнера при line-clamp
    const clamped = el.scrollHeight > el.clientHeight + 1;
    setIsClamped(clamped);
  }, [reviewText, expanded]);

  const textStyle: any = {
    fontSize: "15px",
    fontWeight: 400,
    color: "#000000",
    lineHeight: "1.5",
    marginBottom: 0,
    display: expanded ? "block" : "-webkit-box",
    WebkitLineClamp: expanded ? "unset" : 8, // ограничиваем по высоте ~8 строк
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  };

  return (
    <div
      className="rounded-lg p-4 h-full flex flex-col gap-2"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E6E6E6",
        minHeight: "240px",
      }}
    >
      {/* Аватар + Имя */}
      <div className="flex items-start gap-3">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={authorName}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#1E3A8A",
              color: "#FFFFFF",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            {getInitials(authorName)}
          </div>
        )}
        <div>
          <h4
            style={{
              fontSize: "15px",
              fontWeight: 500,
              color: "#000000",
              marginBottom: "2px",
              lineHeight: "1.3",
            }}
          >
            {authorName}
          </h4>
             </div>
      </div>

      {/* Звезды + Дата */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} filled={i < Math.round(reviewRating)} />
          ))}
        </div>
        {reviewDate && (
          <span style={{ fontSize: "13px", color: "#999999" }}>{reviewDate}</span>
        )}
      </div>

      {/* Текст отзыва */}
      <div>
        <p ref={textRef} style={textStyle}>
          {reviewText}
        </p>
        {isClamped && (
          <button
            onClick={() => setExpanded((v) => !v)}
            style={{
              fontSize: "13px",
              color: "#0094FF",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              textDecoration: "none",
            }}
            className="hover:underline"
          >
            {expanded ? "Скрыть" : "ещё"}
          </button>
        )}
      </div>
    </div>
  );
};

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  
  const count = reviews?.length || 0;
  
  // Автопрокрутка каждые 3 секунды
  useEffect(() => {
    if (count <= 2 || isPaused) return; // Если отзывов 2 или меньше, не прокручивать
    
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, 3000); // 3 секунды
    
    return () => clearInterval(interval);
  }, [count, isPaused]);
  
  const items: Review[] = [];
  if (count > 0) {
    items.push(reviews[index % count]);
    if (count > 1) {
      items.push(reviews[(index + 1) % count]);
    }
  }

  const prev = () => {
    setIndex((i) => (i - 1 + count) % count);
    setIsPaused(true); // Останавливаем автопрокрутку при ручном переключении
    setTimeout(() => setIsPaused(false), 10000); // Возобновляем через 10 секунд
  };
  
  const next = () => {
    setIndex((i) => (i + 1) % count);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  // Текст теперь ограничивается по высоте через CSS line-clamp;
  // Лишняя логика обрезания по длине не нужна.

  return (
    <div className="relative h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full items-stretch">
        {items.map((review, idx) => (
          <ReviewCard key={`${index}-${idx}`} review={review} />
        ))}
      </div>

      {count > 2 && (
        <div className="flex gap-2 absolute -top-12 right-0">
          <button
            aria-label="Предыдущие отзывы"
            onClick={prev}
            className="hover:bg-gray-50 transition-colors"
            style={{ 
              width: 40, 
              height: 40, 
              borderRadius: "50%", 
              border: "1px solid #D4D4D4", 
              backgroundColor: "#FFFFFF", 
              color: "#000", 
              fontSize: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ‹
          </button>
          <button
            aria-label="Следующие отзывы"
            onClick={next}
            className="hover:bg-gray-50 transition-colors"
            style={{ 
              width: 40, 
              height: 40, 
              borderRadius: "50%", 
              border: "1px solid #D4D4D4", 
              backgroundColor: "#FFFFFF", 
              color: "#000", 
              fontSize: 20,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
