import NewsCard from './NewsCard'

// 뉴스 카드 그리드 컴포넌트
export default function NewsGrid({ articles }) {
  if (!articles?.length) {
    return (
      <div className="text-center py-16 text-gray-500">
        뉴스가 없습니다. 뉴스 가져오기 버튼을 클릭하세요.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map(article => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}
