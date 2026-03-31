'use client'

import { useState } from 'react'

// 카테고리 추가 모달 컴포넌트
export default function CategoryManager({ onClose, onAdded }) {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [color, setColor] = useState('#6B7280')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 이름 입력 시 슬러그 자동 생성
  function handleNameChange(value) {
    setName(value)
    setSlug(
      value
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !slug.trim()) {
      setError('이름과 슬러그를 입력해 주세요.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), slug: slug.trim(), color }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? '카테고리 추가 실패')
      }
      onAdded?.()
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'

  return (
    <div
      className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm z-50"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-gray-900 mb-4">카테고리 추가</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">이름</label>
            <input
              className={inputClass}
              placeholder="예: AI 연구"
              value={name}
              onChange={e => handleNameChange(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">슬러그</label>
            <input
              className={inputClass}
              placeholder="예: ai-research"
              value={slug}
              onChange={e => setSlug(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">색상</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={e => setColor(e.target.value)}
                className="w-9 h-9 rounded cursor-pointer border border-gray-200"
              />
              <span className="text-sm text-gray-500">{color}</span>
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
