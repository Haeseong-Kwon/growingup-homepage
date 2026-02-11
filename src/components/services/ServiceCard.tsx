"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";
import { ServiceItem } from "./servicesData";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card
      id={service.id}
      className={cn(
        "group relative border-2 flex flex-col",
        "transition-transform duration-200 ease-out [contain:paint] motion-reduce:transition-none",
        "hover:-translate-y-1 hover:border-white/20 hover:shadow-lg",
        "bg-white/5 border-white/10 shadow-sm",
        "h-full"
      )}
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl md:text-3xl font-bold text-white mb-2">
          {service.title}
        </CardTitle>
        <p className="text-base md:text-lg text-white/70 leading-relaxed">
          {service.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-6 min-w-0 flex-1">
        {/* 적합한 경우 */}
        <div className="bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/20 rounded-lg p-4 md:p-5">
          <div className="text-sm font-medium text-[var(--brand-primary)] mb-2 uppercase tracking-wide">
            적합한 경우
          </div>
          <p className="text-sm md:text-base text-white/90 leading-relaxed break-words">
            {service.suitableFor}
          </p>
        </div>

        {/* 포함 사항 */}
        <div>
          <div className="text-sm font-medium text-white mb-3 uppercase tracking-wide">
            포함 사항
          </div>
          <ul className="space-y-2.5">
            {service.includes.map((item, index) => (
              <li key={index} className="flex items-start gap-3 min-w-0">
                <CheckCircle2 className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 flex-shrink-0" />
                <span className="text-sm md:text-base text-white/80 leading-relaxed break-words flex-1">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 제외 사항 */}
        <div>
          <div className="text-sm font-medium text-white/60 mb-3 uppercase tracking-wide">
            제외 사항
          </div>
          <ul className="space-y-2.5">
            {service.excludes.map((item, index) => (
              <li key={index} className="flex items-start gap-3 min-w-0">
                <XCircle className="w-5 h-5 text-white/30 mt-0.5 flex-shrink-0" />
                <span className="text-sm md:text-base text-white/50 leading-relaxed break-words flex-1">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 협업 방식 */}
        <div className="border-t border-white/10 pt-4">
          <div className="text-sm font-medium text-white mb-2 uppercase tracking-wide">
            협업 방식
          </div>
          <p className="text-sm md:text-base text-white/80 leading-relaxed break-words">
            {service.collaboration}
          </p>
        </div>

        {/* 필요 리소스 */}
        <div className="border-t border-white/10 pt-4">
          <div className="text-sm font-medium text-white mb-2 uppercase tracking-wide">
            필요 리소스
          </div>
          <p className="text-sm md:text-base text-white/80 leading-relaxed break-words">
            {service.requiredResources}
          </p>
        </div>

        {/* 성과 측정 기준 */}
        <div className="border-t border-white/10 pt-4">
          <div className="text-sm font-medium text-white mb-2 uppercase tracking-wide">
            성과 측정 기준
          </div>
          <p className="text-sm md:text-base text-white/80 leading-relaxed break-words">
            {service.successCriteria}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

