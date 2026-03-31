// 개별 뉴스 카드 컴포넌트
export default function NewsCard({ article, category }) {
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

  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden">
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
            <span className="text-xs text-gray-400">{article.sourceName}</span>
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

        {/* 날짜 + 원문 링크 */}
        <div className="flex items-center justify-between pt-1">
          {dateLabel ? (
            <time className="text-xs text-gray-400">{dateLabel}</time>
          ) : (
            <span />
          )}
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
        </div>
      </div>
    </article>
  )
}
