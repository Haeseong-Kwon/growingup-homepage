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
    <div className="w-full bg-white border-y-2 md:border-2 border-[var(--brand-fg)] p-6 md:p-12 space-y-8 shadow-sm">
      {/* 검색 */}
      <div className="w-full max-w-3xl mx-auto">
        <Input
          type="search"
          placeholder="검색..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-14 w-full bg-white border-2 border-[var(--brand-fg)] rounded-none text-[var(--brand-fg)] placeholder:text-[var(--brand-fg)]/40 text-lg px-6 focus-visible:ring-0 focus-visible:border-[var(--brand-primary)] transition-colors"
        />
      </div>

      {/* 태그 필터 */}
      <div className="flex flex-wrap gap-3 min-w-0 justify-center">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagChange(tag)}
            className={cn(
              "px-6 py-3 rounded-none text-sm font-bold uppercase tracking-wider transition-all duration-200 ease-out border-2 flex-shrink-0",
              activeTag === tag
                ? "bg-[var(--brand-fg)] text-white border-[var(--brand-fg)]"
                : "bg-transparent text-[var(--brand-fg)] border-[var(--brand-fg)]/20 hover:border-[var(--brand-fg)] hover:bg-[var(--brand-fg)] hover:text-white"
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

