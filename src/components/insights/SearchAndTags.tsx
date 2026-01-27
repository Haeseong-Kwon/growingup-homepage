"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tags } from "./insightsData";

interface SearchAndTagsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTag: string;
  onTagChange: (tag: string) => void;
}

export function SearchAndTags({
  searchQuery,
  onSearchChange,
  activeTag,
  onTagChange,
}: SearchAndTagsProps) {
  return (
    <div className="w-full bg-[color-mix(in_srgb,var(--brand-bg)_97%,var(--brand-fg)_3%)] rounded-2xl border border-border p-6 md:p-8 space-y-6">
      {/* 검색 */}
      <div className="w-full max-w-2xl mx-auto">
        <Input
          type="search"
          placeholder="검색..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-12 w-full"
        />
      </div>

      {/* 태그 필터 */}
      <div className="flex flex-wrap gap-2 min-w-0 justify-center">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagChange(tag)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ease-out motion-reduce:transition-none flex-shrink-0",
              activeTag === tag
                ? "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90"
                : "bg-[var(--brand-muted-light)] text-[var(--brand-fg)]/70 hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)]"
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

