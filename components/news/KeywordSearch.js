'use client';

import { useState } from 'react';

export default function KeywordSearch({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  function handleSearch() {
    onSearch(inputValue.trim());
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch();
  }

  function handleClear() {
    setInputValue('');
    onSearch('');
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="키워드로 검색..."
          className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-gray-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white
                     dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
        />
        {/* 돋보기 아이콘 */}
        <svg
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        {/* 입력값 있을 때 X 버튼 */}
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400
                       hover:text-gray-600 transition-colors
                       dark:text-gray-500 dark:hover:text-gray-300"
            aria-label="검색어 초기화"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      <button
        onClick={handleSearch}
        className="px-4 py-2 text-sm font-medium rounded-lg
                   bg-blue-600 text-white hover:bg-blue-700 transition-colors
                   dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        검색
      </button>
    </div>
  );
}
