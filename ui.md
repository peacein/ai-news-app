# AI 뉴스 수집기 — UI 가이드

## 디자인 원칙

- **깔끔함**: 불필요한 장식 없이 콘텐츠 중심
- **가독성**: 충분한 여백, 명확한 계층 구조
- **일관성**: 색상·간격·타이포그래피 규칙을 전체에 동일하게 적용

---

## 색상 팔레트

| 역할 | 클래스 | 값 |
|------|--------|----|
| 배경 (페이지) | `bg-gray-50` | `#F9FAFB` |
| 배경 (카드) | `bg-white` | `#FFFFFF` |
| 텍스트 (제목) | `text-gray-900` | `#111827` |
| 텍스트 (본문) | `text-gray-600` | `#4B5563` |
| 텍스트 (보조) | `text-gray-400` | `#9CA3AF` |
| 주 색상 | `bg-blue-600` / `text-blue-600` | `#2563EB` |
| 주 색상 (hover) | `hover:bg-blue-700` | `#1D4ED8` |
| 경계선 | `border-gray-200` | `#E5E7EB` |

카테고리 태그 색상은 DB `categories.color` 컬럼에 저장된 HEX 값(`#RRGGBB`)을 인라인 스타일로 적용합니다.

---

## 타이포그래피

| 용도 | 클래스 |
|------|--------|
| 페이지 제목 | `text-2xl font-bold text-gray-900` |
| 카드 제목 | `text-base font-semibold text-gray-900 leading-snug` |
| 카드 본문 | `text-sm text-gray-600 leading-relaxed` |
| 태그·레이블 | `text-xs font-medium` |
| 보조 정보 (날짜·출처) | `text-xs text-gray-400` |

폰트: Geist Sans (기본), Geist Mono (코드)

---

## 레이아웃

```
┌─────────────────────────────────────────────┐
│  사이드바 (좌)  │  메인 콘텐츠 영역 (우)      │
│  w-64           │  flex-1                     │
│  bg-white       │  bg-gray-50                 │
│  border-r       │  p-6 또는 p-8               │
└─────────────────────────────────────────────┘
```

- 최대 너비: `max-w-7xl mx-auto`
- 반응형: 모바일은 사이드바 숨김, 태블릿 이상(`md:`)에서 사이드바 표시

---

## 컴포넌트

### 1. 사이드바

```
bg-white border-r border-gray-200 w-64 h-screen sticky top-0
```

- 상단: 앱 로고 + 이름 `AI 뉴스 수집기`
- 메뉴 항목: `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm`
  - 활성: `bg-blue-50 text-blue-600 font-medium`
  - 비활성: `text-gray-600 hover:bg-gray-100`
- 하단: 사용자 프로필 (Clerk UserButton)

---

### 2. 카테고리 바

뉴스 카드 목록 바로 위에 위치합니다.

```
flex items-center gap-2 flex-wrap mb-6
```

#### 카테고리 탭 (개별)

```html
<button
  class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
  style="background-color: {color}20; color: {color}"
>
  카테고리 이름
</button>
```

- 선택된 탭: `ring-2 ring-offset-1` + 해당 카테고리 색상의 ring
- 전체 탭 (기본): `bg-gray-100 text-gray-700 hover:bg-gray-200`

#### 카테고리 추가 버튼

카테고리 목록 끝에 위치합니다.

```html
<button
  class="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium
         text-gray-400 border border-dashed border-gray-300
         hover:text-blue-600 hover:border-blue-400 transition-colors"
>
  <svg><!-- + 아이콘 --></svg>
  카테고리 추가
</button>
```

---

### 3. 뉴스 카드

카드 목록은 그리드로 배치합니다.

```
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5
```

#### 카드 구조

