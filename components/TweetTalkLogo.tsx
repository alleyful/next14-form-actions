'use client';

export function TweetTalkLogo() {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      {/* 배경 원 */}
      <circle cx='16' cy='16' r='16' fill='url(#paint0_linear)' />

      {/* 새 아이콘 */}
      <path
        d='M23 11.24a7.5 7.5 0 01-2.14.58 3.74 3.74 0 001.64-2.06c-.72.43-1.52.74-2.37.9a3.73 3.73 0 00-6.35 3.4 10.59 10.59 0 01-7.69-3.9 3.73 3.73 0 001.15 4.98 3.72 3.72 0 01-1.69-.47v.05a3.73 3.73 0 003 3.66 3.75 3.75 0 01-1.68.06 3.73 3.73 0 003.48 2.59A7.5 7.5 0 019 21.75a10.56 10.56 0 005.72 1.68c6.87 0 10.63-5.69 10.63-10.63 0-.16 0-.32-.01-.48.73-.53 1.36-1.18 1.86-1.93l-.2-.15z'
        fill='#ffffff'
      />

      {/* 그라데이션 정의 */}
      <defs>
        <linearGradient
          id='paint0_linear'
          x1='0'
          y1='0'
          x2='32'
          y2='32'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#60A5FA' />
          <stop offset='1' stopColor='#3B82F6' />
        </linearGradient>
      </defs>
    </svg>
  );
}
