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
    <section className="bg-[var(--ink)] py-[12vh] text-white">
      <div className="grid gap-16 rail lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        <div>
          <p className="t-label text-white/45">(FAQ)</p>
          <MaskReveal
            as="h2"
            lines={["자주 묻는", "질문"]}
            className="mt-3 t-display text-white"
          />

          <ul className="mt-10 border-t border-dashed border-[var(--rule)]">
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <li key={item.question} className="border-b border-dashed border-[var(--rule)]">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span className="text-[clamp(16px,1.5vw,22px)] font-semibold tracking-[-0.02em] transition-opacity group-hover:opacity-60">
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
                        <p className="max-w-[58ch] pb-6 t-body text-white/60">
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
          className="flex flex-col justify-between bg-[var(--paper)] p-8 text-[var(--ink)] lg:p-10"
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-12% 0px -12% 0px" }}
          transition={{ duration: 0.95, ease: EASE }}
        >
          <div>
            <p className="t-label text-black/45">(Start here)</p>
            <h2 className="mt-4 text-[clamp(32px,4vw,72px)] font-semibold uppercase leading-[0.9] tracking-[-0.03em]">
              Ready to
              <br />
              grow up?
            </h2>
            <p className="mt-6 max-w-[36ch] t-body text-black/60">
              프로젝트 참여 신청 또는 마케팅 제안 요청을 통해 성장의 첫 걸음을
              내딛어보세요.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-3">
            <Link
              href="/apply"
              className="bg-[var(--ink)] px-7 py-4 text-center text-[13px] font-semibold uppercase text-white transition-opacity hover:opacity-85"
            >
              Start a project
            </Link>
            <Link
              href="/proposal"
              className="border border-dashed border-black/40 px-7 py-4 text-center text-[13px] font-semibold uppercase transition-colors hover:bg-[var(--ink)] hover:text-white"
            >
              Request proposal
            </Link>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
