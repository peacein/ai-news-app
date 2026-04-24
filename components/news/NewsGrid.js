import NewsCard from './NewsCard';

const BTN_BASE =
  'px-3 py-1.5 rounded-lg text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

// 뉴스 카드 스켈레톤 (로딩 상태)
function NewsCardSkeleton() {
  return (
    <div
      role="status"
      aria-label="뉴스 카드 불러오는 중"
      className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden animate-pulse"
    >
      <div className="w-full aspect-video bg-gray-200" />
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between">
          <div className="h-4 w-16 bg-gray-200 rounded-full" />
          <div className="h-3 w-12 bg-gray-200 rounded" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-full bg-gray-200 rounded" />
          <div className="h-3 w-2/3 bg-gray-200 rounded" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

// 표시할 페이지 번호 목록 생성 (숫자 또는 '...')
function buildPageItems(page, totalPages) {
  const delta = 2; // 현재 페이지 앞뒤로 표시할 범위
  const items = [];
  const rangeStart = Math.max(2, page - delta);
  const rangeEnd = Math.min(totalPages - 1, page + delta);

  items.push(1);

  if (rangeStart > 2) items.push('...');

  for (let p = rangeStart; p <= rangeEnd; p++) items.push(p);

  if (rangeEnd < totalPages - 1) items.push('...');

  if (totalPages > 1) items.push(totalPages);

  return items;
}

// 뉴스 카드 그리드 컴포넌트
export default function NewsGrid({
  articles,
  categoriesMap,
  page,
  totalPages,
  onPageChange,
  onDelete,
  loading,
}) {
  // 로딩 중 표시할 스켈레톤 수: 이전 기사 수 기반, 최소 1개
  const skeletonCount = articles?.length ? Math.min(articles.length, 6) : 6;

  const pageItems = buildPageItems(page, totalPages);

  return (
    <div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        aria-busy={loading}
        aria-live="polite"
      >
        {loading
          ? Array.from({ length: skeletonCount }).map((_, i) => (
              <NewsCardSkeleton key={`skeleton-${i}`} />
            ))
          : articles?.length
            ? articles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  category={categoriesMap?.[article.categoryId]}
                  onDelete={onDelete}
                />
              ))
            : null}
      </div>

      {/* 빈 상태 */}
      {!loading && !articles?.length && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-gray-300 text-5xl mb-4">📭</div>
          <p className="text-gray-500 text-sm">아직 수집된 뉴스가 없습니다.</p>
          <p className="text-gray-400 text-xs mt-1">
            위의 버튼을 눌러 뉴스를 가져오세요.
          </p>
        </div>
      )}

      {/* 페이지네이션: 로딩 중에도 유지하되 비활성화 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => onPageChange(1)}
            disabled={loading || page === 1}
            className={BTN_BASE}
          >
            처음
          </button>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={loading || page === 1}
            className={BTN_BASE}
          >
            이전
          </button>

          {pageItems.map((item, i) =>
            item === '...' ? (
              <span
                key={`ellipsis-${i}`}
                className="px-1 text-sm text-gray-400 select-none"
              >
                ...
              </span>
            ) : (
              <button
                key={item}
                onClick={() => onPageChange(item)}
                disabled={loading}
                aria-current={item === page ? 'page' : undefined}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  item === page
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item}
              </button>
            )
          )}

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={loading || page === totalPages}
            className={BTN_BASE}
          >
            다음
          </button>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={loading || page === totalPages}
            className={BTN_BASE}
          >
            끝
          </button>
        </div>
      )}
    </div>
  );
}
