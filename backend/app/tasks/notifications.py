"""
Celery-задачи уведомлений администраторов.
"""
from __future__ import annotations

from typing import Dict, Any
from celery import shared_task


@shared_task(name="notify_admins_new_lead")
def notify_admins_new_lead(lead_id: str, status: str, source: str, created_at: str) -> Dict[str, Any]:
    """Уведомляет админов о новом лиде (заглушка).
    В прод-версии: отправка письма/SMS/Slack.
    """
    # Здесь можно интегрировать email/Slack; сейчас просто возвращаем полезную нагрузку
    return {
        "type": "lead_new",
        "lead_id": lead_id,
        "status": status,
        "source": source,
        "created_at": created_at,
    }


# Новое уведомление для автогенерации статей
@shared_task(name="notify_admins_new_article_draft")
def notify_admins_new_article_draft(article_id: str, slug: str, title: str) -> Dict[str, Any]:
    """Уведомляет админов о новом автосгенерированном черновике статьи (заглушка)."""
    return {
        "type": "article_draft_new",
        "article_id": article_id,
        "slug": slug,
        "title": title,
    }