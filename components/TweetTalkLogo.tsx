"use client";

export function TweetTalkLogo() {
  return (
    <svg
      width="120"
      height="32"
      viewBox="0 0 120 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="24"
        fontWeight="400"
        fontFamily="system-ui"
        fill="url(#text-gradient)"
      >
        TweetTalk
      </text>

      {/* 그라데이션 정의 */}
      <defs>
        {/* 텍스트 그라데이션 */}
        <linearGradient
          id="text-gradient"
          x1="0"
          y1="0"
          x2="120"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--tt-gradient-start)" />
          <stop offset="50%" stopColor="var(--tt-gradient-middle)" />
          <stop offset="100%" stopColor="var(--tt-gradient-end)" />
        </linearGradient>

        {/* 아이콘 라인 그라데이션 */}
        <linearGradient
          id="instagram-line-gradient"
          x1="3"
          y1="3"
          x2="21"
          y2="21"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="20%" stopColor="var(--tt-gradient-start)" />
          <stop offset="50%" stopColor="var(--tt-gradient-middle)" />
          <stop offset="80%" stopColor="var(--tt-gradient-end)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
