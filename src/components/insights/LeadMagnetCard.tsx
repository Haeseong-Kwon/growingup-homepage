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
    <Card className="w-full max-w-5xl mx-auto border-2 bg-white/5 border-white/10 shadow-sm rounded-2xl hover:shadow-lg hover:border-white/20 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 왼쪽: 텍스트 영역 */}
        <div className="p-6 md:p-8 min-w-0">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl md:text-2xl font-bold text-white mb-2 break-words">
              런칭 체크리스트 PDF 받기
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-sm md:text-base text-white/70 leading-relaxed break-words">
              신규 브랜드 런칭 시 놓치기 쉬운 50가지 체크포인트
            </p>
          </CardContent>
        </div>

        {/* 오른쪽: 폼 영역 */}
        <div className="p-6 md:p-8 lg:border-l border-white/10 min-w-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-white/30 focus-visible:border-white/30"
              required
            />
            <Button
              type="submit"
              disabled={!email || !agreed}
              className="w-full h-12 bg-white hover:bg-white/90 text-[var(--brand-primary)] font-bold transition-colors"
            >
              받기
            </Button>
            <div className="flex items-start gap-3 min-w-0">
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

