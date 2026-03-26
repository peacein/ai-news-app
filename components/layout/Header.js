import { UserButton } from '@clerk/nextjs'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">AI 뉴스 수집기</h1>
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  )
}
