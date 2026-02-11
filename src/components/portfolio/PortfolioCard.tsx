"use client";

import { PortfolioItem } from "@/data/portfolio";

interface PortfolioCardProps {
  portfolioItem: PortfolioItem;
  onClick: () => void;
}

export function PortfolioCard({ portfolioItem, onClick }: PortfolioCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* 이미지 컨테이너 - 모던한 비율과 둥근 모서리 */}
      <div className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-white/5 mb-6">
        {/* 호버 시 이미지 스케일 효과 */}
        <div className="w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
          {portfolioItem.thumbnailUrl ? (
            <div className="w-full h-full bg-slate-800" /> // 실제 이미지 로직이 있다면 여기에 img 태그 사용
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10">
              <span className="text-lg font-bold text-white/20 uppercase tracking-widest">
                {portfolioItem.category}
              </span>
            </div>
          )}
        </div>

        {/* 오버레이 - 호버 시 등장 */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* 우측 상단 화살표 아이콘 */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out shadow-lg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-black">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </div>

      {/* 텍스트 정보 */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs uppercase tracking-wider font-bold text-white/40">
          <span>{portfolioItem.category}</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>{portfolioItem.year}</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight group-hover:text-[var(--brand-primary)] transition-colors duration-300">
          {portfolioItem.title}
        </h3>

        <p className="text-white/60 line-clamp-2 leading-relaxed">
          {portfolioItem.summary}
        </p>

        {/* 태그 */}
        {portfolioItem.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {portfolioItem.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="text-xs px-2 py-1 rounded-md bg-white/5 text-white/60">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

