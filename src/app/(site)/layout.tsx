"use client";

import { MotionConfig } from "framer-motion";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteShell } from "@/components/layout/site-shell";
import { PageTransition } from "@/components/layout/page-transition";
import { SmoothScroll } from "@/components/layout/smooth-scroll";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // reducedMotion="user": every inline motion.* reveal drops its transforms for
    // visitors who asked for less motion, without each component opting in.
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col">
        <SmoothScroll />
        <PageTransition />
        <SiteHeader />
        <SiteShell>{children}</SiteShell>
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