```
┌──────────────────────────────┐
│  [썸네일 이미지 - 선택]        │  aspect-video object-cover rounded-t-xl
├──────────────────────────────┤
│  [카테고리 태그]  [출처]       │  상단 메타
│                              │
│  제목 (최대 2줄)              │  text-base font-semibold
│                              │
│  요약 (최대 3줄)              │  text-sm text-gray-600
│                              │
│  날짜          [Notion 저장] │  하단 액션
└──────────────────────────────┘
```

```html
<article
  class="bg-white rounded-xl border border-gray-200 shadow-sm
         hover:shadow-md transition-shadow flex flex-col overflow-hidden"
>
  <!-- 썸네일 (있을 때만) -->
  <img class="w-full aspect-video object-cover" />

  <!-- 카드 본문 -->
  <div class="p-4 flex flex-col gap-3 flex-1">

    <!-- 메타: 카테고리 + 출처 -->
    <div class="flex items-center justify-between">
      <span
        class="px-2 py-0.5 rounded-full text-xs font-medium"
        style="background-color: {color}20; color: {color}"
      >카테고리</span>
      <span class="text-xs text-gray-400">출처명</span>
    </div>

    <!-- 제목 -->
    <h2 class="text-base font-semibold text-gray-900 leading-snug line-clamp-2">
      번역된 제목
    </h2>

    <!-- 요약 -->
    <p class="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
      번역된 요약
    </p>

    <!-- 하단: 날짜 + 액션 -->
    <div class="flex items-center justify-between pt-1">
      <time class="text-xs text-gray-400">2026-03-31</time>
      <div class="flex items-center gap-2">
        <a
          href="{sourceUrl}"
          target="_blank"
          class="text-xs text-blue-600 hover:underline"
        >원문 보기</a>
        <button
          class="text-xs text-gray-400 hover:text-gray-700 transition-colors"
          title="Notion에 저장"
        >저장</button>
      </div>
    </div>

  </div>
</article>
```

---

### 4. 뉴스 가져오기 버튼

페이지 제목 우측에 배치합니다.

```html
<button
  class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
         bg-blue-600 text-white hover:bg-blue-700 transition-colors
         disabled:opacity-50 disabled:cursor-not-allowed"
>
  뉴스 가져오기
</button>
```

로딩 중: 텍스트를 `가져오는 중...`으로 변경 + `disabled` 처리

---

### 5. 빈 상태 (Empty State)

뉴스가 없을 때 카드 그리드 자리에 표시합니다.

```html
<div class="flex flex-col items-center justify-center py-20 text-center">
  <div class="text-gray-300 text-5xl mb-4">📭</div>
  <p class="text-gray-500 text-sm">아직 수집된 뉴스가 없습니다.</p>
  <p class="text-gray-400 text-xs mt-1">위의 버튼을 눌러 뉴스를 가져오세요.</p>
</div>
```

---

### 6. 카테고리 추가 모달

카테고리 추가 버튼 클릭 시 표시되는 모달입니다.

```
배경 딤: fixed inset-0 bg-black/40 z-40
모달: bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm z-50
```

**입력 필드 공통 스타일:**
```
w-full px-3 py-2 text-sm rounded-lg border border-gray-200
focus:outline-none focus:ring-2 focus:ring-blue-500
```

모달 내 버튼:
- 취소: `px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50`
- 저장: `px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700`

---

## 간격 규칙

| 용도 | 값 |
|------|----|
| 섹션 간 | `mb-6` / `gap-6` |
| 카드 그리드 간격 | `gap-5` |
| 카드 내부 패딩 | `p-4` |
| 카테고리 바 하단 여백 | `mb-6` |
| 인라인 요소 간격 | `gap-2` |

---

## 반응형 중단점

| 중단점 | 설명 |
|--------|------|
| 기본 (모바일) | 카드 1열, 사이드바 숨김 |
| `sm:` (640px+) | 카드 2열 |
| `md:` (768px+) | 사이드바 표시 |
| `lg:` (1024px+) | 카드 3열 |
