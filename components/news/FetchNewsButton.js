'use client';

import { useState } from 'react';

// 뉴스 가져오기 버튼 컴포넌트
export default function FetchNewsButton({ onFetched }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch('/api/news/fetch', { method: 'POST' });
      if (!res.ok) throw new Error('fetch 실패');
      onFetched?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-500 dark:hover:bg-blue-600"
    >
      {loading ? '가져오는 중...' : '뉴스 가져오기'}
    </button>
  );
}
