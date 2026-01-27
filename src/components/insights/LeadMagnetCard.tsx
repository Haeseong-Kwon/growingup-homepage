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
    <Card className="w-full max-w-5xl mx-auto border-2 bg-card border-border shadow-sm rounded-2xl hover:shadow-lg hover:border-primary/20 transition-all">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 왼쪽: 텍스트 영역 */}
        <div className="p-6 md:p-8 min-w-0">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-xl md:text-2xl font-bold text-[var(--brand-fg)] mb-2 break-words">
              런칭 체크리스트 PDF 받기
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed break-words">
              신규 브랜드 런칭 시 놓치기 쉬운 50가지 체크포인트
            </p>
          </CardContent>
        </div>

        {/* 오른쪽: 폼 영역 */}
        <div className="p-6 md:p-8 lg:border-l border-border min-w-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full"
              required
            />
            <Button
              type="submit"
              disabled={!email || !agreed}
              className="w-full h-12 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/90 text-white font-bold"
            >
              받기
            </Button>
            <div className="flex items-start gap-3 min-w-0">
              <Checkbox
                id="privacy-agree"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                className="mt-0.5 flex-shrink-0"
              />
              <label
                htmlFor="privacy-agree"
                className="text-sm text-muted-foreground cursor-pointer leading-relaxed break-words min-w-0"
              >
                [필수]{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-[var(--brand-primary)] hover:underline"
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

