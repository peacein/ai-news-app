'use client'

import { useState, useEffect, useCallback } from 'react'
import CategoryFilter from '@/components/category/CategoryFilter'
import CategoryManager from '@/components/category/CategoryManager'
import FetchNewsButton from '@/components/news/FetchNewsButton'
import NewsGrid from '@/components/news/NewsGrid'

export default function DashboardPage() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [categoriesMap, setCategoriesMap] = useState({})
  const [activeCategory, setActiveCategory] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [loadingNews, setLoadingNews] = useState(true)

  // 카테고리 목록 조회
  const fetchCategories = useCallback(async () => {
    const res = await fetch('/api/categories')
    if (!res.ok) return
    const data = await res.json()
    setCategories(data)
    // id → category 객체 맵 생성
    const map = {}
    data.forEach(c => { map[c.id] = c })
    setCategoriesMap(map)
  }, [])

  // 뉴스 목록 조회
  const fetchNews = useCallback(async (categoryId) => {
    setLoadingNews(true)
    try {
      const url = categoryId ? `/api/news?categoryId=${categoryId}` : '/api/news'
      const res = await fetch(url)
      if (!res.ok) return
      const data = await res.json()
      // API 응답: leftJoin으로 { articles: {...}, categories: {...} } 배열 반환
      // articles 객체만 추출 (카테고리는 categoriesMap으로 별도 관리)
      setArticles(data.map(row => (row.articles ? row.articles : row)))
    } finally {
      setLoadingNews(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchNews(activeCategory)
  }, [activeCategory, fetchNews])

  function handleCategorySelect(id) {
    setActiveCategory(id)
  }

  function handleCategoryAdded() {
    fetchCategories()
  }

  function handleNewsFetched() {
    fetchNews(activeCategory)
  }

  return (
    <div>
      {/* 헤더 영역: 제목 + 뉴스 가져오기 버튼 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">AI 뉴스 대시보드</h1>
        <FetchNewsButton onFetched={handleNewsFetched} />
      </div>

      {/* 카테고리 바 */}
      <div className="mb-6">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={handleCategorySelect}
          onAddClick={() => setShowAddModal(true)}
        />
      </div>

      {/* 뉴스 그리드 */}
      {loadingNews ? (
        <div className="flex justify-center py-20">
          <div className="text-gray-400 text-sm">불러오는 중...</div>
        </div>
      ) : (
        <NewsGrid articles={articles} categoriesMap={categoriesMap} />
      )}

      {/* 카테고리 추가 모달 */}
      {showAddModal && (
        <CategoryManager
          onClose={() => setShowAddModal(false)}
          onAdded={handleCategoryAdded}
        />
      )}
    </div>
  )
}
