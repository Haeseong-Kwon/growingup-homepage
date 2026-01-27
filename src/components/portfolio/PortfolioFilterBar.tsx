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
        "w-full bg-[var(--brand-bg)] border-b border-[var(--brand-muted)]",
        "md:sticky md:top-[var(--header-h)] z-30"
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="space-y-4">
          {/* 검색 바 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--brand-fg)]/40" />
            <Input
              type="text"
              placeholder="프로젝트/클라이언트/키워드 검색"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-10 h-11 w-full"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--brand-fg)]/40 hover:text-[var(--brand-fg)]/70 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* 필터 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* 연도 */}
            <Select value={selectedYear} onValueChange={onYearChange}>
              <SelectTrigger className="w-full h-11">
                <SelectValue placeholder="연도" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체">전체</SelectItem>
                {portfolioYears.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 카테고리 */}
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-full h-11">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                {portfolioCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 산업 */}
            <Select value={selectedIndustry} onValueChange={onIndustryChange}>
              <SelectTrigger className="w-full h-11">
                <SelectValue placeholder="산업" />
              </SelectTrigger>
              <SelectContent>
                {portfolioIndustries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 정렬 */}
            <Select value={selectedSort} onValueChange={onSortChange}>
              <SelectTrigger className="w-full h-11">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
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
                className="h-9 gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                필터 초기화
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

