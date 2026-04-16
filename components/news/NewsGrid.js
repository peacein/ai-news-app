import NewsCard from './NewsCard'

// 표시할 페이지 번호 목록 생성 (숫자 또는 '...')
function buildPageItems(page, totalPages) {
  const delta = 2 // 현재 페이지 앞뒤로 표시할 범위
  const items = []
  const rangeStart = Math.max(2, page - delta)
  const rangeEnd = Math.min(totalPages - 1, page + delta)

  items.push(1)

  if (rangeStart > 2) items.push('...')

  for (let p = rangeStart; p <= rangeEnd; p++) items.push(p)

  if (rangeEnd < totalPages - 1) items.push('...')

  if (totalPages > 1) items.push(totalPages)

  return items
}

// 뉴스 카드 그리드 컴포넌트
export default function NewsGrid({ articles, categoriesMap, page, totalPages, onPageChange, onDelete }) {
  if (!articles?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-gray-300 text-5xl mb-4">📭</div>
        <p className="text-gray-500 text-sm">아직 수집된 뉴스가 없습니다.</p>
        <p className="text-gray-400 text-xs mt-1">위의 버튼을 눌러 뉴스를 가져오세요.</p>
      </div>
    )
  }

  const pageItems = buildPageItems(page, totalPages)
  const btnBase = 'px-3 py-1.5 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed'

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map(article => (
          <NewsCard
            key={article.id}
            article={article}
            category={categoriesMap?.[article.categoryId]}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button onClick={() => onPageChange(1)} disabled={page === 1} className={btnBase}>
            처음
          </button>
          <button onClick={() => onPageChange(page - 1)} disabled={page === 1} className={btnBase}>
            이전
          </button>

          {pageItems.map((item, i) =>
            item === '...' ? (
              <span key={`ellipsis-${i}`} className="px-1 text-sm text-gray-400 select-none">
                ...
              </span>
            ) : (
              <button
                key={item}
                onClick={() => onPageChange(item)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  item === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item}
              </button>
            )
          )}

          <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages} className={btnBase}>
            다음
          </button>
          <button onClick={() => onPageChange(totalPages)} disabled={page === totalPages} className={btnBase}>
            끝
          </button>
        </div>
      )}
    </div>
  )
}
