"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Magnetic } from "@/components/motion/magnetic";

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
    <footer className="tone-ink relative pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[16vh]">
      <div className="rail">
        {/* Oversized sign-off — the last thing on the page is the loudest. */}
        <MaskReveal as="h2" lines={["LET'S", "GROW UP."]} className="t-mega" />

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-[40ch] t-lead fg-muted">
            프로젝트 문의는 목표와 예산, 일정을 함께 보내주세요. 검토 후 맞춤 제안서로
            빠르게 회신드립니다.
          </p>
          <Magnetic strength={0.2} className="w-full md:w-auto">
            <a
              href="mailto:jaeil@wekeepgrowing.com"
              className="group flex h-14 w-full items-center justify-center gap-3 bg-white px-8 text-[15px] font-semibold text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--signal)] hover:text-white md:w-auto"
            >
              jaeil@wekeepgrowing.com
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Magnetic>
        </div>

        <div className="mt-16 grid gap-y-10 rule-t pt-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h3 className="t-label fg-faint">Business</h3>
            <p className="mt-3 text-[clamp(15px,1.3vw,20px)] font-semibold uppercase leading-tight tracking-[-0.02em]">
              Growth Marketing &amp; Launch Strategy
              <br />
              Data-Driven Campaign Operations
            </p>

            <h3 className="mt-8 t-label fg-faint">Contact</h3>
            <p className="mt-3 text-[clamp(15px,1.3vw,20px)] font-semibold uppercase tracking-[-0.02em]">
              <a href="mailto:jaeil@wekeepgrowing.com" className="hover:opacity-60">
                jaeil@wekeepgrowing.com
              </a>
            </p>
          </div>

          {NAV_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="t-label fg-faint">{column.title}</h3>
              <ul className="mt-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-10 items-center t-body fg-muted transition-colors duration-300 hover:text-white md:min-h-8"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 rule-t pt-5 t-label fg-faint md:flex-row md:items-center md:justify-between">
          <span>© GROWING UP {currentYear}</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
