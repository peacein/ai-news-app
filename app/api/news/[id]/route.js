import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { articles } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

// DELETE /api/news/:id - 뉴스 삭제
export async function DELETE(request, { params }) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  const { id: rawId } = await params
  const id = parseInt(rawId)
  if (isNaN(id)) {
    return NextResponse.json({ error: '잘못된 ID입니다.' }, { status: 400 })
  }

  try {
    await db.delete(articles).where(eq(articles.id, id))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: '뉴스 삭제 실패' }, { status: 500 })
  }
}
