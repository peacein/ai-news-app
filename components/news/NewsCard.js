'use client'

import { useState } from 'react'

// 개별 뉴스 카드 컴포넌트
export default function NewsCard({ article, category, onDelete }) {
  const [saved, setSaved] = useState(!!article.notionPageId)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (deleting) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/news/${article.id}`, { method: 'DELETE' })
      if (res.ok) {
        onDelete?.(article.id)
      } else {
        console.error('삭제 실패:', res.status)
      }
    } catch (error) {
      console.error('삭제 요청 오류:', error)
    } finally {
      setDeleting(false)
    }
  }

  // publishedAt을 읽기 쉬운 날짜 문자열로 변환
  const dateLabel = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  // 카테고리 색상 기반 배지 인라인 스타일
  const badgeBg = category?.color ? `${category.color}20` : '#6B728020'
  const badgeColor = category?.color ?? '#6B7280'

  async function handleSaveToNotion() {
    if (saved || saving) return
    setSaving(true)
    try {
      const res = await fetch('/api/notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId: article.id }),
      })
      if (res.ok) {
        setSaved(true)
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <article className="relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
      {/* 삭제 버튼 */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-white/80 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
        title="삭제"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* 썸네일 */}
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.translatedTitle ?? article.originalTitle ?? ''}
          className="w-full aspect-video object-cover"
        />
      )}

      {/* 본문 */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* 카테고리 + 출처 */}
        <div className="flex items-center justify-between">
          {category ? (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: badgeBg, color: badgeColor }}
            >
              {category.name}
            </span>
          ) : (
            <span />
          )}
          {article.sourceName && (
            <span className="text-xs text-gray-400 pr-6">{article.sourceName}</span>
          )}
        </div>

        {/* 제목 */}
        <h2 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
          {article.translatedTitle ?? article.originalTitle}
        </h2>

        {/* 요약 */}
        {article.translatedSummary && (
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
            {article.translatedSummary}
          </p>
        )}

        {/* 날짜 + 원문 링크 + Notion 저장 */}
        <div className="flex items-center justify-between pt-1">
          {dateLabel ? (
            <time className="text-xs text-gray-400">{dateLabel}</time>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-2">
            {article.sourceUrl && (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                원문 보기
              </a>
            )}
            <button
              onClick={handleSaveToNotion}
              disabled={saved || saving}
              className={`text-xs transition-colors ${
                saved
                  ? 'text-green-600 cursor-default'
                  : saving
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
              title={saved ? 'Notion에 저장됨' : 'Notion에 저장'}
            >
              {saved ? '저장됨' : saving ? '저장 중...' : '뉴스 저장'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
