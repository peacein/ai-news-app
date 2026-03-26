import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

// POST /api/notion - Notion에 뉴스 저장
export async function POST(request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
  }

  // TODO: Notion MCP 연동 구현
  return NextResponse.json({ message: '구현 예정' })
}
