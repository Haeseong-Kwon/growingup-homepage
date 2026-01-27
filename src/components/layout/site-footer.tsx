import Link from "next/link";
import { Container } from "./container";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-[var(--brand-bg)] py-12 md:py-16 lg:py-20">
      <Container>
        <div className="grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* 회사 정보 */}
          <div>
            <h3 className="text-lg font-medium mb-4 tracking-tight text-[var(--brand-fg)]">GROWING UP</h3>
            <p className="text-sm text-[var(--brand-fg)]/70 leading-relaxed">
              성장을 위한 진단과 솔루션
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h4 className="text-sm font-medium mb-4 tracking-tight text-[var(--brand-fg)]">탐색</h4>
            <ul className="space-y-2.5 text-sm text-[var(--brand-fg)]/70">
              <li>
                <Link href="/capabilities" className="hover:text-[var(--brand-primary)] transition-colors">
                  역량
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[var(--brand-primary)] transition-colors">
                  서비스
                </Link>
              </li>
              <li>
                <Link href="/cases" className="hover:text-[var(--brand-primary)] transition-colors">
                  사례
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-[var(--brand-primary)] transition-colors">
                  인사이트
                </Link>
              </li>
            </ul>
          </div>

          {/* 지원 */}
          <div>
            <h4 className="text-sm font-medium mb-4 tracking-tight text-[var(--brand-fg)]">지원</h4>
            <ul className="space-y-2.5 text-sm text-[var(--brand-fg)]/70">
              <li>
                <Link href="/contact" className="hover:text-[var(--brand-primary)] transition-colors">
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/updates" className="hover:text-[var(--brand-primary)] transition-colors">
                  업데이트
                </Link>
              </li>
              <li>
                <Link href="/diagnosis" className="hover:text-[var(--brand-primary)] transition-colors">
                  진단 요청
                </Link>
              </li>
            </ul>
          </div>

          {/* 법적 정보 */}
          <div>
            <h4 className="text-sm font-medium mb-4 tracking-tight text-[var(--brand-fg)]">법적 정보</h4>
            <ul className="space-y-2.5 text-sm text-[var(--brand-fg)]/70">
              <li>
                <Link href="/privacy" className="hover:text-[var(--brand-primary)] transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[var(--brand-primary)] transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-[var(--brand-primary)] transition-colors">
                  쿠키 정책
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--brand-muted)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--brand-fg)]/60">
          <p>© {currentYear} GROWING UP. All rights reserved.</p>
          <p>Made with precision</p>
        </div>
      </Container>
    </footer>
  );
}
