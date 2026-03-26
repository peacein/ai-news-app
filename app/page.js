import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export default async function Home() {
  const { userId } = await auth()

  // 로그인된 사용자는 대시보드로, 아니면 로그인 페이지로
  if (userId) {
    redirect('/dashboard')
  } else {
    redirect('/sign-in')
  }
}
