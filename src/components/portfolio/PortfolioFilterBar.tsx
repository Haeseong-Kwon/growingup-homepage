"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  portfolioYears,
  portfolioCategories,
  portfolioIndustries,
  sortOptions,
} from "@/data/portfolio";

interface PortfolioFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedYear: string;
  onYearChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedIndustry: string;
  onIndustryChange: (value: string) => void;
  selectedSort: string;
  onSortChange: (value: string) => void;
  onReset: () => void;
}

export function PortfolioFilterBar({
  searchQuery,
  onSearchChange,
  selectedYear,
  onYearChange,
  selectedCategory,
  onCategoryChange,
  selectedIndustry,
  onIndustryChange,
  selectedSort,
  onSortChange,
  onReset,
}: PortfolioFilterBarProps) {
  const hasActiveFilters =
    searchQuery ||
    selectedYear !== "전체" ||
    selectedCategory !== "전체" ||
    selectedIndustry !== "전체" ||
    selectedSort !== "newest";

  return (
    <div
      className={cn(
        "w-full bg-white/80 backdrop-blur-md border-b border-[var(--brand-muted)]",
        "md:sticky md:top-[var(--header-h)] z-30 transition-all duration-300"
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="space-y-4">
          {/* 검색 바 */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand-fg)]/60" />
            <Input
              type="text"
              placeholder="프로젝트/클라이언트/키워드 검색"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-11 pr-10 h-12 w-full bg-white border-2 border-[var(--brand-fg)] rounded-none text-[var(--brand-fg)] placeholder:text-[var(--brand-fg)]/40 focus-visible:ring-0 focus-visible:border-[var(--brand-primary)] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--brand-fg)]/60 hover:text-[var(--brand-fg)] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* 필터 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* 연도 */}
            <Select value={selectedYear} onValueChange={onYearChange}>
              <SelectTrigger className="w-full h-12 bg-white border-2 border-[var(--brand-fg)] rounded-none text-[var(--brand-fg)] uppercase font-bold text-xs tracking-wider hover:bg-[var(--brand-fg)] hover:text-white transition-colors focus:ring-0">
                <SelectValue placeholder="YEAR" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-2 border-[var(--brand-fg)]">
                <SelectItem value="전체" className="rounded-none focus:bg-[var(--brand-fg)] focus:text-white">ALL YEARS</SelectItem>
                {portfolioYears.map((year) => (
                  <SelectItem key={year} value={year.toString()} className="rounded-none focus:bg-[var(--brand-fg)] focus:text-white">
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 카테고리 */}
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-full h-12 bg-white border-2 border-[var(--brand-fg)] rounded-none text-[var(--brand-fg)] uppercase font-bold text-xs tracking-wider hover:bg-[var(--brand-fg)] hover:text-white transition-colors focus:ring-0">
                <SelectValue placeholder="CATEGORY" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-2 border-[var(--brand-fg)]">
                {portfolioCategories.map((category) => (
                  <SelectItem key={category} value={category} className="rounded-none focus:bg-[var(--brand-fg)] focus:text-white">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 산업 */}
            <Select value={selectedIndustry} onValueChange={onIndustryChange}>
              <SelectTrigger className="w-full h-12 bg-white border-2 border-[var(--brand-fg)] rounded-none text-[var(--brand-fg)] uppercase font-bold text-xs tracking-wider hover:bg-[var(--brand-fg)] hover:text-white transition-colors focus:ring-0">
                <SelectValue placeholder="INDUSTRY" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-2 border-[var(--brand-fg)]">
                {portfolioIndustries.map((industry) => (
                  <SelectItem key={industry} value={industry} className="rounded-none focus:bg-[var(--brand-fg)] focus:text-white">
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 정렬 */}
            <Select value={selectedSort} onValueChange={onSortChange}>
              <SelectTrigger className="w-full h-12 bg-white border-2 border-[var(--brand-fg)] rounded-none text-[var(--brand-fg)] uppercase font-bold text-xs tracking-wider hover:bg-[var(--brand-fg)] hover:text-white transition-colors focus:ring-0">
                <SelectValue placeholder="SORT" />
              </SelectTrigger>
              <SelectContent className="rounded-none border-2 border-[var(--brand-fg)]">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="rounded-none focus:bg-[var(--brand-fg)] focus:text-white">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reset 버튼 */}
          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={onReset}
                className="h-10 gap-2 rounded-none border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white uppercase font-bold text-xs tracking-widest transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                Reset Filter
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

