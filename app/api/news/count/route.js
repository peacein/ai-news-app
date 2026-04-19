import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { articles } from '@/lib/db/schema';
import { count } from 'drizzle-orm';

// GET /api/news/count - 전체 뉴스 개수 조회
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  try {
    const [{ total }] = await db.select({ total: count() }).from(articles);
    return NextResponse.json({ total });
  } catch (error) {
    return NextResponse.json({ error: '개수 조회 실패' }, { status: 500 });
  }
}
