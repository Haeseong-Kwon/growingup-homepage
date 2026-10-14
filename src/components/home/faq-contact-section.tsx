"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqContactSectionProps {
  items: FaqItem[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Closing pair: questions on the left as dashed rows that open in place, the
 * call to action on the right as an inverted panel.
 */
export function FaqContactSection({ items }: FaqContactSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="tone-ink py-[12vh]">
      <div className="grid gap-16 rail lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <MaskReveal as="h2" lines={["자주 묻는", "질문"]} className="t-display" />

          <ul className="mt-10 border-t border-dashed border-[var(--rule)]">
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <li key={item.question} className="border-b border-dashed border-[var(--rule)]">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex min-h-14 w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-[clamp(17px,1.5vw,22px)] font-semibold tracking-[-0.02em] transition-colors duration-300 group-hover:text-[var(--signal-soft)]">
                      {item.question}
                    </span>
                    <Plus
                      className={cn(
                        "mt-1 h-5 w-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen && "rotate-45"
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[58ch] pb-6 t-body fg-muted">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Inverted panel — the one light surface on the page, so it reads as the
            terminal action. */}
        <motion.aside
          className="tone-paper flex flex-col justify-between p-7 md:p-10 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start lg:min-h-[520px]"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
          transition={{ duration: 0.95, ease: EASE }}
        >
          <div>
            <h2 className="text-[clamp(36px,4vw,72px)] font-semibold uppercase leading-[0.9] tracking-[-0.035em]">
              Ready to
              <br />
              grow up?
            </h2>
            <p className="mt-6 max-w-[36ch] t-body fg-muted">
              프로젝트 참여 신청 또는 마케팅 제안 요청을 통해 성장의 첫 걸음을
              내딛어보세요.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-3">
            <Link
              href="/diagnosis"
              className="flex h-13 items-center justify-center bg-[var(--ink)] px-7 py-4 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-[var(--signal)]"
            >
              무료 진단 요청하기
            </Link>
            <Link
              href="/contact"
              className="flex h-13 items-center justify-center border border-[var(--rule)] px-7 py-4 text-[14px] font-semibold transition-colors duration-300 hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white"
            >
              마케팅 제안 요청하기
            </Link>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
