"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteShell } from "@/components/layout/site-shell";
import { PageTransition } from "@/components/layout/page-transition";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <PageTransition />
      <SiteHeader />
      <SiteShell>{children}</SiteShell>
      <SiteFooter />
    </div>
  );
}

