import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

const siteTitle = "GrowingUp | 런칭을 매출과 데이터로 증명합니다";
const siteDescription =
  "GrowingUp은 런칭의 불확실성을 데이터 기반 전략, 실행, 피드백 루프로 관리하는 성장 마케팅 파트너입니다.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | GrowingUp",
  },
  description: siteDescription,
  applicationName: "GrowingUp",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "GrowingUp",
    "그로잉업",
    "런칭",
    "성장 마케팅",
    "데이터 마케팅",
    "마케팅 전략",
  ],
  creator: "GrowingUp",
  publisher: "GrowingUp",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "GrowingUp",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "GrowingUp - 런칭을 매출과 데이터로 증명합니다",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// 크로스 브라우저에서 동일한 반응형 동작을 위해 viewport 고정
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
