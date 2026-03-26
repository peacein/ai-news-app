import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { articles, categories } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'

// GET /api/news - 뉴스 목록 조회
export async function GET(request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const categoryId = searchParams.get('categoryId')

  try {
    let query = db
      .select()
      .from(articles)
      .leftJoin(categories, eq(articles.categoryId, categories.id))
      .orderBy(desc(articles.publishedAt))

    if (categoryId) {
      query = query.where(eq(articles.categoryId, parseInt(categoryId)))
    }

    const result = await query
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: '뉴스 조회 실패' }, { status: 500 })
  }
}
