import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface ArchiveItem {
  id: string;
  title: string;
  excerpt: string;
  category?: string;
  date?: string;
  thumbnail?: string;
  href: string;
}

interface ArchiveGridProps {
  items: ArchiveItem[];
  className?: string;
}

export function ArchiveGrid({ items, className }: ArchiveGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-[var(--brand-fg)]/50">
        아직 등록된 항목이 없습니다.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="group block h-full"
        >
          <Card className="h-full border overflow-hidden transition-transform duration-200 ease-out [contain:paint] motion-reduce:transition-none hover:border-[var(--brand-primary)]/30 hover:-translate-y-1 shadow-sm">
            {/* 썸네일 */}
            <div className="aspect-[16/10] relative overflow-hidden">
              {item.thumbnail ? (
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200 ease-out motion-reduce:transition-none"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-hot3) 100%)`,
                  }}
                >
                  <span className="text-sm text-white/80">이미지 없음</span>
                </div>
              )}
            </div>

            <CardHeader className="space-y-3 p-5 md:p-6">
              {/* 메타 정보 */}
              <div className="flex items-center gap-2 text-xs">
                {item.category && (
                  <Badge
                    variant="secondary"
                    className="uppercase tracking-wide bg-[var(--brand-muted-light)] text-[var(--brand-fg)]/70 hover:bg-[var(--brand-muted-light)]"
                  >
                    {item.category}
                  </Badge>
                )}
                {item.date && (
                  <span className="text-[var(--brand-fg)]/50">{item.date}</span>
                )}
              </div>

              {/* 제목 */}
              <h3 className="text-lg md:text-xl font-medium tracking-tight line-clamp-2 group-hover:text-[var(--brand-primary)] transition-colors">
                {item.title}
              </h3>
            </CardHeader>

            <CardContent className="px-5 md:px-6 pb-5 md:pb-6">
              {/* 발췌 */}
              <p className="text-sm text-[var(--brand-fg)]/60 line-clamp-3 leading-relaxed">
                {item.excerpt}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
