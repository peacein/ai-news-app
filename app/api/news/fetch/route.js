import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

// POST /api/news/fetch - RSS 수집 → Claude 처리 → DB 저장
export async function POST() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  // TODO: RSS 수집, Claude 처리, DB 저장 구현
  return NextResponse.json({ message: '구현 예정', count: 0 })
}
