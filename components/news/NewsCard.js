// 개별 뉴스 카드 컴포넌트
export default function NewsCard({ article }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* TODO: 뉴스 카드 UI 구현 */}
      <p>{article?.translatedTitle}</p>
    </div>
  )
}
