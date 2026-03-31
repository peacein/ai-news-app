'use client'

// 카테고리 필터 탭 컴포넌트
export default function CategoryFilter({ categories, activeCategory, onSelect, onAddClick }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* 전체 탭 */}
      <button
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          !activeCategory
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onSelect(null)}
      >
        전체
      </button>

      {/* 카테고리 탭 */}
      {categories?.map(category => {
        const isActive = activeCategory === category.id
        return (
          <button
            key={category.id}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              isActive ? 'ring-2 ring-offset-1' : ''
            }`}
            style={{
              backgroundColor: `${category.color}20`,
              color: category.color,
              ...(isActive ? { ringColor: category.color } : {}),
            }}
            onClick={() => onSelect(category.id)}
          >
            {category.name}
          </button>
        )
      })}

      {/* 카테고리 추가 버튼 */}
      <button
        onClick={onAddClick}
        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-gray-400 border border-dashed border-gray-300 hover:text-blue-600 hover:border-blue-400 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        카테고리 추가
      </button>
    </div>
  )
}
