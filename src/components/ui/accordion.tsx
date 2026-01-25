"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border rounded-lg overflow-hidden bg-[var(--color-card)]"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-[var(--brand-muted-light)]/50 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-bold text-base md:text-lg pr-4">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 flex-shrink-0 text-[var(--brand-fg)]/50 transition-transform",
                  isOpen && "rotate-180",
                  prefersReducedMotion && "transition-none"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all",
                prefersReducedMotion ? "transition-none" : "duration-300 ease-in-out"
              )}
              style={{
                maxHeight: isOpen ? "1000px" : "0",
              }}
            >
              <div className="p-5 md:p-6 pt-0 text-sm md:text-base text-[var(--brand-fg)]/70 leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

