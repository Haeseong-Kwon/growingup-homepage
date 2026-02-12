"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function LeadMagnetCard() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;
    // TODO: API 연동
    alert("요청 완료");
    setEmail("");
    setAgreed(false);
  };

  return (
    <Card className="w-full max-w-5xl mx-auto border-0 bg-[var(--brand-fg)] shadow-xl rounded-none hover:shadow-2xl transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 왼쪽: 텍스트 영역 */}
        <div className="p-8 md:p-12 min-w-0 flex flex-col justify-center">
          <CardHeader className="p-0 mb-6">
            <div className="w-12 h-1 bg-white mb-6" /> {/* Decorative line */}
            <CardTitle className="text-3xl md:text-4xl font-black text-white mb-4 break-words tracking-tight">
              런칭 체크리스트 PDF 받기
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-lg text-white/80 leading-relaxed break-words font-medium">
              신규 브랜드 런칭 시 놓치기 쉬운<br className="hidden md:block" />
              50가지 핵심 체크포인트를 무료로 확인하세요.
            </p>
          </CardContent>
        </div>

        {/* 오른쪽: 폼 영역 */}
        <div className="p-8 md:p-12 lg:border-l border-white/20 min-w-0 bg-white/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 w-full bg-white border-0 rounded-none text-[var(--brand-fg)] placeholder:text-[var(--brand-fg)]/40 focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] text-lg px-6"
              required
            />
            <Button
              type="submit"
              disabled={!email || !agreed}
              className="w-full h-14 bg-[var(--brand-primary)] hover:bg-white hover:text-[var(--brand-fg)] text-white font-black text-lg rounded-none transition-all duration-300 border-2 border-transparent hover:border-[var(--brand-fg)]"
            >
              지금 무료로 받기
            </Button>
            <div className="flex items-start gap-3 min-w-0 pt-2">
              <Checkbox
                id="privacy-agree"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                className="mt-0.5 flex-shrink-0 border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-[var(--brand-primary)]"
              />
              <label
                htmlFor="privacy-agree"
                className="text-sm text-white/50 cursor-pointer leading-relaxed break-words min-w-0"
              >
                [필수]{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-white hover:underline hover:text-white/80"
                >
                  개인정보 수집·이용
                </Link>{" "}
                동의
              </label>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
}

