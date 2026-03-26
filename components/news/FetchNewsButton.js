'use client'

// 뉴스 가져오기 버튼 컴포넌트
export default function FetchNewsButton({ onFetched }) {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      onClick={onFetched}
    >
      뉴스 가져오기
    </button>
  )
}
