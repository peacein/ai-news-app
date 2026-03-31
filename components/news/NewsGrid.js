import NewsCard from './NewsCard'

// 뉴스 카드 그리드 컴포넌트
export default function NewsGrid({ articles, categoriesMap }) {
  if (!articles?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-gray-300 text-5xl mb-4">📭</div>
        <p className="text-gray-500 text-sm">아직 수집된 뉴스가 없습니다.</p>
        <p className="text-gray-400 text-xs mt-1">위의 버튼을 눌러 뉴스를 가져오세요.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {articles.map(article => (
        <NewsCard
          key={article.id}
          article={article}
          category={categoriesMap?.[article.categoryId]}
        />
      ))}
    </div>
  )
}
