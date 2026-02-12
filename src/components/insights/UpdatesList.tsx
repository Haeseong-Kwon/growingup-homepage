"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, Pin } from "lucide-react";
import { cn } from "@/lib/utils";
import { UpdateItem } from "./insightsData";

interface UpdatesListProps {
  updates: UpdateItem[];
}

export function UpdatesList({ updates }: UpdatesListProps) {
  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
      {updates.map((update) => (
        <Link key={update.id} href={update.href} className="block w-full min-w-0">
          <Card
            className={cn(
              "group relative w-full border-2 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6",
              "transition-all duration-200 ease-out [contain:paint] motion-reduce:transition-none",
              "hover:-translate-y-1 hover:border-[var(--brand-primary)]/20 hover:shadow-lg",
              "bg-white border-[var(--brand-muted)] shadow-sm",
              "p-0"
            )}
          >
            <div className="flex-1 min-w-0 p-6">
              <div className="space-y-3 min-w-0">
                {/* 헤더: pinned + badges */}
                <div className="flex items-center gap-2 flex-wrap">
                  {update.pinned && (
                    <Badge
                      variant="secondary"
                      className="bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center gap-1 border border-[var(--brand-primary)]/20"
                    >
                      <Pin className="w-3 h-3" />
                      고정
                    </Badge>
                  )}
                  {update.badges.map((badge) => (
                    <Badge
                      key={badge}
                      variant="secondary"
                      className="bg-[var(--brand-muted-light)] text-[var(--brand-fg)]/70 hover:bg-[var(--brand-muted)]"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>

                {/* 제목 */}
                <h3 className="text-lg md:text-xl font-semibold tracking-tight text-[var(--brand-fg)] group-hover:text-[var(--brand-primary)] transition-colors duration-200 ease-out motion-reduce:transition-none break-words">
                  {update.title}
                </h3>

                {/* 요약 */}
                {update.excerpt && (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 break-words">
                    {update.excerpt}
                  </p>
                )}

                {/* 메타 정보 */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{update.date}</span>
                  {update.meta && (
                    <span className="font-mono bg-[var(--brand-muted-light)] px-2 py-1 rounded text-[var(--brand-fg)]/60">
                      {update.meta}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 화살표 아이콘 */}
            <div className="p-6 pl-0 sm:pl-6 flex-shrink-0">
              <ArrowRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-[var(--brand-primary)] transition-colors duration-200 ease-out motion-reduce:transition-none" />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

