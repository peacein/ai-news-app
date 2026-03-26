'use client'

// 카테고리 관리 모달 컴포넌트
export default function CategoryManager({ categories, onClose, onUpdate }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">카테고리 관리</h2>
        {/* TODO: 카테고리 추가/수정/삭제 UI */}
        <button onClick={onClose} className="mt-4 px-4 py-2 text-gray-600 hover:text-gray-800">
          닫기
        </button>
      </div>
    </div>
  )
}
