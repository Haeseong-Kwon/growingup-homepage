"use client";

import Link from "next/link";
import { MaskReveal } from "@/components/motion/mask-reveal";

const NAV_COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/capabilities", label: "역량" },
      { href: "/services", label: "서비스" },
      { href: "/cases", label: "사례" },
      { href: "/portfolio", label: "포트폴리오" },
      { href: "/insights", label: "인사이트" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "문의하기" },
      { href: "/updates", label: "업데이트" },
      { href: "/diagnosis", label: "진단 요청" },
      { href: "/arena", label: "아레나" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "개인정보처리방침" },
      { href: "/terms", label: "이용약관" },
      { href: "/cookies", label: "쿠키 정책" },
    ],
  },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--ink)] pb-6 pt-[18vh] text-white">
      <div className="rail">
        {/* Oversized sign-off — the last thing on the page is the loudest. */}
        <MaskReveal
          as="h2"
          lines={["LET'S", "GROW UP."]}
          className="t-mega text-white"
        />

        <p className="mt-10 max-w-[46ch] t-body text-white/60">
          프로젝트 문의는 목표와 예산, 일정을 함께 보내주세요. 검토 후 맞춤 제안서로
          빠르게 회신드립니다.
        </p>

        <div className="mt-16 grid gap-y-10 rule-t pt-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h3 className="t-label text-white/45">Business</h3>
            <p className="mt-3 text-[clamp(15px,1.3vw,20px)] font-semibold uppercase leading-tight tracking-[-0.02em]">
              Growth Marketing &amp; Launch Strategy
              <br />
              Data-Driven Campaign Operations
            </p>

            <h3 className="mt-8 t-label text-white/45">Contact</h3>
            <p className="mt-3 text-[clamp(15px,1.3vw,20px)] font-semibold uppercase tracking-[-0.02em]">
              <a href="mailto:hello@growingup.kr" className="hover:opacity-60">
                hello@growingup.kr
              </a>
            </p>
          </div>

          {NAV_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="t-label text-white/45">{column.title}</h3>
              <ul className="mt-3 space-y-1.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="t-body text-white/70 transition-opacity hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 rule-t pt-5 t-label text-white/45 md:flex-row md:items-center md:justify-between">
          <span>© GROWING UP {currentYear}</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
