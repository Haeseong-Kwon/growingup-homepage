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
    <div className="w-full bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8 space-y-6">
      {/* 검색 */}
      <div className="w-full max-w-2xl mx-auto">
        <Input
          type="search"
          placeholder="검색..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-12 w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:border-white/30"
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
                ? "bg-white text-[var(--brand-primary)] hover:bg-white/90"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

