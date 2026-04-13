import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { articles, categories } from '@/lib/db/schema'
import { eq, desc, count, and, or, ilike } from 'drizzle-orm'

const PAGE_SIZE = 15

// GET /api/news - 뉴스 목록 조회 (페이지네이션, 카테고리 필터, 키워드 검색)
export async function GET(request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get('categoryId')
  const keyword = searchParams.get('keyword')?.trim()
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))

  // 검색 조건 조합
  const conditions = []
  if (categoryId) {
    conditions.push(eq(articles.categoryId, parseInt(categoryId)))
  }
  if (keyword) {
    conditions.push(
      or(
        ilike(articles.translatedTitle, `%${keyword}%`),
        ilike(articles.translatedSummary, `%${keyword}%`),
        ilike(articles.originalTitle, `%${keyword}%`)
      )
    )
  }
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined

  try {
    // 전체 개수 조회
    let countQuery = db.select({ total: count() }).from(articles)
    if (whereClause) countQuery = countQuery.where(whereClause)
    const [{ total }] = await countQuery

    // 페이지 데이터 조회
    let query = db
      .select()
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .orderBy(desc(articles.publishedAt))
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE)

    if (whereClause) query = query.where(whereClause)

    const result = await query
    return NextResponse.json({ articles: result, total, page, pageSize: PAGE_SIZE })
  } catch (error) {
    return NextResponse.json({ error: '뉴스 조회 실패' }, { status: 500 })
  }
}
