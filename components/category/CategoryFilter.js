'use client'

// 카테고리 필터 버튼 컴포넌트
export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          !activeCategory ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        onClick={() => onSelect(null)}
      >
        전체
      </button>
      {categories?.map(category => (
        <button
          key={category.id}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            activeCategory === category.id
              ? 'text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={activeCategory === category.id ? { backgroundColor: category.color } : {}}
          onClick={() => onSelect(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
