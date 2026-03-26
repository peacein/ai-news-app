import { ClerkProvider } from '@clerk/nextjs'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata = {
  title: 'AI 뉴스 수집기',
  description: '해외 AI 뉴스를 자동 수집하고 한국어로 번역/요약하는 웹 앱',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col bg-gray-50">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
