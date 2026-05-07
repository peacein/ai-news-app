'use client';

import { useState } from 'react';

// 개별 뉴스 카드 컴포넌트
export default function NewsCard({ article, category, onDelete }) {
  const [saved, setSaved] = useState(!!article.notionPageId);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (deleting) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/news/${article.id}`, { method: 'DELETE' });
      if (res.ok) {
        onDelete?.(article.id);
      } else {
        console.error('삭제 실패:', res.status);
      }
    } catch (error) {
      console.error('삭제 요청 오류:', error);
    } finally {
      setDeleting(false);
    }
  }

  const dateLabel = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const accentColor = category?.color ?? '#94A3B8';

  async function handleSaveToNotion() {
    if (saved || saving) return;
    setSaving(true);
    try {
      const res = await fetch('/api/notion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId: article.id }),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <article
      className="news-card group relative bg-white dark:bg-gray-900 flex flex-col overflow-hidden"
      style={{ '--accent': accentColor }}
    >
      {/* 카테고리 컬러 액센트 바 */}
      <div className="accent-bar" />

      {/* 삭제 버튼 */}
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="delete-btn absolute top-3 right-3 z-10 w-6 h-6 flex items-center justify-center rounded-full"
        title="삭제"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* 썸네일 */}
      {article.imageUrl && (
        <div className="thumbnail-wrap overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.translatedTitle ?? article.originalTitle ?? ''}
            className="thumbnail w-full aspect-video object-cover"
          />
        </div>
      )}

      {/* 본문 */}
      <div className="p-5 flex flex-col flex-1 gap-0">
        {/* 상단 메타: 카테고리 + 출처 */}
        <div className="flex items-center justify-between mb-3">
          {category ? (
            <span
              className="category-badge text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm"
              style={{
                color: accentColor,
                backgroundColor: `${accentColor}14`,
              }}
            >
              {category.name}
            </span>
          ) : (
            <span />
          )}
          {article.sourceName && (
            <span className="text-[11px] text-gray-400 dark:text-gray-500 font-medium tracking-wide">
              {article.sourceName}
            </span>
          )}
        </div>

        {/* 제목 */}
        <h2 className="card-title text-[15px] font-bold text-gray-900 dark:text-gray-100 leading-[1.45] line-clamp-2 mb-3 tracking-tight">
          {article.translatedTitle ?? article.originalTitle}
        </h2>

        {/* 요약 */}
        {article.translatedSummary && (
          <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-[1.7] line-clamp-3 flex-1 mb-4">
            {article.translatedSummary}
          </p>
        )}

        {/* 구분선 */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-3 mt-auto flex items-center justify-between">
          {dateLabel ? (
            <time className="text-[11px] text-gray-400 dark:text-gray-500 tabular-nums">
              {dateLabel}
            </time>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-3">
            {article.sourceUrl && (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150"
              >
                원문 보기
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            <button
              onClick={handleSaveToNotion}
              disabled={saved || saving}
              className={`notion-btn inline-flex items-center gap-1 text-[11px] font-semibold transition-colors duration-150 ${
                saved
                  ? 'text-emerald-500 dark:text-emerald-400 cursor-default'
                  : saving
                    ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
              title={saved ? 'Notion에 저장됨' : 'Notion에 저장'}
            >
              {saved ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  저장됨
                </>
              ) : saving ? (
                '저장 중…'
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-70"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 9h1.5v6M13.5 9H15v3.5" />
                  </svg>
                  Notion 저장
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .news-card {
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          transition:
            box-shadow 0.22s ease,
            transform 0.22s ease,
            border-color 0.22s ease;
          box-shadow:
            0 1px 3px rgba(0, 0, 0, 0.06),
            0 1px 2px rgba(0, 0, 0, 0.04);
        }
        .news-card:hover {
          box-shadow:
            0 10px 32px rgba(0, 0, 0, 0.1),
            0 2px 8px rgba(0, 0, 0, 0.06);
          transform: translateY(-3px);
        }
        @media (prefers-color-scheme: dark) {
          .news-card {
            border-color: #1f2937;
            box-shadow:
              0 1px 3px rgba(0, 0, 0, 0.4),
              0 1px 2px rgba(0, 0, 0, 0.3);
          }
          .news-card:hover {
            box-shadow:
              0 10px 32px rgba(0, 0, 0, 0.5),
              0 2px 8px rgba(0, 0, 0, 0.4);
          }
        }

        /* 좌측 액센트 바 */
        .accent-bar {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background-color: var(--accent);
          border-radius: 12px 0 0 12px;
          transform: scaleY(0.4);
          transform-origin: center;
          transition:
            transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1),
            opacity 0.25s ease;
          opacity: 0.5;
        }
        .news-card:hover .accent-bar {
          transform: scaleY(1);
          opacity: 1;
        }

        /* 썸네일 확대 */
        .thumbnail {
          transition: transform 0.35s ease;
        }
        .news-card:hover .thumbnail {
          transform: scale(1.03);
        }

        /* 삭제 버튼: hover 시에만 표시 */
        .delete-btn {
          background: rgba(255, 255, 255, 0.9);
          color: #cbd5e1;
          opacity: 0;
          transition:
            opacity 0.15s ease,
            background 0.15s ease,
            color 0.15s ease;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
        }
        .news-card:hover .delete-btn {
          opacity: 1;
        }
        .delete-btn:hover {
          background: #fef2f2;
          color: #f87171;
        }
        .delete-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        @media (prefers-color-scheme: dark) {
          .delete-btn {
            background: rgba(31, 41, 55, 0.9);
            color: #6b7280;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
          }
          .delete-btn:hover {
            background: #450a0a;
            color: #fca5a5;
          }
        }

        /* 카테고리 뱃지 */
        .category-badge {
          letter-spacing: 0.08em;
        }

        /* 제목 hover 시 살짝 색상 강조 */
        .news-card:hover .card-title {
          color: #111827;
        }
        @media (prefers-color-scheme: dark) {
          .news-card:hover .card-title {
            color: #ffffff;
          }
        }
      `}</style>
    </article>
  );
}
