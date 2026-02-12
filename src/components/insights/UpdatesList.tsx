"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, Pin, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { UpdateItem } from "./insightsData";

interface UpdatesListProps {
  updates: UpdateItem[];
}

export function UpdatesList({ updates }: UpdatesListProps) {
  if (updates.length === 0) return null;

  const featured = updates[0];
  const rest = updates.slice(1);

  return (
    <div className="space-y-12">
      {/* Featured Article */}
      <Link href={featured.href} className="group block">
        <div className="relative overflow-hidden rounded-3xl border-2 border-[var(--brand-muted)] bg-white p-8 md:p-12 transition-all duration-500 hover:border-[var(--brand-primary)] hover:shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                {featured.pinned && (
                  <Badge variant="secondary" className="bg-[var(--brand-primary)] text-white border-0 px-3 py-1">
                    <Pin className="w-3 h-3 mr-1" /> Featured
                  </Badge>
                )}
                <span className="text-sm font-bold text-[var(--brand-primary)] tracking-wider uppercase">
                  {featured.badges[0] || "Update"}
                </span>
                <span className="text-sm text-[var(--brand-fg)]/40 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {featured.date}
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-[var(--brand-fg)] leading-tight group-hover:text-[var(--brand-primary)] transition-colors">
                {featured.title}
              </h3>

              {featured.excerpt && (
                <p className="text-xl text-[var(--brand-fg)]/60 leading-relaxed max-w-2xl">
                  {featured.excerpt}
                </p>
              )}

              <div className="pt-6">
                <span className="inline-flex items-center gap-2 text-lg font-bold text-[var(--brand-fg)] group-hover:translate-x-2 transition-transform">
                  Read Article <ArrowRight className="w-5 h-5" />
                </span>
              </div>
            </div>

            {/* Metadata or decorative simple graphic for text-only updates */}
            <div className="hidden md:flex flex-col gap-2 items-end">
              {featured.badges.slice(1).map(badge => (
                <Badge key={badge} variant="outline" className="text-[var(--brand-fg)]/40 border-[var(--brand-fg)]/10">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Link>

      {/* Grid for the rest */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rest.map((update) => (
          <Link key={update.id} href={update.href} className="block w-full min-w-0 group h-full">
            <Card
              className={cn(
                "h-full flex flex-col border-2 rounded-2xl p-6 transition-all duration-300",
                "bg-white border-[var(--brand-muted)] hover:border-[var(--brand-primary)]/50 hover:shadow-lg hover:-translate-y-1"
              )}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-2">
                  {update.badges.map((badge) => (
                    <Badge
                      key={badge}
                      variant="secondary"
                      className="bg-[var(--brand-muted-light)] text-[var(--brand-fg)]/60 text-xs px-2 py-0.5"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
                <span className="text-xs text-[var(--brand-fg)]/40">{update.date}</span>
              </div>

              <h3 className="text-xl font-bold text-[var(--brand-fg)] mb-3 leading-snug group-hover:text-[var(--brand-primary)] transition-colors">
                {update.title}
              </h3>

              {update.excerpt && (
                <p className="text-sm text-[var(--brand-fg)]/60 leading-relaxed line-clamp-3 mb-4 flex-1">
                  {update.excerpt}
                </p>
              )}

              <div className="mt-auto pt-4 border-t border-[var(--brand-muted)] flex justify-end">
                <ArrowRight className="w-5 h-5 text-[var(--brand-fg)]/20 group-hover:text-[var(--brand-primary)] transition-colors" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
